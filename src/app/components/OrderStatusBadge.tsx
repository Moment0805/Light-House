import { Badge } from './ui/badge';
import { CheckCircle, Clock, Package, Truck, XCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  showIcon?: boolean;
}

export function OrderStatusBadge({ status, showIcon = true }: OrderStatusBadgeProps) {
  const config = {
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
    'on-the-way': {
      label: 'On the Way',
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

  const { label, className, icon: Icon } = config[status];

  return (
    <Badge variant="outline" className={className}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {label}
    </Badge>
  );
}
