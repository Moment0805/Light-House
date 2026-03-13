import { api } from '../lib/api';

export interface InitiatePaymentResponse {
  cashierUrl: string;     // redirect user to this OPay URL
  paymentId: string;
  amount: number;         // kobo
}

export const paymentsService = {
  initiate: (orderId: string, idempotencyKey: string) =>
    api
      .post<{ data: InitiatePaymentResponse }>('/payments/initiate', {
        orderId,
        idempotencyKey,
      })
      .then((r) => r.data.data),

  getStatus: (orderId: string) =>
    api
      .get<{ data: { status: string; paidAt?: string } }>(
        `/payments/status/${orderId}`,
      )
      .then((r) => r.data.data),
};
