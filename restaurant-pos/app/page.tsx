"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { MenuGrid } from "@/components/menu-grid"
import { OrderSidebar } from "@/components/order-sidebar"
import { CategorySidebar } from "@/components/category-sidebar"
import { SearchHeader } from "@/components/search-header"
import { MenuItem, OrderItem } from "@/types/pos-types"

export default function HomePage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const addToCart = (item: MenuItem) => {
    setOrderItems(prev => {
      const existingItem = prev.find(i => i.id === item.id)
      if (existingItem) {
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

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <CategorySidebar />
        <div className="flex-1 flex flex-col">
          <SearchHeader />
          <div className="flex-1 flex">
            <div className="flex-1 p-4 overflow-auto">
              <MenuGrid onAddToCart={addToCart} />
            </div>
            <OrderSidebar orderItems={orderItems} onUpdateQuantity={updateQuantity} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

