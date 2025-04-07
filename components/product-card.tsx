"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star, StarHalf, AlertCircle } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/store/cart"
import useWishlist from "@/lib/store/wishlist"
import type { Product } from "@/data/products"
import { formatPHP } from "@/lib/utils/currency"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color")
      return
    }
    
    if (product.stock <= 0) {
      toast.error("Product is out of stock")
      return
    }

    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: imageError ? "/placeholder.jpg" : product.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })

    toast.success("Added to cart!")
    setShowOptions(false)
    setSelectedSize(null)
    setSelectedColor(null)
    setQuantity(1)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString())
      toast.success("Removed from wishlist")
    } else {
      addToWishlist({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: imageError ? "/placeholder.jpg" : product.image,
        isOnSale: product.isOnSale,
        salePrice: product.salePrice,
      })
      toast.success("Added to wishlist")
    }
  }

  const handleImageError = () => {
    setImageError(true)
    console.error(`Failed to load image for product: ${product.name}`)
  }

  return (
    <div
      className="group relative h-full flex flex-col card-hover rounded-xl overflow-hidden bg-white dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
        <div className="relative w-full h-full">
          <Image
            src={imageError ? "/placeholder.jpg" : product.image}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500 img-hover",
              isHovered ? "scale-110" : "scale-100",
            )}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>
        {product.badge && (
          <Badge className="absolute left-3 top-3 bg-black/80 text-white backdrop-blur-sm fashion-badge px-3 py-1 text-xs uppercase tracking-wider">
            {product.badge}
          </Badge>
        )}
        {product.isOnSale && (
          <Badge className="absolute left-3 top-12 bg-red-500/80 text-white backdrop-blur-sm fashion-badge px-3 py-1 text-xs uppercase tracking-wider">
            Sale
          </Badge>
        )}
        {product.stock <= 0 && (
          <Badge className="absolute left-3 top-3 bg-red-500/80 text-white backdrop-blur-sm fashion-badge px-3 py-1 text-xs uppercase tracking-wider">
            Out of Stock
          </Badge>
        )}
        <div className="absolute right-3 top-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white btn-hover"
            onClick={handleWishlist}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isInWishlist(product.id.toString()) ? "fill-red-500 text-red-500" : "text-gray-700"
              )}
            />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center gap-1 text-white">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm">(4.5)</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col mt-4 px-2">
        <div className="flex-1">
          <h3 className="font-medium font-display text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              {product.rating % 1 >= 0.5 && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col">
              {product.isOnSale ? (
                <>
                  <p className="text-muted-foreground font-medium line-through">{formatPHP(product.price)}</p>
                  <p className="text-red-500 font-medium">{formatPHP(product.salePrice!)}</p>
                </>
              ) : (
                <p className="text-muted-foreground font-medium">{formatPHP(product.price)}</p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
          </div>
          {product.material && (
            <p className="text-sm text-muted-foreground mt-1">Material: {product.material}</p>
          )}
        </div>
        
        <Dialog open={showOptions} onOpenChange={setShowOptions}>
          <DialogTrigger asChild>
            <Button 
              className="w-full mt-4 mb-2 rounded-full bg-black text-white hover:bg-black/90"
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock <= 0 ? "Out of Stock" : "Select Options"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Options</DialogTitle>
              <DialogDescription>
                Please select your preferred size and color
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={cn(
                        "h-10 px-4 rounded-full",
                        selectedSize === size && "bg-black text-white hover:bg-black/90"
                      )}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    Please select a size
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className={cn(
                        "h-10 px-4 rounded-full",
                        selectedColor === color && "bg-black text-white hover:bg-black/90"
                      )}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
                {!selectedColor && (
                  <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    Please select a color
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Quantity</h4>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                className="w-full rounded-full bg-black text-white hover:bg-black/90"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Link href={`/product/${product.id}`} className="absolute inset-0">
        <span className="sr-only">View {product.name}</span>
      </Link>
    </div>
  )
}

