"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/store/cart"

export default function ConfirmationPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear the cart after successful order
    clearCart()
  }, [clearCart])

  return (
    <div className="container max-w-6xl py-20">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-display font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground max-w-md">
          Thank you for your purchase. We'll send you an email with your order details and tracking information once your order ships.
        </p>
        <div className="flex gap-4 mt-8">
          <Button asChild variant="outline">
            <Link href="/orders">View Orders</Link>
          </Button>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

