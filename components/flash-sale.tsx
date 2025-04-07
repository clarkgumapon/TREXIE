"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { getBestsellers } from "@/data/products"

export function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const flashSaleProducts = getBestsellers().slice(0, 3)

  return (
    <div>
      <div className="mb-10 flex items-center justify-center gap-4 rounded-xl bg-black p-6 text-white">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider">Flash Sale Ends In:</p>
          <div className="mt-3 flex items-center gap-3 text-2xl font-bold">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span>:</span>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

