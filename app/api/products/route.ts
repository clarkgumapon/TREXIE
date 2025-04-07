import { NextRequest, NextResponse } from "next/server"
import { products as initialProducts } from "@/data/products"

// Store products in memory for this demo
// In a real app, this would use a database
let products = [...initialProducts]
let nextId = products.length + 1

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const productData = await request.json()
    
    // Validate required fields
    if (!productData.name || !productData.description || !productData.price || !productData.image) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        details: 'Name, description, price, and image are required'
      }, { status: 400 })
    }
    
    // Create a new product with an ID
    const newProduct = {
      id: nextId++,
      ...productData,
      rating: 0,
      reviewCount: 0,
      galleryImages: [],
    }
    
    // Add the product to our list
    products.push(newProduct)
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ 
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 400 })
  }
} 