"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { OrderItem } from "@/types/pos-types"
import { PaymentDialog } from "./payment-dialog"
import { supabase, checkSupabaseConnection } from "@/lib/supabase"

interface OrderSidebarProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

export function OrderSidebar({ orderItems, onUpdateQuantity }: OrderSidebarProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePayNow = async () => {
    if (!checkSupabaseConnection()) {
      console.error('Supabase connection not available')
      return
    }
    const newOrder = {
      tableNumber: "T-06",
      items: orderItems,
      status: "paid",
      customerName: customerName,
      total: total,
      timestamp: new Date()
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([newOrder])

    if (error) {
      console.error('Error saving order:', error)
    } else {
      setShowPayment(true);
      // Clear the order after successful payment
      onUpdateQuantity("", 0);
    }
  };

  return (
    <>
      <div className="w-[400px] border-l flex flex-col bg-white">
        <div className="p-4 flex gap-4">
          <Button variant="outline" className="flex-1">Buy</Button>
          <Button variant="outline" className="flex-1">Reservation</Button>
        </div>
        <div className="p-4 border-t">
          <h2 className="font-semibold text-lg mb-4">Customer Information</h2>
          <Input 
            placeholder="Customer name" 
            className="mb-2" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
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
          <Button variant="ghost" className="w-full mt-2 text-orange-500">
            Add note
          </Button>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-1 p-4 border-t overflow-y-auto max-h-[calc(100vh-400px)] custom-scrollbar">
            <h2 className="font-semibold text-lg mb-4">Orders details</h2>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <OrderItemComponent
                  key={item.id}
                  {...item}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t mt-auto">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Sub Total</span>
            <span>$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span>$ {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="text-orange-500 font-medium">$ {total.toFixed(2)}</span>
          </div>
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
        </div>
      </div>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        order={{
          tableNumber: "T-06",
          orderNumber: "46",
          amount: total,
          status: "running_order",
          diningTime: "35 minutes"
        }}
        items={orderItems}
      />
    </>
  )
}

function OrderItemComponent({ 
  id,
  name, 
  price, 
  quantity, 
  image,
  onUpdateQuantity
}: OrderItem & { onUpdateQuantity: (id: string, delta: number) => void }) {
  return (
    <div className="flex gap-4">
      <div className="w-16 h-16 relative rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-orange-500">$ {price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(id, -1)}>-</Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button variant="outline" size="icon" onClick={() => onUpdateQuantity(id, 1)}>+</Button>
      </div>
    </div>
  )
}

