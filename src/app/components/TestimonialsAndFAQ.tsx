'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const faqs = [
  {
    q: 'How long does delivery usually take?',
    a: "Honestly it depends on where you are and how busy the vendor is, but most orders get to you in 20 to 40 minutes. When you check out you'll see an estimated time — it's usually pretty accurate.",
  },
  {
    q: 'Can I order from more than one vendor at once?',
    a: "Not yet — each order is tied to one vendor for now. It's mainly to make sure your food stays hot and doesn't sit around waiting. We know it's a limitation and we're working on it.",
  },
  {
    q: 'How do I pay?',
    a: "We use Paystack, so you can pay with your card, bank transfer, or USSD — whatever works for you. It's the same checkout flow you'd see on most Nigerian apps, so nothing unfamiliar.",
  },
  {
    q: "A vendor shows as closed — what do I do?",
    a: "Vendors set their own hours, so sometimes they're just not open yet or they've closed for the day. You can check back later or just pick a different vendor. We're also looking at adding a \"notify me when open\" option.",
  },
  {
    q: 'What if I need to cancel after ordering?',
    a: "You have a small window — about 2 minutes — right after placing the order. Once the kitchen picks it up we can't pull it back. If something goes wrong though, just message support and we'll sort it out.",
  },
];

const testimonials = [
  {
    name: 'Victor O.',
    location: 'Westend, KWASU Malate',
    rating: 5,
    text: "Ordered egusi and fufu from Choplife on a Sunday when I was too tired to go out. It came in like 32 minutes and was still hot. Genuinely tasted like something my aunt would make. I've ordered from them 4 times since.",
    vendor: 'Choplife',
    avatar: '/Victor.jpeg',
  },
  {
    name: 'Moment',
    location: 'Safari, KWASU Malate',
    rating: 5,
    text: "BK 46 grilled chicken is not a joke. I wasn't even expecting much the first time but it came well packaged and the portion was actually worth the price. Light House is the only delivery app I actually trust on campus.",
    vendor: 'BK 46',
    avatar: '/Moment.jpeg',
  },
  {
    name: 'Emmanuel A.',
    location: 'Safari, KWASU Malate',
    rating: 5,
    text: "I ordered from DAPS Kitchen during a late night study session and it came faster than I expected. Food was hot, packaging was intact, and the tracker actually worked — I could see when the rider left. Small thing but it made a difference.",
    vendor: 'DAPS Kitchen',
    avatar: '/Emmanuel.jpeg',
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
              <Quote className="w-4 h-4 text-amber-400 mb-4" />

              <p className="text-slate-800 text-xl sm:text-2xl leading-relaxed font-light">
                "{t.text}"
              </p>

              <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-slate-500 text-sm">ordered from <span className="text-amber-600 font-semibold">{t.vendor}</span> · {t.location}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
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
