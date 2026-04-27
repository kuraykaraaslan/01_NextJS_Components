'use client';
import { cn } from '@/libs/utils/cn';
import type { GeoPoint } from '../LocationTypes';

type GeoPointDisplayProps = {
  point: GeoPoint;
  label?: string;
  showMapLink?: boolean;
  precision?: number;
  className?: string;
};

export function GeoPointDisplay({
  point,
  label,
  showMapLink = true,
  precision = 6,
  className,
}: GeoPointDisplayProps) {
  const lat = point.latitude.toFixed(precision);
  const lng = point.longitude.toFixed(precision);
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className={cn('inline-flex items-center gap-2 text-sm', className)}>
      <span className="text-text-disabled shrink-0" aria-hidden="true">📍</span>
      <div className="min-w-0">
        {label && <p className="text-xs text-text-secondary mb-0.5">{label}</p>}
        <p className="font-mono text-text-primary tabular-nums">
          {lat}, {lng}
        </p>
      </div>
      {showMapLink && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:text-primary-hover underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          aria-label={`Open ${lat}, ${lng} in Google Maps`}
        >
          Map
        </a>
      )}
    </div>
  );
}
