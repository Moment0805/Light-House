'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Most orders arrive within 20 to 45 minutes depending on your location and the vendor. You\'ll see a live estimated time when you place your order.',
  },
  {
    q: 'Can I order from multiple vendors at the same time?',
    a: 'Right now each order is from one vendor at a time — this lets us keep delivery fast and food hot. We\'re working on multi-vendor carts for a future update.',
  },
  {
    q: 'How do I pay for my order?',
    a: 'We use OPay Cashier for secure payment. You\'ll be redirected to the OPay checkout screen after confirming your order.',
  },
  {
    q: 'What happens if a vendor is showing as closed?',
    a: 'Vendors set their own operating hours. If they\'re closed you can still browse their menu and place an order for when they re-open, or pick an alternative vendor.',
  },
  {
    q: 'Can I cancel or change my order?',
    a: 'You can cancel within 2 minutes of placing your order. After that, the kitchen has usually already started preparing it. Reach out to support and we\'ll do our best to help.',
  },
];

const testimonials = [
  {
    name: 'Amaka O.',
    location: 'Ikeja, Lagos',
    rating: 5,
    text: 'I ordered egusi soup from Choplife on a Sunday afternoon and it arrived in under 35 minutes, still steaming. It tasted exactly like home. I\'ve reordered three times since.',
    vendor: 'Choplife',
    avatar: '🧕',
  },
  {
    name: 'Tunde B.',
    location: 'Surulere, Lagos',
    rating: 5,
    text: 'BK 46\'s grilled chicken platter is unreal. I usually dread waiting for food delivery but Light House has genuinely changed that. The app is clean, the process is simple, and the food always shows up on time.',
    vendor: 'BK 46',
    avatar: '👨🏾',
  },
  {
    name: 'Chinyere A.',
    location: 'Lekki, Lagos',
    rating: 5,
    text: 'Five Star Bevery\'s zobo is the best I\'ve had outside of my mum\'s kitchen. Cold, gingery, perfectly sweetened. I order it at least twice a week now.',
    vendor: 'Five Star Bevery',
    avatar: '👩🏾',
  },
  {
    name: 'Emeka N.',
    location: 'Yaba, Lagos',
    rating: 5,
    text: 'DAPS Kitchen served native jollof at 8pm on a Tuesday and it was perfect. The rider was polite and on time. Can\'t ask for more than that.',
    vendor: 'DAPS Kitchen',
    avatar: '🧔🏾',
  },
  {
    name: 'Funmi L.',
    location: 'Ajah, Lagos',
    rating: 5,
    text: 'I used to cook every day because I didn\'t trust delivery apps. Light House changed that. The vendors actually care about the food they put out and it shows.',
    vendor: 'Bissy Joy',
    avatar: '👩🏽',
  },
];

export function TestimonialsAndFAQ() {
  const [currentT, setCurrentT] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: 'left' | 'right' = 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrentT(index);
      setIsAnimating(false);
    }, 380);
  }, [isAnimating]);

  const next = useCallback(() => goTo((currentT + 1) % testimonials.length, 'right'), [currentT, goTo]);
  const prev = useCallback(() => goTo((currentT - 1 + testimonials.length) % testimonials.length, 'left'), [currentT, goTo]);

  const resetTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (autoTimer.current) clearInterval(autoTimer.current);
    inactivityTimer.current = setTimeout(() => {
      autoTimer.current = setInterval(next, 5000);
    }, 8000);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [resetTimer]);

  const slideClass = isAnimating
    ? direction === 'right' ? 'translate-x-[-4%] opacity-0' : 'translate-x-[4%] opacity-0'
    : 'translate-x-0 opacity-100';

  const t = testimonials[currentT];

  return (
    <>
      {/* ──────────── TESTIMONIALS CAROUSEL ──────────── */}
      <section className="py-20 sm:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-14">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-3">Real People · Real Orders</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              What our customers say
            </h2>
          </div>

          {/* Slide */}
          <div className={`transition-all duration-[380ms] ease-out ${slideClass}`}>
            <div className="bg-white/70 border border-amber-100 backdrop-blur-sm rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-lg">
              <Quote className="w-10 h-10 text-amber-400 mb-6" />

              <p className="text-slate-800 text-xl sm:text-2xl leading-relaxed font-light">
                "{t.text}"
              </p>

              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-slate-500 text-sm">ordered from <span className="text-amber-600 font-semibold">{t.vendor}</span> · {t.location}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={() => { resetTimer(); prev(); }}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-amber-200 flex items-center justify-center text-slate-700 transition-all shadow-sm">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { resetTimer(); goTo(i, i > currentT ? 'right' : 'left'); }}
                  className={`rounded-full transition-all duration-300 ${i === currentT ? 'w-6 h-2 bg-amber-500' : 'w-2 h-2 bg-amber-300 hover:bg-amber-400'}`} />
              ))}
            </div>
            <button onClick={() => { resetTimer(); next(); }}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-amber-200 flex items-center justify-center text-slate-700 transition-all shadow-sm">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ──────────── FAQ ──────────── */}
      <section className="bg-white py-20 sm:py-28 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Got questions?</p>
            <h2 className="text-4xl font-extrabold text-slate-900">Things people ask us</h2>
            <p className="text-slate-500 mt-3">
              The stuff that usually comes up before a first order — answered honestly.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-6">{item.q}</span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${openFAQ === i ? 'bg-primary text-white rotate-45' : 'bg-slate-100 text-slate-500'}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                {openFAQ === i && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
