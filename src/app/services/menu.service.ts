import { api } from '../lib/api';

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number; // in kobo — divide by 100 to display ₦
  imageUrl?: string;
  availability: 'AVAILABLE' | 'SOLD_OUT' | 'SCHEDULED';
  isActive: boolean;
  availableFrom?: string;
  availableTo?: string;
  prepTimeMinutes: number;
  category: string; // category name from join
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export const menuService = {
  getByVendor: (vendorId: string) =>
    api
      .get<{ data: MenuCategory[] }>(`/menu/vendor/${vendorId}/categories`)
      .then((r) => r.data.data),

  getItem: (itemId: string) =>
    api
      .get<{ data: MenuItem }>(`/menu/items/${itemId}`)
      .then((r) => r.data.data),
};
