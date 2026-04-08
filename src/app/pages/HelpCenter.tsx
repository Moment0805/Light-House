import { useState } from 'react';
import { Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';

export function HelpCenter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does delivery usually take?',
      answer: 'Delivery times vary depending on your location and the vendor, but our average delivery time is around 30-45 minutes.',
    },
    {
      question: 'Can I cancel my order?',
      answer: 'You can cancel your order before it has been accepted and dispatched by the vendor. Once dispatched, cancellations are no longer possible.',
    },
    {
      question: 'How do refunds work?',
      answer: 'If your order is cancelled before dispatch, or if an item is unavailable, we will process a refund automatically. Expect to see the funds in your account within 3-5 business days.',
    },
    {
      question: 'What if I have an issue with my payment?',
      answer: 'If you experience any payment failures, the order will not be processed. Please check with your bank or try a different payment method. If issues persist, contact our support team.',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 sm:py-24 flex flex-col items-center">
      <div className="max-w-2xl w-full px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Help Center</h1>
          <p className="text-lg text-slate-500">How can we assist you today?</p>
        </div>

        {/* Contact Support Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-sm border border-slate-100 mb-12">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Need direct help?</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">
            Our support team is always ready to help you with any issues or questions you might have.
          </p>
          <a href="mailto:support@lighthouse.ng">
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-14 px-8 text-base font-bold rounded-full shadow-lg">
              Email Support
            </Button>
          </a>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-slate-900 text-base">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-center text-white shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-slate-300 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Subscribe to our newsletter for the latest updates, offers, and news from Lighthouse Logistics.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-6 h-14 sm:h-12 rounded-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 flex-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Button type="submit" className="h-14 sm:h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-slate-900 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Subscribe
              </Button>
            </form>
            <div className="mt-4 h-6">
              {subscribed && (
                <p className="text-green-400 font-medium text-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  ✓ Thanks for subscribing! We'll be in touch.
                </p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
