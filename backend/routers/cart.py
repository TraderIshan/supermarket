from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Cart, Product, User
from database import get_db
from routers.auth import get_current_user
from pydantic import BaseModel
from typing import List

router = APIRouter()

class CartItem(BaseModel):
    product_id: int
    quantity: int = 1

class CartUpdate(BaseModel):
    quantity: int

class CartResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    product_name: str
    product_price: float
    product_image: str

@router.get("/", response_model=List[CartResponse])
def get_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_items = db.query(Cart).filter(Cart.user_id == current_user.id).all()
    result = []
    for item in cart_items:
        product = item.product
        result.append({
            "id": item.id,
            "product_id": item.product_id,
            "quantity": item.quantity,
            "product_name": product.name,
            "product_price": product.price,
            "product_image": product.image or ""
        })
    return result

@router.post("/", response_model=CartResponse)
def add_to_cart(cart_item: CartItem, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    existing_item = db.query(Cart).filter(Cart.user_id == current_user.id, Cart.product_id == cart_item.product_id).first()
    if existing_item:
        existing_item.quantity += cart_item.quantity
    else:
        db_item = Cart(user_id=current_user.id, product_id=cart_item.product_id, quantity=cart_item.quantity)
        db.add(db_item)
    
    db.commit()
    return {
        "id": existing_item.id if existing_item else db_item.id,
        "product_id": cart_item.product_id,
        "quantity": existing_item.quantity if existing_item else cart_item.quantity,
        "product_name": product.name,
        "product_price": product.price,
        "product_image": product.image or ""
    }

@router.put("/{item_id}")
def update_cart_item(item_id: int, cart_update: CartUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_item = db.query(Cart).filter(Cart.id == item_id, Cart.user_id == current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    cart_item.quantity = cart_update.quantity
    db.commit()
    return {"message": "Cart item updated"}

@router.delete("/{item_id}")
def remove_from_cart(item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    cart_item = db.query(Cart).filter(Cart.id == item_id, Cart.user_id == current_user.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(cart_item)
    db.commit()
    return {"message": "Cart item removed"}
