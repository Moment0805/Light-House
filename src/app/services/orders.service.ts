import { api } from '../lib/api';

export interface CreateOrderDto {
  vendorId: string;
  addressId: string;
  items: Array<{ menuItemId: string; quantity: number }>;
  promoCode?: string;
  notes?: string;
  idempotencyKey: string; // UUID v4 — generated client-side per checkout session
}

export interface Order {
  id: string;
  vendorId: string;
  addressId: string;
  status: string;
  subtotal: number;     // kobo
  deliveryFee: number;  // kobo
  serviceCharge: number;
  discount: number;
  total: number;        // kobo
  notes?: string;
  promoCode?: string;
  createdAt: string;
  vendor: { name: string; logoUrl?: string };
  address: { street: string; city: string };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
}

export const ordersService = {
  create: (dto: CreateOrderDto) =>
    api
      .post<{ data: Order }>('/orders', dto)
      .then((r) => r.data.data),

  getAll: (page = 1, limit = 10) =>
    api
      .get<{ data: { orders: Order[]; total: number } }>('/orders', {
        params: { page, limit },
      })
      .then((r) => r.data.data),

  getOne: (orderId: string) =>
    api
      .get<{ data: Order }>(`/orders/${orderId}`)
      .then((r) => r.data.data),

  cancel: (orderId: string) =>
    api
      .patch<{ data: Order }>(`/orders/${orderId}/cancel`)
      .then((r) => r.data.data),

  getHistory: (orderId: string) =>
    api
      .get<{ data: Array<{ status: string; createdAt: string; notes?: string }> }>(
        `/orders/${orderId}/history`,
      )
      .then((r) => r.data.data),
};
