import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { MapPin, CreditCard, Loader2, ShieldCheck, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import { addressesService } from '../services/addresses.service';
import { ordersService } from '../services/orders.service';
import { paymentsService } from '../services/payments.service';
import { getErrorMessage } from '../lib/error';

type PaymentMethod = 'paystack' | 'opay';

export function Checkout() {
  const { items, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: 'Kwara State University, Malate, Ilorin',
    phone: user?.phone || '',
    notes: '',
  });
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('paystack');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fixed fees — match exactly what the backend adds to order.total
  const deliveryFee = 500 * 100;   // ₦500 in kobo
  const serviceCharge = 100 * 100; // ₦100 in kobo
  const grandTotal = total + deliveryFee + serviceCharge;

  // ── FIX: navigate during render causes "setState in render" crash.
  //    Move to useEffect so navigation happens after mount, not during render.
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [items.length, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || isProcessing) return;

    setIsProcessing(true);
    try {
      // 1. Create address
      const address = await addressesService.create({
        label: 'Delivery Address',
        street: formData.address,
        city: 'Ilorin',
        state: 'Kwara State',
        deliveryInstructions: formData.notes,
      });

      // 2. Create order on backend
      const vendorId = items[0].vendorId;
      const idempotencyKey = crypto.randomUUID();

      const order = await ordersService.create({
        vendorId,
        addressId: address.id,
        items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
        notes: formData.notes,
        idempotencyKey,
      });

      // 3. Persist orderId + idempotencyKey so PaymentVerify can recover them
      //    PaymentVerify will clear the cart after CONFIRMING payment — NOT here.
      sessionStorage.setItem('lhl_pending_order', order.id);
      sessionStorage.setItem('lhl_pending_reference', idempotencyKey);

      // 4. Initialize payment at the selected provider and redirect
      //    Cart is NOT cleared here — only cleared after payment is confirmed.
      if (selectedMethod === 'paystack') {
        const payment = await paymentsService.initialize(order.id, idempotencyKey);
        window.location.href = payment.authorizationUrl;
      } else {
        const payment = await paymentsService.initiateOpay(order.id, idempotencyKey);
        window.location.href = payment.cashierUrl;
      }

      // If redirection happens, this line is never reached.
      // If it somehow doesn't redirect, stop the spinner.
      setIsProcessing(false);

    } catch (err: any) {
      console.error('Checkout error:', err);
      toast.error(getErrorMessage(err, 'Checkout failed. Please check your connection and try again.'));
      setIsProcessing(false);
    }
  };

  // Render nothing while useEffect redirect is in-flight
  if (items.length === 0) return null;

  const paymentOptions: {
    id: PaymentMethod;
    name: string;
    label: string;
    border: string;
    selectedBg: string;
    image: string;
  }[] = [
    {
      id: 'paystack',
      name: 'Paystack',
      label: 'Cards, Bank Transfer, USSD',
      border: 'border-blue-300',
      selectedBg: 'bg-[#0BA4DB]',
      image: '/paystack.png',
    },
    {
      id: 'opay',
      name: 'OPay Cashier',
      label: 'OPay Wallet, Cards',
      border: 'border-green-300',
      selectedBg: 'bg-green-500',
      image: '/Opay Logo.png',
    },
  ];

  return (
    <div className="min-h-screen py-8 bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
          {/* Delivery + Payment */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Address */}
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-slate-900">Delivery Address</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="mt-1.5 bg-slate-50 border-slate-200"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-1.5 bg-slate-50 border-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="e.g., Leave at the gate, Ring doorbell twice"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1.5 bg-slate-50 border-slate-200"
                    rows={2}
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method Selector */}
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-slate-900">Payment Method</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentOptions.map((opt) => {
                  const isSelected = selectedMethod === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedMethod(opt.id)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? `${opt.border} bg-white shadow-md`
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="absolute top-3 right-3 w-4 h-4 text-primary" />
                      )}
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${opt.selectedBg} rounded-lg flex items-center justify-center overflow-hidden bg-white/10`}>
                          <img 
                            src={opt.image} 
                            alt={`${opt.name} logo`} 
                            className="w-full h-full object-contain p-1.5 " 
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{opt.name}</p>
                          <p className="text-xs text-slate-500">{opt.label}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-slate-400 mt-3 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                You'll be securely redirected to complete payment
              </p>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm items-start gap-4">
                      <div className="flex gap-2">
                        <span className="font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-xs h-fit">
                          {item.quantity}x
                        </span>
                        <span className="font-medium text-slate-800 leading-snug">{item.name}</span>
                      </div>
                      <span className="font-semibold text-slate-900 shrink-0">
                        ₦{((item.price * item.quantity) / 100).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-700">₦{(total / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery Fee</span>
                    <span className="font-medium text-slate-700">₦{(deliveryFee / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service Charge</span>
                    <span className="font-medium text-slate-700">₦{(serviceCharge / 100).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 mt-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Total</span>
                      <span className="text-2xl font-extrabold text-primary">
                        ₦{(grandTotal / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-bold text-base shadow-lg shadow-primary/25 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {selectedMethod === 'paystack' ? 'Connecting to Paystack...' : 'Connecting to OPay...'}
                  </>
                ) : (
                  `Pay ₦${(grandTotal / 100).toLocaleString()} via ${selectedMethod === 'paystack' ? 'Paystack' : 'OPay'}`
                )}
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
