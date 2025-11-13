import Dexie, { type Table } from 'dexie';

export interface Order {
  id?: number;
  orderId: string;
  address: string;
  customerName: string;
  customerPhone: string;
  items: string;
  status: 'new' | 'accepted' | 'picked_up' | 'delivered';
  photoUrl?: string;
  createdAt: Date;
}

export class CourierDatabase extends Dexie {
  orders!: Table<Order>;

  constructor() {
    super('CourierDatabase');
    this.version(1).stores({
      orders: '++id, orderId, address, customerName, status, createdAt'
    });
  }
}

export const db = new CourierDatabase();