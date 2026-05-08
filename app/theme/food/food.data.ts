import type { RestaurantStatus, MenuItemStatus } from '@/modules/domains/food/types';

export const CUISINE_TYPES = [
  'Italian',
  'Japanese',
  'Turkish',
  'Mexican',
  'Indian',
  'American',
  'Vegan',
];

export type RestaurantData = {
  restaurantId: string;
  name: string;
  slug: string;
  description: string;
  cuisineTypes: string[];
  address: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  minimumOrderAmount: number;
  deliveryFee: number;
  status: RestaurantStatus;
};

export type MenuItemData = {
  menuItemId: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  calories: number | null;
  isVegetarian: boolean;
  isVegan: boolean;
  status: MenuItemStatus;
};

export type OrderData = {
  orderId: string;
  orderNumber: string;
  restaurantName: string;
  restaurantId: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: string;
  orderStatus: 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'PICKED_UP' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  deliveryStatus: 'PENDING' | 'ASSIGNED' | 'PICKED_UP' | 'ON_THE_WAY' | 'DELIVERED' | 'FAILED';
  createdAt: string;
};

export const RESTAURANTS: RestaurantData[] = [
  {
    restaurantId: 'r-01',
    name: 'Bella Napoli',
    slug: 'bella-napoli',
    description: 'Authentic Neapolitan pizza and pasta made with imported Italian ingredients. Wood-fired oven, open kitchen.',
    cuisineTypes: ['Italian'],
    address: '12 Piazza Verde',
    city: 'New York',
    country: 'US',
    rating: 4.8,
    reviewCount: 312,
    deliveryTimeMin: 25,
    deliveryTimeMax: 40,
    minimumOrderAmount: 15,
    deliveryFee: 2.99,
    status: 'ACTIVE',
  },
  {
    restaurantId: 'r-02',
    name: 'Sakura Bento',
    slug: 'sakura-bento',
    description: 'Modern Japanese cuisine — sushi, ramen, tempura, and seasonal specials. Fresh fish delivered daily.',
    cuisineTypes: ['Japanese'],
    address: '88 Sakura Lane',
    city: 'New York',
    country: 'US',
    rating: 4.6,
    reviewCount: 198,
    deliveryTimeMin: 30,
    deliveryTimeMax: 50,
    minimumOrderAmount: 20,
    deliveryFee: 3.49,
    status: 'ACTIVE',
  },
  {
    restaurantId: 'r-03',
    name: 'Istanbul Kebab House',
    slug: 'istanbul-kebab-house',
    description: 'Traditional Turkish grills, mezze plates, and fresh lavash bread baked in a stone oven.',
    cuisineTypes: ['Turkish'],
    address: '7 Bosphorus Street',
    city: 'New York',
    country: 'US',
    rating: 4.5,
    reviewCount: 241,
    deliveryTimeMin: 20,
    deliveryTimeMax: 35,
    minimumOrderAmount: 12,
    deliveryFee: 1.99,
    status: 'ACTIVE',
  },
  {
    restaurantId: 'r-04',
    name: 'Taco Loco',
    slug: 'taco-loco',
    description: 'Street-style tacos, burritos, and loaded nachos with freshly-made salsas and guacamole.',
    cuisineTypes: ['Mexican'],
    address: '55 Salsa Avenue',
    city: 'New York',
    country: 'US',
    rating: 4.3,
    reviewCount: 175,
    deliveryTimeMin: 15,
    deliveryTimeMax: 30,
    minimumOrderAmount: 10,
    deliveryFee: 1.49,
    status: 'ACTIVE',
  },
  {
    restaurantId: 'r-05',
    name: 'Spice Garden',
    slug: 'spice-garden',
    description: 'Aromatic Indian curries, biryanis, and tandoori specialties prepared with hand-ground spice blends.',
    cuisineTypes: ['Indian', 'Vegan'],
    address: '23 Masala Road',
    city: 'New York',
    country: 'US',
    rating: 4.7,
    reviewCount: 289,
    deliveryTimeMin: 35,
    deliveryTimeMax: 55,
    minimumOrderAmount: 18,
    deliveryFee: 2.49,
    status: 'ACTIVE',
  },
  {
    restaurantId: 'r-06',
    name: 'The Burger Joint',
    slug: 'the-burger-joint',
    description: 'Classic American smash burgers, loaded fries, and thick milkshakes. No-frills, all flavor.',
    cuisineTypes: ['American'],
    address: '101 Liberty Blvd',
    city: 'New York',
    country: 'US',
    rating: 4.4,
    reviewCount: 430,
    deliveryTimeMin: 20,
    deliveryTimeMax: 35,
    minimumOrderAmount: 12,
    deliveryFee: 0,
    status: 'ACTIVE',
  },
];

export const MENU_ITEMS: MenuItemData[] = [
  {
    menuItemId: 'mi-01',
    restaurantId: 'r-01',
    categoryId: 'cat-pizza',
    name: 'Margherita Pizza',
    description: 'Classic San Marzano tomato base, fior di latte mozzarella, fresh basil, extra virgin olive oil.',
    price: 14.5,
    currency: 'USD',
    imageUrl: null,
    calories: 780,
    isVegetarian: true,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-02',
    restaurantId: 'r-01',
    categoryId: 'cat-pasta',
    name: 'Tagliatelle al Ragù',
    description: 'Hand-rolled egg pasta with a slow-cooked Bolognese sauce, Parmigiano Reggiano.',
    price: 16.0,
    currency: 'USD',
    imageUrl: null,
    calories: 920,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-03',
    restaurantId: 'r-02',
    categoryId: 'cat-sushi',
    name: 'Salmon Sashimi (8 pcs)',
    description: 'Premium Atlantic salmon, thinly sliced, served with pickled ginger and wasabi.',
    price: 18.0,
    currency: 'USD',
    imageUrl: null,
    calories: 340,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-04',
    restaurantId: 'r-02',
    categoryId: 'cat-ramen',
    name: 'Tonkotsu Ramen',
    description: 'Rich pork bone broth, chashu pork, soft-boiled egg, bamboo shoots, nori, and green onion.',
    price: 15.5,
    currency: 'USD',
    imageUrl: null,
    calories: 850,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-05',
    restaurantId: 'r-03',
    categoryId: 'cat-grill',
    name: 'Mixed Kebab Plate',
    description: 'Adana and shish kebabs served with rice pilaf, grilled vegetables, and warm lavash.',
    price: 19.0,
    currency: 'USD',
    imageUrl: null,
    calories: 1100,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-06',
    restaurantId: 'r-04',
    categoryId: 'cat-tacos',
    name: 'Street Tacos (3 pcs)',
    description: 'Corn tortillas, marinated carne asada, fresh pico de gallo, guacamole, and cilantro.',
    price: 11.5,
    currency: 'USD',
    imageUrl: null,
    calories: 560,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-07',
    restaurantId: 'r-05',
    categoryId: 'cat-curry',
    name: 'Palak Paneer',
    description: 'Cottage cheese cubes in a spiced spinach gravy, served with basmati rice and naan.',
    price: 13.5,
    currency: 'USD',
    imageUrl: null,
    calories: 620,
    isVegetarian: true,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-08',
    restaurantId: 'r-05',
    categoryId: 'cat-biryani',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice layered with seasonal vegetables, saffron, and fried onions.',
    price: 12.0,
    currency: 'USD',
    imageUrl: null,
    calories: 710,
    isVegetarian: true,
    isVegan: true,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-09',
    restaurantId: 'r-06',
    categoryId: 'cat-burgers',
    name: 'Classic Smash Burger',
    description: 'Double smashed beef patty, American cheese, pickles, caramelized onions, secret sauce.',
    price: 13.0,
    currency: 'USD',
    imageUrl: null,
    calories: 950,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
  {
    menuItemId: 'mi-10',
    restaurantId: 'r-06',
    categoryId: 'cat-sides',
    name: 'Loaded Cheese Fries',
    description: 'Thick-cut fries smothered in cheddar cheese sauce, crispy bacon bits, and jalapeños.',
    price: 7.5,
    currency: 'USD',
    imageUrl: null,
    calories: 680,
    isVegetarian: false,
    isVegan: false,
    status: 'AVAILABLE',
  },
];

export const SAMPLE_ORDERS: OrderData[] = [
  {
    orderId: 'ord-01',
    orderNumber: 'YD-20260508-001',
    restaurantName: 'Bella Napoli',
    restaurantId: 'r-01',
    items: [
      { name: 'Margherita Pizza', quantity: 1, unitPrice: 14.5 },
      { name: 'Tagliatelle al Ragù', quantity: 1, unitPrice: 16.0 },
    ],
    subtotal: 30.5,
    deliveryFee: 2.99,
    total: 33.49,
    currency: 'USD',
    orderStatus: 'DELIVERED',
    deliveryStatus: 'DELIVERED',
    createdAt: '2026-05-07T18:30:00Z',
  },
  {
    orderId: 'ord-02',
    orderNumber: 'YD-20260508-002',
    restaurantName: 'Sakura Bento',
    restaurantId: 'r-02',
    items: [
      { name: 'Salmon Sashimi (8 pcs)', quantity: 1, unitPrice: 18.0 },
      { name: 'Tonkotsu Ramen', quantity: 2, unitPrice: 15.5 },
    ],
    subtotal: 49.0,
    deliveryFee: 3.49,
    total: 52.49,
    currency: 'USD',
    orderStatus: 'ON_THE_WAY',
    deliveryStatus: 'ON_THE_WAY',
    createdAt: '2026-05-08T12:10:00Z',
  },
  {
    orderId: 'ord-03',
    orderNumber: 'YD-20260508-003',
    restaurantName: 'Taco Loco',
    restaurantId: 'r-04',
    items: [
      { name: 'Street Tacos (3 pcs)', quantity: 2, unitPrice: 11.5 },
    ],
    subtotal: 23.0,
    deliveryFee: 1.49,
    total: 24.49,
    currency: 'USD',
    orderStatus: 'CANCELLED',
    deliveryStatus: 'FAILED',
    createdAt: '2026-05-06T20:45:00Z',
  },
  {
    orderId: 'ord-04',
    orderNumber: 'YD-20260508-004',
    restaurantName: 'Spice Garden',
    restaurantId: 'r-05',
    items: [
      { name: 'Palak Paneer', quantity: 1, unitPrice: 13.5 },
      { name: 'Vegetable Biryani', quantity: 1, unitPrice: 12.0 },
    ],
    subtotal: 25.5,
    deliveryFee: 2.49,
    total: 27.99,
    currency: 'USD',
    orderStatus: 'PREPARING',
    deliveryStatus: 'ASSIGNED',
    createdAt: '2026-05-08T13:55:00Z',
  },
];
