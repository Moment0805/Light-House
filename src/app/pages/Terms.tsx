import { Link } from 'react-router';

export function Terms() {
  return (
    <div className="min-h-screen bg-background py-16 sm:py-24 flex flex-col items-center">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Terms of Service</h1>
          <p className="text-lg text-slate-500">Effective Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 prose prose-slate prose-lg max-w-none text-slate-600">
          <p className="text-lg font-medium text-slate-700 mb-8 border-b border-slate-100 pb-8">
            Welcome to Bogaad. By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
            User Accounts
          </h2>
          <p className="pl-11 mb-8">
            To use certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate. You are responsible for safeguarding your password and for all activities that occur under your account. We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, not current, or incomplete, or if you misuse the platform.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
            Orders and Deliveries
          </h2>
          <p className="pl-11 mb-8">
            All orders are subject to availability and the delivery location. While we strive to ensure timely deliveries, provided delivery times are estimates only and are not guaranteed. You must provide correct and complete delivery details. Failure to do so may result in delivery delays or order cancellation.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span>
            Pricing and Payments
          </h2>
          <p className="pl-11 mb-8">
            Prices for products and services are subject to change without notice. Payment must be completed in full before your order is processed. If your payment fails or is rejected, your order will be automatically cancelled.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">4</span>
            Cancellations and Refunds
          </h2>
          <p className="pl-11 mb-8">
            You may cancel an order before it has been dispatched by the vendor. Refunds will be issued for failed deliveries caused by our end or if an ordered item is unavailable. Approved refunds will be processed within 3-5 business days, depending on your payment provider.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">5</span>
            Delivery Issues
          </h2>
          <p className="pl-11 mb-8">
            If a delivery fails because you are unreachable or provided incorrect delivery details, the order may be cancelled without a full refund, or you may be subject to additional delivery charges for a second attempt.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">6</span>
            Prohibited Use
          </h2>
          <p className="pl-11 mb-8">
            You agree not to use the platform for any unlawful purpose. Prohibited actions include, but are not limited to, fraud, creating fake orders, exploiting promotions, or any abuse of the system or our delivery personnel.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">7</span>
            Limitation of Liability
          </h2>
          <p className="pl-11 mb-8">
            Bogaad is not responsible for delays, service interruptions, or third-party issues beyond our reasonable control. Our liability is limited to the maximum extent permitted by law.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">8</span>
            Privacy
          </h2>
          <p className="pl-11 mb-8">
            Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and share your personal information.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">9</span>
            Updates to Terms
          </h2>
          <p className="pl-11 mb-8">
            We may update these terms from time to time. When we make material changes, we will notify you through the platform or via email. Continued use of the platform after updates constitutes your acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">10</span>
            Contact Us
          </h2>
          <p className="pl-11 mb-8">
            If you have any questions or concerns regarding these Terms of Service, please contact our support team at{' '}
            <a href="mailto:support@lighthouse.ng" className="text-primary font-bold hover:underline">
              support@lighthouse.ng
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
