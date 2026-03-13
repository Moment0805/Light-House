import { api } from '../lib/api';

export interface CartItemResponse {
  id: string;
  menuItemId: string;
  vendorId: string;
  quantity: number;
  menuItem: {
    name: string;
    price: number; // kobo
    imageUrl?: string;
  };
  vendor: { name: string };
}

export const cartService = {
  get: () =>
    api
      .get<{ data: CartItemResponse[] }>('/cart')
      .then((r) => r.data.data),

  add: (vendorId: string, menuItemId: string, quantity = 1) =>
    api
      .post<{ data: CartItemResponse[] }>('/cart', { vendorId, menuItemId, quantity })
      .then((r) => r.data.data),

  update: (menuItemId: string, quantity: number) =>
    api
      .patch<{ data: CartItemResponse[] }>(`/cart/${menuItemId}`, { quantity })
      .then((r) => r.data.data),

  remove: (menuItemId: string) =>
    api
      .delete<{ data: CartItemResponse[] }>(`/cart/${menuItemId}`)
      .then((r) => r.data.data),

  clear: () =>
    api.delete('/cart'),
};
