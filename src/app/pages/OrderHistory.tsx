import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Package, Eye, Loader2, AlertCircle } from 'lucide-react';
import { ordersService, Order } from '../services/orders.service';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { EmptyState } from '../components/EmptyState';
import { format } from 'date-fns';

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ordersService
      .getAll(1, 50)
      .then((data) => setOrders(data.orders))
      .catch(() => setError('Failed to load order history'))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center bg-[#FAFAF9]">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center bg-[#FAFAF9]">
        <div className="flex flex-col items-center gap-3 text-red-500">
          <AlertCircle className="w-8 h-8" />
          <p>{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Start ordering from your favorite vendors to see your order history"
          actionLabel="Browse Vendors"
          onAction={() => (window.location.href = '/vendors')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order History</h1>
        <p className="text-slate-500 mb-8">
          View and track all your orders
        </p>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-6 border-slate-100 hover:shadow-md transition-shadow rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
                    {/* The backend provides explicit statuses like 'PAYMENT_PENDING' or 'CONFIRMED' which need mapping or can be passed directly if OrderStatusBadge supports it */}
                    <OrderStatusBadge status={order.status as any} />
                  </div>
                  <p className="text-sm text-slate-500">
                    {format(new Date(order.createdAt), 'PPp')}
                  </p>
                </div>
                <Link to={`/orders/${order.id}/track`}>
                  <Button size="sm" variant="outline" className="gap-2 rounded-xl text-primary border-primary/20 hover:bg-primary/5">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </Link>
              </div>

              <div className="border-t border-slate-50 pt-4 mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">{order.vendor.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>
                  <span className="font-extrabold text-slate-900 text-base">
                    ₦{(order.total / 100).toLocaleString()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
