import { Badge } from './ui/badge';
import { CheckCircle, Clock, Package, Truck, XCircle, CreditCard, AlertCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: string; // Accept any string from the backend
  showIcon?: boolean;
}

export function OrderStatusBadge({ status, showIcon = true }: OrderStatusBadgeProps) {
  // Normalize — backend sends UPPER_SNAKE_CASE, frontend used lowercase-kebab
  // Support both shapes so existing code keeps working
  const normalized = (status || '').toLowerCase().replace(/_/g, '-');

  const config: Record<string, { label: string; className: string; icon: any }> = {
    // Backend statuses (lowercased from UPPER_SNAKE_CASE)
    'payment-pending': {
      label: 'Awaiting Payment',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: CreditCard,
    },
    // Standard statuses (both backend and legacy frontend shape)
    pending: {
      label: 'Pending',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: Clock,
    },
    confirmed: {
      label: 'Confirmed',
      className: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: CheckCircle,
    },
    preparing: {
      label: 'Preparing',
      className: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Package,
    },
    'ready-for-dispatch': {
      label: 'Ready for Dispatch',
      className: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: Package,
    },
    'on-the-way': {
      label: 'On the Way',
      className: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: Truck,
    },
    'out-for-delivery': {
      label: 'Out for Delivery',
      className: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: Truck,
    },
    delivered: {
      label: 'Delivered',
      className: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle,
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle,
    },
  };

  const matched = config[normalized];

  // Graceful fallback — never crash
  if (!matched) {
    return (
      <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">
        {showIcon && <AlertCircle className="w-3 h-3 mr-1" />}
        {status}
      </Badge>
    );
  }

  const { label, className, icon: Icon } = matched;

  return (
    <Badge variant="outline" className={className}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {label}
    </Badge>
  );
}
