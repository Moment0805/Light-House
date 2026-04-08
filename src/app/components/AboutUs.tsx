import { Truck, Smile, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const pillars = [
  {
    icon: Smile,
    title: 'Built on Comfort',
    body: 'Every decision we make starts with one question — does this make ordering easier and more comfortable for the people we serve?',
  },
  {
    icon: Truck,
    title: 'Delivered with Care',
    body: 'Our riders are trained to treat every order like it\'s heading to their own table. Prompt, polite, and present.',
  },
  {
    icon: ShieldCheck,
    title: 'Vendors You Can Trust',
    body: 'We only partner with kitchens we would eat from ourselves — quality, hygiene, and consistency are non-negotiable.',
  },
  {
    icon: Zap,
    title: 'Speed without Sacrifice',
    body: 'Fast doesn\'t mean careless. We have built the logistics infrastructure to be quick without ever cutting corners.',
  },
];

export function AboutUs() {
  return (
    <section className="bg-[#FAFAF9] py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top: label + heading ── */}
        <motion.div 
          className="max-w-2xl mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">About Light House</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            We don't just deliver food.<br />
            <span className="text-primary">We deliver comfort.</span>
          </h2>
          <p className="mt-5 text-slate-500 text-lg leading-relaxed">
            Light House Logistics started with a simple observation — ordering food should never feel stressful. 
            So we built a platform around the people, not the process.
          </p>
        </motion.div>

        {/* ── Split layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: image collage */}
          <motion.div 
            className="relative grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          >
            <div className="col-span-2 rounded-3xl overflow-hidden h-60 shadow-md">
              <img src="/hero-testimonial.jpeg" alt="Our team" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-40 shadow-sm">
              <img src="/Jollof Rice & Chicken.jfif" alt="Food" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-40 shadow-sm">
              <img src="/Egusi Soup.jfif" alt="Food" className="w-full h-full object-cover" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 left-4 bg-primary text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-3xl font-extrabold">10k+</p>
              <p className="text-sm text-white/80 mt-0.5">Orders delivered</p>
            </div>
          </motion.div>

          {/* Right: pillars */}
          <div className="grid sm:grid-cols-2 gap-6">
            {pillars.map(({ icon: Icon, title, body }, index) => (
              <motion.div 
                key={title} 
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", bounce: 0.4 }}
              >
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
