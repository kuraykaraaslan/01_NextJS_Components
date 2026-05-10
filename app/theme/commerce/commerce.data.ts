import type { ProductStatus, ProductType, StockStatus, OrderStatus } from '@/modules/domains/commerce/types';

/* =========================================================
   CATEGORIES
========================================================= */

export type CommerceCategory = {
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
};

export const CATEGORIES: CommerceCategory[] = [
  {
    categoryId: 'cat-01',
    title: 'Electronics',
    slug: 'electronics',
    description: 'Laptops, phones, accessories, and more.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
  },
  {
    categoryId: 'cat-02',
    title: 'Clothing',
    slug: 'clothing',
    description: 'Apparel for every occasion.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
  },
  {
    categoryId: 'cat-03',
    title: 'Software',
    slug: 'software',
    description: 'SaaS tools, licenses, and digital subscriptions.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
  },
  {
    categoryId: 'cat-04',
    title: 'Books',
    slug: 'books',
    description: 'Technical books, guides, and e-books.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
  },
  {
    categoryId: 'cat-05',
    title: 'Services',
    slug: 'services',
    description: 'Consulting, support, and professional services.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
  },
];

/* =========================================================
   PRODUCTS
========================================================= */

export type CommerceProduct = {
  productId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  type: ProductType;
  status: ProductStatus;
  categoryId: string;
  image: string;
  basePrice: number;
  salePrice?: number;
  currency: string;
  stockStatus: StockStatus;
  tags: string[];
  rating: number;
  reviewCount: number;
};

export const PRODUCTS: CommerceProduct[] = [
  {
    productId: 'p-01',
    title: 'MacBook Pro 14" M3',
    slug: 'macbook-pro-14-m3',
    description: 'The MacBook Pro 14" features the Apple M3 chip, delivering exceptional performance for professionals. With a stunning Liquid Retina XDR display, all-day battery life, and a best-in-class keyboard, this laptop is built for serious work.',
    shortDescription: 'Apple M3 chip, 14" Liquid Retina XDR, 18-hour battery.',
    type: 'PHYSICAL',
    status: 'PUBLISHED',
    categoryId: 'cat-01',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    basePrice: 1999,
    currency: 'USD',
    stockStatus: 'IN_STOCK',
    tags: ['Apple', 'Laptop', 'M3', 'MacBook'],
    rating: 4.7,
    reviewCount: 2847,
  },
  {
    productId: 'p-02',
    title: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancelling headphones with Auto NC Optimizer, up to 30 hours of battery life, and crystal-clear hands-free calling.',
    shortDescription: 'Industry-leading noise cancelling, 30-hour battery.',
    type: 'PHYSICAL',
    status: 'PUBLISHED',
    categoryId: 'cat-01',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    basePrice: 399,
    salePrice: 279,
    currency: 'USD',
    stockStatus: 'LOW_STOCK',
    tags: ['Sony', 'Headphones', 'Audio', 'Noise Cancelling'],
    rating: 4.6,
    reviewCount: 5392,
  },
  {
    productId: 'p-03',
    title: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    description: 'Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Available in multiple colors and sizes, it is the perfect everyday essential.',
    shortDescription: '100% organic cotton, available in multiple colors.',
    type: 'PHYSICAL',
    status: 'PUBLISHED',
    categoryId: 'cat-02',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    basePrice: 35,
    currency: 'USD',
    stockStatus: 'IN_STOCK',
    tags: ['Clothing', 'Cotton', 'T-Shirt', 'Organic'],
    rating: 4.2,
    reviewCount: 892,
  },
  {
    productId: 'p-04',
    title: 'ShopFlow Pro — Annual Plan',
    slug: 'shopflow-pro-annual',
    description: 'Unlock the full power of ShopFlow with our Pro Annual plan. Get unlimited products, advanced analytics, priority support, and integrations with 50+ apps.',
    shortDescription: 'Unlimited products, advanced analytics, priority support.',
    type: 'DIGITAL',
    status: 'PUBLISHED',
    categoryId: 'cat-03',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    basePrice: 299,
    salePrice: 199,
    currency: 'USD',
    stockStatus: 'IN_STOCK',
    tags: ['SaaS', 'E-commerce', 'Annual', 'Pro'],
    rating: 4.8,
    reviewCount: 364,
  },
  {
    productId: 'p-05',
    title: 'The TypeScript Handbook',
    slug: 'typescript-handbook',
    description: 'A comprehensive guide to TypeScript covering everything from basic types to advanced generics, decorators, and real-world patterns used by top engineering teams.',
    shortDescription: 'Comprehensive TypeScript guide, 450+ pages.',
    type: 'DIGITAL',
    status: 'PUBLISHED',
    categoryId: 'cat-04',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    basePrice: 49,
    currency: 'USD',
    stockStatus: 'IN_STOCK',
    tags: ['Book', 'TypeScript', 'Programming', 'E-book'],
    rating: 4.9,
    reviewCount: 1203,
  },
  {
    productId: 'p-06',
    title: 'Mechanical Keyboard — TKL',
    slug: 'mechanical-keyboard-tkl',
    description: 'A tenkeyless mechanical keyboard with Cherry MX switches, PBT keycaps, and customizable RGB backlighting. Built for typists and gamers alike.',
    shortDescription: 'Cherry MX switches, PBT keycaps, RGB backlight.',
    type: 'PHYSICAL',
    status: 'PUBLISHED',
    categoryId: 'cat-01',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
    basePrice: 149,
    currency: 'USD',
    stockStatus: 'OUT_OF_STOCK',
    tags: ['Keyboard', 'Mechanical', 'TKL', 'RGB'],
    rating: 4.4,
    reviewCount: 2156,
  },
  {
    productId: 'p-07',
    title: 'UI Design Consultation — 2h',
    slug: 'ui-design-consultation',
    description: 'A dedicated 2-hour one-on-one design consultation with a senior UI/UX designer. Includes a recorded session, design audit, and a written recommendations report.',
    shortDescription: '2-hour session with a senior UI/UX designer.',
    type: 'SERVICE',
    status: 'PUBLISHED',
    categoryId: 'cat-05',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    basePrice: 250,
    currency: 'USD',
    stockStatus: 'IN_STOCK',
    tags: ['Design', 'Consultation', 'UI/UX', 'Service'],
    rating: 5.0,
    reviewCount: 47,
  },
  {
    productId: 'p-08',
    title: 'Slim Fit Chino Trousers',
    slug: 'slim-fit-chino-trousers',
    description: 'Classic slim-fit chinos crafted from a stretch-cotton blend. Perfect for both smart-casual and office wear, available in a range of versatile neutral tones.',
    shortDescription: 'Stretch-cotton blend, slim fit, versatile colours.',
    type: 'PHYSICAL',
    status: 'PUBLISHED',
    categoryId: 'cat-02',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    basePrice: 79,
    salePrice: 55,
    currency: 'USD',
    stockStatus: 'BACKORDER',
    tags: ['Clothing', 'Trousers', 'Slim Fit', 'Chino'],
    rating: 4.1,
    reviewCount: 678,
  },
];

/* =========================================================
   ORDERS
========================================================= */

export type CommerceOrder = {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  currency: string;
  itemCount: number;
  createdAt: Date;
  customerEmail: string;
};

export const ORDERS: CommerceOrder[] = [
  {
    orderId: 'ord-01',
    orderNumber: 'SF-10042',
    status: 'DELIVERED',
    total: 1999,
    currency: 'USD',
    itemCount: 1,
    createdAt: new Date('2026-04-01'),
    customerEmail: 'customer@example.com',
  },
  {
    orderId: 'ord-02',
    orderNumber: 'SF-10051',
    status: 'SHIPPED',
    total: 313,
    currency: 'USD',
    itemCount: 2,
    createdAt: new Date('2026-04-22'),
    customerEmail: 'customer@example.com',
  },
  {
    orderId: 'ord-03',
    orderNumber: 'SF-10058',
    status: 'PROCESSING',
    total: 199,
    currency: 'USD',
    itemCount: 1,
    createdAt: new Date('2026-05-01'),
    customerEmail: 'customer@example.com',
  },
  {
    orderId: 'ord-04',
    orderNumber: 'SF-10063',
    status: 'PENDING',
    total: 329,
    currency: 'USD',
    itemCount: 3,
    createdAt: new Date('2026-05-06'),
    customerEmail: 'customer@example.com',
  },
  {
    orderId: 'ord-05',
    orderNumber: 'SF-10067',
    status: 'CANCELLED',
    total: 149,
    currency: 'USD',
    itemCount: 1,
    createdAt: new Date('2026-05-07'),
    customerEmail: 'customer@example.com',
  },
];

/* =========================================================
   CART ITEMS
========================================================= */

export type CommerceCartItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  image?: string;
};

export const CART_ITEMS: CommerceCartItem[] = [
  {
    productId: 'p-01',
    name: 'MacBook Pro 14" M3',
    quantity: 1,
    price: 1999,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80',
  },
  {
    productId: 'p-04',
    name: 'ShopFlow Pro — Annual Plan',
    quantity: 1,
    price: 199,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80',
  },
  {
    productId: 'p-03',
    name: 'Premium Cotton T-Shirt',
    quantity: 2,
    price: 35,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80',
  },
];
