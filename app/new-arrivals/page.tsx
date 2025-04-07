"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { getNewArrivals } from "@/data/products"

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals()

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">New Arrivals</h1>
        <p className="text-muted-foreground">Discover our latest additions</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

