'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faClock,
  faPlane,
  faSuitcase,
  faRotateRight,
  faShieldHalved,
  faChevronUp,
  faChevronDown,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FlightCabinBadge } from '@/modules/domains/travel/flight/FlightCabinBadge';
import { FlightSegmentStatusBadge } from '@/modules/domains/travel/flight/FlightSegmentStatusBadge';
import { FlightSeatPicker } from '@/modules/domains/travel/flight/FlightSeatPicker';
import { CountrySelector } from '@/modules/domains/common/location/CountrySelector';
import type { TravelFlight } from './travel.data';
import type { FlightCabinClass } from '@/modules/domains/travel/types';

/* ── types ── */

type DocType = 'PASSPORT' | 'ID';

type PassengerInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  dob: string;
  docType: DocType;
  docNumber: string;
};

type SelectedSeat = { id: string; priceExtra: number };

const mkPassenger = (): PassengerInfo => ({
  firstName: '', lastName: '', email: '', phone: '',
  nationality: '', dob: '', docType: 'PASSPORT', docNumber: '',
});

/* ── cabin perks ── */

const CABIN_PERKS: Record<FlightCabinClass, string[]> = {
  ECONOMY:         ['1 carry-on bag', '23 kg checked bag', 'Standard seat selection'],
  PREMIUM_ECONOMY: ['2 carry-on bags', '2 × 23 kg checked bags', 'Extra legroom seat', 'Priority boarding'],
  BUSINESS:        ['2 carry-on bags', '2 × 32 kg checked bags', 'Lie-flat seat', 'Lounge access', 'Priority check-in'],
  FIRST:           ['3 carry-on bags', '3 × 32 kg checked bags', 'Private suite', 'Lounge access', 'Chauffeur service', 'Gourmet dining'],
};

const ALL_CABINS: FlightCabinClass[] = ['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST'];

/* ── helpers ── */

function isComplete(p: PassengerInfo, isContact: boolean): boolean {
  const base = !!(p.firstName && p.lastName && p.nationality && p.dob && p.docNumber);
  return isContact ? base && !!p.email : base;
}

/* ── PassengerForm ── */

function PassengerForm({
  idx,
  data,
  isExpanded,
  isContact,
  onToggle,
  onChange,
}: {
  idx: number;
  data: PassengerInfo;
  isExpanded: boolean;
  isContact: boolean;
  onToggle: () => void;
  onChange: (updated: PassengerInfo) => void;
}) {
  const prefix = `pax-${idx}`;
  const complete = isComplete(data, isContact);
  const displayName = data.firstName && data.lastName
    ? `${data.firstName} ${data.lastName}`
    : `Passenger ${idx + 1}`;

  function field<K extends keyof PassengerInfo>(key: K, val: PassengerInfo[K]) {
    onChange({ ...data, [key]: val });
  }

  return (
    <div className="bg-surface-raised border border-border rounded-xl overflow-hidden">
      {/* Accordion header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus"
      >
        <div className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
          complete ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary',
        )}>
          {idx + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
          {isContact && <p className="text-xs text-text-secondary">Contact passenger</p>}
        </div>
        {complete && <span className="text-xs font-medium text-success shrink-0">Complete</span>}
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className="w-3.5 h-3.5 text-text-secondary shrink-0"
          aria-hidden="true"
        />
      </button>

      {/* Form body */}
      {isExpanded && (
        <div className="border-t border-border px-5 pt-5 pb-6 space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id={`${prefix}-fn`}
              label="First Name"
              value={data.firstName}
              onChange={(e) => field('firstName', e.target.value)}
              placeholder="John"
              required
            />
            <Input
              id={`${prefix}-ln`}
              label="Last Name"
              value={data.lastName}
              onChange={(e) => field('lastName', e.target.value)}
              placeholder="Smith"
              required
            />
          </div>

          {/* Nationality + DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CountrySelector
              id={`${prefix}-nat`}
              label="Nationality"
              value={data.nationality}
              onChange={(v) => field('nationality', v)}
              required
            />
            <Input
              id={`${prefix}-dob`}
              label="Date of Birth"
              type="date"
              value={data.dob}
              onChange={(e) => field('dob', e.target.value)}
              required
            />
          </div>

          {/* Document type toggle */}
          <div className="space-y-1.5">
            <span className="block text-sm font-medium text-text-primary">
              Document Type
              <span className="text-error ml-1" aria-hidden="true">*</span>
            </span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(['PASSPORT', 'ID'] as DocType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => field('docType', type)}
                  className={cn(
                    'flex-1 py-2 text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus',
                    data.docType === type
                      ? 'bg-primary text-primary-fg'
                      : 'bg-surface-base text-text-secondary hover:bg-surface-overlay',
                  )}
                >
                  {type === 'PASSPORT' ? 'Passport' : 'ID Card'}
                </button>
              ))}
            </div>
          </div>

          {/* Document number */}
          <Input
            id={`${prefix}-doc`}
            label={data.docType === 'PASSPORT' ? 'Passport Number' : 'ID Number'}
            value={data.docNumber}
            onChange={(e) => field('docNumber', e.target.value)}
            placeholder={data.docType === 'PASSPORT' ? 'AB1234567' : 'TR12345678901'}
            required
          />

          {/* Contact fields — first passenger only */}
          {isContact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <Input
                id={`${prefix}-email`}
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => field('email', e.target.value)}
                placeholder="john@example.com"
                hint="Booking confirmation will be sent here"
                required
              />
              <Input
                id={`${prefix}-phone`}
                label="Phone"
                type="tel"
                value={data.phone}
                onChange={(e) => field('phone', e.target.value)}
                placeholder="+1 555 000 0000"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── FlightBookingFlow ── */

type FlightBookingFlowProps = {
  flight: TravelFlight;
};

export function FlightBookingFlow({ flight }: FlightBookingFlowProps) {
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([mkPassenger()]);
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  /* ── passenger count ── */
  function adjustCount(delta: number) {
    const next = Math.min(9, Math.max(1, passengerCount + delta));
    setPassengerCount(next);
    setPassengers((prev) =>
      next > prev.length
        ? [...prev, ...Array.from({ length: next - prev.length }, mkPassenger)]
        : prev.slice(0, next),
    );
    if (delta < 0) setSelectedSeats((prev) => prev.slice(0, next));
  }

  /* ── seat toggle ── */
  function handleSeatToggle(seatId: string, priceExtra: number) {
    setSelectedSeats((prev) => {
      if (prev.find((s) => s.id === seatId)) return prev.filter((s) => s.id !== seatId);
      if (prev.length >= passengerCount) return prev;
      return [...prev, { id: seatId, priceExtra }];
    });
  }

  /* ── price ── */
  const baseFare = flight.price * passengerCount;
  const seatExtras = selectedSeats.reduce((acc, s) => acc + s.priceExtra, 0);
  const subtotal = baseFare + seatExtras;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const selectedSeatIds = selectedSeats.map((s) => s.id);
  const perks = CABIN_PERKS[flight.cabin];

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      {/* ── Left column ── */}
      <div className="lg:col-span-2 space-y-6">

        {/* Route card */}
        <div className="bg-surface-raised border border-border rounded-xl p-6">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-mono text-text-secondary bg-surface-sunken px-2 py-0.5 rounded">
              {flight.flightNumber}
            </span>
            <FlightCabinBadge cabin={flight.cabin} size="sm" />
            <FlightSegmentStatusBadge status={flight.status} size="sm" />
          </div>
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

        {/* Passenger count */}
        <div className="bg-surface-raised border border-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-text-primary mb-4">Passengers</h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => adjustCount(-1)}
              disabled={passengerCount <= 1}
              aria-label="Remove passenger"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                passengerCount > 1
                  ? 'border-border bg-surface-base hover:bg-surface-overlay text-text-primary cursor-pointer'
                  : 'border-border text-text-disabled cursor-not-allowed opacity-40',
              )}
            >
              <FontAwesomeIcon icon={faMinus} className="w-3 h-3" aria-hidden="true" />
            </button>

            <span className="text-2xl font-bold text-text-primary w-6 text-center tabular-nums">
              {passengerCount}
            </span>

            <button
              type="button"
              onClick={() => adjustCount(1)}
              disabled={passengerCount >= 9}
              aria-label="Add passenger"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                passengerCount < 9
                  ? 'border-border bg-surface-base hover:bg-surface-overlay text-text-primary cursor-pointer'
                  : 'border-border text-text-disabled cursor-not-allowed opacity-40',
              )}
            >
              <FontAwesomeIcon icon={faPlus} className="w-3 h-3" aria-hidden="true" />
            </button>

            <p className="text-sm text-text-secondary">
              {passengerCount === 1 ? '1 adult' : `${passengerCount} adults`}
            </p>
          </div>
        </div>

        {/* Cabin class (display only) */}
        <div className="bg-surface-raised border border-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-text-primary mb-4">Cabin Class</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ALL_CABINS.map((cabin) => (
              <div
                key={cabin}
                className={cn(
                  'rounded-lg border p-2.5',
                  cabin === flight.cabin
                    ? 'border-primary bg-primary-subtle'
                    : 'border-border bg-surface-base opacity-40',
                )}
              >
                <FlightCabinBadge cabin={cabin} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* What's included */}
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

        {/* Seat picker — multi-select up to passengerCount */}
        <FlightSeatPicker
          cabin={flight.cabin}
          flightId={flight.flightId}
          currency={flight.currency}
          selectedSeatIds={selectedSeatIds}
          onSeatToggle={handleSeatToggle}
          maxSelectable={passengerCount}
        />

        {/* Per-passenger forms */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-text-primary">Passenger Details</h2>
          {passengers.map((pax, idx) => (
            <PassengerForm
              key={idx}
              idx={idx}
              data={pax}
              isContact={idx === 0}
              isExpanded={expandedIdx === idx}
              onToggle={() => setExpandedIdx((prev) => (prev === idx ? -1 : idx))}
              onChange={(updated) =>
                setPassengers((prev) => prev.map((p, i) => (i === idx ? updated : p)))
              }
            />
          ))}
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-surface-raised border border-border rounded-xl p-5 space-y-4">
          <h2 className="text-base font-semibold text-text-primary">Price Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>
                {flight.currency} {flight.price.toLocaleString()} × {passengerCount}
              </span>
              <span>{flight.currency} {baseFare.toLocaleString()}</span>
            </div>

            {seatExtras > 0 && (
              <div className="flex justify-between text-text-secondary">
                <span>Seat selection</span>
                <span>+{flight.currency} {seatExtras.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-text-secondary">
              <span>Taxes &amp; fees</span>
              <span>{flight.currency} {taxes.toLocaleString()}</span>
            </div>

            <div className="border-t border-border pt-2 flex justify-between font-bold text-text-primary">
              <span>Total</span>
              <span>{flight.currency} {total.toLocaleString()}</span>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="rounded-lg bg-surface-overlay px-3 py-2 space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                Selected Seats
              </p>
              <p className="text-sm font-semibold text-text-primary">
                {selectedSeats.map((s) => s.id).join(', ')}
              </p>
            </div>
          )}

          <Button
            variant="primary"
            fullWidth
            iconRight={
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
            }
          >
            Book {passengerCount === 1 ? 'Flight' : `${passengerCount} Tickets`}
          </Button>

          <p className="text-xs text-text-secondary text-center">
            Free cancellation within 24 hours of booking
          </p>
        </div>
      </div>
    </div>
  );
}
