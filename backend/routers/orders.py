from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from models import Order, OrderItem, Product, User, Cart
from database import get_db
from routers.auth import get_current_user
from pydantic import BaseModel
from typing import List
from decimal import Decimal

router = APIRouter()

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]

class OrderResponse(BaseModel):
    id: int
    total_amount: float
    status: str
    created_at: str
    order_items: List[dict]

@router.post("/checkout", response_model=OrderResponse)
def checkout(order: OrderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total = Decimal(0)
    order_items = []
    
    # Process each item
    for item in order.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        if product.stock_count < item.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {product.name}")
        
        # Reduce stock
        product.stock_count -= item.quantity
        subtotal = Decimal(item.price) * item.quantity
        total += subtotal
        
        order_items.append({
            "product_id": item.product_id,
            "quantity": item.quantity,
            "price": item.price
        })
    
    # Create order
    db_order = Order(user_id=current_user.id, total_amount=total, status="completed")
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    # Create order items
    for item in order_items:
        db_item = OrderItem(order_id=db_order.id, **item)
        db.add(db_item)
    
    # Clear cart
    db.query(Cart).filter(Cart.user_id == current_user.id).delete()
    
    db.commit()
    return {
        "id": db_order.id,
        "total_amount": total,
        "status": db_order.status,
        "created_at": db_order.created_at.isoformat(),
        "order_items": order_items
    }

@router.get("/", response_model=List[OrderResponse])
def get_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    result = []
    for order in orders:
        items = []
        for item in order.order_items:
            items.append({
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price": item.price,
                "product_name": item.product.name,
                "product_image": item.product.image or ""
            })
        result.append({
            "id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "order_items": items
        })
    return result

@router.post("/simulate-payment")
def simulate_payment(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    order = db.query(Order).filter(Order.id == order_id, Order.user_id == current_user.id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.status == "paid":
        return {"message": "Already paid"}
    
    order.status = "paid"
    db.commit()
    return {"message": "Payment simulated successfully"}
