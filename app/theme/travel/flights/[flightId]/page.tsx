import { notFound } from 'next/navigation';
import { Button } from '@/modules/ui/Button';
import { FlightCabinBadge } from '@/modules/domains/travel/flight/FlightCabinBadge';
import { FlightSegmentStatusBadge } from '@/modules/domains/travel/flight/FlightSegmentStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faClock,
  faArrowRight,
  faChevronLeft,
  faSuitcase,
  faRotateRight,
  faShieldHalved,
  faUser,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FLIGHTS } from '../../travel.data';
import type { FlightCabinClass } from '@/modules/domains/travel/types';

export function generateStaticParams() {
  return FLIGHTS.map((f) => ({ flightId: f.flightId }));
}

const CABIN_PERKS: Record<FlightCabinClass, string[]> = {
  ECONOMY:         ['1 carry-on bag', '23 kg checked bag', 'Standard seat selection'],
  PREMIUM_ECONOMY: ['2 carry-on bags', '2 × 23 kg checked bags', 'Extra legroom seat', 'Priority boarding'],
  BUSINESS:        ['2 carry-on bags', '2 × 32 kg checked bags', 'Lie-flat seat', 'Lounge access', 'Priority check-in'],
  FIRST:           ['3 carry-on bags', '3 × 32 kg checked bags', 'Private suite', 'Lounge access', 'Chauffeur service', 'Gourmet dining'],
};

export default async function FlightDetailPage({ params }: { params: Promise<{ flightId: string }> }) {
  const { flightId } = await params;
  const flight = FLIGHTS.find((f) => f.flightId === flightId);
  if (!flight) notFound();

  const perks = CABIN_PERKS[flight.cabin];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
      {/* Back */}
      <a
        href="/theme/travel/flights"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" aria-hidden="true" />
        Back to flights
      </a>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Flight route card */}
          <div className="bg-surface-raised border border-border rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-xs font-mono text-text-secondary bg-surface-sunken px-2 py-0.5 rounded">
                {flight.flightNumber}
              </span>
              <FlightCabinBadge cabin={flight.cabin} size="sm" />
              <FlightSegmentStatusBadge status={flight.status} size="sm" />
            </div>

            {/* Route */}
            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-text-primary">{flight.origin}</p>
                <p className="text-sm text-text-secondary mt-1">{flight.originCity}</p>
                <p className="text-lg font-semibold text-text-primary mt-2">{flight.departureTime}</p>
              </div>

              <div className="flex flex-col items-center gap-1 flex-1">
                {flight.duration && (
                  <span className="text-xs text-text-secondary flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} className="w-3 h-3" aria-hidden="true" />
                    {flight.duration}
                  </span>
                )}
                <div className="flex items-center w-full gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <FontAwesomeIcon icon={faPlane} className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  <div className="flex-1 h-px bg-border" />
                </div>
                <span className="text-xs text-text-secondary">{flight.airline}</span>
                <span className="text-xs text-text-secondary">Non-stop</span>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-text-primary">{flight.destination}</p>
                <p className="text-sm text-text-secondary mt-1">{flight.destinationCity}</p>
                <p className="text-lg font-semibold text-text-primary mt-2">{flight.arrivalTime}</p>
              </div>
            </div>
          </div>

          {/* Cabin selection */}
          <div className="bg-surface-raised border border-border rounded-xl p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4">Select Cabin Class</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'] as FlightCabinClass[]).map((cabin) => (
                <button
                  key={cabin}
                  type="button"
                  className={`rounded-lg border p-2.5 text-left text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                    cabin === flight.cabin
                      ? 'border-primary bg-primary-subtle'
                      : 'border-border bg-surface-base hover:border-border-strong'
                  }`}
                  aria-pressed={cabin === flight.cabin}
                >
                  <FlightCabinBadge cabin={cabin} size="sm" />
                </button>
              ))}
            </div>
          </div>

          {/* What&apos;s included */}
          <div className="bg-surface-raised border border-border rounded-xl p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4">
              <FontAwesomeIcon icon={faSuitcase} className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
              What&apos;s Included
            </h2>
            <ul className="space-y-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-success shrink-0" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <FontAwesomeIcon icon={faRotateRight} className="w-3 h-3" aria-hidden="true" />
                Changeable
              </div>
              <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <FontAwesomeIcon icon={faShieldHalved} className="w-3 h-3" aria-hidden="true" />
                Travel insurance available
              </div>
            </div>
          </div>

          {/* Passenger details */}
          <div className="bg-surface-raised border border-border rounded-xl p-6">
            <h2 className="text-base font-semibold text-text-primary mb-4">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
              Passenger Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 mr-1" aria-hidden="true" />
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  <FontAwesomeIcon icon={faPhone} className="w-3 h-3 mr-1" aria-hidden="true" />
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface-base text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Price sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-surface-raised border border-border rounded-xl p-5 space-y-4">
            <h2 className="text-base font-semibold text-text-primary">Price Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Base fare</span>
                <span>{flight.currency} {flight.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Taxes &amp; fees</span>
                <span>{flight.currency} {Math.round(flight.price * 0.12).toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-text-primary">
                <span>Total</span>
                <span>{flight.currency} {Math.round(flight.price * 1.12).toLocaleString()}</span>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              iconRight={<FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />}
            >
              Book Flight
            </Button>

            <p className="text-xs text-text-secondary text-center">
              Free cancellation within 24 hours of booking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
