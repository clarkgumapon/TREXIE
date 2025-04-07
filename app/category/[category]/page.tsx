"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/data/products"

export default function CategoryPage() {
  const params = useParams()
  const category = typeof params.category === "string" ? params.category : ""
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/category/${category}`)
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  const [sortOption, setSortOption] = useState("featured")
  const [priceFilter, setPriceFilter] = useState<string[]>([])
  const [colorFilter, setColorFilter] = useState<string[]>([])
  const [sizeFilter, setSizeFilter] = useState<string[]>([])
  const [materialFilter, setMaterialFilter] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)

  // Only process products after loading is complete
  const allColors = loading ? [] : Array.from(new Set(products.flatMap((product) => product.colors)))
  const allSizes = loading ? [] : Array.from(new Set(products.flatMap((product) => product.sizes)))
  const allMaterials = loading ? [] : Array.from(new Set(products.map((product) => product.material).filter(Boolean) as string[]))

  const filteredProducts = loading
    ? []
    : products
        .filter(
          (product) =>
            priceFilter.length === 0 ||
            (priceFilter.includes("under2000") && (product.isOnSale ? product.salePrice! : product.price) < 2000) ||
            (priceFilter.includes("2000to5000") && 
              (product.isOnSale ? product.salePrice! : product.price) >= 2000 && 
              (product.isOnSale ? product.salePrice! : product.price) <= 5000) ||
            (priceFilter.includes("over5000") && (product.isOnSale ? product.salePrice! : product.price) > 5000),
        )
        .filter((product) => colorFilter.length === 0 || product.colors.some((color) => colorFilter.includes(color)))
        .filter((product) => sizeFilter.length === 0 || product.sizes.some((size) => sizeFilter.includes(size)))
        .filter((product) => materialFilter.length === 0 || (product.material && materialFilter.includes(product.material)))
        .filter((product) => minRating === null || product.rating >= minRating)
        .sort((a, b) => {
          if (sortOption === "priceAsc") return (a.isOnSale ? a.salePrice! : a.price) - (b.isOnSale ? b.salePrice! : b.price)
          if (sortOption === "priceDesc") return (b.isOnSale ? b.salePrice! : b.price) - (a.isOnSale ? a.salePrice! : a.price)
          if (sortOption === "newest") return b.id - a.id
          if (sortOption === "rating") return b.rating - a.rating
          // Default: featured - sort by badge and rating
          return ((b.badge === "New Arrival" || b.badge === "Bestseller") ? 1 : 0) - 
                 ((a.badge === "New Arrival" || a.badge === "Bestseller") ? 1 : 0) ||
                 b.rating - a.rating
        })

  const handlePriceFilterChange = (value: string) => {
    setPriceFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleColorFilterChange = (value: string) => {
    setColorFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleSizeFilterChange = (value: string) => {
    setSizeFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleMaterialFilterChange = (value: string) => {
    setMaterialFilter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleRatingFilterChange = (value: number | null) => {
    setMinRating(value)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Price</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-under2000"
                      checked={priceFilter.includes("under2000")}
                      onCheckedChange={() => handlePriceFilterChange("under2000")}
                    />
                    <Label htmlFor="price-under2000">Under ₱2,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-2000to5000"
                      checked={priceFilter.includes("2000to5000")}
                      onCheckedChange={() => handlePriceFilterChange("2000to5000")}
                    />
                    <Label htmlFor="price-2000to5000">₱2,000 - ₱5,000</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-over5000"
                      checked={priceFilter.includes("over5000")}
                      onCheckedChange={() => handlePriceFilterChange("over5000")}
                    />
                    <Label htmlFor="price-over5000">Over ₱5,000</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Color</h3>
                <div className="space-y-2">
                  {allColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={colorFilter.includes(color)}
                        onCheckedChange={() => handleColorFilterChange(color)}
                      />
                      <Label htmlFor={`color-${color}`}>{color}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {allSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={sizeFilter.includes(size)}
                        onCheckedChange={() => handleSizeFilterChange(size)}
                      />
                      <Label htmlFor={`size-${size}`}>{size}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Material</h3>
                <div className="space-y-2">
                  {allMaterials.map((material) => (
                    <div key={material} className="flex items-center space-x-2">
                      <Checkbox
                        id={`material-${material}`}
                        checked={materialFilter.includes(material)}
                        onCheckedChange={() => handleMaterialFilterChange(material)}
                      />
                      <Label htmlFor={`material-${material}`}>{material}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() => handleRatingFilterChange(minRating === rating ? null : rating)}
                      />
                      <Label htmlFor={`rating-${rating}`}>{rating}+ Stars</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold">{formattedCategory}</h1>
              <p className="text-muted-foreground">{filteredProducts.length} products</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    Sort by
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortOption("featured")}>Featured</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("priceAsc")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("priceDesc")}>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("rating")}>Top Rated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  setPriceFilter([])
                  setColorFilter([])
                  setSizeFilter([])
                  setMaterialFilter([])
                  setMinRating(null)
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

