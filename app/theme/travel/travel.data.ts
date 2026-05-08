import type { FlightCabinClass, FlightSegmentStatus, TravelBookingStatus } from '@/modules/domains/travel/types';

/* =========================================================
   FLIGHTS
========================================================= */

export type TravelFlight = {
  flightId: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  originCity: string;
  destinationCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabin: FlightCabinClass;
  price: number;
  currency: string;
  status: FlightSegmentStatus;
};

export const FLIGHTS: TravelFlight[] = [
  {
    flightId: 'tk-123',
    flightNumber: 'TK 123',
    airline: 'Turkish Airlines',
    origin: 'IST',
    destination: 'LHR',
    originCity: 'Istanbul',
    destinationCity: 'London',
    departureTime: '10:30',
    arrivalTime: '13:15',
    duration: '3h 45m',
    cabin: 'ECONOMY',
    price: 249,
    currency: 'USD',
    status: 'SCHEDULED',
  },
  {
    flightId: 'tk-456',
    flightNumber: 'TK 456',
    airline: 'Turkish Airlines',
    origin: 'IST',
    destination: 'JFK',
    originCity: 'Istanbul',
    destinationCity: 'New York',
    departureTime: '14:00',
    arrivalTime: '18:30',
    duration: '10h 30m',
    cabin: 'BUSINESS',
    price: 1850,
    currency: 'USD',
    status: 'SCHEDULED',
  },
  {
    flightId: 'tk-789',
    flightNumber: 'TK 789',
    airline: 'Turkish Airlines',
    origin: 'IST',
    destination: 'DXB',
    originCity: 'Istanbul',
    destinationCity: 'Dubai',
    departureTime: '08:45',
    arrivalTime: '13:00',
    duration: '4h 15m',
    cabin: 'ECONOMY',
    price: 199,
    currency: 'USD',
    status: 'DELAYED',
  },
  {
    flightId: 'tk-321',
    flightNumber: 'TK 321',
    airline: 'Turkish Airlines',
    origin: 'IST',
    destination: 'CDG',
    originCity: 'Istanbul',
    destinationCity: 'Paris',
    departureTime: '07:20',
    arrivalTime: '09:55',
    duration: '3h 35m',
    cabin: 'PREMIUM_ECONOMY',
    price: 420,
    currency: 'USD',
    status: 'SCHEDULED',
  },
  {
    flightId: 'pc-210',
    flightNumber: 'PC 210',
    airline: 'Pegasus Airlines',
    origin: 'SAW',
    destination: 'FCO',
    originCity: 'Istanbul (Sabiha)',
    destinationCity: 'Rome',
    departureTime: '16:55',
    arrivalTime: '18:45',
    duration: '2h 50m',
    cabin: 'ECONOMY',
    price: 139,
    currency: 'USD',
    status: 'SCHEDULED',
  },
  {
    flightId: 'tk-550',
    flightNumber: 'TK 550',
    airline: 'Turkish Airlines',
    origin: 'ADB',
    destination: 'AMS',
    originCity: 'Izmir',
    destinationCity: 'Amsterdam',
    departureTime: '11:10',
    arrivalTime: '14:00',
    duration: '3h 50m',
    cabin: 'FIRST',
    price: 3200,
    currency: 'USD',
    status: 'ARRIVED',
  },
];

/* =========================================================
   HOTELS
========================================================= */

export type TravelHotel = {
  hotelId: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  description: string;
};

export const HOTELS: TravelHotel[] = [
  {
    hotelId: 'h-01',
    name: 'Grand Pera Palace',
    slug: 'grand-pera-palace',
    city: 'Istanbul',
    country: 'Turkey',
    stars: 5,
    pricePerNight: 320,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel1/640/400',
    rating: 4.8,
    reviewCount: 1240,
    amenities: ['Free Wi-Fi', 'Spa', 'Rooftop Pool', 'Restaurant', 'Concierge', 'Gym'],
    description: 'Historic luxury hotel in the heart of Beyoglu with stunning Bosphorus views.',
  },
  {
    hotelId: 'h-02',
    name: 'The Langham London',
    slug: 'langham-london',
    city: 'London',
    country: 'United Kingdom',
    stars: 5,
    pricePerNight: 485,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel2/640/400',
    rating: 4.9,
    reviewCount: 2105,
    amenities: ['Free Wi-Fi', 'Indoor Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Room Service'],
    description: 'Iconic five-star hotel in the heart of Marylebone, steps from Oxford Street.',
  },
  {
    hotelId: 'h-03',
    name: 'Atlantis The Palm',
    slug: 'atlantis-the-palm',
    city: 'Dubai',
    country: 'UAE',
    stars: 5,
    pricePerNight: 650,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel3/640/400',
    rating: 4.7,
    reviewCount: 3420,
    amenities: ['Private Beach', 'Waterpark', 'Multiple Pools', 'Spa', '23 Restaurants', 'Aquarium'],
    description: 'Iconic resort on Palm Jumeirah with a private beach and world-class waterpark.',
  },
  {
    hotelId: 'h-04',
    name: 'Hotel Le Bristol',
    slug: 'hotel-le-bristol',
    city: 'Paris',
    country: 'France',
    stars: 5,
    pricePerNight: 720,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel4/640/400',
    rating: 4.9,
    reviewCount: 987,
    amenities: ['Free Wi-Fi', 'Pool', 'Spa', 'Michelin-star Restaurant', 'Concierge', 'Garden'],
    description: 'Palace hotel on Rue du Faubourg Saint-Honoré with timeless Parisian elegance.',
  },
  {
    hotelId: 'h-05',
    name: 'The Standard High Line',
    slug: 'standard-high-line-nyc',
    city: 'New York',
    country: 'United States',
    stars: 4,
    pricePerNight: 385,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel5/640/400',
    rating: 4.5,
    reviewCount: 1876,
    amenities: ['Free Wi-Fi', 'Rooftop Bar', 'Restaurant', 'Gym', 'Room Service'],
    description: 'Trendy boutique hotel straddling the High Line in the Meatpacking District.',
  },
  {
    hotelId: 'h-06',
    name: 'Hotel de Russie',
    slug: 'hotel-de-russie-rome',
    city: 'Rome',
    country: 'Italy',
    stars: 5,
    pricePerNight: 520,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel6/640/400',
    rating: 4.8,
    reviewCount: 764,
    amenities: ['Free Wi-Fi', 'Secret Garden', 'Spa', 'Restaurant', 'Bar', 'Gym'],
    description: 'Elegant Rocco Forte hotel between Piazza del Popolo and the Spanish Steps.',
  },
  {
    hotelId: 'h-07',
    name: 'Mövenpick Bosphorus',
    slug: 'movenpick-bosphorus',
    city: 'Istanbul',
    country: 'Turkey',
    stars: 4,
    pricePerNight: 195,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel7/640/400',
    rating: 4.4,
    reviewCount: 892,
    amenities: ['Free Wi-Fi', 'Bosphorus View', 'Pool', 'Restaurant', 'Gym', 'Terrace'],
    description: 'Contemporary hotel on the European shore of the Bosphorus with panoramic views.',
  },
  {
    hotelId: 'h-08',
    name: 'citizenM Amsterdam',
    slug: 'citizenm-amsterdam',
    city: 'Amsterdam',
    country: 'Netherlands',
    stars: 3,
    pricePerNight: 145,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/hotel8/640/400',
    rating: 4.3,
    reviewCount: 2341,
    amenities: ['Free Wi-Fi', 'Rooftop Terrace', 'Bar', '24h Food', 'Canteen'],
    description: 'Affordable, design-forward hotel in the city center with a lively rooftop scene.',
  },
];

/* =========================================================
   POPULAR DESTINATIONS
========================================================= */

export const POPULAR_DESTINATIONS = [
  { name: 'Istanbul',  code: 'IST', gradient: 'from-red-500 to-orange-400' },
  { name: 'London',    code: 'LHR', gradient: 'from-blue-600 to-indigo-500' },
  { name: 'Dubai',     code: 'DXB', gradient: 'from-amber-500 to-yellow-400' },
  { name: 'Paris',     code: 'CDG', gradient: 'from-pink-500 to-rose-400'   },
  { name: 'New York',  code: 'JFK', gradient: 'from-slate-600 to-gray-500'  },
  { name: 'Rome',      code: 'FCO', gradient: 'from-green-600 to-teal-500'  },
];

/* =========================================================
   SAMPLE BOOKINGS
========================================================= */

export type SampleBooking = {
  bookingId: string;
  bookingNumber: string;
  type: 'flight' | 'hotel';
  description: string;
  traveler: string;
  dates: string;
  total: string;
  status: TravelBookingStatus;
};

export const SAMPLE_BOOKINGS: SampleBooking[] = [
  {
    bookingId: 'b-01',
    bookingNumber: 'VYG-100123',
    type: 'flight',
    description: 'TK 123 — Istanbul (IST) → London (LHR)',
    traveler: 'John Smith',
    dates: '15 Jun 2026',
    total: 'USD 249',
    status: 'PAID',
  },
  {
    bookingId: 'b-02',
    bookingNumber: 'VYG-100456',
    type: 'hotel',
    description: 'Grand Pera Palace, Istanbul — 3 nights',
    traveler: 'John Smith',
    dates: '15–18 Jun 2026',
    total: 'USD 960',
    status: 'CONFIRMED',
  },
  {
    bookingId: 'b-03',
    bookingNumber: 'VYG-100789',
    type: 'flight',
    description: 'PC 210 — Istanbul Sabiha (SAW) → Rome (FCO)',
    traveler: 'Jane Smith',
    dates: '20 Jul 2026',
    total: 'USD 139',
    status: 'PENDING',
  },
];
