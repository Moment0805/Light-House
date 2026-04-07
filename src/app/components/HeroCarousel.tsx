'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Lottie from 'lottie-react';

// ── Vendor data ───────────────────────────────────────────────
const vendors = [
  {
    id: 1,
    name: 'BK 46',
    tag: 'Burgers & Grills',
    description: 'Home of the boldest grills and signature burgers in town. Every bite is flame-kissed perfection.',
    rating: 4.8,
    delivery: '20–30 min',
    image: '/Nigerian Native Jollof Rice.jfif',
    thumbnails: [
      { img: '/Nigeria Jollof and turkey.jfif', name: 'Jollof with turkey', price: '₦4,500' },
      { img: '/Nigerian Native Jollof Rice.jfif', name: 'Native Special', price: '₦2,200' },
      { img: '/Egusi Soup.jfif', name: 'Soup Combo', price: '₦2,800' },
    ],
    featured: { name: 'Native Rice', price: '₦2,500' },
    badge: 'Top Rated',
    badgeColor: 'bg-amber-500',
  },
  {
    id: 2,
    name: 'DAPS Kitchen',
    tag: 'Nigerian Homestyle',
    description: 'Rich, hearty Nigerian cuisine made the way mama intended. Comfort in every pot.',
    rating: 4.7,
    delivery: '25–35 min',
    image: '/Jollof Rice & Chicken.jfif',
    thumbnails: [
      { img: '/Food.jfif', name: 'Big Plate and turkey', price: '₦5,000' },
      { img: '/Jollof Rice & Chicken.jfif', name: 'Jollof & Chicken', price: '₦2,500' },
      { img: '/Nigeria Jollof and turkey.jfif', name: 'Steamy Jollof', price: '₦4,500' },
    ],
    featured: { name: 'Big Plate Jollof and chicken', price: '₦3,000' },
    badge: 'Fan Favourite',
    badgeColor: 'bg-green-600',
  },
  {
    id: 3,
    name: 'Tee Muchies',
    tag: 'Snacks & Bites',
    description: 'Quick, satisfying snacks and small plates for when hunger strikes between meals.',
    rating: 4.6,
    delivery: '15–25 min',
    image: '/noodles.jfif',
    thumbnails: [
      { img: '/Jollof Rice & Chicken.jfif', name: 'Combo Meal', price: '₦2,000' },
      { img: '/Nigerian Native Jollof Rice.jfif', name: 'Rice Bowl', price: '₦1,500' },
      { img: '/Chicken Shawarma.jfif', name: 'Chicken Sharwama', price: '₦3,500' },
    ],
    featured: { name: 'Tee muchies noodles experience', price: '₦2,500' },
    badge: 'Quick Delivery',
    badgeColor: 'bg-purple-600',
  },
  {
    id: 4,
    name: 'Five Star Bevery',
    tag: 'Pastries & Cakes',
    description: 'Freshly baked breads, pastries, and cakes',
    rating: 4.9,
    delivery: '10–20 min',
    image: '/4 Ingredient Chocolate Bread (No Butter or Oil).jfif',
    thumbnails: [
      { img: '/jelly donut.jfif', name: 'Jelly donut', price: '₦1,000' },
      { img: '/sardine bread.jfif', name: 'Sardine bread', price: '₦1,600' },
      { img: '/sausage roll.jfif', name: 'Sausage roll', price: '₦800' },
    ],
    featured: { name: 'Mixed Fruit', price: '₦1,500' },
    badge: 'Awesomely Made',
    badgeColor: 'bg-cyan-600',
  },
  {
    id: 5,
    name: 'Choplife',
    tag: 'West African Cuisine',
    description: 'Authentic West African dishes bursting with flavour. Fufu, soups, and more — cooked with tradition.',
    rating: 4.8,
    delivery: '30–40 min',
    image: '/Nigeria Jollof and turkey.jfif',
    thumbnails: [
      { img: '/Steamy Nigeria Jollof.jfif', name: 'Morning Jollof', price: '₦1,500' },
      { img: '/Jollof Rice & Chicken.jfif', name: 'Breakfast Plate', price: '₦2,500' },
      { img: '/Nigerian Native Jollof Rice.jfif', name: 'Rice & Protein', price: '₦2,000' },
    ],
    featured: { name: 'Jollof rice and turkey', price: '₦4,500' },
    badge: 'Trending',
    badgeColor: 'bg-orange-600',
  },
  {
    id: 6,
    name: 'Arena Kitchen',
    tag: 'Continental & Local',
    description: 'A stadium of flavours with continental dishes and local classics for every palate and mood.',
    rating: 4.5,
    delivery: '25–35 min',
    image: '/Jollof Rice & Chicken.jfif',
    thumbnails: [
      { img: '/Jollof Rice & Chicken.jfif', name: 'Chicken Plate', price: '₦2,500' },
      { img: '/Steamy Nigeria Jollof.jfif', name: 'Jollof Bowl', price: '₦1,800' },
    ],
    featured: { name: 'Extra Rice and chicken', price: '₦3,000' },
    badge: "Chef's Pick",
    badgeColor: 'bg-blue-600',
  },
  {
    id: 7,
    name: 'Bissy Joy',
    tag: 'Breakfast & Brunch',
    description: 'Start your day right with hearty breakfast bowls, light bites, and morning favourites.',
    rating: 4.7,
    delivery: '20–30 min',
    image: '/Breakfast served by Chat GPT😍😋_   Prompt_ A….jfif',
    thumbnails: [
      { img: '/Making Nigerian Afang Soup Recipe - Dream Africa.jfif', name: 'Afang Soup', price: '₦3,200' },
      { img: '/Nigerian Native Jollof Rice.jfif', name: 'Native Jollof', price: '₦2,000' },
      { img: '/25 Authentic Nigerian Dinner Recipes.jfif', name: 'Dinner Special', price: '₦3,500' },
    ],
    featured: { name: 'Full Breakfast Combo', price: '₦2,200' },
    badge: 'Morning Special',
    badgeColor: 'bg-yellow-600',
  },
  {
    id: 8,
    name: 'Bukateria',
    tag: 'Supermart & Groceries',
    description: 'Your neighbourhood supermart and resturant. Fresh groceries,delicious dishes, staples, and everyday essentials delivered fast.',
    rating: 4.6,
    delivery: '35–50 min',
    image: '/25 Authentic Nigerian Dinner Recipes.jfif',
    thumbnails: [
      { img: '/hake fish.jfif', name: 'Hake Fish', price: '₦3,000' },
      { img: '/Nigerian meat pie', name: 'Meat pie', price: '₦700' },
      { img: '/moi moi.jfif', name: 'moi moi', price: '₦1,000' },
    ],
    featured: { name: 'Mixed platter', price: '₦3,000+' },
    badge: 'Supermart and resturant',
    badgeColor: 'bg-emerald-600',
  },
];

// ── Component ──────────────────────────────────────────────────
export function HeroCarousel({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [current, setCurrent] = useState(0);          // 0 = intro, 1-8 = vendors
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalSlides = vendors.length + 1;

  // Load lottie
  useEffect(() => {
    fetch('/Delivery Service-Delivery man.json')
      .then(r => r.json())
      .then(setAnimationData)
      .catch(() => {});
  }, []);

  // ── Slide transition ──────────────────────────────────────────
  const goTo = useCallback((index: number, dir: 'left' | 'right' = 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 400); // matches the CSS duration
  }, [isAnimating]);

  const next = useCallback(() => {
    const nextIndex = (current + 1) % totalSlides;
    goTo(nextIndex, 'right');
  }, [current, totalSlides, goTo]);

  const prev = useCallback(() => {
    const prevIndex = (current - 1 + totalSlides) % totalSlides;
    goTo(prevIndex, 'left');
  }, [current, totalSlides, goTo]);

  // ── Auto-scroll (starts after 10 s of inactivity) ────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current as unknown as number);
    // After 10 s idle → start auto-scroll every 5 s
    inactivityTimer.current = setTimeout(() => {
      autoScrollTimer.current = setInterval(() => {
        next();
      }, 5000) as unknown as ReturnType<typeof setTimeout>;
    }, 10000);
  }, [next]);

  // Start inactivity timer on mount
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current as unknown as number);
    };
  }, [resetInactivityTimer]);

  // User-triggered navigation (resets inactivity)
  const handleNext = () => { resetInactivityTimer(); next(); };
  const handlePrev = () => { resetInactivityTimer(); prev(); };
  const handleDot = (i: number) => {
    resetInactivityTimer();
    goTo(i, i > current ? 'right' : 'left');
  };

  const isIntro = current === 0;
  const vendor = vendors[current - 1];

  // Slide class
  const slideClass = isAnimating
    ? direction === 'right'
      ? 'translate-x-[-3%] opacity-0'
      : 'translate-x-[3%] opacity-0'
    : 'translate-x-0 opacity-100';

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ minHeight: '92vh' }}
    >
      {/* Soft decorative background blob */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* ── Slide content ───────────────────────────────────────── */}
      <div
        className={`
          transition-all duration-[400ms] ease-in-out
          ${slideClass}
          w-full h-full flex items-center
        `}
      >
        {isIntro ? (
          /* ── SLIDE 0: Brand intro ──────────────────────────── */
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 grid lg:grid-cols-2 gap-6 items-center" style={{ minHeight: '88vh' }}>
            {/* Left: text */}
            <div className="space-y-7">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-semibold text-sm px-4 py-1.5 rounded-full">
                 Fast & Reliable Delivery
              </Badge>
              <h1 className="text-5xl lg:text-[5.5rem] font-extrabold text-slate-900 leading-[1.0] tracking-tight">
                Comfort Food<br />
                <span className="text-primary">Delivered Fast</span>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed max-w-md">
                Light House connects you with the best local vendors in Lagos. Fresh, hot food — delivered with care, every single time.
              </p>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to="/vendors">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-primary/20">
                      Order Now
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-white h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-primary/20">
                        Get Started — Free
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-slate-200 text-slate-700 hover:bg-slate-50">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              {/* Stats row */}
              <div className="flex gap-8 pt-2">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">4.8★</p>
                  <p className="text-xs text-slate-400 font-medium">Avg Rating</p>
                </div>
                <div className="border-l border-slate-100 pl-8">
                  <p className="text-2xl font-extrabold text-slate-900">30 min</p>
                  <p className="text-xs text-slate-400 font-medium">Avg Delivery</p>
                </div>
                <div className="border-l border-slate-100 pl-8">
                  <p className="text-2xl font-extrabold text-slate-900">8</p>
                  <p className="text-xs text-slate-400 font-medium">Local Vendors</p>
                </div>
              </div>
            </div>

            {/* Right: Large Lottie animation */}
            <div className="flex items-center justify-center relative">
              <div className="w-full max-w-[580px] aspect-square">
                {animationData ? (
                  <Lottie animationData={animationData} loop autoplay className="w-full h-full drop-shadow-2xl" />
                ) : (
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img src="/delivery-dispatch.jpeg" alt="Delivery" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ── SLIDES 1-8: Vendor spotlight ───────────────────── */
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 flex items-center gap-6 lg:gap-10"
            style={{ minHeight: '88vh' }}>

            {/* ── Left: vendor desc ── */}
            <div className="w-full lg:w-[32%] shrink-0 space-y-5 z-10">
              <div className="flex items-center gap-2">
                <Badge className={`${vendor.badgeColor} text-white border-0 text-xs font-bold px-3 py-1 rounded-full`}>
                  {vendor.badge}
                </Badge>
                <Badge className="bg-green-50 text-green-600 border-green-100 text-xs font-semibold px-3 py-1 rounded-full">
                  ● Open Now
                </Badge>
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {vendor.name}
              </h2>
              <p className="text-primary font-semibold">{vendor.tag}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{vendor.description}</p>

              <div className="flex gap-5 text-sm">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="font-bold text-slate-900">{vendor.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{vendor.delivery}</span>
                </div>
              </div>

              {/* Featured item */}
              <div className="bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Featured Item</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-sm">{vendor.featured.name}</p>
                  <p className="text-primary font-extrabold">{vendor.featured.price}</p>
                </div>
              </div>

              {isAuthenticated ? (
                <Link to="/vendors">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-7 font-bold shadow-md shadow-primary/20 text-sm">
                    Order from {vendor.name}
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 px-7 font-bold shadow-md shadow-primary/20 text-sm">
                    Order Now — Free Sign Up
                  </Button>
                </Link>
              )}
            </div>

            {/* ── Center-right: hero food image ── */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative">
              <div className="absolute w-[420px] h-[420px] bg-primary/10 rounded-full blur-3xl" />
              <div className="relative w-[400px] h-[420px] xl:w-[460px] xl:h-[480px] rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white">
                <img
                  src={vendor.image}
                  alt={vendor.featured.name}
                  className="w-full h-full object-cover"
                />
                {/* Floating price badge */}
                <div className="absolute top-5 left-5 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-bold text-slate-900">{vendor.featured.price}</span>
                </div>
                {/* Bottom info strip */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                  <p className="text-white font-bold">{vendor.featured.name}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Far right: thumbnail mini menu ── */}
            <div className="hidden xl:flex flex-col gap-4 shrink-0 w-[150px]">
              {vendor.thumbnails.map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <div className="h-20 overflow-hidden">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-[11px] font-semibold text-slate-700 leading-tight truncate">{t.name}</p>
                    <p className="text-[11px] font-bold text-primary mt-0.5">{t.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ───────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/30 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-primary'
                  : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/30 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-8 text-xs font-mono text-slate-300 z-20 select-none">
        {String(current + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
      </div>
    </section>
  );
}
