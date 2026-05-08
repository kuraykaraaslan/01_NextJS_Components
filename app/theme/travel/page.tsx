import { Button } from '@/modules/ui/Button';
import { FlightCard } from '@/modules/domains/travel/flight/FlightCard';
import { HotelCard } from '@/modules/domains/travel/hotel/HotelCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faHotel,
  faArrowRight,
  faLocationDot,
  faCalendar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FLIGHTS, HOTELS, POPULAR_DESTINATIONS } from './travel.data';

export default function TravelHomePage() {
  const featuredFlights = FLIGHTS.slice(0, 3);
  const featuredHotels = HOTELS.slice(0, 3);

  return (
    <div className="bg-surface-base text-text-primary">
      <style>{`
        @keyframes travel-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,_var(--primary-subtle),_transparent_70%)]" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-info-subtle blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 text-center motion-safe:animate-[travel-fade_0.8s_ease-out]">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
            Your Next Adventure<br />
            <span className="text-primary">Awaits</span>
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Search hundreds of airlines and thousands of hotels. Book your dream trip in minutes.
          </p>

          {/* Search form */}
          <div className="mt-10 bg-surface-raised border border-border rounded-2xl shadow-sm p-4 max-w-3xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-fg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <FontAwesomeIcon icon={faPlane} className="w-3.5 h-3.5" aria-hidden="true" />
                Flights
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-overlay text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus transition-colors"
              >
                <FontAwesomeIcon icon={faHotel} className="w-3.5 h-3.5" aria-hidden="true" />
                Hotels
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="relative">
                <FontAwesomeIcon icon={faLocationDot} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" aria-hidden="true" />
                <select className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus appearance-none" aria-label="Origin">
                  <option value="">From</option>
                  <option value="IST">Istanbul (IST)</option>
                  <option value="SAW">Istanbul Sabiha (SAW)</option>
                  <option value="ADB">Izmir (ADB)</option>
                </select>
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faLocationDot} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" aria-hidden="true" />
                <select className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus appearance-none" aria-label="Destination">
                  <option value="">To</option>
                  <option value="LHR">London (LHR)</option>
                  <option value="JFK">New York (JFK)</option>
                  <option value="DXB">Dubai (DXB)</option>
                  <option value="CDG">Paris (CDG)</option>
                  <option value="FCO">Rome (FCO)</option>
                  <option value="AMS">Amsterdam (AMS)</option>
                </select>
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faCalendar} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" aria-hidden="true" />
                <input type="date" className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-surface-base text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus" aria-label="Departure date" />
              </div>
              <Button
                as="a"
                href="/theme/travel/flights"
                variant="primary"
                fullWidth
                iconRight={<FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-xl font-semibold text-text-primary mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POPULAR_DESTINATIONS.map((dest) => (
            <a
              key={dest.code}
              href={`/theme/travel/flights`}
              className={`relative rounded-xl overflow-hidden h-28 bg-gradient-to-br ${dest.gradient} flex flex-col items-center justify-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus`}
            >
              <span className="text-white font-mono text-xs opacity-70">{dest.code}</span>
              <span className="text-white font-bold text-sm">{dest.name}</span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      {/* ── Featured Flights ── */}
      <section className="bg-surface-raised border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Featured Flights</h2>
            <a href="/theme/travel/flights" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
              All flights <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredFlights.map((flight) => (
              <FlightCard
                key={flight.flightId}
                flight={flight}
                href={`/theme/travel/flights/${flight.flightId}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Hotels ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Top Hotels</h2>
          <a href="/theme/travel/hotels" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            All hotels <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredHotels.map((hotel) => (
            <HotelCard
              key={hotel.hotelId}
              hotel={hotel}
              href={`/theme/travel/hotels/${hotel.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary-fg">Ready to explore the world?</h2>
          <p className="text-primary-fg/80 max-w-md mx-auto text-sm leading-relaxed">
            Sign up for free and get exclusive deals on flights and hotels delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-lg text-sm text-text-primary bg-surface-base focus:outline-none focus:ring-2 focus:ring-border-focus"
              aria-label="Email address"
            />
            <Button variant="secondary" size="md">
              <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Join Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
