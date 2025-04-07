"use client"

import { useState } from "react"
import { Camera, LogIn, Sparkles } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function ShoppingFeatures() {
  const [imageSearchOpen, setImageSearchOpen] = useState(false)
  const [virtualTryOnOpen, setVirtualTryOnOpen] = useState(false)
  const [recommendationsOpen, setRecommendationsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file)
        // Here you would typically upload the image and process it
        toast.success("Image uploaded successfully! Processing...")
        // Simulated delay for demo
        setTimeout(() => {
          toast.info("Found 5 similar items in our store")
          setImageSearchOpen(false)
        }, 2000)
      } else {
        toast.error("Please upload an image file")
      }
    }
  }

  const handleVirtualTryOn = () => {
    // This would typically integrate with AR technology
    toast.info("Virtual Try-On feature coming soon!")
  }

  const handlePersonalizedRecommendations = () => {
    // This would typically fetch personalized recommendations
    toast.info("Analyzing your preferences...")
    setTimeout(() => {
      setRecommendationsOpen(false)
      toast.success("Check out your personalized recommendations!")
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {/* Image Scan Search */}
      <div className="bg-black/90 rounded-xl p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto">
          <Camera className="w-6 h-6 text-yellow-500" />
        </div>
        <h3 className="text-xl font-display font-bold text-white">Image Scan Search</h3>
        <p className="text-gray-400 text-sm">
          Upload an image to find exact or similar fashion items in our store
        </p>
        <Button 
          variant="outline" 
          className="bg-transparent border-white text-white hover:bg-white hover:text-black"
          onClick={() => setImageSearchOpen(true)}
        >
          Search by Image
        </Button>
      </div>

      {/* Virtual Try-On */}
      <div className="bg-black/90 rounded-xl p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto">
          <LogIn className="w-6 h-6 text-pink-500" />
        </div>
        <h3 className="text-xl font-display font-bold text-white">Virtual Try-On</h3>
        <p className="text-gray-400 text-sm">
          See how clothing items look on you with our AR technology
        </p>
        <Button 
          variant="outline" 
          className="bg-transparent border-white text-white hover:bg-white hover:text-black"
          onClick={() => setVirtualTryOnOpen(true)}
        >
          Try It On
        </Button>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-black/90 rounded-xl p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <Sparkles className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-xl font-display font-bold text-white">Personalized Recommendations</h3>
        <p className="text-gray-400 text-sm">
          AI-powered suggestions based on your browsing history and preferences
        </p>
        <Button 
          variant="outline" 
          className="bg-transparent border-white text-white hover:bg-white hover:text-black"
          onClick={() => setRecommendationsOpen(true)}
        >
          View Your Picks
        </Button>
      </div>

      {/* Image Search Dialog */}
      <Dialog open={imageSearchOpen} onOpenChange={setImageSearchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search by Image</DialogTitle>
            <DialogDescription>
              Upload an image to find similar items in our store
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
            {selectedImage && (
              <div className="text-sm text-muted-foreground">
                Selected: {selectedImage.name}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Virtual Try-On Dialog */}
      <Dialog open={virtualTryOnOpen} onOpenChange={setVirtualTryOnOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Virtual Try-On</DialogTitle>
            <DialogDescription>
              Experience clothes virtually before buying
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our AR technology lets you see how clothes look on you. Coming soon!
            </p>
            <Button onClick={handleVirtualTryOn} className="w-full">
              Launch AR Experience
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recommendations Dialog */}
      <Dialog open={recommendationsOpen} onOpenChange={setRecommendationsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Personalized Recommendations</DialogTitle>
            <DialogDescription>
              Discover items tailored to your style
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We analyze your browsing history and preferences to suggest items you'll love.
            </p>
            <Button onClick={handlePersonalizedRecommendations} className="w-full">
              Get Recommendations
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 