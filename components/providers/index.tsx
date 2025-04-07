"use client"

import { useEffect, useState } from "react"
import { useCart } from "@/lib/store/cart"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const initializeCart = useCart((state) => state)

  useEffect(() => {
    // Initialize the cart from localStorage
    const savedCart = localStorage.getItem("cart-storage")
    if (savedCart) {
      try {
        const { state } = JSON.parse(savedCart)
        if (state?.items) {
          initializeCart.setState(state)
        }
      } catch (error) {
        console.error("Failed to hydrate cart:", error)
      }
    }
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return null
  }

  return <>{children}</>
} 