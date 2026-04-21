'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

export type BlockedPeriod = {
  label: string;
  start: string;
  end: string;
};

export function AvailabilityCalendar({
  blockedPeriods = [],
  pricePerNight,
  currency = 'USD',
  onBook,
  className,
}: {
  blockedPeriods?: BlockedPeriod[];
  pricePerNight?: number;
  currency?: string;
  onBook?: (range: DateRange) => void;
  className?: string;
}) {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [error, setError] = useState('');

  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format;

  const nights = range.start && range.end
    ? Math.round((range.end.getTime() - range.start.getTime()) / 86400000)
    : 0;

  const total = pricePerNight != null ? pricePerNight * nights : null;

  function handleBook() {
    if (!range.start || !range.end) { setError('Please select check-in and check-out dates'); return; }
    if (nights < 1) { setError('Check-out must be after check-in'); return; }
    setError('');
    onBook?.(range);
  }

  return (
    <div className={cn('space-y-4', className)}>
      <DateRangePicker
        id="availability"
        label="Select dates"
        value={range}
        onChange={(r) => { setRange(r); setError(''); }}
      />

      {blockedPeriods.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-secondary">Unavailable periods</p>
          <div className="flex flex-wrap gap-2">
            {blockedPeriods.map((p) => (
              <Badge key={p.label} variant="error" size="sm">{p.label}: {p.start} – {p.end}</Badge>
            ))}
          </div>
        </div>
      )}

      {nights > 0 && (
        <div className="rounded-lg border border-border bg-surface-raised p-3 space-y-2 text-sm">
          <div className="flex justify-between text-text-secondary">
            <span>{nights} night{nights !== 1 ? 's' : ''}</span>
            {pricePerNight && <span>{fmt(pricePerNight)} /night</span>}
          </div>
          {total != null && (
            <div className="flex justify-between font-bold text-text-primary border-t border-border pt-2">
              <span>Total</span><span>{fmt(total)}</span>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-error-fg">{error}</p>}

      <Button variant="primary" fullWidth onClick={handleBook} iconLeft="📅">
        Book now
      </Button>
    </div>
  );
}
