import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle, Package, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCart } from '../context/CartContext';

export function PaymentSuccess() {
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'Unknown';

  useEffect(() => {
    // Ensuring the cart is cleared upon successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#FAFAF9]">
      <Card className="w-full max-w-lg p-8 text-center border-slate-100 shadow-sm rounded-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h1>
        <p className="text-slate-500 mb-8 font-medium">
          Your order has been confirmed and is being prepped
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8 text-left">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Order ID</span>
              <span className="font-bold text-slate-900">{orderId.length > 8 ? orderId.slice(0, 8).toUpperCase() : orderId}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Payment Method</span>
              <span className="font-bold text-slate-900">OPay</span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-slate-200 pt-3 mt-1">
              <span className="text-slate-500">Status</span>
              <span className="inline-flex items-center gap-1.5 text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full text-xs">
                <CheckCircle className="w-3.5 h-3.5" />
                PAID
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link to={`/orders/${orderId}/track`}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-bold shadow-md shadow-primary/20">
              <Package className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          </Link>

          <Link to="/orders">
            <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-slate-200 text-slate-700 hover:bg-slate-50">
              View All Orders
            </Button>
          </Link>

          <Link to="/">
            <Button variant="ghost" className="w-full rounded-xl h-12 font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
