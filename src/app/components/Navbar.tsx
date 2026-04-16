import { Link, useLocation } from 'react-router';
import { ShoppingCart, User, Menu, X, LogOut, Package, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-32 h-30">
              <img src="/bogaad.svg" alt="Bogaad Logo" className="w-full h-full object-cover" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated && (
              <>
                <Link
                  to="/vendors"
                  className={`text-sm transition-colors ${
                    isActive('/vendors')
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  Vendors
                </Link>
                <Link
                  to="/orders"
                  className={`text-sm transition-colors ${
                    isActive('/orders')
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  Orders
                </Link>
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative hover:bg-muted"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted">
                      <User className="w-5 h-5" />
                      <span className="text-sm">{user?.firstName}</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && isAuthenticated && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <Link
                to="/vendors"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/vendors')
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-muted'
                }`}
              >
                Vendors
              </Link>
              <Link
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/orders')
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-muted'
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                Orders
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive('/profile')
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-muted'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg text-left text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
