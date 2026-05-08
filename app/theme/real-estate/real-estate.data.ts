import type { PropertyType, ListingType, PropertyStatus } from '@/modules/domains/real-estate/types';

export type PropertySummary = {
  propertyId: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  city: string;
  district?: string;
  description: string;
  imageUrl?: string | null;
  agentId: string;
};

export type AgentSummary = {
  agentId: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  listingCount?: number;
};

export const CITIES = ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa'];

export const PROPERTY_TYPES: PropertyType[] = [
  'APARTMENT',
  'HOUSE',
  'VILLA',
  'LAND',
  'COMMERCIAL',
  'OFFICE',
];

export const AGENTS: AgentSummary[] = [
  {
    agentId: 'a-01',
    name: 'Ayşe Yılmaz',
    email: 'ayse.yilmaz@estateview.com',
    phone: '+90 532 111 22 33',
    bio: 'With over 12 years of experience in Istanbul real estate, Ayşe specializes in luxury apartments and villas on the European side. She has helped hundreds of families find their dream homes.',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    listingCount: 14,
  },
  {
    agentId: 'a-02',
    name: 'Murat Demir',
    email: 'murat.demir@estateview.com',
    phone: '+90 533 444 55 66',
    bio: 'Murat is an Antalya-based agent focusing on resort properties, short-term rentals, and commercial real estate. Fluent in English and German.',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    listingCount: 9,
  },
  {
    agentId: 'a-03',
    name: 'Elif Kaya',
    email: 'elif.kaya@estateview.com',
    phone: '+90 534 777 88 99',
    bio: 'Elif covers the Izmir and Aegean coast markets. She is known for her in-depth market knowledge and transparent approach to negotiations.',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    listingCount: 11,
  },
];

export const PROPERTIES: PropertySummary[] = [
  {
    propertyId: 'p-01',
    title: 'Luxury Bosphorus-View Apartment in Beşiktaş',
    slug: 'luxury-bosphorus-view-apartment-besiktas',
    price: 8_500_000,
    currency: 'TRY',
    type: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    city: 'Istanbul',
    district: 'Beşiktaş',
    description:
      'Stunning 3-bedroom apartment with panoramic Bosphorus views in the heart of Beşiktaş. The property features floor-to-ceiling windows, a modern open-plan kitchen, marble bathrooms, and a private terrace. The building offers 24/7 concierge, gym, and rooftop pool.',
    imageUrl: 'https://picsum.photos/seed/prop1/640/400',
    agentId: 'a-01',
  },
  {
    propertyId: 'p-02',
    title: 'Spacious Family House in Çekmeköy',
    slug: 'spacious-family-house-cekmekoy',
    price: 4_200_000,
    currency: 'TRY',
    type: 'HOUSE',
    listingType: 'SALE',
    status: 'PUBLISHED',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    city: 'Istanbul',
    district: 'Çekmeköy',
    description:
      'A generous detached house set in a quiet residential street. Features a landscaped garden, double garage, underfloor heating throughout, and a fully equipped open-plan kitchen-diner. Close to international schools and forest walks.',
    imageUrl: 'https://picsum.photos/seed/prop2/640/400',
    agentId: 'a-01',
  },
  {
    propertyId: 'p-03',
    title: 'Beachfront Villa with Private Pool — Lara',
    slug: 'beachfront-villa-private-pool-lara',
    price: 3_200,
    currency: 'USD',
    type: 'VILLA',
    listingType: 'SHORT_TERM',
    status: 'PUBLISHED',
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    city: 'Antalya',
    district: 'Lara',
    description:
      'An exceptional beachfront villa available for short-term holiday rentals. The property sits directly on a private section of beach with its own swimming pool, summer kitchen, and outdoor dining area. Sleeps up to 10 guests in style.',
    imageUrl: 'https://picsum.photos/seed/prop3/640/400',
    agentId: 'a-02',
  },
  {
    propertyId: 'p-04',
    title: 'Modern Studio Apartment in Alsancak',
    slug: 'modern-studio-apartment-alsancak',
    price: 12_500,
    currency: 'TRY',
    type: 'APARTMENT',
    listingType: 'RENT',
    status: 'PUBLISHED',
    bedrooms: 1,
    bathrooms: 1,
    area: 52,
    city: 'Izmir',
    district: 'Alsancak',
    description:
      'Bright studio apartment in the vibrant Alsancak neighbourhood, steps from cafés, restaurants, and the seafront promenade. Fully furnished with high-speed internet, air conditioning, and a compact but well-equipped kitchen.',
    imageUrl: 'https://picsum.photos/seed/prop4/640/400',
    agentId: 'a-03',
  },
  {
    propertyId: 'p-05',
    title: 'Commercial Unit in Ankara Çankaya Business District',
    slug: 'commercial-unit-ankara-cankaya',
    price: 1_800_000,
    currency: 'TRY',
    type: 'COMMERCIAL',
    listingType: 'SALE',
    status: 'PUBLISHED',
    area: 95,
    city: 'Ankara',
    district: 'Çankaya',
    description:
      'Ground-floor commercial unit in a prestigious business district building. Currently configured as an open-plan office with a reception area, two meeting rooms, and a kitchenette. Ideal for a professional services firm or retail outlet.',
    imageUrl: 'https://picsum.photos/seed/prop5/640/400',
    agentId: 'a-01',
  },
  {
    propertyId: 'p-06',
    title: 'Olive Grove Land Plot in Urla',
    slug: 'olive-grove-land-plot-urla',
    price: 950_000,
    currency: 'TRY',
    type: 'LAND',
    listingType: 'SALE',
    status: 'PUBLISHED',
    area: 4_200,
    city: 'Izmir',
    district: 'Urla',
    description:
      'A rare opportunity to own a 4,200 m² agricultural plot in the prestigious Urla wine and olive country. The land is planted with mature olive trees and benefits from road access, a well, and uninterrupted sea views towards the Aegean.',
    imageUrl: 'https://picsum.photos/seed/prop6/640/400',
    agentId: 'a-03',
  },
  {
    propertyId: 'p-07',
    title: 'Executive Office Suite in Maslak Levent',
    slug: 'executive-office-suite-maslak-levent',
    price: 45_000,
    currency: 'TRY',
    type: 'OFFICE',
    listingType: 'RENT',
    status: 'PUBLISHED',
    area: 180,
    city: 'Istanbul',
    district: 'Maslak',
    description:
      'Premium fitted-out office space on the 18th floor of a Grade-A tower in Istanbul\'s financial district. Includes 10 workstations, a boardroom, server room, and stunning city views. Available immediately with flexible lease terms.',
    imageUrl: 'https://picsum.photos/seed/prop7/640/400',
    agentId: 'a-01',
  },
  {
    propertyId: 'p-08',
    title: 'Charming Aegean Townhouse in Bursa Old Quarter',
    slug: 'charming-aegean-townhouse-bursa',
    price: 2_750_000,
    currency: 'TRY',
    type: 'HOUSE',
    listingType: 'SALE',
    status: 'PUBLISHED',
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    city: 'Bursa',
    district: 'Osmangazi',
    description:
      'A beautifully restored Ottoman-era townhouse nestled in Bursa\'s historic quarter. The property retains original stone walls, wooden ceilings, and a central courtyard fountain while offering all modern conveniences. Walking distance to the Grand Mosque and covered bazaar.',
    imageUrl: 'https://picsum.photos/seed/prop8/640/400',
    agentId: 'a-02',
  },
];
