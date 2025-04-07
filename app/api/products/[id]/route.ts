import { NextRequest, NextResponse } from "next/server"
import { products as initialProducts } from "@/data/products"

// Store products in memory for this demo (referencing the same array as the main products route)
// In a real app, this would use a database
let products = [...initialProducts]

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const productData = await request.json()
    
    // Find the product index
    const productIndex = products.findIndex(p => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Update the product, preserving fields not provided in the update
    const updatedProduct = {
      ...products[productIndex],
      ...productData,
      id // Ensure ID doesn't change
    }
    
    // Update the product in our list
    products[productIndex] = updatedProduct
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  
  // Find the product index
  const productIndex = products.findIndex(p => p.id === id)
  
  if (productIndex === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  
  // Remove the product from our list
  products.splice(productIndex, 1)
  
  return NextResponse.json({ success: true })
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  
  const product = products.find(p => p.id === id)
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  
  return NextResponse.json(product)
} 