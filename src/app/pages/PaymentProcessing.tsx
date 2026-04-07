import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { paymentsService } from '../services/payments.service';

export function PaymentProcessing() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      setError('Missing order information.');
      return;
    }

    let intervalId: NodeJS.Timeout;
    
    const checkStatus = async () => {
      try {
        const payment = await paymentsService.getStatus(orderId);
        
        switch (payment.status) {
          case 'SUCCESS':
            clearInterval(intervalId);
            navigate(`/payment/success?orderId=${orderId}`, { replace: true });
            break;
          case 'FAILED':
          case 'CANCELLED':
            clearInterval(intervalId);
            navigate(`/payment/failure?orderId=${orderId}`, { replace: true });
            break;
          // PENDING: keep polling
        }
      } catch (err) {
        console.error('Failed to check payment status:', err);
        // We do not immediately fail on network errors during polling, we keep trying
      }
    };

    // Check immediately, then every 3 seconds
    checkStatus();
    intervalId = setInterval(checkStatus, 3000);

    // Timeout after 2 minutes (40 attempts) to avoid infinite polling
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setError('Payment verification timed out. Please check your order history.');
    }, 120000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAFAF9]">
      <Card className="w-full max-w-md p-8 text-center border-slate-100 shadow-sm rounded-2xl">
        {error ? (
          <div className="flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Verification taking longer than usual</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-semibold"
            >
              Go to Order History
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verifying Payment</h2>
            <p className="text-slate-500 mb-6">
              Please wait while we confirm your payment with Paystack...
            </p>

            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-slate-600 font-medium">Checking transaction status</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-6 font-medium">
              Please do not close this window
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
