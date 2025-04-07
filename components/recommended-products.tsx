"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/data/products"

export function RecommendedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const recommendedProducts = getFeaturedProducts()

  const totalSlides = Math.ceil(recommendedProducts.length / 4)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {recommendedProducts.slice(slideIndex * 4, slideIndex * 4 + 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}
    </div>
  )
}

