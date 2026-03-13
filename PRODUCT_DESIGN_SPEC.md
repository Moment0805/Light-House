# Light House Logistics - Food Ordering Platform
## Product Design & Implementation Specification

---

## 🎯 Project Overview

**Light House Logistics** is a modern, warm, and comfort-focused food ordering web application designed to provide seamless food delivery experiences with an emphasis on trust, convenience, and smooth user interactions.

### Brand Identity
- **Name:** Light House Logistics
- **Tagline:** Delivering comfort, convenience, and trust
- **Mission:** Connect users with trusted food vendors through a premium yet simple ordering experience

---

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Background:** `#FAF7F2` (Warm Cream)
- **Foreground:** `#1E293B` (Dark Navy/Slate)
- **Card:** `#FFFFFF` (Pure White)

#### Accent & Interactive
- **Primary Accent:** `#F59E0B` (Amber/Gold)
- **Success:** `#10B981` (Muted Green)
- **Warning:** `#F97316` (Muted Orange)
- **Destructive:** `#EF4444` (Soft Red)

#### Neutral Tones
- **Muted Background:** `#E7E5E0`
- **Muted Foreground:** `#64748B`
- **Border:** `rgba(30, 41, 59, 0.1)` (Subtle transparency)

### Typography
- **Font:** System fonts (optimized for readability)
- **Hierarchy:**
  - H1: 2xl, medium weight
  - H2: xl, medium weight
  - H3: lg, medium weight
  - Body: base, normal weight
  - Labels: base, medium weight

### Spacing & Layout
- **Border Radius:** `1rem` (16px) - Generous rounding for comfort
- **Shadow:** Soft, subtle shadows for depth
- **Spacing:** Comfortable padding and margins throughout

### Design Principles
1. **Warmth:** Cream backgrounds, amber accents
2. **Comfort:** Rounded corners, soft shadows
3. **Clarity:** Clear hierarchy, readable typography
4. **Trust:** Professional layout, consistent patterns
5. **Accessibility:** Good contrast, clear interactions

---

## 📱 Application Structure

### Page Inventory (15 Screens)

#### 1. **Home Page** (`/`)
- Hero section with brand messaging
- Feature highlights (Fast Delivery, Trusted Partners, Made with Care, Track Orders)
- Call-to-action buttons
- Responsive grid layout
- **States:** Public view, Authenticated view

#### 2. **Sign Up** (`/signup`)
- Full name, email, password fields
- Password confirmation
- Form validation
- Link to login
- **Features:** Error handling, loading states

#### 3. **Login** (`/login`)
- Email and password fields
- Forgot password link
- Remember me option
- Link to signup
- **Features:** Authentication flow, error messaging

#### 4. **Forgot/Reset Password** (`/forgot-password`)
- Email input
- Success confirmation screen
- Back to login link
- **Features:** Email validation, success state

#### 5. **Vendors Listing** (`/vendors`) - Protected
- Grid layout of vendor cards
- Search functionality (name, cuisine, description)
- Vendor information: rating, delivery time, fees
- **Features:** Filtering, responsive grid

#### 6. **Vendor Menu** (`/vendors/:vendorId`) - Protected
- Vendor header with image and details
- Menu items grouped by category
- Add to cart functionality
- Item availability indicators
- **Features:** Dynamic menu loading, cart integration

#### 7. **Cart Page** (`/cart`) - Protected
- Cart items with images
- Quantity controls (+/-)
- Remove item option
- Order summary sidebar
- Empty cart state
- **Features:** Real-time calculations, persistent storage

#### 8. **Checkout** (`/checkout`) - Protected
- Delivery address form
- Phone number input
- Delivery notes field
- Payment method display (OPay)
- Order summary
- **Features:** Form validation, local storage

#### 9. **Payment Processing** (`/payment/processing`) - Protected
- Loading animation
- OPay integration messaging
- Processing steps indicator
- **Features:** Auto-redirect after 3 seconds

#### 10. **Payment Success** (`/payment/success`) - Protected
- Success confirmation icon
- Order ID display
- Payment details
- Track order CTA
- View all orders link
- **Features:** Cart clearing, order creation

#### 11. **Payment Failure** (`/payment/failure`) - Protected
- Error icon and messaging
- Common issues list
- Retry payment button
- Support contact link
- **Features:** Error handling, retry flow

#### 12. **Order History** (`/orders`) - Protected
- List of all orders
- Order status badges
- Order date and time
- Order total
- View details link
- Empty state
- **Features:** Chronological listing, status filtering

#### 13. **Order Tracking** (`/orders/:orderId/track`) - Protected
- Order status timeline
- Current status highlight
- Order items summary
- Delivery address display
- Payment information
- **Features:** Visual progress indicator, real-time updates (mock)

#### 14. **User Profile** (`/profile`) - Protected
- Profile information display
- Edit profile form
- Default address management
- Logout button
- **Features:** Form updates, profile management

#### 15. **404 Not Found** (`*`)
- Error message
- Home button
- Clean, minimal design

---

## 🧩 Reusable Components

### Layout Components
1. **Navbar**
   - Logo with icon
   - Navigation links (Vendors, Orders)
   - Cart with item count badge
   - User menu dropdown
   - Mobile hamburger menu
   - Responsive design

2. **Footer**
   - Brand information
   - Quick links
   - Social media icons
   - Contact information

3. **Layout**
   - Page wrapper with navbar and footer
   - Outlet for route rendering

### Card Components
1. **VendorCard**
   - Vendor image (aspect-video)
   - Name and description
   - Rating with star icon
   - Delivery time and fee
   - Cuisine badge
   - Minimum order display
   - Hover effects

2. **MenuItemCard**
   - Item image (square)
   - Name and description
   - Price display
   - Add to cart button
   - Availability indicator
   - Quantity in cart

### UI Components
1. **OrderStatusBadge**
   - Color-coded by status
   - Icon per status type
   - Labels: Pending, Confirmed, Preparing, On the Way, Delivered, Cancelled

2. **EmptyState**
   - Icon display
   - Title and description
   - Optional action button
   - Used for: Empty cart, No orders, No vendors

3. **LoadingSpinner**
   - Animated loader icon
   - Size variants (sm, md, lg)
   - Optional text

4. **ProtectedRoute**
   - Authentication check
   - Redirect to login if unauthenticated

### Form Components
- Input (with icons)
- Label
- Button (variants: default, outline, ghost)
- Textarea
- Card wrapper

---

## 🔐 Authentication & State Management

### Auth Context (`AuthContext.tsx`)
- User state management
- Login/logout functionality
- Signup flow
- Password reset
- localStorage persistence
- **Mock Implementation:** Ready for NestJS backend integration

### Cart Context (`CartContext.tsx`)
- Cart items state
- Add/remove items
- Update quantity
- Clear cart
- Total calculation
- Item count
- localStorage persistence

### Protected Routes
- Authentication guard
- Automatic redirect to login
- Session persistence

---

## 💾 Data Models

### Vendor
```typescript
{
  id: string
  name: string
  description: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  minimumOrder: number
}
```

### MenuItem
```typescript
{
  id: string
  vendorId: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
}
```

### Order
```typescript
{
  id: string
  userId: string
  vendorId: string
  vendorName: string
  items: Array<{
    menuItemId: string
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled'
  createdAt: string
  deliveryAddress: string
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed'
}
```

### CartItem
```typescript
{
  id: string
  menuItemId: string
  vendorId: string
  name: string
  price: number
  quantity: number
  image: string
  vendorName: string
}
```

### User
```typescript
{
  id: string
  email: string
  name: string
  phone?: string
}
```

---

## 🎯 User Flows

### New User Registration & First Order
1. Land on home page
2. Click "Sign Up"
3. Fill registration form
4. Auto-redirect to vendors page
5. Browse vendors
6. Select vendor → View menu
7. Add items to cart
8. Proceed to checkout
9. Fill delivery details
10. Pay with OPay
11. Payment processing
12. Success confirmation
13. Track order

### Returning User Order
1. Land on home page
2. Click "Log In"
3. Enter credentials
4. Browse vendors
5. Quick add to cart
6. Checkout (pre-filled address)
7. Pay
8. Track order

### Order Tracking
1. Navigate to Orders
2. View order history
3. Click order to track
4. View real-time status
5. See delivery details

---

## 💳 Payment Integration (OPay)

### Mock Implementation
- Current: Simulated OPay payment flow
- Processing screen with 3-second delay
- Random success/failure (80% success rate for demo)

### Production Integration Points
**Ready for NestJS backend:**

1. **Checkout Endpoint**
   ```
   POST /api/orders/checkout
   Body: { items, total, deliveryAddress, phone, notes }
   Returns: { orderId, paymentUrl }
   ```

2. **OPay Payment Gateway**
   - Redirect to OPay cashier
   - Merchant reference generation
   - Webhook for payment confirmation

3. **Order Confirmation**
   ```
   POST /api/orders/:orderId/confirm
   Body: { paymentReference, status }
   Returns: { order, status }
   ```

4. **Payment Verification**
   ```
   GET /api/payments/:reference/verify
   Returns: { status, amount, orderId }
   ```

---

## 📊 Features & Functionality

### Core Features
- ✅ User authentication (signup, login, logout, password reset)
- ✅ Vendor browsing with search
- ✅ Menu viewing by vendor
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ OPay payment integration (mock)
- ✅ Order tracking
- ✅ Order history
- ✅ User profile management

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states
- ✅ Empty states
- ✅ Error states
- ✅ Form validation
- ✅ Toast notifications
- ✅ Smooth animations
- ✅ Hover effects
- ✅ Protected routes

### Data Persistence
- ✅ localStorage for cart
- ✅ localStorage for auth session
- ✅ Mock data for vendors and menus
- 🔄 Ready for backend integration

---

## 🛠 Technical Stack

### Frontend
- **Framework:** React 18.3.1
- **Routing:** React Router 7.13.0
- **Styling:** Tailwind CSS 4.1.12
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Animations:** Motion (Framer Motion successor)
- **Notifications:** Sonner
- **Build Tool:** Vite 6.3.5

### State Management
- React Context API
- localStorage for persistence

### Form Handling
- React Hook Form 7.55.0
- Native validation

### Date Formatting
- date-fns 3.6.0

---

## 🚀 Backend Integration Guide (NestJS)

### Required API Endpoints

#### Authentication
```
POST /auth/signup
POST /auth/login
POST /auth/logout
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
```

#### Vendors
```
GET  /vendors
GET  /vendors/:id
GET  /vendors/:id/menu
```

#### Orders
```
POST /orders
GET  /orders
GET  /orders/:id
PATCH /orders/:id/status
```

#### Payments (OPay)
```
POST /payments/initiate
POST /payments/webhook
GET  /payments/:reference/verify
```

#### User Profile
```
GET  /users/profile
PATCH /users/profile
```

### Environment Variables Needed
```env
OPAY_MERCHANT_ID=
OPAY_PUBLIC_KEY=
OPAY_SECRET_KEY=
OPAY_CALLBACK_URL=
API_BASE_URL=
```

---

## 📋 Testing Scenarios

### Authentication
- [ ] Sign up with new email
- [ ] Login with existing credentials
- [ ] Logout
- [ ] Forgot password flow
- [ ] Invalid credentials handling

### Shopping Flow
- [ ] Browse vendors
- [ ] Search vendors
- [ ] View vendor menu
- [ ] Add items to cart
- [ ] Update cart quantities
- [ ] Remove from cart
- [ ] Cart persistence across sessions

### Checkout & Payment
- [ ] Fill delivery details
- [ ] Submit order
- [ ] Payment processing
- [ ] Payment success
- [ ] Payment failure
- [ ] Retry payment

### Order Management
- [ ] View order history
- [ ] Track active order
- [ ] View order details
- [ ] Order status updates

### Profile
- [ ] View profile
- [ ] Update profile information
- [ ] Update default address

---

## 🎨 Design Assets

### Images
All images sourced from Unsplash:
- Hero images
- Vendor photos
- Menu item photos
- Feature illustrations

### Icons
Lucide React icon set:
- Lightbulb (brand logo)
- Shopping cart
- User profile
- Navigation icons
- Status icons
- Action icons

---

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile Optimizations
- Hamburger menu
- Stacked layouts
- Touch-friendly buttons
- Simplified navigation

### Desktop Features
- Multi-column layouts
- Hover effects
- Dropdown menus
- Sticky elements

---

## ✅ Implementation Checklist

### Phase 1: Foundation ✅
- [x] Design system setup
- [x] Theme configuration
- [x] Component library setup
- [x] Routing structure

### Phase 2: Authentication ✅
- [x] Auth context
- [x] Login page
- [x] Signup page
- [x] Forgot password
- [x] Protected routes

### Phase 3: Core Features ✅
- [x] Vendors listing
- [x] Vendor menu
- [x] Cart functionality
- [x] Checkout flow

### Phase 4: Payment & Orders ✅
- [x] Payment processing
- [x] Success/failure pages
- [x] Order history
- [x] Order tracking

### Phase 5: Profile & Polish ✅
- [x] User profile
- [x] Empty states
- [x] Loading states
- [x] Error handling

### Phase 6: Backend Integration 🔄
- [ ] Connect to NestJS API
- [ ] Replace mock data
- [ ] OPay integration
- [ ] Real-time updates
- [ ] Error handling
- [ ] Data validation

---

## 🔮 Future Enhancements

### Features
- Push notifications for order updates
- Favorite vendors
- Reorder from history
- Multiple delivery addresses
- Promo codes and discounts
- Ratings and reviews
- Live chat support
- Order scheduling

### Technical
- Server-side rendering (Next.js migration)
- Progressive Web App (PWA)
- Real-time order tracking with WebSocket
- Image optimization
- Performance monitoring
- Analytics integration

---

## 📞 Support & Documentation

### For Developers
- Component documentation in code
- TypeScript types for all models
- Consistent naming conventions
- Code comments for complex logic

### For Designers
- Figma design system (can be created)
- Component variants
- Spacing system
- Color tokens

---

## 🎉 Summary

**Light House Logistics** is a production-ready food ordering platform with:
- ✅ 15 complete screens
- ✅ Warm, modern design system
- ✅ Full user authentication
- ✅ Shopping cart functionality
- ✅ Order tracking
- ✅ Mock OPay payment integration
- ✅ Responsive design
- ✅ Ready for NestJS backend integration

The application emphasizes **comfort**, **convenience**, and **trust** through thoughtful design choices, smooth interactions, and clear user flows.

---

**Built with ❤️ for seamless food delivery experiences**
