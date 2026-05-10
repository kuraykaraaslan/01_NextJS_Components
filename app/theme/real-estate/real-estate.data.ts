import type { PropertyType, ListingType, PropertyStatus } from '@/modules/domains/real-estate/types';

export type PropertyFeature = {
  label: string;
  available: boolean;
};

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
  images?: string[];
  agentId: string;
  yearBuilt?: number;
  floor?: number;
  totalFloors?: number;
  parkingSpots?: number;
  features?: string[];
  isFeatured?: boolean;
  daysOnMarket?: number;
};

export type AgentSummary = {
  agentId: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  listingCount?: number;
  rating?: number;
  reviewCount?: number;
  specialization?: string;
  yearsExp?: number;
};

export type Testimonial = {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  text: string;
  location: string;
};

export type Neighborhood = {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
  avgPrice: string;
  listingCount: number;
  highlight: string;
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

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-01',
    name: 'Selin Arslan',
    avatarUrl: 'https://i.pravatar.cc/80?img=5',
    rating: 5,
    text: 'Found our dream apartment in Beşiktaş within two weeks. The agent was incredibly helpful and the whole process was transparent from start to finish.',
    location: 'Istanbul, Turkey',
  },
  {
    id: 't-02',
    name: 'James Thornton',
    avatarUrl: 'https://i.pravatar.cc/80?img=11',
    rating: 5,
    text: 'As a foreign buyer, I was nervous about the process. EstateView made everything easy — verified listings, English-speaking agents, and great after-sale support.',
    location: 'Antalya, Turkey',
  },
  {
    id: 't-03',
    name: 'Fatma Çelik',
    avatarUrl: 'https://i.pravatar.cc/80?img=20',
    rating: 4,
    text: 'Listed my commercial property and had three serious inquiries within the first week. Much better reach than other portals I\'d tried.',
    location: 'Ankara, Turkey',
  },
];

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    id: 'n-01',
    name: 'Beşiktaş',
    city: 'Istanbul',
    imageUrl: 'https://picsum.photos/seed/besiktas/400/260',
    avgPrice: '₺7.2M',
    listingCount: 42,
    highlight: 'Bosphorus views',
  },
  {
    id: 'n-02',
    name: 'Alsancak',
    city: 'Izmir',
    imageUrl: 'https://picsum.photos/seed/alsancak/400/260',
    avgPrice: '₺2.8M',
    listingCount: 28,
    highlight: 'Seafront promenade',
  },
  {
    id: 'n-03',
    name: 'Lara',
    city: 'Antalya',
    imageUrl: 'https://picsum.photos/seed/lara/400/260',
    avgPrice: '₺4.1M',
    listingCount: 19,
    highlight: 'Beach & resort living',
  },
  {
    id: 'n-04',
    name: 'Çankaya',
    city: 'Ankara',
    imageUrl: 'https://picsum.photos/seed/cankaya/400/260',
    avgPrice: '₺3.5M',
    listingCount: 35,
    highlight: 'Diplomatic quarter',
  },
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
    rating: 4.9,
    reviewCount: 87,
    specialization: 'Luxury Residential',
    yearsExp: 12,
  },
  {
    agentId: 'a-02',
    name: 'Murat Demir',
    email: 'murat.demir@estateview.com',
    phone: '+90 533 444 55 66',
    bio: 'Murat is an Antalya-based agent focusing on resort properties, short-term rentals, and commercial real estate. Fluent in English and German.',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    listingCount: 9,
    rating: 4.7,
    reviewCount: 54,
    specialization: 'Resort & Rental',
    yearsExp: 8,
  },
  {
    agentId: 'a-03',
    name: 'Elif Kaya',
    email: 'elif.kaya@estateview.com',
    phone: '+90 534 777 88 99',
    bio: 'Elif covers the Izmir and Aegean coast markets. She is known for her in-depth market knowledge and transparent approach to negotiations.',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    listingCount: 11,
    rating: 4.8,
    reviewCount: 62,
    specialization: 'Aegean Coast',
    yearsExp: 10,
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
    imageUrl: 'https://picsum.photos/seed/prop1/800/500',
    images: [
      'https://picsum.photos/seed/prop1/800/500',
      'https://picsum.photos/seed/prop1b/800/500',
      'https://picsum.photos/seed/prop1c/800/500',
      'https://picsum.photos/seed/prop1d/800/500',
    ],
    agentId: 'a-01',
    yearBuilt: 2019,
    floor: 8,
    totalFloors: 12,
    parkingSpots: 1,
    features: ['Bosphorus View', 'Gym', 'Rooftop Pool', 'Concierge', 'Balcony', 'Central Heating', 'Air Conditioning', 'Elevator'],
    isFeatured: true,
    daysOnMarket: 5,
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
    imageUrl: 'https://picsum.photos/seed/prop2/800/500',
    images: [
      'https://picsum.photos/seed/prop2/800/500',
      'https://picsum.photos/seed/prop2b/800/500',
      'https://picsum.photos/seed/prop2c/800/500',
    ],
    agentId: 'a-01',
    yearBuilt: 2015,
    parkingSpots: 2,
    features: ['Garden', 'Garage', 'Underfloor Heating', 'Near Schools', 'Storage Room', 'Air Conditioning'],
    isFeatured: true,
    daysOnMarket: 18,
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
    imageUrl: 'https://picsum.photos/seed/prop3/800/500',
    images: [
      'https://picsum.photos/seed/prop3/800/500',
      'https://picsum.photos/seed/prop3b/800/500',
      'https://picsum.photos/seed/prop3c/800/500',
      'https://picsum.photos/seed/prop3d/800/500',
      'https://picsum.photos/seed/prop3e/800/500',
    ],
    agentId: 'a-02',
    yearBuilt: 2018,
    parkingSpots: 3,
    features: ['Private Pool', 'Beach Access', 'Summer Kitchen', 'Outdoor Dining', 'BBQ Area', 'Sea View', 'Garden', 'Air Conditioning'],
    isFeatured: true,
    daysOnMarket: 3,
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
    imageUrl: 'https://picsum.photos/seed/prop4/800/500',
    images: [
      'https://picsum.photos/seed/prop4/800/500',
      'https://picsum.photos/seed/prop4b/800/500',
    ],
    agentId: 'a-03',
    yearBuilt: 2020,
    floor: 3,
    totalFloors: 6,
    features: ['Furnished', 'Air Conditioning', 'High-Speed Internet', 'Elevator', 'Near Public Transport'],
    daysOnMarket: 12,
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
    imageUrl: 'https://picsum.photos/seed/prop5/800/500',
    images: [
      'https://picsum.photos/seed/prop5/800/500',
      'https://picsum.photos/seed/prop5b/800/500',
    ],
    agentId: 'a-01',
    yearBuilt: 2012,
    floor: 0,
    parkingSpots: 2,
    features: ['Reception Area', 'Meeting Rooms', 'Kitchenette', 'Central Location', 'Disabled Access', 'Security System'],
    daysOnMarket: 30,
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
    imageUrl: 'https://picsum.photos/seed/prop6/800/500',
    images: [
      'https://picsum.photos/seed/prop6/800/500',
      'https://picsum.photos/seed/prop6b/800/500',
    ],
    agentId: 'a-03',
    features: ['Mature Olive Trees', 'Road Access', 'Well', 'Sea View', 'Agricultural Zoning'],
    daysOnMarket: 45,
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
    imageUrl: 'https://picsum.photos/seed/prop7/800/500',
    images: [
      'https://picsum.photos/seed/prop7/800/500',
      'https://picsum.photos/seed/prop7b/800/500',
      'https://picsum.photos/seed/prop7c/800/500',
    ],
    agentId: 'a-01',
    yearBuilt: 2017,
    floor: 18,
    totalFloors: 32,
    parkingSpots: 2,
    features: ['City View', 'Boardroom', 'Server Room', 'Fitted Out', 'Flexible Lease', 'Central Heating', 'Elevator', '24/7 Security'],
    daysOnMarket: 8,
  },
  {
    propertyId: 'p-08',
    title: 'Charming Ottoman Townhouse in Bursa Old Quarter',
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
    imageUrl: 'https://picsum.photos/seed/prop8/800/500',
    images: [
      'https://picsum.photos/seed/prop8/800/500',
      'https://picsum.photos/seed/prop8b/800/500',
      'https://picsum.photos/seed/prop8c/800/500',
    ],
    agentId: 'a-02',
    yearBuilt: 1890,
    features: ['Historic Building', 'Courtyard Fountain', 'Stone Walls', 'Wooden Ceilings', 'Central Location', 'Renovated'],
    isFeatured: true,
    daysOnMarket: 22,
  },
  {
    propertyId: 'p-09',
    title: 'New-Build Penthouse in Kadıköy',
    slug: 'new-build-penthouse-kadikoy',
    price: 12_900_000,
    currency: 'TRY',
    type: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    city: 'Istanbul',
    district: 'Kadıköy',
    description:
      'Brand-new penthouse apartment in one of Istanbul\'s most vibrant neighbourhoods. The property spans two levels with a wraparound terrace, private rooftop garden, a chef\'s kitchen, and breathtaking city and sea views.',
    imageUrl: 'https://picsum.photos/seed/prop9/800/500',
    images: [
      'https://picsum.photos/seed/prop9/800/500',
      'https://picsum.photos/seed/prop9b/800/500',
      'https://picsum.photos/seed/prop9c/800/500',
    ],
    agentId: 'a-01',
    yearBuilt: 2024,
    floor: 14,
    totalFloors: 14,
    parkingSpots: 2,
    features: ['Rooftop Garden', 'Wraparound Terrace', 'Sea View', 'City View', 'Chef\'s Kitchen', 'Smart Home', 'Gym', 'Concierge'],
    isFeatured: true,
    daysOnMarket: 2,
  },
  {
    propertyId: 'p-10',
    title: 'Sea-View Holiday Apartment in Bodrum',
    slug: 'sea-view-holiday-apartment-bodrum',
    price: 8_500,
    currency: 'TRY',
    type: 'APARTMENT',
    listingType: 'RENT',
    status: 'PUBLISHED',
    bedrooms: 2,
    bathrooms: 1,
    area: 78,
    city: 'Antalya',
    district: 'Bodrum',
    description:
      'Charming holiday apartment with stunning sea views, available for monthly rental. The property has been recently renovated with a modern kitchen, comfortable living area, and a generous sea-facing balcony.',
    imageUrl: 'https://picsum.photos/seed/prop10/800/500',
    images: [
      'https://picsum.photos/seed/prop10/800/500',
      'https://picsum.photos/seed/prop10b/800/500',
    ],
    agentId: 'a-02',
    yearBuilt: 2010,
    floor: 2,
    totalFloors: 4,
    features: ['Sea View', 'Balcony', 'Renovated', 'Air Conditioning', 'Furnished', 'Near Beach'],
    daysOnMarket: 14,
  },
  {
    propertyId: 'p-11',
    title: 'Investment Apartment in Bornova Tech Zone',
    slug: 'investment-apartment-bornova-tech-zone',
    price: 1_650_000,
    currency: 'TRY',
    type: 'APARTMENT',
    listingType: 'SALE',
    status: 'PUBLISHED',
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    city: 'Izmir',
    district: 'Bornova',
    description:
      'Great investment opportunity near Izmir\'s growing technology park. Currently tenanted at ₺9,500/month, yielding approximately 6.9% annually. Modern building with lift, security, and covered parking.',
    imageUrl: 'https://picsum.photos/seed/prop11/800/500',
    images: [
      'https://picsum.photos/seed/prop11/800/500',
      'https://picsum.photos/seed/prop11b/800/500',
    ],
    agentId: 'a-03',
    yearBuilt: 2016,
    floor: 4,
    totalFloors: 8,
    parkingSpots: 1,
    features: ['Investment Property', 'Currently Tenanted', 'Elevator', 'Security System', 'Covered Parking', 'Near Tech Park'],
    daysOnMarket: 35,
  },
  {
    propertyId: 'p-12',
    title: 'Detached Villa with Mountain Views — Bursa Uludağ Foothills',
    slug: 'detached-villa-mountain-views-bursa',
    price: 5_800_000,
    currency: 'TRY',
    type: 'VILLA',
    listingType: 'SALE',
    status: 'PUBLISHED',
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    city: 'Bursa',
    district: 'Nilüfer',
    description:
      'Impressive detached villa in the prestigious Nilüfer district with sweeping views of Uludağ mountain. The property features a heated swimming pool, landscaped gardens, a home office suite, and a self-contained guest apartment.',
    imageUrl: 'https://picsum.photos/seed/prop12/800/500',
    images: [
      'https://picsum.photos/seed/prop12/800/500',
      'https://picsum.photos/seed/prop12b/800/500',
      'https://picsum.photos/seed/prop12c/800/500',
    ],
    agentId: 'a-02',
    yearBuilt: 2021,
    parkingSpots: 3,
    features: ['Heated Pool', 'Mountain View', 'Guest Apartment', 'Home Office', 'Landscaped Garden', 'Smart Home', 'Underfloor Heating', 'Solar Panels'],
    isFeatured: true,
    daysOnMarket: 9,
  },
];
