export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface TableStatus {
  id: string;
  number: string;
  status: 'available' | 'reserved' | 'occupied' | 'billing';
  currentOrder?: Order;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'done' | 'paid';
  customerName?: string;
  total: number;
  timestamp: Date;
}

export interface SalesData {
  totalOrders: number;
  totalSales: number;
  netSales: number;
  cancelledOrders: number;
}

