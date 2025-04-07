"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { getProductById, getProductsByCategory } from "@/data/products"
import { useCart } from "@/lib/store/cart"
import { ProductCard } from "@/components/product-card"
import { formatPHP } from "@/lib/utils"
import useStore from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const user = useStore((state) => state.user)
  const productId = typeof params.id === "string" ? Number.parseInt(params.id) : 0
  const product = getProductById(productId)
  const { addItem } = useCart()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button className="rounded-full">Back to Home</Button>
        </Link>
      </div>
    )
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!isHydrated) {
      toast({
        title: "Error",
        description: "Please wait a moment and try again",
        variant: "destructive",
      })
      return
    }

    if (!selectedSize || !selectedColor) {
      toast({
        title: "Error",
        description: "Please select size and color",
        variant: "destructive",
      })
      return
    }

    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      })
      toast({
        title: "Success",
        description: "Added to cart",
      })
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive",
      })
    }
  }

  const handleBuyNow = () => {
    if (!isHydrated) {
      toast({
        title: "Please wait",
        description: "Please wait a moment and try again",
        variant: "destructive",
      })
      return
    }

    if (!selectedSize || !selectedColor) {
      toast({
        title: "Selection Required",
        description: "Please select size and color",
        variant: "destructive",
      })
      return
    }

    try {
      // Add item to cart first
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      })

      // Then check authentication and redirect
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in or register to proceed with purchase",
          variant: "destructive",
        })
        router.push(`/login?redirect=/checkout`)
        return
      }

      // If user is already logged in, proceed to checkout
      router.push("/checkout")
    } catch (error) {
      console.error("Failed to process buy now:", error)
      toast({
        title: "Error",
        description: "Failed to process buy now",
        variant: "destructive",
      })
    }
  }

  // Use actual gallery images instead of placeholders
  const productImages = [
    product.image,
    ...product.galleryImages
  ]

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-6">
          <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
            <Image
              src={productImages[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.badge && (
              <Badge className="absolute left-4 top-4 bg-black/80 text-white backdrop-blur-sm fashion-badge px-3 py-1 text-xs uppercase tracking-wider">
                {product.badge}
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.length > 0 ? (
              productImages.map((image, i) => (
                <div
                  key={i}
                  className={`aspect-square relative overflow-hidden rounded-lg bg-muted cursor-pointer border-2 hover:border-primary ${activeImage === i ? "border-primary" : "border-transparent"}`}
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              // If no images available, show single thumbnail
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Link
                href={`/category/${product.category.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary uppercase tracking-wider"
              >
                {product.category}
              </Link>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <h1 className="font-display text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? "fill-fashion-gold text-fashion-gold" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.0 (24 reviews)</span>
            </div>
            <div className="text-2xl font-bold font-display currency mt-2">{formatPHP(product.price)}</div>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="color" className="text-base font-medium">
                  Color
                </Label>
              </div>
              <RadioGroup
                id="color"
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div key={color}>
                    <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 px-4 py-2 peer-data-[state=checked]:border-white peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="size" className="text-base font-medium">
                  Size
                </Label>
              </div>
              <RadioGroup
                id="size"
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="flex flex-wrap gap-3"
              >
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 px-4 py-2 min-w-[80px] h-10 peer-data-[state=checked]:border-white peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Quantity</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex h-10 w-14 items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 rounded-full" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1 rounded-full" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          <div className="rounded-lg border p-4 bg-fashion-beige/10">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-fashion-gold/10 p-2">
                <Truck className="h-5 w-5 text-fashion-gold" />
              </div>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">For orders over ₱5,000</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-full bg-muted/50 p-1">
              <TabsTrigger value="description" className="rounded-full">
                Description
              </TabsTrigger>
              <TabsTrigger value="details" className="rounded-full">
                Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Material</span>
                  <span className="text-muted-foreground">Premium Quality</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Care Instructions</span>
                  <span className="text-muted-foreground">Machine wash cold</span>
                </div>
                <div className="grid grid-cols-2 gap-2 border-b pb-2">
                  <span className="font-medium">Country of Origin</span>
                  <span className="text-muted-foreground">Imported</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium">Style</span>
                  <span className="text-muted-foreground">Contemporary</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Customer Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-fashion-gold text-fashion-gold" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">Based on 24 reviews</span>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2 border-b pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Sarah J.</h4>
                        <span className="text-xs text-muted-foreground">2 weeks ago</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3 w-3 ${j < 4 ? "fill-fashion-gold text-fashion-gold" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Love this product! The quality is excellent and it fits perfectly. Would definitely recommend.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-24">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-12">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">You May Also Like</h2>
            <p className="text-muted-foreground mt-2">Products similar to this one</p>
          </div>
          <Link href={`/category/${product.category.toLowerCase()}`} className="flex items-center text-sm font-medium">
            View All {product.category} <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

