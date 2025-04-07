"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Package, ShoppingBag, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useStore from "@/lib/store"

interface Order {
  id: number
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  total: number
  items: {
    name: string
    quantity: number
    price: number
  }[]
}

export default function OrdersPage() {
  const router = useRouter()
  const user = useStore((state) => state.user)
  const [orders, setOrders] = useState<Order[]>([
    // Dummy data for demonstration
    {
      id: 1,
      date: "2024-03-10",
      status: "processing",
      total: 8999.99,
      items: [
        { name: "Piña Silk Evening Gown", quantity: 1, price: 8999.99 }
      ]
    },
    {
      id: 2,
      date: "2024-03-08",
      status: "delivered",
      total: 4999.99,
      items: [
        { name: "Filipiniana Modern Dress", quantity: 1, price: 4999.99 }
      ]
    }
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/orders")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <ShoppingBag className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
      case "delivered":
        return <Truck className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>Placed on {new Date(order.date).toLocaleDateString()}</CardDescription>
                </div>
                <Badge className={getStatusColor(order.status)} variant="secondary">
                  <span className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₱{item.price.toLocaleString()}</p>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between font-bold">
                    <p>Total</p>
                    <p>₱{order.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 