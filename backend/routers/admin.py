from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from models import Product, Order, User
from database import get_db
from routers.auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

@router.get("/dashboard")
def get_admin_dashboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Total sales
    total_sales = db.query(func.sum(Order.total_amount)).filter(Order.status == "paid").scalar() or 0
    
    # Total products
    total_products = db.query(func.count(Product.id)).scalar()
    
    # Low stock products
    low_stock = db.query(Product).filter(Product.stock_count < 10).all()
    
    # Recent orders
    recent_orders = db.query(Order).order_by(Order.created_at.desc()).limit(10).all()
    
    orders_data = []
    for order in recent_orders:
        orders_data.append({
            "id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at.isoformat(),
            "user_email": order.user.email
        })
    
    return {
        "total_sales": total_sales,
        "total_products": total_products,
        "low_stock_products": [{"id": p.id, "name": p.name, "stock": p.stock_count} for p in low_stock],
        "recent_orders": orders_data
    }

@router.put("/products/{product_id}/restock")
def restock_product(product_id: int, stock: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db_product.stock_count += stock
    db.commit()
    return {"message": f"Restocked {db_product.name} by {stock} units"}
