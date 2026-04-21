'use client';
import { FlightSearchPanel } from '@/modules/domain/travel/FlightSearchPanel';
import { FareComparisonTable } from '@/modules/domain/travel/FareComparisonTable';
import { SeatMapSelector } from '@/modules/domain/travel/SeatMapSelector';
import { ItineraryTimeline } from '@/modules/domain/travel/ItineraryTimeline';
import { HotelRoomPicker } from '@/modules/domain/travel/HotelRoomPicker';
import type { ShowcaseComponent } from '../showcase.types';

export function buildTravelData(): ShowcaseComponent[] {
  return [
    {
      id: 'tr-flight-search',
      title: 'FlightSearchPanel',
      category: 'Domain' as const,
      abbr: 'Fs',
      description: 'Flight search with trip-type and cabin-class toggles, airport ComboBoxes, date range, and stops filter.',
      filePath: 'modules/domain/travel/FlightSearchPanel.tsx',
      sourceCode: `import { FlightSearchPanel } from '@/modules/domain/travel/FlightSearchPanel';\n\n<FlightSearchPanel\n  airportOptions={airports}\n  onSearch={(params) => searchFlights(params)}\n/>`,
      variants: [
        {
          title: 'Flight search form',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <FlightSearchPanel
                airportOptions={[
                  { value: 'IST', label: 'Istanbul (IST)' },
                  { value: 'LHR', label: 'London Heathrow (LHR)' },
                  { value: 'JFK', label: 'New York JFK (JFK)' },
                  { value: 'CDG', label: 'Paris Charles de Gaulle (CDG)' },
                  { value: 'FRA', label: 'Frankfurt (FRA)' },
                ]}
                onSearch={() => {}}
              />
            </div>
          ),
          code: `<FlightSearchPanel\n  airportOptions={[\n    { value: 'IST', label: 'Istanbul (IST)' },\n    { value: 'LHR', label: 'London Heathrow (LHR)' },\n  ]}\n  onSearch={(params) => searchFlights(params)}\n/>`,
        },
      ],
    },

    {
      id: 'tr-fare-compare',
      title: 'FareComparisonTable',
      category: 'Domain' as const,
      abbr: 'Fc',
      description: 'Flight results table with non-stop badges, best-price indicator, refundable tags, and pagination.',
      filePath: 'modules/domain/travel/FareComparisonTable.tsx',
      sourceCode: `import { FareComparisonTable } from '@/modules/domain/travel/FareComparisonTable';\n\n<FareComparisonTable fares={fares} onSelect={(fare) => selectFlight(fare)} />`,
      variants: [
        {
          title: 'Fare comparison table',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <FareComparisonTable
                fares={[
                  { id: 'f1', airline: 'Turkish Airlines', flightNo: 'TK 1924', departure: '07:30', arrival: '10:45', duration: '3h 15m', stops: 0, price: 289, currency: 'USD', cabinClass: 'economy', refundable: true },
                  { id: 'f2', airline: 'Lufthansa', flightNo: 'LH 1840', departure: '11:00', arrival: '15:20', duration: '4h 20m', stops: 1, price: 245, currency: 'USD', cabinClass: 'economy', baggage: '23kg included' },
                  { id: 'f3', airline: 'British Airways', flightNo: 'BA 677', departure: '14:30', arrival: '17:45', duration: '3h 15m', stops: 0, price: 310, currency: 'USD', cabinClass: 'economy', refundable: false },
                ]}
                onSelect={() => {}}
              />
            </div>
          ),
          code: `<FareComparisonTable\n  fares={[\n    { id: 'f1', airline: 'Turkish Airlines', flightNo: 'TK 1924', departure: '07:30', arrival: '10:45', duration: '3h 15m', stops: 0, price: 289, currency: 'USD', cabinClass: 'economy', refundable: true },\n  ]}\n  onSelect={(fare) => selectFlight(fare)}\n/>`,
        },
      ],
    },

    {
      id: 'tr-seat-map',
      title: 'SeatMapSelector',
      category: 'Domain' as const,
      abbr: 'Sm',
      description: 'Interactive aircraft seat map with cabin toggle, status colors, tooltip pricing, and selection summary.',
      filePath: 'modules/domain/travel/SeatMapSelector.tsx',
      sourceCode: `import { SeatMapSelector } from '@/modules/domain/travel/SeatMapSelector';\n\n<SeatMapSelector\n  seats={seats}\n  maxSelectable={1}\n  onSelectionChange={(ids) => setSelectedSeats(ids)}\n/>`,
      variants: [
        {
          title: 'Seat map selector',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <SeatMapSelector
                maxSelectable={2}
                seats={[
                  ...['A','B','C','D','E','F'].flatMap(col =>
                    [1,2,3,4,5,6,7,8].map(row => ({
                      id: `${row}${col}`,
                      row,
                      col,
                      class: 'economy' as const,
                      status: (row === 3 && ['A','B'].includes(col)) ? 'occupied' as const :
                              (row === 1) ? 'extra-legroom' as const :
                              (row === 4 && col === 'C') ? 'occupied' as const : 'available' as const,
                      price: row === 1 ? 25 : undefined,
                    }))
                  ),
                ]}
                onSelectionChange={() => {}}
              />
            </div>
          ),
          code: `<SeatMapSelector\n  seats={seatData}\n  maxSelectable={1}\n  onSelectionChange={(selectedIds) => {\n    setSelectedSeats(selectedIds);\n  }}\n/>`,
        },
      ],
    },

    {
      id: 'tr-itinerary',
      title: 'ItineraryTimeline',
      category: 'Domain' as const,
      abbr: 'It',
      description: 'Trip itinerary with vertical stepper, breadcrumb, leg cards (flights, hotels, activities), and status badges.',
      filePath: 'modules/domain/travel/ItineraryTimeline.tsx',
      sourceCode: `import { ItineraryTimeline } from '@/modules/domain/travel/ItineraryTimeline';\n\n<ItineraryTimeline\n  tripName="Paris Holiday"\n  destination="Paris, France"\n  legs={legs}\n/>`,
      variants: [
        {
          title: 'Trip itinerary',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ItineraryTimeline
                tripName="Paris Weekend Getaway"
                destination="Paris, France"
                legs={[
                  { id: 'l1', type: 'flight', title: 'Istanbul → Paris', location: 'CDG Airport', date: '2026-04-25', time: '07:30', duration: '3h 15m', status: 'confirmed', provider: 'Turkish Airlines', confirmationNo: 'TK1924' },
                  { id: 'l2', type: 'hotel', title: 'Le Marais Hotel', location: 'Paris 4th arr.', date: '2026-04-25', status: 'confirmed', confirmationNo: 'HTL-88421' },
                  { id: 'l3', type: 'activity', title: 'Louvre Museum Tour', location: 'Rue de Rivoli, Paris', date: '2026-04-26', time: '10:00', duration: '3 hours', status: 'pending' },
                  { id: 'l4', type: 'flight', title: 'Paris → Istanbul', location: 'CDG Airport', date: '2026-04-28', time: '18:00', duration: '3h 15m', status: 'confirmed', provider: 'Turkish Airlines' },
                ]}
              />
            </div>
          ),
          code: `<ItineraryTimeline\n  tripName="Paris Weekend"\n  destination="Paris, France"\n  legs={[\n    { id: 'l1', type: 'flight', title: 'Istanbul → Paris', location: 'CDG', date: '2026-04-25', time: '07:30', status: 'confirmed' },\n    { id: 'l2', type: 'hotel', title: 'Le Marais Hotel', location: 'Paris', date: '2026-04-25', status: 'confirmed' },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'tr-hotel-room',
      title: 'HotelRoomPicker',
      category: 'Domain' as const,
      abbr: 'Hr',
      description: 'Hotel room list with amenity filter, per-night pricing, nightly total, and select-room button.',
      filePath: 'modules/domain/travel/HotelRoomPicker.tsx',
      sourceCode: `import { HotelRoomPicker } from '@/modules/domain/travel/HotelRoomPicker';\n\n<HotelRoomPicker\n  rooms={rooms}\n  nights={3}\n  onSelect={(room) => selectRoom(room)}\n/>`,
      variants: [
        {
          title: 'Hotel room picker',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <HotelRoomPicker
                nights={3}
                rooms={[
                  { id: 'r1', name: 'Classic Double Room', type: 'Double', sqm: 22, maxOccupants: 2, pricePerNight: 120, amenities: ['wifi', 'breakfast', 'ac'], available: true },
                  { id: 'r2', name: 'Superior Suite', type: 'Suite', sqm: 48, maxOccupants: 4, pricePerNight: 280, amenities: ['wifi', 'breakfast', 'pool', 'balcony', 'oceanview'], available: true, badge: 'Best value' },
                  { id: 'r3', name: 'Standard Single', type: 'Single', sqm: 18, maxOccupants: 1, pricePerNight: 85, amenities: ['wifi'], available: false },
                ]}
                onSelect={() => {}}
              />
            </div>
          ),
          code: `<HotelRoomPicker\n  nights={3}\n  rooms={[\n    { id: 'r1', name: 'Classic Double', type: 'Double', sqm: 22, maxOccupants: 2, pricePerNight: 120, amenities: ['wifi','breakfast'], available: true },\n    { id: 'r2', name: 'Superior Suite', type: 'Suite', sqm: 48, maxOccupants: 4, pricePerNight: 280, amenities: ['wifi','breakfast','pool','balcony'], available: true, badge: 'Best value' },\n  ]}\n  onSelect={(room) => selectRoom(room)}\n/>`,
        },
      ],
    },
  ];
}
