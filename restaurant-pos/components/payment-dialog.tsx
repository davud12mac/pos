import { X, Printer } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OrderPayment } from "@/types/payment-types"
import { OrderItem } from "@/types/pos-types"
import { cn } from "@/lib/utils"
import { ThermalBillPDF } from "./thermal-bill-pdf"
import { useState } from 'react'

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderPayment;
  items: OrderItem[];
}

export function PaymentDialog({ open, onOpenChange, order, items }: PaymentDialogProps) {
  const [showThermalBill, setShowThermalBill] = useState(false);

  const handlePrint = () => {
    setShowThermalBill(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              Running order
              <span className="text-muted-foreground">10</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        {!showThermalBill ? (
          <div className="mt-4">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left">TABLE NUMBER</th>
                    <th className="p-3 text-left">ORDER NUMBER</th>
                    <th className="p-3 text-left">AMOUNT</th>
                    <th className="p-3 text-left">STATUS</th>
                    <th className="p-3 text-left">DINING FOR</th>
                    <th className="p-3 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                        {order.tableNumber}
                      </span>
                    </td>
                    <td className="p-3">
                      #{order.orderNumber}
                      <div className="text-sm text-muted-foreground">
                        {items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                      </div>
                    </td>
                    <td className="p-3">$ {order.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                          {
                            "bg-blue-100 text-blue-500":
                              order.status === "running_order",
                            "bg-orange-100 text-orange-500":
                              order.status === "done_soon",
                            "bg-green-100 text-green-500": order.status === "done",
                          }
                        )}
                      >
                        {order.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3">{order.diningTime}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          className="h-8 border-orange-500 text-orange-500 hover:bg-orange-50"
                          onClick={handlePrint}
                        >
                          <Printer className="mr-2 h-4 w-4" />
                          Print bill
                        </Button>
                        {order.status === "done_soon" && (
                          <>
                            <Button
                              variant="outline"
                              className="h-8 border-orange-500 text-orange-500 hover:bg-orange-50"
                              onClick={handlePrint}
                            >
                              <Printer className="mr-2 h-4 w-4" />
                              Re-print
                            </Button>
                            <Button className="h-8 bg-orange-500 hover:bg-orange-600">
                              Pay now
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <ThermalBillPDF order={order} items={items} />
            <Button
              className="mt-4"
              onClick={() => setShowThermalBill(false)}
            >
              Back to Order Details
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

