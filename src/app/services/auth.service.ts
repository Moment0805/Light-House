import { api } from '../lib/api';

export interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    role: string;
    emailVerified: boolean;
    avatarUrl?: string;
  };
}

export const authService = {
  signup: (dto: SignupDto) =>
    api.post<{ data: AuthResponse }>('/auth/signup', dto).then((r) => r.data.data),

  login: (dto: LoginDto) =>
    api.post<{ data: AuthResponse }>('/auth/login', dto).then((r) => r.data.data),

  logout: () =>
    api.post('/auth/logout'),

  refresh: () =>
    api.post<{ data: { accessToken: string } }>('/auth/refresh').then((r) => r.data.data),

  getMe: () =>
    api.get<{ data: AuthResponse['user'] }>('/users/me').then((r) => r.data.data),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),

  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email?token=${token}`),
};
