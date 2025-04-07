"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Camera, ChevronLeft } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/data/products"
import { VisualSearchDialog } from "@/components/visual-search-dialog"
import { colorDictionary } from "@/lib/services/image-analysis"
import { Input } from "@/components/ui/input"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const searchType = searchParams.get("type") || ""
  const colorParams = searchParams.get("colors") || ""
  const [searchResults, setSearchResults] = useState(products)
  const [searchInput, setSearchInput] = useState(query)
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    // Initialize search input with query from URL
    setSearchInput(query)
  }, [query])
  
  useEffect(() => {
    // Filter products based on search parameters
    let results = [...products]
    
    if (query) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    if (category) {
      results = results.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    // Handle visual search with colors
    if (searchType === 'visual' && colorParams) {
      const searchColors = colorParams.split(',')
      
      // Filter products by colors or related colors
      results = results.filter(product => {
        if (!product.colors || product.colors.length === 0) return false
        
        // Check if any product colors match our search colors
        return searchColors.some(searchColor => {
          // Direct match
          if (product.colors.some(color => 
            color.toLowerCase() === searchColor.toLowerCase()
          )) {
            return true
          }
          
          // Check dictionary for color synonyms
          const synonyms = colorDictionary[searchColor] || []
          return product.colors.some(color => 
            synonyms.some(synonym => color.toLowerCase().includes(synonym))
          )
        })
      })
    }
    
    setSearchResults(results)
  }, [query, category, searchType, colorParams])
  
  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </div>
      
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight mb-2">
            {searchType === 'visual' 
              ? "Visual Search Results" 
              : query 
                ? `Search results for "${query}"` 
                : category 
                  ? `Category: ${category}` 
                  : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
            {searchType === 'visual' && colorParams && (
              <span> matching color{colorParams.split(',').length > 1 ? 's' : ''}: {colorParams.split(',').join(', ')}</span>
            )}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2">
          <div className="relative flex">
            <Input
              placeholder="Search products..."
              className="w-full pr-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={searchInputRef}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0" 
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <VisualSearchDialog />
        </div>
      </div>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-muted-foreground mb-6">
            {searchType === 'visual' 
              ? "We couldn't find any products that match your color criteria. Try a different image or browse our categories."
              : "We couldn't find any products that match your search. Try using different search terms or browse our categories."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/new-arrivals">
              <Button variant="outline">New Arrivals</Button>
            </Link>
            <Link href="/category/featured">
              <Button variant="outline">Featured Products</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}