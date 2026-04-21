'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export type SeatStatus = 'available' | 'occupied' | 'selected' | 'extra-legroom' | 'exit-row' | 'disabled';

export type Seat = {
  id: string;
  row: number;
  col: string;
  status: SeatStatus;
  price?: number;
  class?: 'economy' | 'business' | 'first';
};

const seatStyle: Record<SeatStatus, string> = {
  available:      'bg-surface-raised border-border hover:bg-primary-subtle hover:border-primary cursor-pointer',
  occupied:       'bg-surface-sunken border-border cursor-not-allowed opacity-40',
  selected:       'bg-primary border-primary text-primary-fg cursor-pointer',
  'extra-legroom':'bg-success-subtle border-success hover:bg-success hover:text-success-fg cursor-pointer',
  'exit-row':     'bg-warning-subtle border-warning hover:bg-warning cursor-pointer',
  disabled:       'bg-error-subtle border-error opacity-50 cursor-not-allowed',
};

const CABIN_ITEMS: ButtonGroupItem[] = [
  { value: 'economy',  label: 'Economy'  },
  { value: 'business', label: 'Business' },
];

export function SeatMapSelector({
  seats,
  maxSelectable = 1,
  onSelectionChange,
  className,
}: {
  seats: Seat[];
  maxSelectable?: number;
  onSelectionChange?: (ids: string[]) => void;
  className?: string;
}) {
  const [cabin,    setCabin]    = useState('economy');
  const [selected, setSelected] = useState<string[]>([]);

  const cabinSeats = seats.filter((s) => s.class === cabin || !s.class);
  const rows = [...new Set(cabinSeats.map((s) => s.row))].sort((a, b) => a - b);
  const cols = [...new Set(cabinSeats.map((s) => s.col))].sort();

  function toggleSeat(seat: Seat) {
    if (seat.status === 'occupied' || seat.status === 'disabled') return;
    setSelected((prev) => {
      let next: string[];
      if (prev.includes(seat.id)) {
        next = prev.filter((id) => id !== seat.id);
      } else if (prev.length < maxSelectable) {
        next = [...prev, seat.id];
      } else {
        next = [...prev.slice(1), seat.id];
      }
      onSelectionChange?.(next);
      return next;
    });
  }

  const selectedSeats = seats.filter((s) => selected.includes(s.id));
  const totalPrice = selectedSeats.reduce((s, seat) => s + (seat.price ?? 0), 0);

  return (
    <div className={cn('space-y-4', className)}>
      <ButtonGroup items={CABIN_ITEMS} value={cabin} onChange={setCabin} variant="outline" size="sm" />

      {selected.length >= maxSelectable && (
        <AlertBanner variant="info" message={`${maxSelectable} seat${maxSelectable > 1 ? 's' : ''} selected. Click a selected seat to deselect.`} />
      )}

      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="flex gap-1 mb-2 pl-8">
            {cols.map((col) => (
              <div key={col} className="w-8 text-center text-xs font-semibold text-text-disabled">{col}</div>
            ))}
          </div>

          {rows.map((row) => (
            <div key={row} className="flex items-center gap-1 mb-1">
              <div className="w-6 text-right text-xs text-text-disabled mr-2 shrink-0">{row}</div>
              {cols.map((col) => {
                const seat = cabinSeats.find((s) => s.row === row && s.col === col);
                if (!seat) return <div key={col} className="w-8 h-7" />;
                const isSelected = selected.includes(seat.id);
                const effectiveStatus: SeatStatus = isSelected ? 'selected' : seat.status;
                return (
                  <Tooltip key={col} content={`Row ${row}${col}${seat.price ? ` · +$${seat.price}` : ''}${seat.status === 'occupied' ? ' · Occupied' : ''}`}>
                    <button
                      type="button"
                      onClick={() => toggleSeat(seat)}
                      aria-label={`Seat ${row}${col}`}
                      aria-pressed={isSelected}
                      disabled={seat.status === 'occupied' || seat.status === 'disabled'}
                      className={cn('w-8 h-7 rounded text-xs border transition-colors', seatStyle[effectiveStatus])}
                    />
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { status: 'available',       label: 'Available' },
          { status: 'selected',        label: 'Selected' },
          { status: 'extra-legroom',   label: 'Extra legroom' },
          { status: 'exit-row',        label: 'Exit row' },
          { status: 'occupied',        label: 'Occupied' },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1">
            <div className={cn('w-4 h-4 rounded border', seatStyle[status as SeatStatus])} />
            <span className="text-text-secondary">{label}</span>
          </div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-raised text-sm">
          <div className="flex gap-2 flex-wrap">
            {selectedSeats.map((s) => (
              <Badge key={s.id} variant="primary" size="sm">Row {s.row}{s.col}</Badge>
            ))}
          </div>
          {totalPrice > 0 && <span className="font-semibold text-text-primary">+${totalPrice}</span>}
        </div>
      )}
    </div>
  );
}
