# Bogaad - UI/UX Product Scope & Screen Flow

## 1. Brand Background & Design Direction

### 1.1 Brand Identity
**Bogaad** stands for comfort, ease, convenience, reliability, and smooth food ordering. The brand experience should feel:
- **Warm & Trustworthy:** Reassuring users that their food is in good hands.
- **Calm & Easy:** A stress-free, frictionless ordering process.
- **Guided & Safe:** Subtly connecting to the comfort aspect by offering clear navigation and reliable service.

### 1.2 Overall Style Direction
- **Aesthetic:** Modern, minimal but rich, soft, and comforting.
- **Shapes:** Rounded cards and buttons (soft radii like `lg` or `xl` to evoke friendliness).
- **Spacing:** Clean, open spacing to prevent visual clutter and reduce cognitive load.
- **Shadows:** Subtle, soft drop shadows to create depth without harshness.
- **Typography:** Elegant, highly readable sans-serif (e.g., Inter, Outfit, or Poppins) with smooth hierarchical contrast.
- **Imagery:** Friendly, appetizing food photography and custom lifestyle illustrations.

### 1.3 Color Palette
- **Backgrounds:** Warm cream (`#FAFAF9` or `#FFFDF8`) or soft white for primary surfaces. Card backgrounds in pure white (`#FFFFFF`).
- **Primary / Trust:** Deep navy (`#0F172A`) or dark slate for primary text, headings, and structural elements.
- **Accent (The "Bogaad" glow):** Warm gold or amber (`#F59E0B` or `#D97706`) for primary CTAs, active states, and highlights.
- **Secondary / Action:** Soft green (`#22C55E` or `#10B981`) for success states and food/order highlights.
- **Neutrals:** Soft grays (`#94A3B8`, `#cbd5e1`) for secondary text, borders, and disabled states.

---

## 2. Technical Architecture Context
- **Frontend Stack:** Next.js (App Router) + Tailwind CSS + Framer Motion (for subtle micro-actions).
- **Backend Stack:** NestJS.
- **Payment Integration:** OPay Cashier Flow.
- **State Management:** React Context or Zustand (Cart, Auth User).
- **Styling Method:** Tailwind CSS overriding default configs (`tailwind.config.ts`) to establish the color/radius/typography design system.

---

## 3. Information Architecture & Navigation

### Desktop Navigation (Sticky Navbar)
- **Left:** Brand Logo (Bogaad)
- **Center:** Home | Vendors (Protected) | Orders | About Us
- **Right (Logged Out):** Log In (Text) | Create Account (Button)
- **Right (Logged In):** Profile Dropdown | Slide-out Cart (with item badge)

### Mobile Navigation
- **Top Bar:** Brand Logo | Cart Icon (with badge) | Hamburger Menu Menu
- **Bottom Tab Bar (Logged In):** Home | Vendors | Orders | Profile
- **Side Drawer:** Full menu links, Auth options.

---

## 4. UI/UX Screen Flow & Page Details

### 4.1 Landing / Home Page (Public)
**Purpose:** Introduce brand, emphasize comfort, drive conversion.
- **Hero Section:** Large, warm lifestyle image or 3D illustration. Headline: "Comfort delivered to your door." Subtext: "The easiest, most reliable way to order your favorite meals." CTAs: [Create Account] (Primary Amber), [Log In] (Secondary Outline).
- **How it Works:** 3-step vertical or horizontal flow. (1) Choose Vendor (2) Select Meal (3) Fast & Reliable Delivery.
- **Why Choose Us:** Features grid emphasizing reliability, speed, and comfort.
- **Trusted Vendors Preview:** A carousel or grid of 3-4 top-rated vendors.
- **Social Proof:** Clean testimonial cards featuring user avatars and rating stars.
- **FAQ & Footer:** Common questions, useful links, social icons.

### 4.2 Authentication Flow (Public)
**Design:** Clean, centered auth cards on a warm cream background. Split screen on desktop with a comforting food/lifestyle image on one side.

**Sign Up Page:**
- Fields: Full Name, Email, Phone Number, Password, Confirm Password.
- Toggles: Password visibility (eye icon).
- Validation: Inline real-time validation states (Red for error, Green for success).
- CTAs: [Create Account] (Primary)
- Links: "Already have an account? Log in."

**Log In Page:**
- Fields: Email or Phone Number, Password.
- CTAs: [Log In] (Primary)
- Links: "Forgot Password?", "Don't have an account? Sign up."

**Forgot/Reset Password Flow:**
- Pages for Forgot password, Reset password form, and Success state confirmation.

### 4.3 Protected Vendors Listing Page (Auth Required)
**Purpose:** Browse and discover restaurants.
- **Top Nav:** Search bar ("What are you craving?"), Category pills (e.g., All, Local, Intercontinental, Healthy).
- **Welcome Header:** "Good afternoon, [Name]. What's for lunch?"
- **Vendor Grid:** Responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop).
- **Vendor Card Component:**
  - Image cover placeholder (rounded top).
  - Vendor Logo (overlapping cover).
  - Title & Category tags.
  - Metrics: ⭐ 4.8 | 🕖 30-45 mins.
  - Short description.
  - CTA: [View Menu] (Subtle hover state).

### 4.4 Single Vendor / Vendor Details Page
**Purpose:** Menu browsing for a specific vendor.
- **Hero/Banner:** Full-width vendor image, overlaid with Vendor Name, Rating, and Delivery Time inside a clean glassmorphism card.
- **Category Tabs:** Sticky horizontal scrolling tabs (e.g., Starters, Mains, Drinks).
- **Menu Items Grid:**
- **Menu Item Card:**
  - Food image.
  - Name, Description (truncate at 2 lines), Price.
  - Action: [Add to Cart] button or Quantity selector.
  - State: Disabled overlay if sold out.
- **Cart Access:** 
  - Desktop: Sticky right sidebar showing cart summary.
  - Mobile: Floating bottom button "View Cart (3 items) - ₦4,500".

### 4.5 Slide-out Cart / Cart Page
**Purpose:** Order review before checkout.
- **Important UX Rule Enforcement:** "Users should order per vendor." If a user attempts to mix items from Vendor B with Vendor A, trigger a clean warning modal: "Start new order? Your cart contains items from [Vendor A]. Would you like to clear it and start an order with [Vendor B]?"
- **Content:**
  - Vendor Name header.
  - List of items with `[-] 1 [+]` quantity controls and remove (trash) icon.
  - Breakdown: Subtotal, Delivery Fee, Service Fee, Total.
  - CTA: [Proceed to Checkout] (Primary Amber).

### 4.6 Checkout Page
**Purpose:** Finalize delivery and payment.
- **Layout:** Two-column on desktop (Left: Details, Right: Summary).
- **Delivery Info Section:** Address selector/input, Contact Name/Phone.
- **Order Notes:** Optional text area.
- **Order Summary:** Final review of items and costs, confirm vendor name, Delivery ETA.
- **Payment Method Section:** Highlighted **OPay Cashier** option with secure/trusted badge styling.
- **Terms:** Checkbox or inline text acknowledgment.
- **CTA:** [Pay Now ₦X,XXX] with a lock icon.

### 4.7 Payment Processing / Redirect State
- **UI:** Full-screen modal or page takeover overlay.
- **Visuals:** Pulsing Bogaad logo or circular spinner.
- **Text:** "Securely redirecting to OPay..." followed by "Verifying your payment... Please don't close this window."

### 4.8 Order Success Page
- **Visuals:** Large, soft green checkmark or celebratory illustration.
- **Content:** "Order Confirmed!", Order ID: #LHL-12345.
- **Details:** Vendor Name, Items Summary, ETA (e.g., "Arriving in 35 mins").
- **CTAs:** [Track Order] (Primary), [Back to Vendors] (Secondary).

### 4.9 Order Failure / Payment Failed State
- **Visuals:** Soft red/orange warning icon.
- **Content:** "Payment Couldn't Be Processed."
- **Reason:** Friendly explanation for reassurance.
- **CTAs:** [Retry Payment] (Primary), [Back to Checkout] (Secondary), [Contact Support].

### 4.10 Orders History Page
- **Tabs:** Active Orders | Past Orders
- **Order Card:** Date, Vendor Logo, Vendor Name, Total Amount, Status Badge (e.g., `Delivered`, `Cancelled`).
- **Action:** [Reorder] button for past orders.

### 4.11 Order Tracking Page
- **Visuals:** Vertical timeline or horizontal stepper component.
  1. Order Placed (Checked)
  2. Payment Confirmed (Checked)
  3. Vendor Preparing (Active, pulsing ring)
  4. Rider Assigned / Dispatch Started
  5. Delivered
- **Details:** Vendor contact info, Delivery Address.
- **Action:** [Contact Support] button.

### 4.12 User Profile Page
- **Layout:** Sidebar nav on desktop, full page on mobile.
- **Sections:**
  - Personal Details (Forms to edit Name, Phone, Email).
  - Saved Addresses (List with Add/Edit/Delete actions).
  - Change Password.
  - Notification Preferences.
  - [Log Out] CTA.

---

## 5. UI Components System

To build with Tailwind CSS and Next.js, implement the following reusable UI components (`src/components/ui`):

1. **Button (`<Button />`):** Variants: `primary` (Amber), `secondary` (Outline/Gray), `ghost`, `destructive`. Sizes: `sm`, `md`, `lg`. Must support loading spinners.
2. **Input & Forms (`<Input />`):** Clean borders, soft focus states (amber ring), error (red ring).
3. **Card (`<Card />`):** Soft shadow (`shadow-md`), rounded corners (`rounded-2xl`).
4. **Badge (`<Badge />`):** Status indicators with matching background/text color combos (e.g., light green bg, dark green text for 'Delivered').
5. **Modal/Dialog (`<Modal />`):** Blurred backdrop (`backdrop-blur-sm`), centered card with entry/exit animations.
6. **Toast/Alert (`<Toast />`):** Slide-in notifications for actions like "Added to cart".
7. **Cards Specifics:** `VendorCard`, `MenuItemCard`, `CartItemRow`.

---

## 6. Empty States & Loading Skeletons
Always provide comforting context when data is missing:
- **Empty Cart:** Illustration of an empty bag. "Your cart feels a bit light. Let's add some comfort food!" CTA: [Browse Vendors].
- **No Vendors Available:** "We're currently expanding! No vendors available right now."
- **Failed Network/Error:** "Oops, we lost connection. Let's try that again."
- **Loading States:** Use soft, pulsing gray rectangles (`animate-pulse bg-slate-200`) mimicking the exact shape of vendor cards, menu items, and text blocks. Avoid generic full-page spinners when possible.

---

## 7. Next.js Routing Architecture Suggestions
Use Next.js App Router (`app/` directory) for clean URL structures:
- `app/page.tsx` (Landing)
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `app/(protected)/layout.tsx` (Enforces Auth, wraps Navbar/Footer)
  - `app/(protected)/vendors/page.tsx`
  - `app/(protected)/vendors/[id]/page.tsx`
  - `app/(protected)/checkout/page.tsx`
  - `app/(protected)/orders/page.tsx`
  - `app/(protected)/orders/[id]/page.tsx`
  - `app/(protected)/profile/page.tsx`
