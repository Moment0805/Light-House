import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { paymentsService } from '../services/payments.service';
import { useCart } from '../context/CartContext';

/**
 * PaymentVerify — /payment/verify?reference=xxx
 *
 * Paystack callback_url destination. Reads the reference, calls our backend to
 * verify, clears the cart on success, and navigates to the success page.
 *
 * OPay redirects directly to /payment/success (no verify step needed
 * for the user-facing flow — OPay confirms via server-side callback).
 */
export function PaymentVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const reference = searchParams.get('reference');

    if (!reference) {
      setStatus('error');
      setErrorMsg('No payment reference found in URL. Please check your order history.');
      return;
    }

    const verify = async () => {
      try {
        const result = await paymentsService.verify(reference);

        if (result.success) {
          // ── Payment confirmed — NOW safe to clear the cart ──
          clearCart();
          sessionStorage.removeItem('lhl_pending_order');
          sessionStorage.removeItem('lhl_pending_reference');

          setStatus('success');
          // Brief success flash then navigate to success page
          setTimeout(() => {
            navigate(`/payment/success?orderId=${result.orderId}`, { replace: true });
          }, 1200);
        } else {
          setStatus('error');
          setErrorMsg('Payment could not be confirmed. Please contact support if your money was deducted.');
        }
      } catch (err: any) {
        console.error('Verification error:', err);
        setStatus('error');
        setErrorMsg(
          err?.response?.data?.message ||
          'Verification failed. Please check your order history or contact support.',
        );
      }
    };

    verify();
  }, [navigate, searchParams, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAF9]">
      <Card className="w-full max-w-md p-8 text-center border-slate-100 shadow-sm rounded-2xl">

        {/* ── Verifying ── */}
        {status === 'verifying' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirming Payment</h2>
            <p className="text-slate-500 mb-6">
              Please wait while we verify your payment...
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-slate-600 font-medium">Checking transaction status</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-6 font-medium">Please do not close this window</p>
          </>
        )}

        {/* ── Success flash ── */}
        {status === 'success' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Confirmed!</h2>
            <p className="text-slate-500">Redirecting to your order...</p>
          </>
        )}

        {/* ── Error ── */}
        {status === 'error' && (
          <div className="flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Verification Failed</h2>
            <p className="text-slate-500 mb-6">{errorMsg}</p>
            <div className="flex flex-col gap-3 w-full">
              <Button
                onClick={() => navigate('/orders')}
                className="bg-primary hover:bg-primary/90 text-white rounded-full font-semibold"
              >
                View Order History
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="rounded-full font-semibold border-slate-200 text-slate-600"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
}
