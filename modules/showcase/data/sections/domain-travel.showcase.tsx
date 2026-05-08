'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { BookingStatusBadge } from '@/modules/domains/travel/booking/BookingStatusBadge';
import { FlightCabinBadge } from '@/modules/domains/travel/flight/FlightCabinBadge';
import { FlightSegmentStatusBadge } from '@/modules/domains/travel/flight/FlightSegmentStatusBadge';
import { FlightCard } from '@/modules/domains/travel/flight/FlightCard';
import { HotelCard } from '@/modules/domains/travel/hotel/HotelCard';

/* ─── demo data ─── */

const DEMO_FLIGHT_IST_LHR = {
  flightId: 'tk-123',
  flightNumber: 'TK 123',
  airline: 'Turkish Airlines',
  origin: 'IST',
  destination: 'LHR',
  departureTime: '10:30',
  arrivalTime: '13:15',
  duration: '3h 45m',
  cabin: 'ECONOMY' as const,
  price: 249,
  currency: 'USD',
  status: 'SCHEDULED' as const,
};

const DEMO_FLIGHT_IST_JFK = {
  flightId: 'tk-456',
  flightNumber: 'TK 456',
  airline: 'Turkish Airlines',
  origin: 'IST',
  destination: 'JFK',
  departureTime: '14:00',
  arrivalTime: '18:30',
  duration: '10h 30m',
  cabin: 'BUSINESS' as const,
  price: 1850,
  currency: 'USD',
  status: 'DELAYED' as const,
};

const DEMO_HOTEL_ISTANBUL = {
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
};

const DEMO_HOTEL_LONDON = {
  hotelId: 'h-02',
  name: 'The Langham London',
  slug: 'langham-london',
  city: 'London',
  country: 'United Kingdom',
  stars: 5,
  pricePerNight: 485,
  currency: 'USD',
  imageUrl: null,
  rating: 4.9,
  reviewCount: 2105,
};

/* ─── builder ─── */

export function buildTravelDomainData(): ShowcaseComponent[] {
  return [
    {
      id: 'travel-booking-status-badge',
      title: 'BookingStatusBadge',
      category: 'Domain',
      abbr: 'BS',
      description: 'Displays travel booking lifecycle status with semantic colour coding.',
      filePath: 'modules/domains/travel/booking/BookingStatusBadge.tsx',
      sourceCode: `import { BookingStatusBadge } from '@/modules/domains/travel/booking/BookingStatusBadge';
<BookingStatusBadge status="PAID" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['DRAFT', 'PENDING', 'CONFIRMED', 'PAID', 'CANCELLED', 'REFUNDED', 'COMPLETED'] as const).map((s) => (
                <BookingStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['DRAFT', 'PENDING', 'CONFIRMED', 'PAID', 'CANCELLED', 'REFUNDED', 'COMPLETED'] as const).map((s) => (
  <BookingStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Sizes',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <BookingStatusBadge status="PAID" size="sm" />
              <BookingStatusBadge status="PAID" size="md" />
            </div>
          ),
          code: `<BookingStatusBadge status="PAID" size="sm" />
<BookingStatusBadge status="PAID" size="md" />`,
        },
      ],
    },
    {
      id: 'travel-flight-cabin-badge',
      title: 'FlightCabinBadge',
      category: 'Domain',
      abbr: 'FC',
      description: 'Colour-coded badge for flight cabin class (Economy through First).',
      filePath: 'modules/domains/travel/flight/FlightCabinBadge.tsx',
      sourceCode: `import { FlightCabinBadge } from '@/modules/domains/travel/flight/FlightCabinBadge';
<FlightCabinBadge cabin="BUSINESS" />`,
      variants: [
        {
          title: 'All cabins',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'] as const).map((c) => (
                <FlightCabinBadge key={c} cabin={c} />
              ))}
            </div>
          ),
          code: `{(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'] as const).map((c) => (
  <FlightCabinBadge key={c} cabin={c} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'] as const).map((c) => (
                <FlightCabinBadge key={c} cabin={c} size="sm" />
              ))}
            </div>
          ),
          code: `{(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'] as const).map((c) => (
  <FlightCabinBadge key={c} cabin={c} size="sm" />
))}`,
        },
      ],
    },
    {
      id: 'travel-flight-segment-status-badge',
      title: 'FlightSegmentStatusBadge',
      category: 'Domain',
      abbr: 'FS',
      description: 'Real-time flight segment status badge (Scheduled, Delayed, Departed, etc.).',
      filePath: 'modules/domains/travel/flight/FlightSegmentStatusBadge.tsx',
      sourceCode: `import { FlightSegmentStatusBadge } from '@/modules/domains/travel/flight/FlightSegmentStatusBadge';
<FlightSegmentStatusBadge status="SCHEDULED" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['SCHEDULED', 'DELAYED', 'CANCELLED', 'DEPARTED', 'ARRIVED'] as const).map((s) => (
                <FlightSegmentStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['SCHEDULED', 'DELAYED', 'CANCELLED', 'DEPARTED', 'ARRIVED'] as const).map((s) => (
  <FlightSegmentStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['SCHEDULED', 'DELAYED', 'ARRIVED'] as const).map((s) => (
                <FlightSegmentStatusBadge key={s} status={s} size="sm" />
              ))}
            </div>
          ),
          code: `{(['SCHEDULED', 'DELAYED', 'ARRIVED'] as const).map((s) => (
  <FlightSegmentStatusBadge key={s} status={s} size="sm" />
))}`,
        },
      ],
    },
    {
      id: 'travel-flight-card',
      title: 'FlightCard',
      category: 'Domain',
      abbr: 'FL',
      description: 'Flight summary card with route, airline, cabin class, status, and price.',
      filePath: 'modules/domains/travel/flight/FlightCard.tsx',
      sourceCode: `import { FlightCard } from '@/modules/domains/travel/flight/FlightCard';
<FlightCard flight={flight} href="/theme/travel/flights/tk-123" />`,
      variants: [
        {
          title: 'Economy — scheduled',
          preview: (
            <div className="max-w-sm">
              <FlightCard flight={DEMO_FLIGHT_IST_LHR} href="#" />
            </div>
          ),
          code: `<FlightCard flight={flight} href="/theme/travel/flights/tk-123" />`,
        },
        {
          title: 'Business — delayed',
          preview: (
            <div className="max-w-sm">
              <FlightCard flight={DEMO_FLIGHT_IST_JFK} />
            </div>
          ),
          code: `<FlightCard flight={flight} />`,
        },
      ],
    },
    {
      id: 'travel-hotel-card',
      title: 'HotelCard',
      category: 'Domain',
      abbr: 'HC',
      description: 'Hotel summary card with image, star rating, guest score, location, and price per night.',
      filePath: 'modules/domains/travel/hotel/HotelCard.tsx',
      sourceCode: `import { HotelCard } from '@/modules/domains/travel/hotel/HotelCard';
<HotelCard hotel={hotel} href="/theme/travel/hotels/grand-pera-palace" />`,
      variants: [
        {
          title: 'With image',
          preview: (
            <div className="max-w-xs">
              <HotelCard hotel={DEMO_HOTEL_ISTANBUL} href="#" />
            </div>
          ),
          code: `<HotelCard hotel={hotel} href="/theme/travel/hotels/grand-pera-palace" />`,
        },
        {
          title: 'No image (gradient placeholder)',
          preview: (
            <div className="max-w-xs">
              <HotelCard hotel={DEMO_HOTEL_LONDON} />
            </div>
          ),
          code: `<HotelCard hotel={{ ...hotel, imageUrl: null }} />`,
        },
      ],
    },
  ];
}
