import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { vendorsService } from '../services/vendors.service';
import type { Vendor } from '../services/vendors.service';
import { VendorCard } from '../components/VendorCard';
import { Input } from '../components/ui/input';

type Category = 'All' | 'Nigerian' | 'Drinks' | 'Groceries' | 'Continental' | 'Snacks' | 'Breakfast';

const CATEGORIES: Category[] = ['All', 'Nigerian', 'Drinks', 'Snacks', 'Breakfast', 'Continental', 'Groceries'];

const CATEGORY_ICONS: Record<Category, string> = {
  All: '🍽️',
  Nigerian: '🍲',
  Drinks: '🥤',
  Groceries: '🛒',
  Continental: '🍴',
  Snacks: '🍟',
  Breakfast: '🌅',
};

import { CautionBanner } from '../components/CautionBanner';

export function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  useEffect(() => {
    vendorsService
      .getAll()
      .then(setVendors)
      .catch(() => setError('Could not load vendors. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
      const matchesOpen = !showOpenOnly || v.isOpen;
      return matchesSearch && matchesCategory && matchesOpen;
    });
  }, [vendors, searchQuery, activeCategory, showOpenOnly]);

  const openCount = vendors.filter((v) => v.isOpen).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading vendors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-slate-600 font-medium">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-primary text-sm font-semibold hover:underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <CautionBanner />
      {/* ── Page Hero ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-primary font-semibold text-sm mb-1">Discover</p>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Vendors</h1>
              <p className="text-slate-500 mt-2 text-sm">
                {openCount} of {vendors.length} vendors open now · Delivery from ₦300
              </p>
            </div>
            {/* Search bar */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search vendors or cuisine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 h-12 rounded-full bg-slate-50 border-slate-200 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          {/* ── Category filter tabs ── */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
            {/* {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                {cat}
              </button>
            ))} */}

            {/* Open only toggle */}
            <button
              onClick={() => setShowOpenOnly(!showOpenOnly)}
              className={`flex items-center gap-1.5 ml-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all ${
                showOpenOnly
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${showOpenOnly ? 'bg-green-500' : 'bg-slate-300'}`} />
              Open Now
            </button>
          </div>
        </div>
      </div>

      {/* ── Vendor Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredVendors.length > 0 ? (
          <>
            <p className="text-sm text-slate-400 mb-5">
              Showing <strong className="text-slate-700">{filteredVendors.length}</strong> vendor{filteredVendors.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No vendors found</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No vendors match the selected filters. Try adjusting your filters.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setShowOpenOnly(false); }}
              className="mt-6 text-primary text-sm font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
