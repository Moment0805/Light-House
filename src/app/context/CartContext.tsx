import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService, CartItemResponse } from '../services/cart.service';
import { tokenStore } from '../lib/token.store';

export interface CartItem {
  id: string;
  menuItemId: string;
  vendorId: string;
  name: string;
  price: number;    // kobo
  quantity: number;
  image: string;
  vendorName: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (menuItemId: string) => Promise<void>;
  updateQuantity: (menuItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;        // kobo
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ── Helpers ───────────────────────────────────────────────────────
function toCartItem(r: CartItemResponse): CartItem {
  return {
    id: r.id,
    menuItemId: r.menuItemId,
    vendorId: r.vendorId,
    name: r.menuItem.name,
    price: r.menuItem.price,
    quantity: r.quantity,
    image: r.menuItem.imageUrl || '',
    vendorName: r.vendor.name,
  };
}

function guestGet(): CartItem[] {
  try { return JSON.parse(localStorage.getItem('lhl_cart') || '[]'); }
  catch { return []; }
}

function guestSet(items: CartItem[]) {
  localStorage.setItem('lhl_cart', JSON.stringify(items));
}

// ── Provider ──────────────────────────────────────────────────────
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = () => !!tokenStore.get();

  // Load cart on mount / auth change
  const loadCart = useCallback(async () => {
    if (isAuth()) {
      try {
        setIsLoading(true);
        const data = await cartService.get();
        setItems(data.map(toCartItem));
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems(guestGet());
    }
  }, []);

  useEffect(() => { loadCart(); }, [loadCart]);

  // Listen for logout — clear cart state
  useEffect(() => {
    const onLogout = () => setItems([]);
    window.addEventListener('auth:logout', onLogout);
    return () => window.removeEventListener('auth:logout', onLogout);
  }, []);

  // ── Cart actions ────────────────────────────────────────────
  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    if (isAuth()) {
      const data = await cartService.add(item.vendorId, item.menuItemId, 1);
      setItems(data.map(toCartItem));
    } else {
      const updated = guestGet();
      const idx = updated.findIndex((i) => i.menuItemId === item.menuItemId);
      if (idx >= 0) updated[idx].quantity += 1;
      else updated.push({ ...item, quantity: 1 });
      guestSet(updated);
      setItems([...updated]);
    }
  };

  const removeFromCart = async (menuItemId: string) => {
    if (isAuth()) {
      const data = await cartService.remove(menuItemId);
      setItems(data.map(toCartItem));
    } else {
      const updated = guestGet().filter((i) => i.menuItemId !== menuItemId);
      guestSet(updated);
      setItems(updated);
    }
  };

  const updateQuantity = async (menuItemId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(menuItemId); return; }
    if (isAuth()) {
      const data = await cartService.update(menuItemId, quantity);
      setItems(data.map(toCartItem));
    } else {
      const updated = guestGet().map((i) =>
        i.menuItemId === menuItemId ? { ...i, quantity } : i,
      );
      guestSet(updated);
      setItems(updated);
    }
  };

  const clearCart = async () => {
    if (isAuth()) {
      await cartService.clear();
    }
    guestSet([]);
    setItems([]);
  };

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
