import { Link, useSearchParams } from 'react-router';
import { XCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#FAFAF9]">
      <Card className="w-full max-w-lg p-8 text-center border-slate-100 shadow-sm rounded-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Failed</h1>
        <p className="text-slate-500 mb-8 font-medium">
          We couldn't process your payment. Please try again or use a different payment method.
        </p>

        {orderId && (
          <div className="text-sm text-slate-500 font-medium mb-4">
            Order ID: <span className="text-slate-900 font-bold">{orderId.length > 8 ? orderId.slice(0, 8).toUpperCase() : orderId}</span>
          </div>
        )}

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 mt-2">
          <h3 className="font-semibold text-red-900 mb-3 text-left">Common Issues:</h3>
          <ul className="text-sm text-red-800 text-left space-y-2 font-medium">
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-red-400" />Insufficient funds in your account</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-red-400" />Network connection issues</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-red-400" />Incorrect payment details</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-red-400" />Transaction limit exceeded</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link to="/checkout">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-12 font-bold shadow-md shadow-primary/20">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-slate-200 text-slate-700 hover:bg-slate-50">
              Back to Cart
            </Button>
          </Link>

          <Link to="/">
            <Button variant="ghost" className="w-full rounded-xl h-12 font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-sm font-medium text-slate-500 mb-2">Need help?</p>
          <Button variant="link" className="text-primary font-bold">
            <HelpCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
}
