import { Plus, ShoppingCart } from 'lucide-react';
import type { MenuItem } from '../services/menu.service';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MenuItemCardProps {
  item: MenuItem;
  vendorName: string;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemCard({ item, vendorName, onAddToCart }: MenuItemCardProps) {
  const isAvailable = item.availability === 'AVAILABLE';
  const priceNgN = item.price / 100;

  return (
    <div className={`group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex gap-0 ${!isAvailable ? 'opacity-60' : ''}`}>
      {/* Food image */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden bg-slate-100">
        <img
          src={item.imageUrl || ''}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-bold text-slate-500 bg-white rounded-full px-2 py-0.5 shadow">{item.availability === 'SOLD_OUT' ? 'Sold Out' : 'Unavailable'}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">{item.name}</h4>
            <Badge className="bg-slate-50 text-slate-500 border-slate-100 text-[10px] shrink-0 rounded-full">
              {item.category}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-extrabold text-primary">₦{priceNgN.toLocaleString()}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart(item)}
            disabled={!isAvailable}
            className="bg-primary hover:bg-primary/90 text-white h-8 px-4 text-xs font-bold rounded-full gap-1.5 shadow-sm shadow-primary/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
