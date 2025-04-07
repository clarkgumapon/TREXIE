"use client"

import Link from "next/link"
import { Search, User, ArrowRight, Menu, Camera } from "lucide-react"
import { useState, useRef, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartDrawer } from "@/components/cart-drawer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import useStore from "@/lib/store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { VisualSearchDialog } from "@/components/visual-search-dialog"

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [showResults, setShowResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchQuery, setMobileSearchQuery] = useState("")
  const router = useRouter()
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const [visualSearchOpen, setVisualSearchOpen] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (query.trim() === "") {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const results = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.material?.toLowerCase().includes(query.toLowerCase())
    )

    setSearchResults(results)
    setShowResults(true)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
      setMobileSearchOpen(false)
    }
  }

  const navigateToSearchPage = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
      setMobileSearchOpen(false)
    }
  }

  const handleMobileSearch = (query: string) => {
    setMobileSearchQuery(query)
    if (query.trim()) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filteredProducts)
    } else {
      setSearchResults([])
    }
  }

  const handleMobileKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setMobileSearchOpen(false)
    }
  }

  const navigateToMobileSearchPage = () => {
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setMobileSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2 hover-lift">
            <span className="font-display text-2xl font-bold tracking-tight">Fab & Fierce</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/category/dresses" className="text-sm font-medium hover-underline">
              Dresses
            </Link>
            <Link href="/category/shoes" className="text-sm font-medium hover-underline">
              Shoes
            </Link>
            <Link href="/category/bags" className="text-sm font-medium hover-underline">
              Bags
            </Link>
            <Link href="/category/accessories" className="text-sm font-medium hover-underline">
              Accessories
            </Link>
            <Link href="/new-arrivals" className="text-sm font-medium hover-underline">
              New Arrivals
            </Link>
          </nav>
        </div>
        
        {/* Desktop Search */}
        <div className="hidden md:flex relative w-full max-w-sm items-center gap-2">
          <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
              className="w-full rounded-full bg-background pl-8 pr-4 hover-glow focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={searchInputRef}
            onBlur={() => {
              // Small delay to allow clicking on results
              setTimeout(() => setShowResults(false), 200)
            }}
            onFocus={() => {
              if (searchQuery) setShowResults(true)
            }}
          />
          </div>
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-[80vh] overflow-y-auto rounded-lg border bg-background shadow-lg hover-glow">
              <div className="p-4">
                <h3 className="mb-2 text-sm font-medium">Search Results ({searchResults.length})</h3>
                <div className="space-y-4">
                  {searchResults.slice(0, 4).map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.id}`}
                      className="flex items-center gap-4 rounded-lg p-2 hover:bg-accent"
                      onClick={() => {
                        setShowResults(false)
                        setSearchQuery("")
                      }}
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {searchResults.length > 4 && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="link" 
                      className="text-sm" 
                      onClick={navigateToSearchPage}
                    >
                      View all {searchResults.length} results
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {showResults && searchQuery && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg border bg-background p-4 shadow-lg">
              <p className="text-center text-sm text-muted-foreground mb-2">No products found</p>
              <div className="text-center">
                <Button 
                  variant="link" 
                  className="text-sm" 
                  onClick={navigateToSearchPage}
                >
                  Search all products
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Dialog open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative h-9 w-9 md:hidden"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search Products</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={mobileSearchQuery}
                      onChange={(e) => handleMobileSearch(e.target.value)}
                      onKeyDown={handleMobileKeyDown}
                      ref={mobileSearchInputRef}
                      autoFocus
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button className="flex-1" onClick={navigateToMobileSearchPage}>
                    Search
                  </Button>
                </div>
                
                {searchResults.length > 0 && mobileSearchQuery && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Quick Results</h3>
                    <div className="space-y-2">
                      {searchResults.slice(0, 3).map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.id}`}
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent"
                          onClick={() => {
                            setMobileSearchQuery("")
                            setMobileSearchOpen(false)
                          }}
                        >
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                          </div>
                        </Link>
                      ))}
                      
                      {searchResults.length > 3 && (
                        <Button 
                          variant="link" 
                          className="text-sm w-full" 
                          onClick={navigateToMobileSearchPage}
                        >
                          View all {searchResults.length} results
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">My Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  setUser(null)
                  router.push("/")
                }}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            </Button>
          )}
          <CartDrawer />
        </div>
      </div>
    </header>
  )
} 