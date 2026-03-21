import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { MapPin, Phone, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { addressesService } from '../services/addresses.service';
import { ordersService } from '../services/orders.service';
import { paymentsService } from '../services/payments.service';

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '123 Allen Avenue, Ikeja, Lagos',
    phone: user?.phone || '',
    notes: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Hardcoded delivery fee for now — backend will recalculate this anyway
  const deliveryFee = 500 * 100; // kobo
  const grandTotal = total + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsProcessing(true);
    try {
      // 1. Create a one-off address for this order
      const address = await addressesService.create({
        label: 'Delivery Address',
        street: formData.address,
        city: 'Lagos',
        state: 'LA',
        deliveryInstructions: formData.notes,
      });

      // 2. Create the order
      const vendorId = items[0].vendorId; // Assuming single-vendor cart
      const idempotencyKey = crypto.randomUUID();
      
      const order = await ordersService.create({
        vendorId,
        addressId: address.id,
        items: items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
        notes: formData.notes,
        idempotencyKey,
      });

      // 3. Initiate payment
      const payment = await paymentsService.initiate(order.id, idempotencyKey);

      // 4. Redirect to OPay
      window.location.href = payment.cashierUrl;

    } catch (err: any) {
      console.error('Checkout error:', err);
      toast.error(err.response?.data?.message || 'Checkout failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-8 bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
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
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="mt-1.5 bg-slate-50 border-slate-200"
                    rows={2}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-slate-900">Payment Method</h3>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-inner">
                    <span className="font-bold text-white text-lg">OP</span>
                  </div>
                  <div>
                    <p className="font-bold text-green-900">OPay Cashier</p>
                    <p className="text-sm text-green-700">
                      Cards, Bank Transfers, and USSD
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm items-start gap-4">
                      <div className="flex gap-2">
                        <span className="font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-xs h-fit">
                          {item.quantity}x
                        </span>
                        <span className="font-medium text-slate-800 leading-snug">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-semibold text-slate-900 shrink-0">
                        ₦{((item.price * item.quantity) / 100).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-700">₦{(total / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery Fee</span>
                    <span className="font-medium text-slate-700">₦{(deliveryFee / 100).toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4 mt-2">
                    <div className="flex justify-between items-end">
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
                    Connecting to OPay...
                  </>
                ) : (
                  `Pay ₦${(grandTotal / 100).toLocaleString()}`
                )}
              </Button>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
