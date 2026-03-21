import { Link } from 'react-router';
import { Heart, Truck, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import { HeroCarousel } from '../components/HeroCarousel';
import { AboutUs } from '../components/AboutUs';
import { TestimonialsAndFAQ } from '../components/TestimonialsAndFAQ';

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">

      {/* ─── 1. Hero Carousel ─── */}
      <HeroCarousel isAuthenticated={isAuthenticated} />

      {/* ─── 2. About Us ─── */}
      <AboutUs />

      {/* ─── 3. Our Story ─── */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Story</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Started small.<br />
                <span className="text-primary">Stayed real.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-5">
                Light House Logistics grew out of a real frustration — great food in Lagos was always nearby, but getting it to people reliably was a mess. We started by working with a handful of vendors we personally vouched for, building trust one order at a time.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                We still operate that way. No ghost kitchens, no shortcuts. Just honest vendors, dependable riders, and a platform that actually thinks about the person waiting at home.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="text-center">
                  <div className="w-11 h-11 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">10k+</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="w-11 h-11 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">8</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">Trusted Vendors</div>
                </div>
                <div className="text-center">
                  <div className="w-11 h-11 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">30 min</div>
                  <div className="text-xs font-medium text-slate-500 mt-1">Avg Delivery</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
                <img
                  src="/Delivery guy.jfif"
                  alt="Our Story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white px-7 py-5 rounded-2xl shadow-xl z-10">
                <p className="text-3xl font-extrabold">2+</p>
                <p className="text-sm text-white/80 mt-0.5 max-w-[140px]">Years of delivering comfort to your door</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Testimonials + FAQ ─── */}
      <TestimonialsAndFAQ />

      {/* ─── 5. CTA Banner ─── */}
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to order?
          </h2>
          <p className="text-slate-600 mt-3 text-base leading-relaxed">
            Skip the wait. Pick your vendor, add what you want, and we'll handle the rest.
          </p>
          <div className="mt-8">
            {isAuthenticated ? (
              <Link to="/vendors">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-14 px-10 text-base font-bold rounded-full shadow-lg">
                  See Our Vendors
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-14 px-10 text-base font-bold rounded-full shadow-lg">
                  Create a Free Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
