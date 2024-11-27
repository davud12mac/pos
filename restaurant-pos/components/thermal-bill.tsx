import { OrderPayment } from "@/types/payment-types"
import { OrderItem } from "@/types/pos-types"

interface ThermalBillProps {
  order: OrderPayment
  items: OrderItem[]
}

export function ThermalBill({ order, items }: ThermalBillProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="bg-white p-4 w-80 font-mono text-sm leading-tight">
      <div className="text-center mb-4">
        <h2 className="font-bold text-lg">Coca Coffeetalk</h2>
        <p>123 Restaurant St, Foodville</p>
        <p>Tel: (123) 456-7890</p>
      </div>
      <div className="mb-4">
        <p>Order #: {order.orderNumber}</p>
        <p>Table #: {order.tableNumber}</p>
        <p>Date: {new Date().toLocaleString()}</p>
      </div>
      <div className="border-t border-b border-dashed border-gray-300 py-2 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.quantity}x {item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="text-center">
        <p>Thank you for dining with us!</p>
        <p>Please come again</p>
      </div>
    </div>
  )
}

