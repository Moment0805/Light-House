import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingCart } from './FloatingCart';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
        <FloatingCart />
      </main>
      <Footer />
    </div>
  );
}
