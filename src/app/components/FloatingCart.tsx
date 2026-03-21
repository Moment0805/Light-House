import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { ShoppingBag, ChevronRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export function FloatingCart() {
  const { items, itemCount, total, removeFromCart } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close minicart on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Hide the floating cart if we're exactly on the /cart or /checkout pages
  if (location.pathname === '/cart' || location.pathname === '/checkout' || itemCount === 0) {
    return null;
  }

  const vendors = Array.from(new Set(items.map(i => i.vendorName)));

  return (
    <>
      {/* Floating Button */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-white shadow-xl shadow-primary/30 p-4 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all outline-none"
        >
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-primary">
              {itemCount}
            </span>
          </div>
          <div className="flex flex-col items-start pr-1 hidden sm:flex">
            <span className="text-xs font-semibold opacity-90">₦{(total / 100).toLocaleString()}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-80 font-bold">View Cart</span>
          </div>
        </button>
      </motion.div>

      {/* Mini Cart Dropdown Panel (Bottom Right) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-100/50 z-50 overflow-hidden flex flex-col max-h-[60vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-50 bg-slate-50/50">
              <div>
                <h4 className="font-bold text-slate-800">Your Cart</h4>
                <p className="text-xs text-slate-500 font-medium">{vendors[0] || 'Mixed Items'}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h5>
                    <p className="text-xs text-slate-500 font-medium">₦{(item.price / 100).toLocaleString()} <span className="text-slate-300 mx-1">×</span> {item.quantity}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="font-bold text-sm text-slate-900">₦{((item.price * item.quantity) / 100).toLocaleString()}</span>
                    <button 
                      onClick={() => removeFromCart(item.menuItemId)}
                      className="text-[10px] text-red-500 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Checkout */}
            <div className="p-4 border-t border-slate-50 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-slate-500">Subtotal</span>
                <span className="text-lg font-bold text-slate-900">₦{(total / 100).toLocaleString()}</span>
              </div>
              
              <Link to="/cart" className="block w-full">
                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold gap-2 shadow-lg shadow-primary/20 transition-all">
                  Go to Checkout
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
