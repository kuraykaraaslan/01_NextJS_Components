'use client';
import { useState, useMemo } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import type { VenueSection, VenueSeat, EventSectionPricing, SeatStatus } from './types';

export type { SeatStatus };

/* ─────────────────────────────────────────────
   Public types
───────────────────────────────────────────── */

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

/**
 * Describes how a top-level section is drawn on the venue SVG map.
 * Provide either `points` (polygon) or `path` (arbitrary SVG path).
 */
export type SectionMapShape = {
  sectionId: string;
  /** SVG polygon points string, e.g. "100,200 300,200 350,400 50,400" */
  points?: string;
  /** SVG path d attribute (alternative to points) */
  path?: string;
  /** Center X coordinate for the text label */
  labelX: number;
  /** Center Y coordinate for the text label */
  labelY: number;
  /** Optional rotation angle in degrees for the SVG label */
  labelRotate?: number;
  /**
   * Rotation angle (degrees, clockwise) applied to the seat grid when this
   * section is active. Use positive values for left-side sections facing the
   * stage, negative for right-side sections. Typical range: ±10–20°.
   */
  seatGridAngle?: number;
};

type SeatMapPickerProps = {
  sections: SectionNode[];
  selectedSeatIds: string[];
  onSeatToggle: (seatId: string) => void;
  maxSelectable?: number;
  showStage?: boolean;
  className?: string;
  /**
   * When provided, renders a full SVG venue map instead of the tab bar.
   * Each entry links a SectionNode (by sectionId) to its polygon/path on the map.
   */
  mapShapes?: SectionMapShape[];
  /** SVG viewBox attribute. Default: "0 0 800 560" */
  mapViewBox?: string;
  /** Max pixel width of the venue map. Default: 540 */
  mapMaxWidth?: number;
  /** SVG polygon points for the stage/pitch shape */
  stagePoints?: string;
  /** SVG path d attribute for the stage/pitch shape */
  stagePath?: string;
  /** Label shown inside the stage shape. Default: "SAHNE / SAHA" */
  stageLabel?: string;
  /** X coordinate for stage label */
  stageLabelX?: number;
  /** Y coordinate for stage label */
  stageLabelY?: number;
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
   Seat counting helpers (recursive)
───────────────────────────────────────────── */

function countAllSeats(node: SectionNode): number {
  return (
    node.seats.length +
    node.subsections.reduce((acc, sub) => acc + countAllSeats(sub), 0)
  );
}

function countAvailSeats(node: SectionNode): number {
  return (
    node.seats.filter((s) => s.status === 'AVAILABLE').length +
    node.subsections.reduce((acc, sub) => acc + countAvailSeats(sub), 0)
  );
}

function collectSeatIds(node: SectionNode): string[] {
  return [
    ...node.seats.map((s) => s.seat.seatId),
    ...node.subsections.flatMap(collectSeatIds),
  ];
}

/* ─────────────────────────────────────────────
   SVG section fill style (availability-based)
───────────────────────────────────────────── */

function getSectionStyle(
  node: SectionNode,
  selectedCount: number,
  isHovered: boolean,
): React.CSSProperties {
  const total = countAllSeats(node);
  const avail = countAvailSeats(node);
  const pct = total > 0 ? avail / total : 1;

  let fill: string;
  let fillOpacity: number;
  let stroke: string;

  if (selectedCount > 0) {
    fill = 'var(--primary)';
    fillOpacity = isHovered ? 0.65 : 0.48;
    stroke = 'var(--primary)';
  } else if (total === 0 || pct === 0) {
    fill = 'var(--surface-sunken)';
    fillOpacity = 1;
    stroke = 'var(--border-strong)';
  } else if (pct > 0.5) {
    fill = 'var(--success)';
    fillOpacity = isHovered ? 0.48 : 0.28;
    stroke = 'var(--success)';
  } else if (pct > 0.15) {
    fill = 'var(--warning)';
    fillOpacity = isHovered ? 0.55 : 0.32;
    stroke = 'var(--warning)';
  } else {
    fill = 'var(--error)';
    fillOpacity = isHovered ? 0.55 : 0.32;
    stroke = 'var(--error)';
  }

  return {
    fill,
    fillOpacity,
    stroke,
    strokeWidth: isHovered ? 3 : 1.5,
    transition: 'fill-opacity 0.12s ease, stroke-width 0.12s ease',
    cursor: 'pointer',
  };
}

/* ─────────────────────────────────────────────
   Internal helpers — seat grid
───────────────────────────────────────────── */

function groupByRow(seats: SeatInfo[]): Map<string, SeatInfo[]> {
  const map = new Map<string, SeatInfo[]>();
  const sorted = [...seats].sort((a, b) => {
    const rc = a.seat.row.localeCompare(b.seat.row, undefined, { numeric: true });
    if (rc !== 0) return rc;
    return (
      (parseInt(a.seat.number) || 0) - (parseInt(b.seat.number) || 0) ||
      a.seat.number.localeCompare(b.seat.number, undefined, { numeric: true })
    );
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
          isSelected && 'bg-primary border-primary text-primary-fg scale-110 shadow-sm',
          !isSelected && status === 'AVAILABLE' && canInteract &&
            'bg-success-subtle border-success text-success-fg hover:bg-success hover:text-white hover:scale-110 cursor-pointer',
          !isSelected && status === 'AVAILABLE' && !canInteract && !unavailable && !held &&
            'bg-surface-overlay border-border text-text-disabled cursor-not-allowed',
          held && 'bg-warning-subtle border-warning text-warning cursor-not-allowed',
          unavailable && 'bg-surface-sunken border-transparent text-text-disabled opacity-35 cursor-not-allowed',
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
  angle = 0,
}: {
  seats: SeatInfo[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  maxReached: boolean;
  angle?: number;
}) {
  const rows = useMemo(() => groupByRow(seats), [seats]);

  if (seats.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-secondary">
        Bu bölümde koltuk tanımlanmamış.
      </p>
    );
  }

  const rotated = angle !== 0;

  return (
    <div className={rotated ? 'flex items-center justify-center py-6 px-10' : 'overflow-x-auto pb-2'}>
      <div
        className="inline-flex flex-col gap-1.5 min-w-max"
        style={rotated ? { transform: `rotate(${angle}deg)` } : undefined}
      >
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
  gridAngle = 0,
  depth = 0,
}: {
  node: SectionNode;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  maxReached: boolean;
  gridAngle?: number;
  depth?: number;
}) {
  const [activeSubIdx, setActiveSubIdx] = useState(0);

  const availableCount = node.seats.filter((s) => s.status === 'AVAILABLE').length;

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
          gridAngle={gridAngle}
          depth={depth + 1}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
        angle={gridAngle}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Legend — seat status key
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
   Map panel headers — identical chrome, different content
───────────────────────────────────────────── */

function MapHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface-overlay text-text-secondary">
        <FontAwesomeIcon icon={faTableCells} className="w-3.5 h-3.5" aria-hidden />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-text-primary">Koltuk Haritası</p>
        <p className="text-[11px] text-text-secondary">Bölüme tıklayın → koltuk seçin</p>
      </div>
    </div>
  );
}

function SectionDetailHeader({
  node,
  onBack,
}: {
  node: SectionNode;
  onBack: () => void;
}) {
  const avail = countAvailSeats(node);
  const total = countAllSeats(node);

  return (
    <div className="flex items-center gap-3 border-b border-border px-4 py-3">
      <button
        type="button"
        onClick={onBack}
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border',
          'bg-surface-overlay text-text-secondary',
          'hover:bg-surface-sunken hover:text-text-primary transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-focus',
        )}
        aria-label="Haritaya dön"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5" aria-hidden />
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-text-primary truncate">
          {node.section.label ?? node.section.name}
        </p>
        <p className="text-[11px] text-text-secondary">
          {avail} / {total} koltuk müsait
        </p>
      </div>

      {node.pricing && (
        <div className="shrink-0 text-right">
          <p className="text-sm font-black text-text-primary">
            {node.pricing.price === 0
              ? 'Ücretsiz'
              : `₺${node.pricing.price.toLocaleString('tr-TR')}`}
          </p>
          <p className="text-[10px] text-text-secondary">koltuk başı</p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   VenueMapView — SVG arena/hall overview
───────────────────────────────────────────── */

function VenueMapView({
  sections,
  shapes,
  viewBox,
  stagePoints,
  stagePath,
  stageLabel = 'SAHNE / SAHA',
  stageLabelX,
  stageLabelY,
  maxWidth,
  selectedIds,
  onSectionClick,
}: {
  sections: SectionNode[];
  shapes: SectionMapShape[];
  viewBox: string;
  stagePoints?: string;
  stagePath?: string;
  stageLabel?: string;
  stageLabelX?: number;
  stageLabelY?: number;
  maxWidth: number;
  selectedIds: Set<string>;
  onSectionClick: (sectionId: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const nodeById = useMemo(
    () => new Map(sections.map((n) => [n.section.sectionId, n])),
    [sections],
  );

  const hasStage = !!(stagePoints || stagePath);

  return (
    <div className="w-full" style={{ maxWidth: maxWidth }}>
      <svg
        viewBox={viewBox}
        className="w-full h-auto select-none"
        xmlns="http://www.w3.org/2000/svg"
        role="group"
        aria-label="Mekan koltuk haritası"
      >
        <defs>
          <pattern id="smp-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" style={{ fill: 'var(--border)', opacity: 0.5 }} />
          </pattern>
        </defs>

        {/* Blueprint background */}
        <rect width="100%" height="100%" style={{ fill: 'var(--surface-raised)' }} />
        <rect width="100%" height="100%" fill="url(#smp-dots)" />

        {/* Stage / pitch */}
        {hasStage && (
          <g>
            {stagePoints && (
              <polygon
                points={stagePoints}
                style={{
                  fill: 'var(--surface-overlay)',
                  stroke: 'var(--border-strong)',
                  strokeWidth: 2,
                }}
              />
            )}
            {stagePath && (
              <path
                d={stagePath}
                style={{
                  fill: 'var(--surface-overlay)',
                  stroke: 'var(--border-strong)',
                  strokeWidth: 2,
                }}
              />
            )}
            {stageLabelX != null && stageLabelY != null && (
              <text
                x={stageLabelX}
                y={stageLabelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10}
                letterSpacing={1.5}
                style={{
                  fill: 'var(--text-disabled)',
                  fontWeight: 700,
                  pointerEvents: 'none',
                }}
              >
                {stageLabel}
              </text>
            )}
          </g>
        )}

        {/* Section shapes */}
        {shapes.map((shape) => {
          const node = nodeById.get(shape.sectionId);
          if (!node) return null;

          const isHovered = hoveredId === shape.sectionId;
          const seatIds = collectSeatIds(node);
          const selectedCount = seatIds.filter((id) => selectedIds.has(id)).length;
          const total = countAllSeats(node);
          const avail = countAvailSeats(node);
          const shapeStyle = getSectionStyle(node, selectedCount, isHovered);
          const pricingLabel = node.pricing
            ? node.pricing.price === 0
              ? 'Ücretsiz'
              : `₺${node.pricing.price.toLocaleString('tr-TR')}`
            : null;

          const lx = shape.labelX;
          const ly = shape.labelY;
          const rot = shape.labelRotate;
          const rotTransform = (yOffset: number) =>
            rot ? `rotate(${rot}, ${lx}, ${ly + yOffset})` : undefined;

          return (
            <g
              key={shape.sectionId}
              onClick={() => onSectionClick(shape.sectionId)}
              onMouseEnter={() => setHoveredId(shape.sectionId)}
              onMouseLeave={() => setHoveredId(null)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSectionClick(shape.sectionId)}
              aria-label={`${node.section.label ?? node.section.name}: ${avail}/${total} müsait`}
            >
              {shape.points && (
                <polygon points={shape.points} style={shapeStyle} />
              )}
              {shape.path && (
                <path d={shape.path} style={shapeStyle} />
              )}

              {/* Hover ring glow */}
              {isHovered && shape.points && (
                <polygon
                  points={shape.points}
                  style={{
                    fill: 'none',
                    stroke: shapeStyle.stroke as string,
                    strokeWidth: 5,
                    strokeOpacity: 0.2,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Section name */}
              <text
                x={lx} y={ly - (pricingLabel ? 12 : 6)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                style={{ fill: 'var(--text-primary)', fontWeight: 800, pointerEvents: 'none' }}
                transform={rotTransform(-(pricingLabel ? 12 : 6))}
              >
                {node.section.label ?? node.section.name}
              </text>

              {/* Price */}
              {pricingLabel && (
                <text
                  x={lx} y={ly + 6}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={11}
                  style={{ fill: 'var(--text-secondary)', fontWeight: 600, pointerEvents: 'none' }}
                  transform={rotTransform(6)}
                >
                  {pricingLabel}
                </text>
              )}

              {/* Availability */}
              <text
                x={lx} y={ly + (pricingLabel ? 22 : 10)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                style={{ fill: 'var(--text-secondary)', pointerEvents: 'none' }}
                transform={rotTransform(pricingLabel ? 22 : 10)}
              >
                {avail}/{total} müsait
              </text>

              {/* Selected-count badge */}
              {selectedCount > 0 && (
                <g style={{ pointerEvents: 'none' }}>
                  <circle
                    cx={lx + 36} cy={ly - 26}
                    r={12}
                    style={{ fill: 'var(--primary)' }}
                  />
                  <text
                    x={lx + 36} y={ly - 26}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9}
                    style={{ fill: 'var(--primary-fg)', fontWeight: 800 }}
                  >
                    {selectedCount}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

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
  mapShapes,
  mapViewBox = '0 0 800 560',
  mapMaxWidth = 540,
  stagePoints,
  stagePath,
  stageLabel,
  stageLabelX,
  stageLabelY,
}: SeatMapPickerProps) {
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const selectedIds = useMemo(() => new Set(selectedSeatIds), [selectedSeatIds]);
  const maxReached = maxSelectable != null && selectedIds.size >= maxSelectable;

  if (sections.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-surface-raised p-8 text-sm text-text-secondary">
        Koltuk verisi bulunamadı.
      </div>
    );
  }

  /* ── MAP MODE (mapShapes provided) ── */
  if (mapShapes) {
    const activeNode = activeSectionId
      ? (sections.find((n) => n.section.sectionId === activeSectionId) ?? null)
      : null;
    const activeShape = mapShapes.find((s) => s.sectionId === activeSectionId);
    const gridAngle = activeShape?.seatGridAngle ?? 0;

    return (
      <div className={cn('rounded-xl border border-border bg-surface-raised overflow-hidden', className)}>
        {/* Header — same height/padding, only content differs */}
        {activeNode
          ? <SectionDetailHeader node={activeNode} onBack={() => setActiveSectionId(null)} />
          : <MapHeader />
        }

        {/* Content */}
        {activeNode ? (
          <div className="p-4">
            <SectionView
              node={activeNode}
              selectedIds={selectedIds}
              onToggle={onSeatToggle}
              maxReached={maxReached}
              gridAngle={gridAngle}
            />
          </div>
        ) : (
          <VenueMapView
            sections={sections}
            shapes={mapShapes}
            viewBox={mapViewBox}
            stagePoints={stagePoints}
            stagePath={stagePath}
            stageLabel={stageLabel}
            stageLabelX={stageLabelX}
            stageLabelY={stageLabelY}
            maxWidth={mapMaxWidth}
            selectedIds={selectedIds}
            onSectionClick={setActiveSectionId}
          />
        )}

        {/* Footer — identical in both views */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
          <Legend />
          <p className="text-sm font-semibold text-text-primary">
            {selectedIds.size} koltuk seçili
            {maxSelectable != null && (
              <span className="font-normal text-text-secondary"> / {maxSelectable} max</span>
            )}
          </p>
        </div>
      </div>
    );
  }

  /* ── TAB MODE (fallback when no mapShapes) ── */
  const activeSection = sections[activeSectionIdx];

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised overflow-hidden', className)}>
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
          <div
            className="mx-auto mt-0 h-4 border-l border-r border-border opacity-30"
            style={{ maxWidth: 240 }}
          />
        </div>
      )}

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

      <div className="p-4 space-y-4">
        <SectionView
          node={activeSection}
          selectedIds={selectedIds}
          onToggle={onSeatToggle}
          maxReached={maxReached}
        />
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
