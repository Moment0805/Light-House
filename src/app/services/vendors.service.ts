import { api } from '../lib/api';

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  category: string;
  isActive: boolean;
  isOpen: boolean;
  rating: number;
  deliveryFee: number;
  minOrder: number;
  deliveryRadius?: number;
  openHours?: string; // formatted string from hours array
  badge?: string;
  badgeColor?: string;
  totalReviews?: number;
}

export interface VendorFilters {
  search?: string;
  category?: string;
  isOpen?: boolean;
}

export const vendorsService = {
  getAll: (filters?: VendorFilters) =>
    api
      .get<{ data: Vendor[] }>('/vendors', { params: filters })
      .then((r) => r.data.data),

  getOne: (id: string) =>
    api
      .get<{ data: Vendor }>(`/vendors/${id}`)
      .then((r) => r.data.data),

  checkServiceability: (vendorId: string, addressId: string) =>
    api
      .get<{ data: { serviceable: boolean; distance?: number } }>(
        `/vendors/${vendorId}/serviceability`,
        { params: { addressId } },
      )
      .then((r) => r.data.data),
};
