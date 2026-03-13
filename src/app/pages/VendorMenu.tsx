import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Star, Clock, ShoppingBag } from 'lucide-react';
import { MenuItemCard } from '../components/MenuItemCard';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { vendorsService, Vendor } from '../services/vendors.service';
import { menuService, MenuItem, MenuCategory } from '../services/menu.service';

export function VendorMenu() {
  const { vendorId } = useParams();
  const { addToCart } = useCart();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    if (!vendorId) return;

    Promise.all([
      vendorsService.getOne(vendorId),
      menuService.getByVendor(vendorId)
    ])
      .then(([vData, mData]) => {
        setVendor(vData);
        setCategories(mData);
      })
      .catch(() => setError('Could not load vendor details. Please try again.'))
      .finally(() => setIsLoading(false));
  }, [vendorId]);

  const allItems = useMemo(() => {
    return categories.flatMap((cat) => cat.items.map(item => ({...item, category: cat.name})));
  }, [categories]);

  const availableCategories = useMemo(() => {
    return ['All', ...categories.map(c => c.name)];
  }, [categories]);

  const displayedItems = useMemo(() => {
    if (activeCategory === 'All') return allItems;
    return allItems.filter(i => i.category === activeCategory);
  }, [allItems, activeCategory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading vendor menu...</p>
        </div>
      </div>
    );
  }

  if (error || !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9]">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Vendor not found</h2>
          <p className="text-slate-600 mb-4">{error}</p>
          <Link to="/vendors">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full mt-4">Browse Vendors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (item: MenuItem) => {
    try {
      await addToCart({
        id: `${vendor.id}-${item.id}`,
        menuItemId: item.id,
        vendorId: vendor.id,
        name: item.name,
        price: item.price,
        image: item.imageUrl || '',
        vendorName: vendor.name,
      });
      toast.success(`${item.name} added to cart! 🛒`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* ── Vendor hero banner ──────────────────────────────────── */}
      <div className="relative bg-white border-b border-slate-100">
        <div className="h-48 sm:h-60 overflow-hidden relative">
          {vendor.bannerUrl && (
            <img src={vendor.bannerUrl} alt={vendor.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6 relative -mt-16 sm:-mt-20">
          <Link
            to="/vendors"
            className="inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white font-medium mb-4 transition-colors relative z-10"
          >
            <ArrowLeft className="w-4 h-4" />
            All Vendors
          </Link>

          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {vendor.badge && (
                    <span className={`text-[10px] font-bold text-white ${vendor.badgeColor || 'bg-primary'} px-2.5 py-0.5 rounded-full`}>
                      {vendor.badge}
                    </span>
                  )}
                  {vendor.isOpen ? (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Open Now
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">Closed</span>
                  )}
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{vendor.name}</h1>
                <p className="text-primary font-semibold text-sm mt-0.5">{vendor.category}</p>
                <p className="text-slate-500 text-sm mt-2 max-w-lg leading-relaxed">{vendor.description}</p>
              </div>

              <div className="flex sm:flex-col gap-4 sm:gap-2 text-sm shrink-0">
                <div className="flex items-center gap-2 text-slate-600">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-900">{vendor.rating}</span>
                  <span className="text-slate-400">({vendor.totalReviews ?? 0})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>30-45 mins</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <ShoppingBag className="w-4 h-4 text-slate-400" />
                  <span>₦{(vendor.deliveryFee / 100).toLocaleString()} delivery</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-slate-50">
              {vendor.openHours && <span className="text-xs text-slate-500">🕐 {vendor.openHours}</span>}
              {vendor.minOrder > 0 && (
                <span className="text-xs text-slate-500">
                  🛒 Min. order: <strong className="text-slate-700">₦{(vendor.minOrder / 100).toLocaleString()}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Category tabs ─────────────────────────────────────── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menu items ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {displayedItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🍴</div>
            <p className="text-slate-500 font-medium">No menu items in this category</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {displayedItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                vendorName={vendor.name}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
