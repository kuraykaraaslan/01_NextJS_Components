'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';

const MAX_SEATS = 6;

type SectionDef = {
  id: string;
  name: string;
  price: number;
  rows: number;
  cols: number;
  accent: string;
  rowStart: number;
};

const SECTIONS: SectionDef[] = [
  { id: 'pit',        name: 'Pit / Floor',     price: 180, rows: 2, cols: 8,  accent: '#7c3aed', rowStart: 0 },
  { id: 'front-orch', name: 'Front Orchestra', price: 120, rows: 2, cols: 10, accent: '#dc2626', rowStart: 2 },
  { id: 'orchestra',  name: 'Orchestra',       price: 80,  rows: 3, cols: 10, accent: '#d97706', rowStart: 4 },
  { id: 'mezzanine',  name: 'Mezzanine',       price: 55,  rows: 2, cols: 10, accent: '#16a34a', rowStart: 7 },
  { id: 'upper',      name: 'Upper Deck',      price: 35,  rows: 2, cols: 12, accent: '#0891b2', rowStart: 9 },
];

function isSeatOccupied(sid: string, r: number, c: number): boolean {
  return ((sid.charCodeAt(0) + r * 7 + c * 13 + r + c) % 4) === 0;
}

type SelectedSeat = {
  id: string;
  sectionId: string;
  sectionName: string;
  sectionAccent: string;
  price: number;
  label: string;
};

export function EventSeatMapSelector() {
  const [selected, setSelected] = useState<Map<string, SelectedSeat>>(new Map());
  const [maxReached, setMaxReached] = useState(false);
  const [focusSection, setFocusSection] = useState<string | null>(null);

  function toggleSeat(section: SectionDef, row: number, col: number) {
    const id = `${section.id}-${row}-${col}`;
    setSelected((prev) => {
      if (prev.has(id)) {
        setMaxReached(false);
        const next = new Map(prev);
        next.delete(id);
        return next;
      }
      if (prev.size >= MAX_SEATS) {
        setMaxReached(true);
        return prev;
      }
      setMaxReached(false);
      const rowLabel = String.fromCharCode(65 + section.rowStart + row);
      const next = new Map(prev);
      next.set(id, {
        id,
        sectionId: section.id,
        sectionName: section.name,
        sectionAccent: section.accent,
        price: section.price,
        label: `${rowLabel}${col + 1}`,
      });
      return next;
    });
  }

  const selectedList = Array.from(selected.values());
  const total = selectedList.reduce((s, seat) => s + seat.price, 0);

  return (
    <div className="space-y-4">

      {/* Section filter legend */}
      <div className="flex flex-wrap gap-1.5">
        {SECTIONS.map((s) => {
          const active = focusSection === s.id;
          const dimmed = focusSection !== null && !active;
          return (
            <button
              key={s.id}
              onClick={() => setFocusSection(active ? null : s.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all',
                dimmed && 'opacity-40',
              )}
              style={{
                background: active ? s.accent : `${s.accent}18`,
                color: active ? '#fff' : s.accent,
                borderColor: `${s.accent}55`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: active ? '#ffffffaa' : s.accent }}
              />
              {s.name} · <strong>${s.price}</strong>
            </button>
          );
        })}
      </div>

      {/* Seat map */}
      <div className="overflow-x-auto">
        <div className="min-w-max space-y-2.5">

          {/* Stage indicator */}
          <div className="flex justify-center pb-1">
            <div
              className="px-14 py-1.5 text-xs font-black uppercase tracking-widest text-white rounded-full"
              style={{ background: '#374151' }}
            >
              Stage
            </div>
          </div>

          {SECTIONS.map((section) => {
            const dimmed = focusSection !== null && focusSection !== section.id;
            return (
              <div
                key={section.id}
                className={cn('rounded-xl overflow-hidden transition-opacity', dimmed && 'opacity-20')}
              >
                {/* Section header */}
                <div
                  className="flex items-center justify-between px-3 py-1.5 text-white text-xs font-bold"
                  style={{ background: section.accent }}
                >
                  <span>{section.name}</span>
                  <span>${section.price} / seat</span>
                </div>

                {/* Seat grid */}
                <div
                  className="p-2.5 space-y-1"
                  style={{
                    background: `${section.accent}0d`,
                    borderLeft: `2px solid ${section.accent}40`,
                    borderRight: `2px solid ${section.accent}40`,
                    borderBottom: `2px solid ${section.accent}40`,
                  }}
                >
                  {Array.from({ length: section.rows }, (_, row) => {
                    const rowLabel = String.fromCharCode(65 + section.rowStart + row);
                    return (
                      <div key={row} className="flex items-center gap-1.5">
                        <span className="w-4 text-center text-[10px] text-text-disabled font-mono shrink-0">
                          {rowLabel}
                        </span>
                        <div className="flex gap-1">
                          {Array.from({ length: section.cols }, (_, col) => {
                            const id = `${section.id}-${row}-${col}`;
                            const occupied = isSeatOccupied(section.id, row, col);
                            const isSelected = selected.has(id);
                            return (
                              <button
                                key={col}
                                type="button"
                                disabled={occupied}
                                onClick={() => toggleSeat(section, row, col)}
                                aria-label={`${section.name} Row ${rowLabel} Seat ${col + 1}${occupied ? ' — Occupied' : isSelected ? ' — Selected' : ' — Available'}`}
                                aria-pressed={isSelected}
                                title={occupied ? 'Occupied' : `${section.name} ${rowLabel}${col + 1} — $${section.price}`}
                                className="h-6 w-6 rounded flex items-center justify-center text-[10px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                                style={
                                  occupied
                                    ? { background: '#e5e7eb', color: '#d1d5db', cursor: 'not-allowed' }
                                    : isSelected
                                      ? { background: section.accent, color: '#fff', boxShadow: `0 0 0 2px ${section.accent}66` }
                                      : { background: `${section.accent}22`, color: section.accent, border: `1px solid ${section.accent}44` }
                                }
                              >
                                {isSelected ? '✓' : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded border border-gray-300 inline-block" style={{ background: '#7c3aed22' }} />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded inline-block" style={{ background: '#7c3aed' }} />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded inline-block bg-surface-sunken" />
          Occupied
        </span>
      </div>

      {/* Max warning */}
      {maxReached && (
        <p className="text-xs font-semibold text-warning bg-warning-subtle border border-warning/20 px-3 py-2 rounded-lg">
          ⚠ Maximum {MAX_SEATS} seats per order.
        </p>
      )}

      {/* Selected seats breakdown */}
      {selectedList.length > 0 && (
        <div className="rounded-xl border border-border overflow-hidden text-sm">
          <div className="px-3 py-2 bg-surface-raised border-b border-border flex items-center justify-between">
            <span className="font-bold text-text-primary text-xs">
              {selectedList.length} seat{selectedList.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => { setSelected(new Map()); setMaxReached(false); }}
              className="text-xs text-text-secondary hover:text-error transition-colors"
            >
              Clear all
            </button>
          </div>

          {SECTIONS.map((s) => {
            const sSeats = selectedList.filter((seat) => seat.sectionId === s.id);
            if (!sSeats.length) return null;
            return (
              <div key={s.id} className="px-3 py-2 flex items-center justify-between border-b border-border last:border-0 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.accent }} />
                  <span className="text-xs text-text-secondary shrink-0">{s.name}</span>
                  <span className="text-xs font-medium text-text-primary truncate">
                    {sSeats.map((seat) => seat.label).join(', ')}
                  </span>
                </div>
                <span className="text-xs font-bold shrink-0" style={{ color: s.accent }}>
                  {sSeats.length} × ${s.price} = ${sSeats.length * s.price}
                </span>
              </div>
            );
          })}

          <div className="px-3 py-2.5 bg-surface-raised flex items-center justify-between">
            <span className="font-bold text-text-primary">Total</span>
            <span className="text-lg font-black text-primary">${total}</span>
          </div>
        </div>
      )}

      <Button variant="primary" disabled={selectedList.length === 0} fullWidth>
        {selectedList.length === 0
          ? 'Select seats to continue'
          : `Continue · ${selectedList.length} seat${selectedList.length !== 1 ? 's' : ''} · $${total}`}
      </Button>
    </div>
  );
}
