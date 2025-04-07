"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/store/cart"
import { processPayment } from "@/lib/services/payment"
import type { PaymentDetails } from "@/lib/services/payment"

interface CodPaymentProps {
  shippingInfo: PaymentDetails["shippingInfo"]
}

export function CodPayment({ shippingInfo }: CodPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryNotes, setDeliveryNotes] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotal } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const subtotal = getTotal()
      const shipping = 250
      const tax = subtotal * 0.12
      const total = subtotal + shipping + tax

      const result = await processPayment({
        items,
        subtotal,
        shipping,
        tax,
        total,
        paymentDetails: {
          method: "cod",
          deliveryNotes,
          shippingInfo,
        },
      })

      if (result.success) {
        router.push("/checkout/confirmation")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Order failed",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="notes">Delivery Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any special instructions for delivery?"
          value={deliveryNotes}
          onChange={(e) => setDeliveryNotes(e.target.value)}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Place Order"}
      </Button>
    </form>
  )
}

