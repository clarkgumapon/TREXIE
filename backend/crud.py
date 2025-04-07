from sqlalchemy.orm import Session
from models import User, Product, Order, OrderItem, CartItem
from typing import List, Optional
from datetime import datetime

# User CRUD operations
class UserCRUD:
    @staticmethod
    def create_user(db: Session, username: str, email: str, password_hash: str) -> User:
        db_user = User(username=username, email=email, password_hash=password_hash)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    @staticmethod
    def get_user(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        return db.query(User).offset(skip).limit(limit).all()

    @staticmethod
    def update_user(db: Session, user_id: int, **kwargs) -> Optional[User]:
        db_user = db.query(User).filter(User.id == user_id).first()
        if db_user:
            for key, value in kwargs.items():
                setattr(db_user, key, value)
            db.commit()
            db.refresh(db_user)
        return db_user

    @staticmethod
    def delete_user(db: Session, user_id: int) -> bool:
        db_user = db.query(User).filter(User.id == user_id).first()
        if db_user:
            db.delete(db_user)
            db.commit()
            return True
        return False

# Product CRUD operations
class ProductCRUD:
    @staticmethod
    def create_product(db: Session, **kwargs) -> Product:
        db_product = Product(**kwargs)
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product

    @staticmethod
    def get_product(db: Session, product_id: int) -> Optional[Product]:
        return db.query(Product).filter(Product.id == product_id).first()

    @staticmethod
    def get_products(db: Session, skip: int = 0, limit: int = 100) -> List[Product]:
        return db.query(Product).offset(skip).limit(limit).all()

    @staticmethod
    def get_products_by_category(db: Session, category: str) -> List[Product]:
        return db.query(Product).filter(Product.category == category).all()

    @staticmethod
    def update_product(db: Session, product_id: int, **kwargs) -> Optional[Product]:
        db_product = db.query(Product).filter(Product.id == product_id).first()
        if db_product:
            for key, value in kwargs.items():
                setattr(db_product, key, value)
            db.commit()
            db.refresh(db_product)
        return db_product

    @staticmethod
    def delete_product(db: Session, product_id: int) -> bool:
        db_product = db.query(Product).filter(Product.id == product_id).first()
        if db_product:
            db.delete(db_product)
            db.commit()
            return True
        return False

# Order CRUD operations
class OrderCRUD:
    @staticmethod
    def create_order(db: Session, user_id: int, total_amount: float) -> Order:
        db_order = Order(user_id=user_id, total_amount=total_amount)
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        return db_order

    @staticmethod
    def get_order(db: Session, order_id: int) -> Optional[Order]:
        return db.query(Order).filter(Order.id == order_id).first()

    @staticmethod
    def get_user_orders(db: Session, user_id: int) -> List[Order]:
        return db.query(Order).filter(Order.user_id == user_id).all()

    @staticmethod
    def update_order_status(db: Session, order_id: int, status: str) -> Optional[Order]:
        db_order = db.query(Order).filter(Order.id == order_id).first()
        if db_order:
            db_order.status = status
            db.commit()
            db.refresh(db_order)
        return db_order

    @staticmethod
    def delete_order(db: Session, order_id: int) -> bool:
        db_order = db.query(Order).filter(Order.id == order_id).first()
        if db_order:
            db.delete(db_order)
            db.commit()
            return True
        return False

# CartItem CRUD operations
class CartItemCRUD:
    @staticmethod
    def add_to_cart(db: Session, user_id: int, product_id: int, quantity: int) -> CartItem:
        db_cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
        db.add(db_cart_item)
        db.commit()
        db.refresh(db_cart_item)
        return db_cart_item

    @staticmethod
    def get_user_cart(db: Session, user_id: int) -> List[CartItem]:
        return db.query(CartItem).filter(CartItem.user_id == user_id).all()

    @staticmethod
    def update_cart_item_quantity(db: Session, cart_item_id: int, quantity: int) -> Optional[CartItem]:
        db_cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
        if db_cart_item:
            db_cart_item.quantity = quantity
            db.commit()
            db.refresh(db_cart_item)
        return db_cart_item

    @staticmethod
    def remove_from_cart(db: Session, cart_item_id: int) -> bool:
        db_cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id).first()
        if db_cart_item:
            db.delete(db_cart_item)
            db.commit()
            return True
        return False

    @staticmethod
    def clear_user_cart(db: Session, user_id: int) -> bool:
        db.query(CartItem).filter(CartItem.user_id == user_id).delete()
        db.commit()
        return True 