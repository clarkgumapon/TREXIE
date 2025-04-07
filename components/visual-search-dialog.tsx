"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Camera, Upload, X } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { cn } from "@/lib/utils"
import { 
  extractDominantColors, 
  colorMap, 
  findVisualSimilarProducts 
} from "@/lib/services/image-analysis"

interface VisualSearchDialogProps {
  display?: "icon" | "large"
  onComplete?: () => void
}

export function VisualSearchDialog({ display = "icon", onComplete }: VisualSearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [dominantColors, setDominantColors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isUsingCamera, setIsUsingCamera] = useState(false)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string
      setSelectedImage(dataUrl)
      
      // Extract colors when image is loaded
      try {
        const colors = await extractDominantColors(dataUrl)
        setDominantColors(colors)
      } catch (error) {
        console.error('Error extracting colors:', error)
        setDominantColors(['Multi'])
      }
    }
    reader.readAsDataURL(file)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsUsingCamera(true)
      }
    } catch (error) {
      toast.error('Unable to access camera')
      console.error('Error accessing camera:', error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setIsUsingCamera(false)
    }
  }

  const captureImage = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageDataUrl = canvas.toDataURL('image/jpeg')
        setSelectedImage(imageDataUrl)
        stopCamera()
        
        // Extract colors from captured image
        try {
          const colors = await extractDominantColors(imageDataUrl)
          setDominantColors(colors)
        } catch (error) {
          console.error('Error extracting colors:', error)
          setDominantColors(['Multi'])
        }
      }
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    
    if (!file.type.startsWith('image/')) {
      toast.error('Please drop an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string
      setSelectedImage(dataUrl)
      
      // Extract colors when image is loaded
      try {
        const colors = await extractDominantColors(dataUrl)
        setDominantColors(colors)
      } catch (error) {
        console.error('Error extracting colors:', error)
        setDominantColors(['Multi'])
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleSearch = async () => {
    if (!selectedImage) return

    setIsSearching(true)
    try {
      // Use our service to find similar products
      const similarProducts = await findVisualSimilarProducts(selectedImage, products)
      // Type cast to match the expected type from data/products
      setSearchResults(similarProducts as typeof products)
      
      // Log the found colors (for debugging)
      console.log("Detected colors:", dominantColors)
    } catch (error) {
      toast.error('Failed to perform visual search')
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const resetSearch = () => {
    setSelectedImage(null)
    setSearchResults([])
    setDominantColors([])
    stopCamera()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetSearch()
    }
    setOpen(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        {display === "icon" ? (
          <div className="relative inline-block group">
            <div className="absolute pointer-events-none bottom-full mb-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-black text-white text-xs font-medium px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                Search by image
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
            <Button 
              variant="default" 
              size="icon" 
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 transition-colors relative after:absolute after:content-[''] after:w-full after:h-full after:rounded-full after:border-4 after:border-primary/30 after:animate-ping after:opacity-75"
            >
              <Camera className="h-5 w-5 text-white" />
              <span className="sr-only">Visual Search</span>
            </Button>
          </div>
        ) : (
          <Button variant="outline" className="h-9 gap-1">
            <Camera className="h-4 w-4" />
            <span>Search with image</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Visual Search</DialogTitle>
          <DialogDescription>
            Upload an image or use your camera to find similar products
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedImage && !isUsingCamera ? (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop an image here, or click to select
                </p>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                  <Button
                    variant="outline"
                    onClick={startCamera}
                  >
                    Use Camera
                  </Button>
                </div>
              </div>
            </div>
          ) : isUsingCamera ? (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={captureImage}
                  >
                    Take Photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={stopCamera}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    fill
                    className="object-contain"
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                  onClick={() => {
                    setOpen(false)
                    resetSearch()
                    onComplete?.()
                  }}
                >
                  <X className="h-4 w-4 text-white" />
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
                {isSearching ? "Searching..." : "Search Similar Products"}
              </Button>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Similar Products</h3>
              <div className="grid grid-cols-2 gap-4">
                {searchResults.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                    onClick={() => {
                      setOpen(false)
                      resetSearch()
                      onComplete?.()
                    }}
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
              
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
              >
                <Link 
                  href={`/search?type=visual&colors=${encodeURIComponent(dominantColors.join(','))}`}
                  onClick={() => {
                    setOpen(false)
                    resetSearch()
                    onComplete?.()
                  }}
                >
                  View All Similar Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}