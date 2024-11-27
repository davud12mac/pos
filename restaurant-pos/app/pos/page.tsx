"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { OrderItem } from "@/types/pos-types"

const menuItems = [
  {
    id: "1",
    name: "Steak sapi bakar",
    price: 25.12,
    image: "/placeholder.svg",
    category: "main",
  },
  {
    id: "2",
    name: "Ayam kentang",
    price: 15.40,
    image: "/placeholder.svg",
    category: "main",
  },
  {
    id: "3",
    name: "Ikan santan",
    price: 10.40,
    image: "/placeholder.svg",
    category: "main",
  },
]

export default function POSPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const addToOrder = (item: typeof menuItems[0]) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <Layout>
      <div className="flex-1 flex">
        <div className="flex-1 p-4">
          <div className="mb-4 flex gap-4">
            <Input placeholder="Search menu..." className="max-w-sm" />
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map(item => (
              <Card
                key={item.id}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => addToOrder(item)}
              >
                <div className="aspect-video relative mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="font-medium">{item.name}</div>
                <div className="text-orange-500">${item.price.toFixed(2)}</div>
              </Card>
            ))}
          </div>
        </div>
        <div className="w-[400px] border-l flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg mb-4">Order Details</h2>
            <Input placeholder="Customer name" className="mb-2" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t1">Table 1</SelectItem>
                <SelectItem value="t2">Table 2</SelectItem>
                <SelectItem value="t3">Table 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {orderItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax (10%)</span>
              <span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
            <Button className="w-full">Pay Now</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

