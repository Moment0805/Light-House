import { api } from '../lib/api';

export interface InitializePaymentResponse {
  success: boolean;
  authorizationUrl: string; // redirect user here — Paystack hosted checkout
  reference: string;
}

export interface InitiateOpayResponse {
  success: boolean;
  cashierUrl: string; // redirect user here — OPay Cashier
  reference: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId: string;
  message?: string;
}

export const paymentsService = {
  /** Paystack: initialize and get redirect URL */
  initialize: (orderId: string, idempotencyKey: string) =>
    api
      .post<{ data: InitializePaymentResponse }>('/payments/initialize', { orderId, idempotencyKey })
      .then((r) => r.data.data),

  /** OPay: initialize and get cashierUrl */
  initiateOpay: (orderId: string, idempotencyKey: string) =>
    api
      .post<{ data: InitiateOpayResponse }>('/payments/initiate-opay', { orderId, idempotencyKey })
      .then((r) => r.data.data),

  /** Verify a Paystack payment after redirect */
  verify: (reference: string) =>
    api
      .get<{ data: VerifyPaymentResponse }>('/payments/verify', { params: { reference } })
      .then((r) => r.data.data),

  /** Polling: get simplified order payment status */
  getStatus: (orderId: string) =>
    api
      .get<{ data: { status: string; paidAt?: string } }>(`/payments/status/${orderId}`)
      .then((r) => r.data.data),

  /** Active polling: verify unconfirmed payment with external gateway */
  verifyOrder: (orderId: string) =>
    api
      .post<{ data: VerifyPaymentResponse }>(`/payments/verify-order/${orderId}`)
      .then((r) => r.data.data),
};
