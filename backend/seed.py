from sqlalchemy.orm import Session
from database import SessionLocal, init_db
from models import Product

def seed_products():
    db = SessionLocal()
    
    # Sample products data
    products = [
        {
            "name": "Filipiniana Modern Dress",
            "description": "Elegant modern take on traditional Filipiniana dress with butterfly sleeves",
            "price": 4999.99,
            "stock": 50,
            "category": "Dresses",
            "image_url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=60",
            "sizes": "XS,S,M,L",
            "colors": "Gold,Rose Gold"
        },
        {
            "name": "Pearl Embellished Gown",
            "description": "Stunning evening gown with pearl embellishments",
            "price": 6999.99,
            "stock": 30,
            "category": "Dresses",
            "image_url": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60",
            "sizes": "S,M,L",
            "colors": "White,Champagne"
        },
        {
            "name": "Classic Stiletto Heels",
            "description": "Timeless stiletto heels perfect for any occasion",
            "price": 2999.99,
            "stock": 100,
            "category": "Shoes",
            "image_url": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=60",
            "sizes": "35,36,37,38,39,40",
            "colors": "Black,Nude,Red"
        },
        {
            "name": "Designer Tote Bag",
            "description": "Spacious and stylish tote bag for everyday use",
            "price": 3499.99,
            "stock": 75,
            "category": "Bags",
            "image_url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=60",
            "sizes": "One Size",
            "colors": "Brown,Black,Navy"
        },
        {
            "name": "Crystal Statement Necklace",
            "description": "Eye-catching crystal necklace for special occasions",
            "price": 1499.99,
            "stock": 60,
            "category": "Accessories",
            "image_url": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60",
            "sizes": "One Size",
            "colors": "Silver,Gold"
        },
        {
            "name": "Summer Floral Dress",
            "description": "Light and breezy floral dress perfect for summer",
            "price": 2499.99,
            "stock": 80,
            "category": "Dresses",
            "image_url": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60",
            "sizes": "XS,S,M,L,XL",
            "colors": "Blue Floral,Pink Floral"
        }
    ]
    
    try:
        # First, initialize the database
        init_db()
        
        # Add each product
        for product_data in products:
            product = Product(**product_data)
            db.add(product)
        
        # Commit the changes
        db.commit()
        print("Successfully added sample products to the database!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_products() 