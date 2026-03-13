# Light House Logistics - Developer Implementation Guide

## 🚀 Quick Start

This guide provides practical instructions for developers to build the Light House Logistics food ordering platform.
**Tech Stack:**
- **Frontend:** Next.js (App Router), React, Tailwind CSS, TypeScript
- **Backend:** NestJS, TypeScript, PostgreSQL (Prisma)
- **Payment Gateway:** OPay Cashier Integration

---

## 📁 Frontend Project Structure (Next.js)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (protected)/
│   │   ├── layout.tsx         # Auth guard & main layout
│   │   ├── vendors/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx  # Vendor menu
│   │   ├── checkout/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   └── profile/page.tsx
│   ├── layout.tsx             # Root layout (Providers, Fonts)
│   └── page.tsx               # Landing page
├── components/
│   ├── ui/                    # Reusable Tailwind components (Buttons, Inputs, Cards)
│   ├── layout/                # Navbar, Footer, Sidebar
│   └── features/              # VendorCard, MenuItemCard, CartItem
├── lib/
│   ├── store/                 # Zustand or Context for Cart & Auth
│   ├── utils.ts               # Tailwind merge & utility functions
│   └── api.ts                 # Axios/Fetch interceptors for backend
└── styles/
    └── globals.css            # Tailwind directives and base CSS variables
```

---

## 📁 Backend Project Structure (NestJS)

```
src/
├── auth/                      # JWT authentication, login, register
├── users/                     # User management & profiles
├── vendors/                   # Vendor listing & menus
├── orders/                    # Order processing & history
├── payments/                  # OPay integration & webhooks
└── common/                    # Guards, interceptors, filters
```

---

## 🎨 Next.js Design System & Tailwind

### Colors & Theming
We use Tailwind CSS variables to support the comforting "Light House" aesthetic.

**`tailwind.config.ts` setup:**
```typescript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF9',      // Warm cream
        foreground: '#0F172A',      // Dark navy
        primary: {
          DEFAULT: '#F59E0B',       // Amber / Gold (Light House glow)
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#94A3B8',       // Gray
          foreground: '#0F172A',
        },
        success: '#22C55E'          // Green for success/food highlights
      },
      borderRadius: {
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      }
    }
  }
}
```

---

## 🔐 Authentication (Frontend)

We will use a custom React Context or Zustand store combined with JWT tokens from the NestJS backend.

**Protected Routes in App Router:**
In Next.js App Router, you can protect routes by adding layout wrappers or using Middleware.

*Example Middleware (`src/middleware.ts`):*
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('lhl_token')?.value
  
  if (!token && request.nextUrl.pathname.startsWith('/vendors')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/vendors/:path*', '/checkout', '/orders/:path*', '/profile'],
}
```

---

## 🛒 Shopping Cart Management

Use `zustand` for a globally accessible, persistent shopping cart.

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStore {
  items: CartItem[];
  vendorId: string | null;
  addItem: (item: CartItem, vendorId: string) => void;
  clearCart: () => void;
  // ...
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      vendorId: null,
      addItem: (item, vendorId) => {
        const currentVendorId = get().vendorId;
        // Business Rule: Can only order from one vendor at a time
        if (currentVendorId && currentVendorId !== vendorId) {
          throw new Error("Different vendor");
        }
        // Add item logic...
      },
      clearCart: () => set({ items: [], vendorId: null }),
    }),
    { name: 'lhl-cart' }
  )
);
```

---

## 💳 OPay Payment Integration

The flow between Next.js frontend and NestJS backend for OPay Cashier:

1. **Frontend:** User clicks "Pay Now" on the checkout page. Next.js triggers a POST request to the NestJS backend `/payments/initiate`.
2. **Backend (NestJS):** Generates an OPay payload, calls the OPay Cashier API to create the transaction, and returns the `cashierUrl`.
3. **Frontend:** Next.js redirects the window to `cashierUrl`.
4. **OPay:** User completes the payment on OPay's screen.
5. **Backend (NestJS Webhook):** OPay sends a server-to-server webhook to `/payments/webhook`. NestJS verifies the signature and updates the order status to `PAID`.

---

## 🧪 Testing and Getting Started

### Local Setup (Frontend)
1. `npm install`
2. Configure `.env.local`
3. `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

### Production Build
`npm run build && npm run start`

---

## ✅ Pre-Production Checklist
- [ ] Implement Server-Side Rendering (SSR) for Vendors listing
- [ ] Connect Authentication to NestJS endpoints
- [ ] Test OPay Cashier sandbox
- [ ] Validate responsive design on mobile and desktop
- [ ] Finalize UI animations (Framer Motion)
