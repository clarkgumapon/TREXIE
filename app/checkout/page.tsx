"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, CreditCard, MapPin, ShoppingBag, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/store/cart"
import { useRouter } from "next/navigation"
import { GcashPayment } from "@/components/gcash-payment"
import { CodPayment } from "@/components/cod-payment"
import { formatPHP } from "@/lib/utils"
import type { PaymentDetails } from "@/lib/services/payment"
import { useAuth } from "@/lib/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, getTotal } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth() // This will automatically redirect to /login if not authenticated
  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [paymentMethod, setPaymentMethod] = useState<PaymentDetails["method"]>("cod")
  const [shippingInfo, setShippingInfo] = useState<PaymentDetails["shippingInfo"]>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or register to proceed with checkout.",
        variant: "destructive",
      })
    }
  }, [isAuthenticated, toast])

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep("review")
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl py-20">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h1 className="text-3xl font-display font-bold">Your shopping bag is empty</h1>
          <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/">
            <Button className="mt-4 rounded-full">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const shipping = 250 // ₱250 shipping fee
  const tax = subtotal * 0.12 // 12% tax
  const total = subtotal + shipping + tax

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shopping
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase securely</p>
          </div>

          <div className="mb-10 flex items-center justify-between border-b pb-8">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep === "shipping" || activeStep === "payment" || activeStep === "review" ? "bg-primary text-primary-foreground" : "border bg-muted"}`}
              >
                {activeStep === "shipping" || activeStep === "payment" || activeStep === "review" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>1</span>
                )}
              </div>
              <span className={activeStep === "shipping" ? "font-medium" : ""}>Shipping</span>
            </div>
            <div className="h-px w-12 bg-muted"></div>
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep === "payment" || activeStep === "review" ? "bg-primary text-primary-foreground" : "border bg-muted"}`}
              >
                {activeStep === "payment" || activeStep === "review" ? <Check className="h-5 w-5" /> : <span>2</span>}
              </div>
              <span className={activeStep === "payment" ? "font-medium" : ""}>Payment</span>
            </div>
            <div className="h-px w-12 bg-muted"></div>
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${activeStep === "review" ? "bg-primary text-primary-foreground" : "border bg-muted"}`}
              >
                {activeStep === "review" ? <Check className="h-5 w-5" /> : <span>3</span>}
              </div>
              <span className={activeStep === "review" ? "font-medium" : ""}>Review</span>
            </div>
          </div>

          {activeStep === "shipping" && (
            <form onSubmit={handleShippingSubmit}>
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      required
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Continue to Payment
                </Button>
              </div>
            </form>
          )}

          {activeStep === "payment" && (
            <div className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={(value: PaymentDetails["method"]) => setPaymentMethod(value)}>
                <div className="space-y-4">
                  <div>
                    <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                    <Label
                      htmlFor="cod"
                      className="flex cursor-pointer items-center rounded-lg border p-4 peer-data-[state=checked]:border-primary"
                    >
                      <CreditCard className="mr-3 h-5 w-5" />
                      <div>
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                      </div>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="gcash" id="gcash" className="peer sr-only" />
                    <Label
                      htmlFor="gcash"
                      className="flex cursor-pointer items-center rounded-lg border p-4 peer-data-[state=checked]:border-primary"
                    >
                      <Image src="/gcash.svg" alt="GCash" width={20} height={20} className="mr-3" />
                      <div>
                        <div className="font-medium">GCash</div>
                        <div className="text-sm text-muted-foreground">Pay with your GCash account</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === "cod" && <CodPayment shippingInfo={shippingInfo} />}
              {paymentMethod === "gcash" && <GcashPayment shippingInfo={shippingInfo} />}
            </div>
          )}

          {activeStep === "review" && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-medium">Shipping Information</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-1">
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.postalCode}
                      </p>
                      <p>{shippingInfo.phone}</p>
                      <p>{shippingInfo.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-medium">Payment Method</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      {paymentMethod === "cod" ? (
                        <>
                          <CreditCard className="h-5 w-5" />
                          <span>Cash on Delivery</span>
                        </>
                      ) : (
                        <>
                          <Image src="/gcash.svg" alt="GCash" width={20} height={20} />
                          <span>GCash</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <h2 className="font-medium">Order Summary</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-4">
                          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="absolute object-cover"
                            />
                          </div>
                          <div className="flex flex-1 items-center justify-between">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.color} / {item.size} / Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">{formatPHP(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>{formatPHP(subtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>{formatPHP(shipping)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span>{formatPHP(tax)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex items-center justify-between font-medium">
                          <span>Total</span>
                          <span>{formatPHP(total)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button onClick={() => setActiveStep("payment")} className="w-full rounded-full">
                Edit Payment
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="font-medium">Order Summary</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-4">
                      <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="absolute object-cover"
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.color} / {item.size} / Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">{formatPHP(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPHP(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{formatPHP(shipping)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPHP(tax)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>{formatPHP(total)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

