import { api } from '../lib/api';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  landmark?: string;
  deliveryInstructions?: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}

export interface CreateAddressDto {
  label: string;
  street: string;
  city: string;
  state: string;
  landmark?: string;
  deliveryInstructions?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export const addressesService = {
  getAll: () =>
    api
      .get<{ data: Address[] }>('/addresses')
      .then((r) => r.data.data),

  create: (dto: CreateAddressDto) =>
    api
      .post<{ data: Address }>('/addresses', dto)
      .then((r) => r.data.data),

  update: (id: string, dto: Partial<CreateAddressDto>) =>
    api
      .patch<{ data: Address }>(`/addresses/${id}`, dto)
      .then((r) => r.data.data),

  setDefault: (id: string) =>
    api
      .patch<{ data: Address }>(`/addresses/${id}/default`)
      .then((r) => r.data.data),

  remove: (id: string) =>
    api.delete(`/addresses/${id}`),
};
