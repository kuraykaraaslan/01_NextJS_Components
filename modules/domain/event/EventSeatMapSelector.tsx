'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';

const ROWS = 5;
const COLS = 8;
const MAX_SEATS = 4;

// Pre-mark some seats as occupied
const OCCUPIED_IDS = new Set(['0-2', '0-3', '1-5', '2-0', '2-7', '3-3', '3-4', '4-1']);

export function EventSeatMapSelector() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [maxReached, setMaxReached] = useState(false);

  function toggleSeat(id: string) {
    if (OCCUPIED_IDS.has(id)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setMaxReached(false);
      } else {
        if (next.size >= MAX_SEATS) {
          setMaxReached(true);
          return prev;
        }
        next.add(id);
        setMaxReached(false);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Select Your Seats</h3>
        <Badge variant={selected.size > 0 ? 'primary' : 'neutral'} size="sm">
          {selected.size} / {MAX_SEATS} selected
        </Badge>
      </div>

      {maxReached && (
        <AlertBanner variant="warning" title="Max seats reached" message={`You can select up to ${MAX_SEATS} seats at a time.`} dismissible />
      )}

      <div className="space-y-2">
        <div className="text-center text-xs font-medium text-text-secondary uppercase tracking-wider py-1 bg-surface-sunken rounded">
          STAGE
        </div>
        <div className="space-y-1">
          {Array.from({ length: ROWS }, (_, row) => (
            <div key={row} className="flex gap-1 justify-center">
              <span className="text-xs text-text-disabled w-4 flex items-center justify-center">{String.fromCharCode(65 + row)}</span>
              {Array.from({ length: COLS }, (_, col) => {
                const id = `${row}-${col}`;
                const isOccupied = OCCUPIED_IDS.has(id);
                const isSelected = selected.has(id);
                return (
                  <Tooltip key={id} content={isOccupied ? 'Occupied' : isSelected ? `Seat ${String.fromCharCode(65 + row)}${col + 1} — Selected` : `Seat ${String.fromCharCode(65 + row)}${col + 1} — Available`}>
                    <button
                      type="button"
                      onClick={() => toggleSeat(id)}
                      disabled={isOccupied}
                      aria-label={`Seat row ${String.fromCharCode(65 + row)} col ${col + 1}`}
                      aria-pressed={isSelected}
                      className={cn(
                        'h-7 w-7 rounded text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                        isOccupied
                          ? 'bg-surface-sunken text-text-disabled cursor-not-allowed'
                          : isSelected
                            ? 'bg-primary text-primary-fg'
                            : 'bg-success-subtle text-success-fg hover:bg-success/30'
                      )}
                    >
                      {isOccupied ? '✕' : isSelected ? '✓' : ''}
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-success-subtle inline-block" /> Available</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-primary inline-block" /> Selected</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-surface-sunken inline-block" /> Occupied</span>
      </div>

      <Button variant="primary" disabled={selected.size === 0}>
        Continue with {selected.size} seat{selected.size !== 1 ? 's' : ''}
      </Button>
    </div>
  );
}
