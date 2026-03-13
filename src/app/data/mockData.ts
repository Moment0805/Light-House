// ── Types ──────────────────────────────────────────────────────
export interface Vendor {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  openHours: string;
  category: 'Nigerian' | 'Drinks' | 'Groceries' | 'Continental' | 'Snacks' | 'Breakfast';
  badge?: string;
  badgeColor?: string;
}

export interface MenuItem {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

export interface Order {
  id: string;
  userId: string;
  vendorId: string;
  vendorName: string;
  items: Array<{
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

// ── Real Light House Vendors ────────────────────────────────────
export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'BK 46',
    description: 'Home of the boldest grills and signature burgers in town. Every bite is flame-kissed perfection.',
    image: '/Jollof Rice & Chicken.jfif',
    cuisine: 'Burgers & Grills',
    rating: 4.8,
    deliveryTime: '20–30 min',
    deliveryFee: 500,
    minimumOrder: 2000,
    isOpen: true,
    openHours: '8:00 AM – 10:00 PM',
    category: 'Nigerian',
    badge: 'Top Rated',
    badgeColor: 'bg-amber-500',
  },
  {
    id: '2',
    name: 'DAPS Kitchen',
    description: 'Rich, hearty Nigerian cuisine made the way mama intended. Comfort in every pot.',
    image: '/Nigerian Native Jollof Rice.jfif',
    cuisine: 'Nigerian Homestyle',
    rating: 4.7,
    deliveryTime: '25–35 min',
    deliveryFee: 500,
    minimumOrder: 2000,
    isOpen: true,
    openHours: '9:00 AM – 9:00 PM',
    category: 'Nigerian',
    badge: 'Fan Favourite',
    badgeColor: 'bg-green-600',
  },
  {
    id: '3',
    name: 'Tee Muchies',
    description: 'Quick, satisfying snacks and small plates for when hunger hits between meals.',
    image: '/Steamy Nigeria Jollof.jfif',
    cuisine: 'Snacks & Bites',
    rating: 4.6,
    deliveryTime: '15–25 min',
    deliveryFee: 300,
    minimumOrder: 1000,
    isOpen: true,
    openHours: '10:00 AM – 11:00 PM',
    category: 'Snacks',
    badge: 'Quick Delivery',
    badgeColor: 'bg-purple-600',
  },
  {
    id: '4',
    name: 'Five Star Bevery',
    description: 'Refreshing drinks, cold beverages, and fresh juices to quench every thirst.',
    image: '/WhatsApp Image 2026-03-10 at 16.21.27.jpeg',
    cuisine: 'Drinks & Beverages',
    rating: 4.9,
    deliveryTime: '10–20 min',
    deliveryFee: 300,
    minimumOrder: 500,
    isOpen: true,
    openHours: '7:00 AM – 11:00 PM',
    category: 'Drinks',
    badge: 'Best Drinks',
    badgeColor: 'bg-cyan-600',
  },
  {
    id: '5',
    name: 'Choplife',
    description: 'Authentic West African dishes bursting with flavour. Fufu, soups, and more cooked with tradition.',
    image: '/Egusi Soup.jfif',
    cuisine: 'West African',
    rating: 4.8,
    deliveryTime: '30–40 min',
    deliveryFee: 600,
    minimumOrder: 2500,
    isOpen: true,
    openHours: '11:00 AM – 9:00 PM',
    category: 'Nigerian',
    badge: 'Trending',
    badgeColor: 'bg-orange-500',
  },
  {
    id: '6',
    name: 'Arena Kitchen',
    description: 'A stadium of flavours with continental dishes and local classics for every palate.',
    image: '/25 Authentic Nigerian Dinner Recipes.jfif',
    cuisine: 'Continental & Local',
    rating: 4.5,
    deliveryTime: '25–35 min',
    deliveryFee: 600,
    minimumOrder: 2000,
    isOpen: false,
    openHours: '12:00 PM – 10:00 PM',
    category: 'Continental',
    badge: "Chef's Pick",
    badgeColor: 'bg-blue-600',
  },
  {
    id: '7',
    name: 'Bissy Joy',
    description: 'Start your day right with hearty breakfast bowls, light bites, and morning favourites.',
    image: '/Breakfast served by Chat GPT😍😋_   Prompt_ A….jfif',
    cuisine: 'Breakfast & Brunch',
    rating: 4.7,
    deliveryTime: '20–30 min',
    deliveryFee: 400,
    minimumOrder: 1500,
    isOpen: true,
    openHours: '6:00 AM – 2:00 PM',
    category: 'Breakfast',
    badge: 'Morning Special',
    badgeColor: 'bg-yellow-500',
  },
  {
    id: '8',
    name: 'Bukateria',
    description: 'Your neighbourhood supermart. Fresh groceries, staples, and everyday essentials delivered fast.',
    image: '/market.jpeg',
    cuisine: 'Supermart & Groceries',
    rating: 4.6,
    deliveryTime: '35–50 min',
    deliveryFee: 800,
    minimumOrder: 3000,
    isOpen: true,
    openHours: '8:00 AM – 8:00 PM',
    category: 'Groceries',
    badge: 'Supermart',
    badgeColor: 'bg-emerald-600',
  },
];

// ── Menu items keyed by vendor ID ───────────────────────────────
export const mockMenuItems: Record<string, MenuItem[]> = {
  '1': [
    { id: 'm1', vendorId: '1', name: 'Grilled Chicken & Jollof', description: 'Flame-grilled chicken thighs on a bed of seasoned jollof rice', price: 2500, image: '/Jollof Rice & Chicken.jfif', category: 'Main Course', available: true },
    { id: 'm2', vendorId: '1', name: 'Peppered Gizzard', description: 'Tender gizzard in a rich pepper sauce', price: 1800, image: '/Steamy Nigeria Jollof.jfif', category: 'Sides', available: true },
    { id: 'm3', vendorId: '1', name: 'Smoky Beef Suya', description: 'Thinly sliced beef skewers with suya spice', price: 2000, image: '/Nigerian Native Jollof Rice.jfif', category: 'Grills', available: true },
  ],
  '2': [
    { id: 'm4', vendorId: '2', name: 'Native Jollof Rice', description: 'Smoky native jollof with palm oil and assorted proteins', price: 2000, image: '/Nigerian Native Jollof Rice.jfif', category: 'Main Course', available: true },
    { id: 'm5', vendorId: '2', name: 'Egusi Soup & Pounded Yam', description: 'Traditional egusi soup with assorted meats', price: 2800, image: '/Egusi Soup.jfif', category: 'Soups', available: true },
    { id: 'm6', vendorId: '2', name: 'Ofe Onugbu & Fufu', description: 'Bitter leaf soup with smooth fufu', price: 2500, image: '/Making Nigerian Afang Soup Recipe - Dream Africa.jfif', category: 'Soups', available: true },
  ],
  '3': [
    { id: 'm7', vendorId: '3', name: 'Jollof & Moi Moi', description: 'Steamy jollof paired with homemade moi moi', price: 1800, image: '/Steamy Nigeria Jollof.jfif', category: 'Snacks', available: true },
    { id: 'm8', vendorId: '3', name: 'Puff Puff Bag', description: 'Deep-fried golden puff puffs, a bag of 10', price: 800, image: '/Steamy Nigeria Jollof.jfif', category: 'Snacks', available: true },
  ],
  '4': [
    { id: 'm9', vendorId: '4', name: 'Signature Fruit Punch', description: 'A tropical blend of seasonal fruits and ginger', price: 800, image: '/WhatsApp Image 2026-03-10 at 16.21.27.jpeg', category: 'Drinks', available: true },
    { id: 'm10', vendorId: '4', name: 'Chapman Special', description: 'Nigerian-style Chapman cocktail, chilled and garnished', price: 1000, image: '/WhatsApp Image 2026-03-10 at 16.21.27 (1).jpeg', category: 'Drinks', available: true },
    { id: 'm11', vendorId: '4', name: 'Zobo Delight', description: 'Chilled zobo infused with ginger, cloves, and pineapple', price: 700, image: '/WhatsApp Image 2026-03-10 at 16.21.28.jpeg', category: 'Drinks', available: true },
  ],
  '5': [
    { id: 'm12', vendorId: '5', name: 'Egusi Soup & Fufu', description: 'Rich egusi soup with stockfish and smoked turkey', price: 2800, image: '/Egusi Soup.jfif', category: 'Soups', available: true },
    { id: 'm13', vendorId: '5', name: 'Jollof Rice, Plantain & Chicken', description: 'Party jollof with fried plantain and smoky chicken', price: 3000, image: '/Jollof Rice & Chicken.jfif', category: 'Main Course', available: true },
  ],
  '6': [
    { id: 'm14', vendorId: '6', name: 'Mixed Continental Platter', description: 'Rice, stew, coleslaw, salad, and grilled protein', price: 3500, image: '/25 Authentic Nigerian Dinner Recipes.jfif', category: 'Main Course', available: true },
  ],
  '7': [
    { id: 'm15', vendorId: '7', name: 'Full Breakfast Combo', description: 'Eggs, sausage, baked beans, toast, and juice', price: 2200, image: '/Breakfast served by Chat GPT😍😋_   Prompt_ A….jfif', category: 'Breakfast', available: true },
    { id: 'm16', vendorId: '7', name: 'Akara & Pap', description: 'Crispy bean cakes with spiced pap (akamu)', price: 1000, image: '/Steamy Nigeria Jollof.jfif', category: 'Breakfast', available: true },
  ],
  '8': [
    { id: 'm17', vendorId: '8', name: 'Fresh Market Bundle', description: 'Weekly staples — tomatoes, peppers, onions, and proteins', price: 5000, image: '/market.jpeg', category: 'Groceries', available: true },
  ],
};

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    userId: '1',
    vendorId: '1',
    vendorName: 'BK 46',
    items: [{ menuItemId: 'm1', name: 'Grilled Chicken & Jollof', quantity: 2, price: 2500 }],
    total: 5500,
    status: 'delivered',
    createdAt: '2026-03-10T14:30:00Z',
    deliveryAddress: '123 Allen Avenue, Ikeja, Lagos',
    paymentMethod: 'OPay',
    paymentStatus: 'paid',
  },
  {
    id: 'ORD002',
    userId: '1',
    vendorId: '2',
    vendorName: 'DAPS Kitchen',
    items: [{ menuItemId: 'm4', name: 'Native Jollof Rice', quantity: 1, price: 2000 }],
    total: 2500,
    status: 'on-the-way',
    createdAt: '2026-03-12T12:15:00Z',
    deliveryAddress: '123 Allen Avenue, Ikeja, Lagos',
    paymentMethod: 'OPay',
    paymentStatus: 'paid',
  },
];
