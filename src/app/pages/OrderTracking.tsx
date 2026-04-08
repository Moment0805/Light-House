import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Package, CheckCircle, Clock, Truck, MapPin, CreditCard, Loader2, AlertCircle, XCircle } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { ordersService, Order } from '../services/orders.service';
import { tokenStore } from '../lib/token.store';
import { paymentsService } from '../services/payments.service';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { format } from 'date-fns';

const statusSteps = [
  { key: 'PENDING', label: 'Order Placed', icon: Package },
  { key: 'PAYMENT_PENDING', label: 'Awaiting Payment', icon: CreditCard },
  { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle },
  { key: 'PREPARING', label: 'Preparing', icon: Clock },
  { key: 'READY_FOR_DISPATCH', label: 'Ready for Dispatch', icon: Package },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
  { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
];

export function OrderTracking() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Initial fetch
  useEffect(() => {
    if (!orderId) return;
    ordersService
      .getOne(orderId)
      .then(setOrder)
      .catch(() => setError('Could not load order tracking details'))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  // Active re-fetch — forces backend to verify with payment gateway
  const refreshOrder = async () => {
    if (!orderId || isRefreshing) return;
    setIsRefreshing(true);
    try {
      await paymentsService.verifyOrder(orderId); // Tell backend to check Paystack/OPay API
      const updated = await ordersService.getOne(orderId);
      setOrder(updated);
    } catch {
      // silently ignore — order stays as-is
    } finally {
      setIsRefreshing(false);
    }
  };

  // 2. WebSocket connection for live updates
  useEffect(() => {
    if (!orderId || !order) return;

    const wsUrl = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_WS_URL) || 'http://localhost:3001';
    const socket: Socket = io(wsUrl, {
      path: '/tracking', // matches the NestJS gateway namespace/path
      auth: { token: tokenStore.get() },
    });

    socket.emit('join:order', { orderId });

    socket.on('order:status', (data: { status: string; updatedAt: string }) => {
      setOrder((prev) => prev ? { ...prev, status: data.status, updatedAt: data.updatedAt } : prev);
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId, order?.id]); // init socket once order is loaded

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center bg-[#FAFAF9]">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p>Loading tracking data...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center bg-[#FAFAF9]">
        <div className="flex flex-col items-center gap-3 text-red-500 text-center">
          <AlertCircle className="w-10 h-10 mb-2" />
          <h2 className="text-xl font-bold text-slate-800">Order not found</h2>
          <p className="text-slate-500 mb-4">{error}</p>
          <Link to="/orders">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              View All Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCancelled = order.status === 'CANCELLED';
  const currentStepIndex = isCancelled
    ? -1
    : statusSteps.findIndex((step) => step.key === order.status);

  return (
    <div className="min-h-screen py-8 bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-6 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to orders
        </Link>

        <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
            <OrderStatusBadge status={order.status as any} />
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Placed on {format(new Date(order.createdAt), 'PPp')}
          </p>

          {order.status === 'PAYMENT_PENDING' && (
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-gray-600 font-medium text-sm flex items-center justify-between gap-3 flex-wrap">
                <span> Payment is pending. If you already paid, click refresh to check.</span>
                <button
                  onClick={refreshOrder}
                  disabled={isRefreshing}
                  className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white rounded-full text-xs h-8 px-3 font-semibold shrink-0 flex items-center gap-1.5"
                >
                  {isRefreshing ? (
                    <><Loader2 className="w-3 h-3 animate-spin" /> Checking...</>
                  ) : (
                    'Refresh Status'
                  )}
                </button>
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Status Timeline */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 text-lg">Live Status</h3>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Live
                </div>
              </div>

              {isCancelled ? (
                <div className="py-8 text-center bg-red-50 rounded-xl border border-red-100">
                  <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                  <p className="font-bold text-red-700">Order Cancelled</p>
                  <p className="text-xs text-red-600 mt-1 max-w-[200px] mx-auto">This order has been cancelled and will not be delivered.</p>
                </div>
              ) : (
                <div className="relative">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    // Show loading ring only if it's the immediate next step AFTER payment has been confirmed
                    const isNext = index === currentStepIndex + 1 && currentStepIndex >= 2 && currentStepIndex < statusSteps.length - 1;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-4 pb-8 last:pb-0">
                        {index !== statusSteps.length - 1 && (
                          <div
                            className={`absolute left-5 top-12 w-0.5 h-full -translate-x-1/2 ${
                              isCompleted ? 'bg-primary' : 'bg-slate-100'
                            }`}
                          />
                        )}

                        <div className="relative shrink-0 flex items-center justify-center">
                          {/* Pulsing Next Step Loading Ring */}
                          {isNext && (
                            <div className="absolute -inset-1.5 rounded-full border-[3px] border-slate-100 border-t-primary animate-[spin_3s_linear_infinite]" />
                          )}
                          
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${
                              isCompleted
                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                : 'bg-slate-100 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}`}
                          >
                            <Icon className="w-5 h-5 relative z-20" />
                          </div>
                        </div>

                        <div className="pt-2">
                          <p
                            className={`font-semibold text-sm ${
                              isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-xs font-bold text-primary mt-0.5">Current status</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl">
              <h3 className="font-bold text-slate-900 mb-5 text-lg">Delivery Details</h3>
              <div className="space-y-5">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Destination</span>
                    <p className="text-sm font-semibold text-slate-900">
                      {order.address?.street || 'No address provided'}
                    </p>
                    {order.address?.city && (
                      <p className="text-sm text-slate-500 mt-0.5">{order.address.city}</p>
                    )}
                    {order.notes && (
                      <p className="text-xs text-slate-600 bg-white border border-slate-200 p-2 rounded mt-2">
                        <span className="font-semibold block mb-0.5">Notes:</span> {order.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <Package className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Vendor</span>
                    <p className="text-sm font-semibold text-slate-900">{order.vendor.name}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-6 border-slate-100 shadow-sm rounded-2xl">
              <h3 className="font-bold text-slate-900 mb-5 text-lg">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4">
                    <div className="flex gap-2">
                      <span className="font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-xs h-fit">
                        {item.quantity}x
                      </span>
                      <span className="font-medium text-slate-800 text-sm leading-snug">
                        {item.name}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900 text-sm shrink-0">
                      ₦{((item.price * item.quantity) / 100).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-medium text-slate-700">₦{(order.subtotal / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="text-slate-500">Delivery Fee</span>
                    <span className="font-medium text-slate-700">₦{(order.deliveryFee / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-extrabold text-primary">₦{(order.total / 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
