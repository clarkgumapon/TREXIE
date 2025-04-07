"use client"

import { Camera, LogIn, Sparkles } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { products } from "@/data/products"
import Image from "next/image"
import Link from "next/link"
import { findVisualSimilarProducts, extractDominantColors, colorMap } from "@/lib/services/image-analysis"

export function SmartShoppingFeatures() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dominantColors, setDominantColors] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof products>([])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file")
        return
      }
      
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      
      // Extract colors from the image
      try {
        const colors = await extractDominantColors(url)
        setDominantColors(colors)
      } catch (error) {
        console.error('Error extracting colors:', error)
      }
    }
  }

  const handleSearch = async () => {
    if (!previewUrl) return
    
    setIsSearching(true)
    try {
      const results = await findVisualSimilarProducts(previewUrl, products)
      setSearchResults(results as typeof products)
      toast.success(`Found ${results.length} similar items`)
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Failed to search for similar products')
    } finally {
      setIsSearching(false)
    }
  }

  const resetSearch = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setDominantColors([])
    setSearchResults([])
  }

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-4">Smart Shopping Features</h2>
          <p className="text-gray-400">Experience shopping in a whole new way with our smart features</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Image Scan Search */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-gray-800 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Image Scan Search</h3>
                <p className="text-gray-400 mb-6">Upload an image to find exact or similar fashion items in our store</p>
                <Button variant="outline" className="rounded-full border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10">
                  Search by Image
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Image Search</DialogTitle>
                <DialogDescription>
                  Upload an image to find similar products in our store
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="absolute top-2 right-2"
                        onClick={resetSearch}
                      >
                        Remove
                      </Button>
                      
                      {dominantColors.length > 0 && (
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          {dominantColors.map((color, index) => (
                            <div 
                              key={index}
                              className="w-6 h-6 rounded-full border border-white"
                              style={{ 
                                backgroundColor: colorMap[color] ? 
                                  `rgb(${colorMap[color][0]}, ${colorMap[color][1]}, ${colorMap[color][2]})` : 
                                  'gray'
                              }}
                              title={color}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? "Searching..." : "Find Similar Products"}
                    </Button>
                    
                    {searchResults.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-medium">Similar Products</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {searchResults.slice(0, 4).map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/40 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                                <p className="text-sm opacity-75">{product.price}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Button asChild variant="link" className="w-full text-sm">
                          <Link href={`/search?type=visual&colors=${encodeURIComponent(dominantColors.join(','))}`}>
                            View All Results
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or WEBP</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Virtual Try-On */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-gray-800 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-6">
                  <LogIn className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Virtual Try-On</h3>
                <p className="text-gray-400 mb-6">See how clothing items look on you with our AR technology</p>
                <Button variant="outline" className="rounded-full border-pink-500/20 text-pink-500 hover:bg-pink-500/10">
                  Try It On
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Virtual Try-On</DialogTitle>
                <DialogDescription>
                  This feature is coming soon! Stay tuned for updates.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Personalized Recommendations */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-gray-800 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">Personalized Recommendations</h3>
                <p className="text-gray-400 mb-6">AI-powered suggestions based on your browsing history and preferences</p>
                <Button variant="outline" className="rounded-full border-green-500/20 text-green-500 hover:bg-green-500/10">
                  View Your Picks
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your Personalized Recommendations</DialogTitle>
                <DialogDescription>
                  Sign in to view your personalized product recommendations.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
} 