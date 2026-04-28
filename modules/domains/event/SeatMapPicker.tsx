'use client';
import { useState, useMemo } from 'react';
import { cn } from '@/libs/utils/cn';
import type { VenueSection, VenueSeat, EventSectionPricing } from './types';

/* ─────────────────────────────────────────────
   Public types
───────────────────────────────────────────── */

export type SeatStatus = 'AVAILABLE' | 'HELD' | 'SOLD' | 'BLOCKED';

export type SeatInfo = {
  seat: VenueSeat;
  status: SeatStatus;
  pricingId?: string | null;
};

/** Recursive tree node that mirrors the parentSectionId hierarchy. */
export type SectionNode = {
  section: VenueSection;
  pricing: EventSectionPricing | null;
  seats: SeatInfo[];          // non-empty only for leaf sections
  subsections: SectionNode[];  // non-empty only for non-leaf sections
};

type SeatMapPickerProps = {
  sections: SectionNode[];
  selectedSeatIds: string[];
  onSeatToggle: (seatId: string) => void;
  maxSelectable?: number;
  showStage?: boolean;
  className?: string;
};

/* ─────────────────────────────────────────────
   buildSectionTree — flat data → SectionNode[]
───────────────────────────────────────────── */

export function buildSectionTree(
  sections: VenueSection[],
  seatInfos: SeatInfo[],
  pricings: EventSectionPricing[],
): SectionNode[] {
  const pricingBySectionId = new Map(pricings.map((p) => [p.sectionId, p]));
  const seatsBySection = new Map<string, SeatInfo[]>();
  for (const info of seatInfos) {
    const list = seatsBySection.get(info.seat.sectionId) ?? [];
    list.push(info);
    seatsBySection.set(info.seat.sectionId, list);
  }

  function buildNode(section: VenueSection): SectionNode {
    const children = sections
      .filter((s) => s.parentSectionId === section.sectionId)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return {
      section,
      pricing: pricingBySectionId.get(section.sectionId) ?? null,
      seats: seatsBySection.get(section.sectionId) ?? [],
      subsections: children.map(buildNode),
    };
  }

  return sections
    .filter((s) => !s.parentSectionId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(buildNode);
}

/* ─────────────────────────────────────────────
   Internal helpers
───────────────────────────────────────────── */

function groupByRow(seats: SeatInfo[]): Map<string, SeatInfo[]> {
  const map = new Map<string, SeatInfo[]>();
  const sorted = [...seats].sort((a, b) => {
    const rc = a.seat.row.localeCompare(b.seat.row, undefined, { numeric: true });
    if (rc !== 0) return rc;
    return (parseInt(a.seat.number) || 0) - (parseInt(b.seat.number) || 0) ||
      a.seat.number.localeCompare(b.seat.number, undefined, { numeric: true });
  });
  for (const info of sorted) {
    const row = info.seat.row;
    const list = map.get(row) ?? [];
    list.push(info);
    map.set(row, list);
  }
  return map;
}

/* ─────────────────────────────────────────────
   SeatButton
───────────────────────────────────────────── */

function SeatButton({
  info,
  isSelected,
  onToggle,
  isDisabled,
}: {
  info: SeatInfo;
  isSelected: boolean;
  onToggle: () => void;
  isDisabled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const { seat, status } = info;

  const unavailable = status === 'SOLD' || status === 'BLOCKED';
  const held = status === 'HELD';
  const canInteract = !unavailable && !held && !isDisabled;

  const label = seat.label ?? `${seat.row}${seat.number}`;

  return (
    <div className="relative">
      <button
        type="button"
        disabled={unavailable || held || (isDisabled && !isSelected)}
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        aria-pressed={isSelected}
        className={cn(
          'relative flex h-7 w-7 items-center justify-center rounded text-[9px] font-bold border transition-all duration-100',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus',
          // selected
          isSelected && 'bg-primary border-primary text-primary-fg scale-110 shadow-sm',
          // available, not selected, not maxed
          !isSelected && status === 'AVAILABLE' && canInteract &&
            'bg-success-subtle border-success text-success-fg hover:bg-success hover:text-white hover:scale-110 cursor-pointer',
          // available but max reached
          !isSelected && status === 'AVAILABLE' && !canInteract && !unavailable && !held &&
            'bg-surface-overlay border-border text-text-disabled cursor-not-allowed',
          // held by someone else
          held && 'bg-warning-subtle border-warning text-warning cursor-not-allowed',
          // sold / blocked
          unavailable && 'bg-surface-sunken border-transparent text-text-disabled opacity-35 cursor-not-allowed',
          // accessible seat ring
          seat.accessible && !unavailable && 'ring-1 ring-info ring-offset-1',
        )}
      >
        {seat.number}
        {seat.accessible && (
          <span className="absolute -top-1 -right-1 text-[7px] leading-none">♿</span>
        )}
      </button>

      {hovered && !unavailable && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none
                     rounded-lg border border-border bg-surface-raised shadow-lg px-2.5 py-1.5
                     whitespace-nowrap text-[11px] text-text-primary"
        >
          <span className="font-semibold">Sıra {seat.row} · Koltuk {seat.number}</span>
          {seat.accessible && <span className="ml-1 text-info">· Engelsiz</span>}
          {seat.companionSeat && <span className="ml-1 text-text-secondary">· Refakatçi</span>}
          {held && <span className="ml-1 text-warning font-semibold">· Rezerve</span>}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SeatGrid — seats grouped by row
───────────────────────────────────────────── */

function SeatGrid({
  seats,
  selectedIds,
  onToggle,
  maxReached,
}: {
  seats: SeatInfo[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  maxReached: boolean;
}) {
  const rows = useMemo(() => groupByRow(seats), [seats]);

  if (seats.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-secondary">
        Bu bölümde koltuk tanımlanmamış.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="inline-flex flex-col gap-1.5 min-w-max">
        {[...rows.entries()].map(([row, rowSeats]) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="w-5 shrink-0 text-right text-[10px] font-bold text-text-secondary">
              {row}
            </span>
            <div className="flex gap-1">
              {rowSeats.map((info) => (
                <SeatButton
                  key={info.seat.seatId}
                  info={info}
                  isSelected={selectedIds.has(info.seat.seatId)}
                  onToggle={() => onToggle(info.seat.seatId)}
                  isDisabled={maxReached && !selectedIds.has(info.seat.seatId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SectionView — recursive: subsections or seat grid
───────────────────────────────────────────── */

function SectionView({
  node,
  selectedIds,
  onToggle,
  maxReached,
  depth = 0,
}: {
  node: SectionNode;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  maxReached: boolean;
  depth?: number;
}) {
  const [activeSubIdx, setActiveSubIdx] = useState(0);

  const availableCount = node.seats.filter((s) => s.status === 'AVAILABLE').length;

  // Non-leaf: has subsections
  if (node.subsections.length > 0) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {node.subsections.map((sub, i) => {
            const subAvail = sub.seats.filter((s) => s.status === 'AVAILABLE').length;
            return (
              <button
                key={sub.section.sectionId}
                type="button"
                onClick={() => setActiveSubIdx(i)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors border',
                  i === activeSubIdx
                    ? 'bg-primary text-primary-fg border-primary'
                    : 'border-border bg-surface-raised text-text-secondary hover:bg-surface-overlay hover:text-text-primary',
                )}
              >
                {sub.section.label ?? sub.section.name}
                {sub.section.capacity != null && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {subAvail}/{sub.section.capacity}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <SectionView
          node={node.subsections[activeSubIdx]}
          selectedIds={selectedIds}
          onToggle={onToggle}
          maxReached={maxReached}
          depth={depth + 1}
        />
      </div>
    );
  }

  // Leaf: show seat grid
  return (
    <div className="space-y-3">
      {/* pricing + availability row */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          {availableCount} koltuk müsait
          {node.section.capacity != null && (
            <span className="text-text-disabled"> / {node.section.capacity}</span>
          )}
        </span>
        {node.pricing && (
          <span className="font-bold text-text-primary">
            {node.pricing.price === 0
              ? 'Ücretsiz'
              : `₺${node.pricing.price.toLocaleString('tr-TR')}`}
          </span>
        )}
      </div>

      <SeatGrid
        seats={node.seats}
        selectedIds={selectedIds}
        onToggle={onToggle}
        maxReached={maxReached}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Legend
───────────────────────────────────────────── */

function Legend() {
  const items = [
    { cls: 'bg-success-subtle border-success', label: 'Müsait' },
    { cls: 'bg-primary border-primary', label: 'Seçili' },
    { cls: 'bg-warning-subtle border-warning', label: 'Rezerve' },
    { cls: 'bg-surface-sunken border-transparent opacity-40', label: 'Dolu' },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-text-secondary">
      {items.map(({ cls, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className={cn('h-3.5 w-3.5 rounded border', cls)} />
          <span>{label}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <div className="relative h-3.5 w-3.5 rounded border border-success bg-success-subtle">
          <span className="absolute -top-1 -right-1 text-[6px]">♿</span>
        </div>
        <span>Engelsiz</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SeatMapPicker — main export
───────────────────────────────────────────── */

export function SeatMapPicker({
  sections,
  selectedSeatIds,
  onSeatToggle,
  maxSelectable,
  showStage = true,
  className,
}: SeatMapPickerProps) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const selectedIds = useMemo(() => new Set(selectedSeatIds), [selectedSeatIds]);
  const maxReached = maxSelectable != null && selectedIds.size >= maxSelectable;

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-surface-raised p-8 text-sm text-text-secondary">
        Koltuk verisi bulunamadı.
      </div>
    );
  }

  const activeSection = sections[activeSectionIdx];

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised overflow-hidden', className)}>

      {/* Stage indicator */}
      {showStage && (
        <div className="relative px-6 pt-5 pb-1">
          <div
            className="mx-auto h-7 rounded-t-full border border-b-0 border-border bg-surface-overlay flex items-center justify-center"
            style={{ maxWidth: 240 }}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-disabled">
              Sahne / Saha
            </span>
          </div>
          {/* perspective lines */}
          <div className="mx-auto mt-0 h-4 border-l border-r border-border opacity-30"
            style={{ maxWidth: 240 }} />
        </div>
      )}

      {/* Top-level section tabs */}
      {sections.length > 1 && (
        <div className="flex gap-0.5 border-b border-border px-4 pt-3 overflow-x-auto">
          {sections.map((node, i) => (
            <button
              key={node.section.sectionId}
              type="button"
              onClick={() => setActiveSectionIdx(i)}
              className={cn(
                'shrink-0 rounded-t-lg px-4 py-2 text-sm font-semibold transition-colors border-b-2 -mb-px',
                i === activeSectionIdx
                  ? 'border-primary text-primary bg-primary-subtle'
                  : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-overlay',
              )}
            >
              {node.section.label ?? node.section.name}
              {node.pricing && (
                <span className="ml-1.5 text-xs font-normal opacity-70">
                  {node.pricing.price === 0
                    ? 'Ücretsiz'
                    : `₺${node.pricing.price.toLocaleString('tr-TR')}`}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Active section content */}
      <div className="p-4 space-y-4">
        <SectionView
          node={activeSection}
          selectedIds={selectedIds}
          onToggle={onSeatToggle}
          maxReached={maxReached}
        />

        {/* Footer: legend + summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <Legend />
          <p className="text-sm font-semibold text-text-primary">
            {selectedIds.size} koltuk seçili
            {maxSelectable != null && (
              <span className="font-normal text-text-secondary"> / {maxSelectable} max</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
