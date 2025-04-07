"use client"

import { ProductCard } from "@/components/product-card"
import useWishlist from "@/lib/store/wishlist"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
        <Heart className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Your wishlist is empty</h1>
        <p className="text-center text-muted-foreground">
          Save items you love to your wishlist. Review them anytime and easily move them to the cart.
        </p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">My Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => removeItem(item.id)}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </Button>
            <ProductCard
              product={{
                id: parseInt(item.id),
                name: item.name,
                price: item.price,
                image: item.image,
                description: "",
                category: "",
                rating: 0,
                reviewCount: 0,
                stock: 0,
                sizes: [],
                colors: [],
                isOnSale: item.isOnSale,
                salePrice: item.salePrice,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
} 