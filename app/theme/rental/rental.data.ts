export type VehicleCategory = 'sedan' | 'suv' | 'compact' | 'electric' | 'van' | 'luxury';
export type PricingMode    = 'minute' | 'day' | 'month';

export type VehicleCardItem = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: VehicleCategory;
  pricePerMinute: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;
  emoji: string;
  rating: number;
  reviewCount: number;
  seats: number;
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  features: string[];
  location: string;
  available: boolean;
  year: number;
  mileageLimit: number;
  description: string;
  lat: number;
  lng: number;
};

export type ServiceZone = {
  id: string;
  name: string;
  color: string;           // hex, for map polygon fill
  polygon: [number, number][]; // [lat, lng] pairs
};

export type FleetCategory = {
  id: string;
  label: string;
  slug: VehicleCategory;
  emoji: string;
  count: number;
  priceFrom: number;
};

export type HeroSlide = {
  id: string;
  badge: string;
  headline: string;
  sub: string;
  cta: string;
  ctaHref: string;
  accent: string;
  emoji: string;
};

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  vehicle: string;
};

// ─── Service zones ─────────────────────────────────────────────────────────────
// Polygons are defined as [lat, lng] arrays (Istanbul districts)

export const SERVICE_ZONES: ServiceZone[] = [
  {
    id: 'z1',
    name: 'Kadıköy & Üsküdar',
    color: '#3b82f6',
    polygon: [
      [40.985, 29.012], [40.985, 29.068], [41.020, 29.068], [41.020, 29.012],
    ],
  },
  {
    id: 'z2',
    name: 'Beşiktaş & Şişli',
    color: '#8b5cf6',
    polygon: [
      [41.028, 28.958], [41.028, 29.022], [41.078, 29.022], [41.078, 28.958],
    ],
  },
  {
    id: 'z3',
    name: 'Levent & Sarıyer',
    color: '#22c55e',
    polygon: [
      [41.072, 28.998], [41.072, 29.082], [41.210, 29.082], [41.210, 28.998],
    ],
  },
  {
    id: 'z4',
    name: 'Ataşehir & Maltepe',
    color: '#f59e0b',
    polygon: [
      [40.918, 29.082], [40.918, 29.172], [40.992, 29.172], [40.992, 29.082],
    ],
  },
  {
    id: 'z5',
    name: 'Pendik & Çekmeköy',
    color: '#ef4444',
    polygon: [
      [40.848, 29.175], [40.848, 29.315], [41.042, 29.315], [41.042, 29.175],
    ],
  },
];

// ─── Fleet categories ──────────────────────────────────────────────────────────

export const FLEET_CATEGORIES: FleetCategory[] = [
  { id: '1', label: 'Sedan',    slug: 'sedan',    emoji: '🚗', count: 24, priceFrom: 8  },
  { id: '2', label: 'SUV',      slug: 'suv',      emoji: '🚙', count: 18, priceFrom: 12 },
  { id: '3', label: 'Compact',  slug: 'compact',  emoji: '🚘', count: 31, priceFrom: 6  },
  { id: '4', label: 'Electric', slug: 'electric', emoji: '⚡', count: 12, priceFrom: 10 },
  { id: '5', label: 'Van',      slug: 'van',      emoji: '🚐', count: 8,  priceFrom: 15 },
  { id: '6', label: 'Luxury',   slug: 'luxury',   emoji: '✨', count: 6,  priceFrom: 25 },
];

// ─── Hero slides ───────────────────────────────────────────────────────────────

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    badge: 'Instant rental',
    headline: 'Drive away in minutes',
    sub: 'Find a car on the map, tap to start — no paperwork, no queues. Pay per minute, day, or month.',
    cta: 'Open map',
    ctaHref: '/theme/rental/map',
    accent: 'bg-primary',
    emoji: '🚗',
  },
  {
    id: '2',
    badge: 'Go green',
    headline: 'Electric fleet available',
    sub: 'Zero emissions, zero compromise. Our EV fleet is growing every week across the city.',
    cta: 'See EVs',
    ctaHref: '/theme/rental/vehicles?category=electric',
    accent: 'bg-success',
    emoji: '⚡',
  },
  {
    id: '3',
    badge: 'Service zones',
    headline: 'Park anywhere within zones',
    sub: 'End your trip in any of our 5 service zones. Free-floating — no fixed stations.',
    cta: 'View zones',
    ctaHref: '/theme/rental/map',
    accent: 'bg-secondary',
    emoji: '📍',
  },
];

// ─── Vehicles ──────────────────────────────────────────────────────────────────

export const VEHICLES: VehicleCardItem[] = [
  {
    id: '1',
    slug: 'renault-clio-2023',
    name: 'Clio',
    brand: 'Renault',
    category: 'compact',
    pricePerMinute: 0.12,
    pricePerHour: 6,
    pricePerDay: 42,
    pricePerMonth: 599,
    emoji: '🚘',
    rating: 4.7,
    reviewCount: 312,
    seats: 5,
    transmission: 'manual',
    fuelType: 'petrol',
    features: ['Bluetooth', 'USB-C', 'Rear camera', 'Lane assist'],
    location: 'Kadıköy',
    available: true,
    year: 2023,
    mileageLimit: 200,
    description: 'Perfect city companion. Nimble, efficient, and easy to park in tight urban spots.',
    lat: 40.990,
    lng: 29.033,
  },
  {
    id: '2',
    slug: 'toyota-corolla-2022',
    name: 'Corolla',
    brand: 'Toyota',
    category: 'sedan',
    pricePerMinute: 0.18,
    pricePerHour: 9,
    pricePerDay: 58,
    pricePerMonth: 849,
    emoji: '🚗',
    rating: 4.8,
    reviewCount: 487,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
    features: ['Apple CarPlay', 'Android Auto', 'Adaptive cruise', 'Heated seats'],
    location: 'Beşiktaş',
    available: true,
    year: 2022,
    mileageLimit: 300,
    description: 'Reliable hybrid with exceptional fuel economy. Great for longer trips.',
    lat: 41.042,
    lng: 28.985,
  },
  {
    id: '3',
    slug: 'volkswagen-golf-2023',
    name: 'Golf',
    brand: 'Volkswagen',
    category: 'compact',
    pricePerMinute: 0.16,
    pricePerHour: 8,
    pricePerDay: 52,
    pricePerMonth: 749,
    emoji: '🚘',
    rating: 4.6,
    reviewCount: 241,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
    features: ['Digital cockpit', 'Apple CarPlay', 'Parking sensors', 'LED headlights'],
    location: 'Şişli',
    available: true,
    year: 2023,
    mileageLimit: 250,
    description: 'European quality meets everyday practicality. A fan favourite for a reason.',
    lat: 41.062,
    lng: 28.988,
  },
  {
    id: '4',
    slug: 'tesla-model-3-2023',
    name: 'Model 3',
    brand: 'Tesla',
    category: 'electric',
    pricePerMinute: 0.28,
    pricePerHour: 14,
    pricePerDay: 89,
    pricePerMonth: 1299,
    emoji: '⚡',
    rating: 4.9,
    reviewCount: 198,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'electric',
    features: ['Autopilot', '15" touchscreen', 'OTA updates', 'Supercharger access'],
    location: 'Levent',
    available: true,
    year: 2023,
    mileageLimit: 350,
    description: 'Experience the future of driving. Long range, lightning fast, zero emissions.',
    lat: 41.079,
    lng: 29.018,
  },
  {
    id: '5',
    slug: 'bmw-3-series-2022',
    name: '3 Series',
    brand: 'BMW',
    category: 'luxury',
    pricePerMinute: 0.44,
    pricePerHour: 22,
    pricePerDay: 139,
    pricePerMonth: 1999,
    emoji: '✨',
    rating: 4.8,
    reviewCount: 156,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
    features: ['Leather seats', 'iDrive 8', 'Harman Kardon audio', 'Head-up display'],
    location: 'Nişantaşı',
    available: true,
    year: 2022,
    mileageLimit: 400,
    description: 'Pure driving pleasure. Premium materials, responsive handling, and executive style.',
    lat: 41.050,
    lng: 28.997,
  },
  {
    id: '6',
    slug: 'ford-transit-2022',
    name: 'Transit',
    brand: 'Ford',
    category: 'van',
    pricePerMinute: 0.32,
    pricePerHour: 16,
    pricePerDay: 95,
    pricePerMonth: 1399,
    emoji: '🚐',
    rating: 4.5,
    reviewCount: 89,
    seats: 8,
    transmission: 'manual',
    fuelType: 'diesel',
    features: ['8 seats', 'Climate control', 'Rear step', 'Cargo space'],
    location: 'Ataşehir',
    available: false,
    year: 2022,
    mileageLimit: 500,
    description: 'When you need to move more — people or cargo. Reliable workhorse for any job.',
    lat: 40.978,
    lng: 29.118,
  },
  {
    id: '7',
    slug: 'hyundai-tucson-2023',
    name: 'Tucson',
    brand: 'Hyundai',
    category: 'suv',
    pricePerMinute: 0.26,
    pricePerHour: 13,
    pricePerDay: 79,
    pricePerMonth: 1149,
    emoji: '🚙',
    rating: 4.7,
    reviewCount: 203,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
    features: ['Panoramic roof', 'BOSE audio', 'Blind spot monitor', 'Smart key'],
    location: 'Maltepe',
    available: true,
    year: 2023,
    mileageLimit: 300,
    description: 'Stylish SUV for city and country. Spacious interior with premium comfort.',
    lat: 40.934,
    lng: 29.142,
  },
  {
    id: '8',
    slug: 'peugeot-208-2023',
    name: '208',
    brand: 'Peugeot',
    category: 'compact',
    pricePerMinute: 0.14,
    pricePerHour: 7,
    pricePerDay: 45,
    pricePerMonth: 649,
    emoji: '🚘',
    rating: 4.5,
    reviewCount: 176,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'petrol',
    features: ['3D i-Cockpit', 'Wireless charging', 'Rear camera', 'Connected nav'],
    location: 'Üsküdar',
    available: true,
    year: 2023,
    mileageLimit: 200,
    description: 'French design flair with smart tech. Stands out in every traffic jam.',
    lat: 41.022,
    lng: 29.018,
  },
  {
    id: '9',
    slug: 'mercedes-c-class-2023',
    name: 'C-Class',
    brand: 'Mercedes-Benz',
    category: 'luxury',
    pricePerMinute: 0.56,
    pricePerHour: 28,
    pricePerDay: 175,
    pricePerMonth: 2499,
    emoji: '✨',
    rating: 4.9,
    reviewCount: 112,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
    features: ['MBUX', 'Burmester audio', 'Air suspension', 'Ambient lighting'],
    location: 'Etiler',
    available: true,
    year: 2023,
    mileageLimit: 500,
    description: 'Understated elegance. Redefine what a business trip feels like.',
    lat: 41.082,
    lng: 29.042,
  },
  {
    id: '10',
    slug: 'kia-ev6-2023',
    name: 'EV6',
    brand: 'Kia',
    category: 'electric',
    pricePerMinute: 0.24,
    pricePerHour: 12,
    pricePerDay: 75,
    pricePerMonth: 1099,
    emoji: '⚡',
    rating: 4.8,
    reviewCount: 134,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'electric',
    features: ['800V fast charging', 'V2L technology', 'AR HUD', 'Meridian audio'],
    location: 'Çekmeköy',
    available: true,
    year: 2023,
    mileageLimit: 400,
    description: '800V ultra-fast charging means minimal downtime. Adventure-ready from day one.',
    lat: 41.030,
    lng: 29.192,
  },
  {
    id: '11',
    slug: 'seat-leon-2022',
    name: 'León',
    brand: 'SEAT',
    category: 'compact',
    pricePerMinute: 0.14,
    pricePerHour: 7,
    pricePerDay: 48,
    pricePerMonth: 699,
    emoji: '🚘',
    rating: 4.4,
    reviewCount: 98,
    seats: 5,
    transmission: 'manual',
    fuelType: 'petrol',
    features: ['10" touchscreen', 'Full LED lights', 'Wireless charging', 'ACC'],
    location: 'Pendik',
    available: true,
    year: 2022,
    mileageLimit: 250,
    description: 'Spanish passion meets German engineering. Sharp looks at a sensible price.',
    lat: 40.876,
    lng: 29.232,
  },
  {
    id: '12',
    slug: 'toyota-rav4-2023',
    name: 'RAV4',
    brand: 'Toyota',
    category: 'suv',
    pricePerMinute: 0.30,
    pricePerHour: 15,
    pricePerDay: 95,
    pricePerMonth: 1349,
    emoji: '🚙',
    rating: 4.8,
    reviewCount: 267,
    seats: 5,
    transmission: 'automatic',
    fuelType: 'hybrid',
    features: ['4WD mode', 'Toyota Safety Sense', 'JBL audio', 'Power tailgate'],
    location: 'Sarıyer',
    available: true,
    year: 2023,
    mileageLimit: 350,
    description: 'The go-anywhere SUV. City streets or mountain roads — equally at home.',
    lat: 41.170,
    lng: 29.052,
  },
];

// ─── Static IDs ────────────────────────────────────────────────────────────────

export const FEATURED_VEHICLE_IDS = ['4', '2', '5', '7'];
export const POPULAR_VEHICLE_IDS  = ['1', '3', '8', '11', '10', '12'];

// ─── Testimonials ──────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ayşe K.',
    city: 'Istanbul',
    rating: 5,
    comment: 'Found a car in under 2 minutes on the map. Tapped start, walked over, drove away. Never going back to traditional rental.',
    vehicle: 'Renault Clio',
  },
  {
    id: '2',
    name: 'Mert D.',
    city: 'Istanbul',
    rating: 5,
    comment: 'The service zone system is genius. Parked the Tesla right in Kadıköy zone and the trip ended instantly. No stress.',
    vehicle: 'Tesla Model 3',
  },
  {
    id: '3',
    name: 'Elif S.',
    city: 'Istanbul',
    rating: 4,
    comment: 'Monthly plan saves me so much vs owning a car. Minute billing for quick errands is super fair too.',
    vehicle: 'VW Golf',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function pointInZone(lat: number, lng: number, zone: ServiceZone): boolean {
  const polygon = zone.polygon;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [yi, xi] = polygon[i];
    const [yj, xj] = polygon[j];
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function findZoneForPoint(lat: number, lng: number): ServiceZone | null {
  return SERVICE_ZONES.find((z) => pointInZone(lat, lng, z)) ?? null;
}

export function formatPrice(mode: PricingMode, vehicle: VehicleCardItem): string {
  switch (mode) {
    case 'minute': return `€${vehicle.pricePerMinute.toFixed(2)}/min`;
    case 'day':    return `€${vehicle.pricePerDay}/day`;
    case 'month':  return `€${vehicle.pricePerMonth}/mo`;
  }
}
