"use client"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/store/cart"
import { formatPHP } from "@/lib/utils"
import useStore from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export function CartDrawer() {
  const { items, removeItem, updateQuantity, getTotal } = useCart()
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const user = useStore((state) => state.user)
  const router = useRouter()
  const { toast } = useToast()

  const handleCheckoutClick = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in or register to proceed with checkout.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }
    router.push("/checkout")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="font-display text-2xl">Shopping Bag ({totalItems})</SheetTitle>
          <SheetDescription>Review your items before proceeding to checkout</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <div className="text-xl font-medium font-display">Your shopping bag is empty</div>
            <SheetTrigger asChild>
              <Button variant="outline" className="mt-4 rounded-full">
                Continue Shopping
              </Button>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-auto py-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative aspect-square h-20 w-20 min-w-fit overflow-hidden rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="absolute object-cover"
                        />
                      </div>
                      <div className="flex flex-col self-start">
                        <span className="line-clamp-1 text-sm font-medium">{item.name}</span>
                        <span className="line-clamp-1 text-xs text-muted-foreground">
                          {item.color} / {item.size}
                        </span>
                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Remove one</span>
                          </Button>
                          <span className="text-xs">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Add one</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-medium currency">{formatPHP(item.price)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="currency">{formatPHP(getTotal())}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span className="currency">{formatPHP(getTotal())}</span>
                </div>
              </div>
              <SheetFooter className="flex flex-col gap-2 sm:flex-col">
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    Continue Shopping
                  </Button>
                </SheetTrigger>
                <Button className="w-full rounded-full" onClick={handleCheckoutClick}>
                  Proceed to Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

