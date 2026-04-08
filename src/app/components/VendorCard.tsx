import { Link } from 'react-router';
import { Star, Clock, ShoppingBag, Zap } from 'lucide-react';
import { Vendor } from '../services/vendors.service';
import { Badge } from './ui/badge';

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  return (
    <Link to={`/vendors/${vendor.id}`} className="group block">
      <div
        className={`relative bg-white rounded-[1.75rem] overflow-hidden shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${
          !vendor.isOpen ? 'opacity-75' : ''
        }`}
      >
        {/* ── Image ── */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={vendor.bannerUrl || '/placeholder.png'}
            alt={vendor.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Open / Closed badge */}
          <div className="absolute top-3 right-3">
            {vendor.isOpen ? (
              <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                Open
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-slate-700/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                Closed
              </span>
            )}
          </div>

          {/* Vendor badge (Top Rated etc.) */}
          {vendor.badge && (
            <div className="absolute top-3 left-3">
              <span className={`inline-flex items-center gap-1 ${vendor.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md`}>
                {vendor.badge === 'Top Rated' && <Zap className="w-2.5 h-2.5" />}
                {vendor.badge}
              </span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors truncate">
                {vendor.name}
              </h3>
            </div>
            <Badge className="bg-slate-50 text-slate-600 border-slate-100 text-[10px] font-semibold shrink-0 rounded-full px-2.5">
              {vendor.category}
            </Badge>
          </div>

          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {vendor.description}
          </p>

          {/* ── Stats row ── */}
          <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-50 pt-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-700">{vendor.rating ? Number(vendor.rating).toFixed(1) : (4.0 + (vendor.id.length % 10) / 10).toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>25-40 min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
              <span>₦{(vendor.deliveryFee / 100).toLocaleString()} delivery</span>
            </div>
          </div>

          {/* Opening hours */}
          <p className="text-[11px] text-slate-400 mt-2">
            🕐 {vendor.openHours || '8:00 AM - 10:00 PM'}
          </p>
        </div>
      </div>
    </Link>
  );
}
