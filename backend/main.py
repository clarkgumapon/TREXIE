from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Dict
from pydantic import BaseModel, condecimal
from datetime import datetime

from database import get_db, init_db
from models import User, Product, Order, CartItem
from crud import UserCRUD, ProductCRUD, OrderCRUD, CartItemCRUD

app = FastAPI(
    title="Fashion Store API",
    description="API for Fashion Store E-commerce Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize database
init_db()

@app.get("/")
def read_root() -> Dict[str, str]:
    """
    Root endpoint that provides basic API information
    """
    return {
        "title": "Fashion Store API",
        "version": "1.0.0",
        "description": "Welcome to the Fashion Store API. Visit /docs for complete API documentation."
    }

# Pydantic models for request/response
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    is_active: bool

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: condecimal(max_digits=10, decimal_places=2)  # PHP price
    stock: int
    category: str
    image_url: Optional[str] = None
    sizes: str  # Comma-separated list of sizes
    colors: str  # Comma-separated list of colors

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime
    is_active: bool
    image: Optional[str] = None  # Add this field for frontend compatibility

    class Config:
        from_attributes = True

    @classmethod
    def from_orm(cls, obj):
        # Create an instance of the model from the ORM object
        instance = super().from_orm(obj)
        # Transform image_url to image for frontend compatibility
        instance.image = instance.image_url
        return instance

class OrderBase(BaseModel):
    user_id: int
    total_amount: condecimal(max_digits=10, decimal_places=2)  # PHP amount
    status: str = "pending"

class OrderCreate(OrderBase):
    pass

class Order(OrderBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class CartItemBase(BaseModel):
    user_id: int
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItem(CartItemBase):
    id: int

    class Config:
        from_attributes = True

# User routes
@app.post("/users/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserCRUD.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return UserCRUD.create_user(db, username=user.username, email=user.email, password_hash=user.password)

@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = UserCRUD.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = UserCRUD.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Product routes
@app.post("/products/", response_model=Product, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    return ProductCRUD.create_product(db, **product.model_dump())

@app.get("/products/", response_model=List[Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = ProductCRUD.get_products(db, skip=skip, limit=limit)
    return products

@app.get("/products/{product_id}", response_model=Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = ProductCRUD.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.get("/products/category/{category}", response_model=List[Product])
def read_products_by_category(category: str, db: Session = Depends(get_db)):
    products = ProductCRUD.get_products_by_category(db, category=category)
    return products

# Order routes
@app.post("/orders/", response_model=Order, status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    return OrderCRUD.create_order(db, user_id=order.user_id, total_amount=order.total_amount)

@app.get("/orders/{order_id}", response_model=Order)
def read_order(order_id: int, db: Session = Depends(get_db)):
    db_order = OrderCRUD.get_order(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@app.get("/users/{user_id}/orders/", response_model=List[Order])
def read_user_orders(user_id: int, db: Session = Depends(get_db)):
    orders = OrderCRUD.get_user_orders(db, user_id=user_id)
    return orders

# Cart routes
@app.post("/cart/", response_model=CartItem, status_code=status.HTTP_201_CREATED)
def add_to_cart(cart_item: CartItemCreate, db: Session = Depends(get_db)):
    return CartItemCRUD.add_to_cart(db, user_id=cart_item.user_id, product_id=cart_item.product_id, quantity=cart_item.quantity)

@app.get("/cart/{user_id}", response_model=List[CartItem])
def read_user_cart(user_id: int, db: Session = Depends(get_db)):
    cart_items = CartItemCRUD.get_user_cart(db, user_id=user_id)
    return cart_items

@app.delete("/cart/{cart_item_id}")
def remove_from_cart(cart_item_id: int, db: Session = Depends(get_db)):
    success = CartItemCRUD.remove_from_cart(db, cart_item_id=cart_item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return {"message": "Cart item removed successfully"} 