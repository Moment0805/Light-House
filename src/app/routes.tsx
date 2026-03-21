import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GlobalError } from './components/GlobalError';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Vendors } from './pages/Vendors';
import { VendorMenu } from './pages/VendorMenu';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { PaymentProcessing } from './pages/PaymentProcessing';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentFailure } from './pages/PaymentFailure';
import { OrderHistory } from './pages/OrderHistory';
import { OrderTracking } from './pages/OrderTracking';
import { Profile } from './pages/Profile';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Page not found</p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: <GlobalError />,
    children: [
      { index: true, Component: Home },
      { path: 'signup', Component: SignUp },
      { path: 'login', Component: Login },
      { path: 'forgot-password', Component: ForgotPassword },
      { path: 'reset-password', Component: ResetPassword },
      {
        path: 'vendors',
        element: (
          <ProtectedRoute>
            <Vendors />
          </ProtectedRoute>
        ),
      },
      {
        path: 'vendors/:vendorId',
        element: (
          <ProtectedRoute>
            <VendorMenu />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment/processing',
        element: (
          <ProtectedRoute>
            <PaymentProcessing />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment/success',
        element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment/failure',
        element: (
          <ProtectedRoute>
            <PaymentFailure />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: 'orders/:orderId/track',
        element: (
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
