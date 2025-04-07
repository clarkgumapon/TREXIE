"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, SearchIcon, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { ImageSearch } from "@/components/image-search"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { FlashSale } from "@/components/flash-sale"
import { getFeaturedProducts, getNewArrivals, getProductsByCategory } from "@/data/products"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { SiteFooter } from "@/components/site-footer"
import { ShoppingFeatures } from "@/components/shopping-features"
import { SmartShoppingFeatures } from "@/components/smart-shopping-features"
import { VisualSearchDialog } from "@/components/visual-search-dialog"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3)
  const newArrivals = getNewArrivals().slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        
        {/* Featured Products */}
        <section className="py-20 container">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-display text-4xl font-bold tracking-tight mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Check out our most popular items</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={`featured-${product.id}`} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/category/featured">
              <Button variant="outline" className="rounded-full">
                View All Featured Products <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Smart Shopping Features */}
        <section id="smart-features">
          <SmartShoppingFeatures />
        </section>

        {/* New Arrivals */}
        <section className="py-20 container">
            <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-display text-4xl font-bold tracking-tight mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">Discover our latest additions</p>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={`new-${product.id}`} product={product} />
            ))}
                    </div>
          <div className="text-center mt-8">
            <Link href="/new-arrivals">
              <Button variant="outline" className="rounded-full">
                View All New Arrivals <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Flash Sales */}
        <section className="py-20 container">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-4">
              <h2 className="font-display text-4xl font-bold tracking-tight mb-2">Flash Sales & Exclusive Deals</h2>
              <p className="text-muted-foreground">Limited-time offers you don't want to miss</p>
            </div>
            <Link href="#" className="flex items-center text-sm font-medium">
              View All Deals <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FlashSale />
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

