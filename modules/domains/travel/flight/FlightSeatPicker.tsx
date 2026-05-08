'use client';
import { useState, useMemo } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import type { FlightCabinClass } from '../types';

/* ── types ── */

type SeatStatus = 'AVAILABLE' | 'OCCUPIED';

type Seat = {
  id: string;
  row: number;
  col: string;
  status: SeatStatus;
  priceExtra: number;
  isWindow: boolean;
  isAisle: boolean;
  isExtraLeg: boolean;
};

type CabinConfig = {
  totalRows: number;
  leftCols: string[];
  rightCols: string[];
  exitRows: number[];
  occupancyRate: number;
  extras: { window: number; aisle: number; extraLeg: number };
};

/* ── cabin configurations ── */

const CABIN_CONFIGS: Record<FlightCabinClass, CabinConfig> = {
  FIRST: {
    totalRows: 4,
    leftCols: ['A', 'C'],
    rightCols: ['D', 'F'],
    exitRows: [],
    occupancyRate: 0.45,
    extras: { window: 0, aisle: 0, extraLeg: 0 },
  },
  BUSINESS: {
    totalRows: 10,
    leftCols: ['A', 'C'],
    rightCols: ['D', 'F'],
    exitRows: [],
    occupancyRate: 0.5,
    extras: { window: 0, aisle: 0, extraLeg: 0 },
  },
  PREMIUM_ECONOMY: {
    totalRows: 15,
    leftCols: ['A', 'B', 'C'],
    rightCols: ['D', 'E', 'F'],
    exitRows: [1],
    occupancyRate: 0.4,
    extras: { window: 15, aisle: 10, extraLeg: 25 },
  },
  ECONOMY: {
    totalRows: 30,
    leftCols: ['A', 'B', 'C'],
    rightCols: ['D', 'E', 'F'],
    exitRows: [1, 15, 16],
    occupancyRate: 0.55,
    extras: { window: 15, aisle: 10, extraLeg: 25 },
  },
};

/* ── deterministic seat generation ── */

function seededRand(seed: number, idx: number): number {
  const x = Math.sin(seed * 9301 + idx * 49297 + 233) * 46906260;
  return x - Math.floor(x);
}

function buildSeats(cabin: FlightCabinClass, seed: number): Seat[] {
  const cfg = CABIN_CONFIGS[cabin];
  const allCols = [...cfg.leftCols, ...cfg.rightCols];
  const seats: Seat[] = [];
  let idx = 0;

  for (let row = 1; row <= cfg.totalRows; row++) {
    const isExtraLeg = row === 1 || cfg.exitRows.includes(row);
    for (const col of allCols) {
      const isWindow = col === cfg.leftCols[0] || col === cfg.rightCols[cfg.rightCols.length - 1];
      const isAisle = col === cfg.leftCols[cfg.leftCols.length - 1] || col === cfg.rightCols[0];
      const status: SeatStatus = seededRand(seed, idx++) < cfg.occupancyRate ? 'OCCUPIED' : 'AVAILABLE';

      let priceExtra = 0;
      if (isExtraLeg) priceExtra += cfg.extras.extraLeg;
      else if (isWindow) priceExtra += cfg.extras.window;
      else if (isAisle) priceExtra += cfg.extras.aisle;

      seats.push({ id: `${row}${col}`, row, col, status, priceExtra, isWindow, isAisle, isExtraLeg });
    }
  }
  return seats;
}

/* ── SeatBtn ── */

function SeatBtn({
  seat,
  isSelected,
  isDisabled,
  onToggle,
  currency,
}: {
  seat: Seat;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: () => void;
  currency: string;
}) {
  const [hovered, setHovered] = useState(false);
  const occupied = seat.status === 'OCCUPIED';
  const featureLabel = seat.isWindow ? 'Window' : seat.isAisle ? 'Aisle' : 'Middle';

  return (
    <div className="relative">
      <button
        type="button"
        disabled={occupied || isDisabled}
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Seat ${seat.id}${occupied ? ' (occupied)' : ''}`}
        aria-pressed={isSelected}
        className={cn(
          'w-8 h-7 rounded text-[9px] font-bold border transition-all duration-100',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus',
          isSelected && 'bg-primary border-primary text-primary-fg scale-105 shadow-sm',
          !isSelected && !occupied && !isDisabled && seat.isExtraLeg &&
            'bg-warning-subtle border-warning text-warning cursor-pointer hover:bg-warning hover:text-white hover:scale-105',
          !isSelected && !occupied && !isDisabled && !seat.isExtraLeg &&
            'bg-success-subtle border-success text-success-fg cursor-pointer hover:bg-success hover:text-white hover:scale-105',
          !isSelected && !occupied && isDisabled &&
            'bg-surface-overlay border-border text-text-disabled cursor-not-allowed opacity-40',
          occupied && 'bg-surface-sunken border-transparent text-text-disabled opacity-30 cursor-not-allowed',
        )}
      >
        {seat.col}
      </button>

      {hovered && !occupied && !isDisabled && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none whitespace-nowrap rounded-lg border border-border bg-surface-raised shadow-lg px-2.5 py-1.5 text-[11px] text-text-primary">
          <div className="font-semibold">Seat {seat.id} · {featureLabel}</div>
          {seat.isExtraLeg && <div className="text-[10px] text-warning font-medium">Extra legroom</div>}
          {seat.priceExtra > 0
            ? <div className="text-[10px] text-text-secondary">+{currency} {seat.priceExtra}</div>
            : <div className="text-[10px] text-success">Included</div>
          }
        </div>
      )}
    </div>
  );
}

/* ── FlightSeatPicker ── */

type FlightSeatPickerProps = {
  cabin: FlightCabinClass;
  flightId: string;
  currency?: string;
  selectedSeatIds: string[];
  onSeatToggle: (seatId: string, priceExtra: number) => void;
  maxSelectable?: number;
  className?: string;
};

export function FlightSeatPicker({
  cabin,
  flightId,
  currency = 'USD',
  selectedSeatIds,
  onSeatToggle,
  maxSelectable,
  className,
}: FlightSeatPickerProps) {
  const seed = useMemo(
    () => flightId.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0),
    [flightId],
  );
  const seats = useMemo(() => buildSeats(cabin, seed), [cabin, seed]);
  const cfg = CABIN_CONFIGS[cabin];

  const selectedSet = useMemo(() => new Set(selectedSeatIds), [selectedSeatIds]);
  const maxReached = maxSelectable != null && selectedSet.size >= maxSelectable;

  const seatById = useMemo(() => new Map(seats.map((s) => [s.id, s])), [seats]);

  const rows = useMemo(() => {
    const map = new Map<number, Map<string, Seat>>();
    for (const s of seats) {
      if (!map.has(s.row)) map.set(s.row, new Map());
      map.get(s.row)!.set(s.col, s);
    }
    return [...map.entries()].sort(([a], [b]) => a - b);
  }, [seats]);

  function handleToggle(seatId: string) {
    const seat = seatById.get(seatId);
    if (!seat || seat.status === 'OCCUPIED') return;
    onSeatToggle(seatId, seat.priceExtra);
  }

  return (
    <div className={cn('bg-surface-raised border border-border rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border">
        <FontAwesomeIcon icon={faPlane} className="w-4 h-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-text-primary flex-1">Choose Your Seat</h2>
        <span className="text-xs text-text-secondary">
          {selectedSet.size > 0
            ? `${selectedSet.size}${maxSelectable != null ? ` / ${maxSelectable}` : ''} selected`
            : 'Optional'}
        </span>
      </div>

      <div className="p-5">
        {/* Column headers */}
        <div className="flex items-center justify-center mb-1">
          <div className="w-6 mr-2 shrink-0" />
          {cfg.leftCols.map((col) => (
            <div key={col} className="w-8 text-center text-[10px] font-bold text-text-secondary">{col}</div>
          ))}
          <div className="w-6 shrink-0" />
          {cfg.rightCols.map((col) => (
            <div key={col} className="w-8 text-center text-[10px] font-bold text-text-secondary">{col}</div>
          ))}
        </div>

        {/* Front-of-plane marker */}
        <div className="flex items-center justify-center gap-2 mb-2 text-[9px] text-text-disabled font-bold tracking-widest uppercase">
          <div className="flex-1 h-px bg-border max-w-16" />
          FRONT
          <div className="flex-1 h-px bg-border max-w-16" />
        </div>

        {/* Seat rows */}
        <div className="overflow-y-auto max-h-72 space-y-0.5 pr-1">
          {rows.map(([rowNum, rowSeats]) => {
            const isExitBefore = cfg.exitRows.includes(rowNum) && rowNum > 1;
            return (
              <div key={rowNum}>
                {isExitBefore && (
                  <div className="flex items-center gap-2 my-1.5 text-[9px] text-text-disabled font-bold tracking-widest uppercase">
                    <div className="flex-1 border-t border-dashed border-border-strong" />
                    EXIT
                    <div className="flex-1 border-t border-dashed border-border-strong" />
                  </div>
                )}
                <div className="flex items-center justify-center">
                  <div className="w-6 mr-2 shrink-0 text-right text-[10px] font-mono text-text-disabled">{rowNum}</div>
                  <div className="flex gap-0.5">
                    {cfg.leftCols.map((col) => {
                      const seat = rowSeats.get(col);
                      if (!seat) return <div key={col} className="w-8 h-7" />;
                      return (
                        <SeatBtn
                          key={col}
                          seat={seat}
                          isSelected={selectedSet.has(seat.id)}
                          isDisabled={maxReached && !selectedSet.has(seat.id)}
                          onToggle={() => handleToggle(seat.id)}
                          currency={currency}
                        />
                      );
                    })}
                  </div>
                  <div className="w-6 shrink-0" />
                  <div className="flex gap-0.5">
                    {cfg.rightCols.map((col) => {
                      const seat = rowSeats.get(col);
                      if (!seat) return <div key={col} className="w-8 h-7" />;
                      return (
                        <SeatBtn
                          key={col}
                          seat={seat}
                          isSelected={selectedSet.has(seat.id)}
                          isDisabled={maxReached && !selectedSet.has(seat.id)}
                          onToggle={() => handleToggle(seat.id)}
                          currency={currency}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-3 border-t border-border">
        {[
          { cls: 'bg-success-subtle border-success', label: 'Available' },
          { cls: 'bg-primary border-primary', label: 'Selected' },
          { cls: 'bg-warning-subtle border-warning', label: 'Extra legroom' },
          { cls: 'bg-surface-sunken border-transparent opacity-40', label: 'Occupied' },
        ].map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[11px] text-text-secondary">
            <div className={cn('h-3 w-3 rounded-sm border', cls)} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
