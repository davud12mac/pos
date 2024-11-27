"use client"

import { useState, useEffect } from 'react'
import { Layout } from "@/components/layout"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Order } from "@/types/pos-types"
import { supabase, checkSupabaseConnection } from "@/lib/supabase"

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    if (!checkSupabaseConnection()) {
      console.error('Supabase connection not available')
      return
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'paid')
      .order('timestamp', { ascending: false })
    if (error) console.error('Error fetching orders:', error)
    else setOrders(data || [])
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Table Number</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.tableNumber}</TableCell>
                <TableCell>{order.customerName || 'N/A'}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}

