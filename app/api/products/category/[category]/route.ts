import { NextRequest, NextResponse } from "next/server"
import { products } from "@/data/products"

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = await params.category

  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  )

  if (!categoryProducts.length) {
    return NextResponse.json([], { status: 404 })
  }

  return NextResponse.json(categoryProducts)
} 