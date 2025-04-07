"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  updateQuantity: (item: CartItem, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setCart([])
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, mounted])

  const addToCart = useCallback((item: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists with same id, size, and color
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color,
      )

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      } else {
        // Add new item
        return [...prevCart, item]
      }
    })
  }, [])

  const removeFromCart = useCallback((item: CartItem) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => !(cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color),
      ),
    )
  }, [])

  const updateQuantity = useCallback((item: CartItem, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
          ? { ...cartItem, quantity }
          : cartItem,
      ),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

