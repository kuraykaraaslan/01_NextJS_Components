'use client';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faPlane } from '@fortawesome/free-solid-svg-icons';
import { FlightCabinBadge } from './FlightCabinBadge';
import { FlightSegmentStatusBadge } from './FlightSegmentStatusBadge';
import type { FlightCabinClass, FlightSegmentStatus } from '../types';

type FlightCardProps = {
  flight: {
    flightId: string;
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    airline: string;
    cabin: FlightCabinClass;
    price: number;
    currency: string;
    status: FlightSegmentStatus;
    duration?: string;
  };
  href?: string;
  className?: string;
};

export function FlightCard({ flight, href, className }: FlightCardProps) {
  const body = (
    <div className="p-5 flex flex-col gap-4">
      {/* Route row */}
      <div className="flex items-center justify-between gap-3">
        {/* Origin */}
        <div className="text-center min-w-0">
          <p className="text-2xl font-bold text-text-primary tracking-tight">{flight.origin}</p>
          <p className="text-sm text-text-secondary mt-0.5">{flight.departureTime}</p>
        </div>

        {/* Arrow + duration */}
        <div className="flex flex-col items-center gap-1 flex-1 px-2">
          {flight.duration && (
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" aria-hidden="true" />
              {flight.duration}
            </span>
          )}
          <div className="flex items-center w-full gap-1">
            <div className="flex-1 h-px bg-border" />
            <FontAwesomeIcon icon={faPlane} className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <div className="flex-1 h-px bg-border" />
          </div>
          <span className="text-xs text-text-secondary">{flight.airline}</span>
        </div>

        {/* Destination */}
        <div className="text-center min-w-0">
          <p className="text-2xl font-bold text-text-primary tracking-tight">{flight.destination}</p>
          <p className="text-sm text-text-secondary mt-0.5">{flight.arrivalTime}</p>
        </div>
      </div>

      {/* Flight number + badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-text-secondary bg-surface-sunken px-2 py-0.5 rounded">
          {flight.flightNumber}
        </span>
        <FlightCabinBadge cabin={flight.cabin} size="sm" />
        <FlightSegmentStatusBadge status={flight.status} size="sm" />
      </div>

      {/* Price + Book */}
      <div className="flex items-center justify-between border-t border-border pt-3 mt-1">
        <div>
          <span className="text-xs text-text-secondary">from</span>
          <p className="text-xl font-bold text-text-primary">
            {flight.currency} {flight.price.toLocaleString()}
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          iconRight={<FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />}
        >
          Book
        </Button>
      </div>
    </div>
  );

  const baseClass = cn(
    'rounded-xl border border-border bg-surface-raised overflow-hidden flex flex-col',
    'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </a>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
