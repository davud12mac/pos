export interface OrderPayment {
  tableNumber: string;
  orderNumber: string;
  amount: number;
  status: 'running_order' | 'done_soon' | 'done';
  diningTime: string;
}

