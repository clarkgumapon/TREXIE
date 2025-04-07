"use client"

import { useState } from "react"
import Image from "next/image"
import { Copy, Info } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/store/cart"
import { processPayment } from "@/lib/services/payment"
import type { PaymentDetails } from "@/lib/services/payment"

interface GcashPaymentProps {
  shippingInfo: PaymentDetails["shippingInfo"]
}

export function GcashPayment({ shippingInfo }: GcashPaymentProps) {
  const { toast } = useToast()
  const router = useRouter()
  const { items, getTotal } = useCart()
  const [referenceNumber, setReferenceNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const gcashNumber = "09123456789"

  const handleCopyGcashNumber = () => {
    navigator.clipboard.writeText(gcashNumber)
    toast({
      title: "GCash number copied",
      description: "The GCash number has been copied to your clipboard.",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!referenceNumber) {
      toast({
        title: "Reference number required",
        description: "Please enter the GCash reference number to proceed.",
        variant: "destructive",
      })
      return
    }

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
          method: "gcash",
          phoneNumber: referenceNumber,
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
        title: "Payment failed",
        description: error instanceof Error ? error.message : "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border p-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="h-16 w-16 overflow-hidden rounded-lg bg-blue-500">
            <Image
              src="/placeholder.svg?height=64&width=64&text=GCash"
              alt="GCash Logo"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">Pay with GCash</h3>
            <p className="text-sm text-muted-foreground">
              Send payment to the GCash number below and enter the reference number
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div>
              <p className="text-sm font-medium">GCash Number</p>
              <p className="font-mono text-lg">{gcashNumber}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyGcashNumber} type="button">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy GCash number</span>
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="reference">Reference Number</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      Enter the reference number from your GCash transaction to verify your payment
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="reference"
              placeholder="e.g. 1234567890"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              required
            />
          </div>

          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/50">
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Please complete the payment in your GCash app before proceeding. Your order will be processed once payment
              is verified.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </div>
    </form>
  )
}

