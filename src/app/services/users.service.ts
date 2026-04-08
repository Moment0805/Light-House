import { api } from '../lib/api';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
}

export interface UpdateUserProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
}

export const usersService = {
  getProfile: () =>
    api
      .get<{ data: UserProfile }>('/users/me')
      .then((r) => r.data.data),

  updateProfile: (dto: UpdateUserProfileDto) =>
    api
      .patch<{ data: UserProfile }>('/users/me', dto)
      .then((r) => r.data.data),
};

