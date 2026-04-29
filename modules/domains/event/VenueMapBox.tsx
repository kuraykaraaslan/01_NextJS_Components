'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/libs/utils/cn';
import { Modal } from '@/modules/ui/Modal';
import type { Venue } from '@/modules/domains/event/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faShareNodes } from '@fortawesome/free-solid-svg-icons';

const LeafletMap = dynamic(() => import('./VenueLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-overlay animate-pulse rounded-lg" />
  ),
});

type VenueMapBoxProps = {
  venue: Venue;
  className?: string;
};

export function VenueMapBox({ venue, className }: VenueMapBoxProps) {
  const [open, setOpen] = useState(false);

  const hasCoords = venue.latitude != null && venue.longitude != null;

  const mapsUrl = hasCoords
    ? `https://www.google.com/maps?q=${venue.latitude},${venue.longitude}`
    : `https://www.google.com/maps/search/${encodeURIComponent(`${venue.name} ${venue.address} ${venue.city}`)}`;

  const appleMapsUrl = hasCoords
    ? `https://maps.apple.com/?ll=${venue.latitude},${venue.longitude}&q=${encodeURIComponent(venue.name)}`
    : `https://maps.apple.com/?q=${encodeURIComponent(`${venue.name} ${venue.address} ${venue.city}`)}`;

  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: venue.name,
        text: `${venue.address}, ${venue.city}`,
        url: mapsUrl,
      }).catch(() => undefined);
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(mapsUrl).catch(() => undefined);
    }
  }

  return (
    <>
      <div className={cn('rounded-xl border border-border bg-surface-raised p-4 space-y-2', className)}>
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide">Konum</p>
        <p className="font-semibold text-text-primary text-sm">{venue.name}</p>
        <p className="text-xs text-text-secondary">{venue.address}, {venue.city}</p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Haritayı büyüt"
          className="relative w-full h-36 rounded-lg overflow-hidden border border-border cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus block"
        >
          {hasCoords ? (
            <LeafletMap
              lat={venue.latitude!}
              lng={venue.longitude!}
              name={venue.name}
              zoom={13}
              interactive={false}
            />
          ) : (
            <div className="w-full h-full bg-surface-overlay flex items-center justify-center gap-1 text-text-disabled text-sm">
              <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5" aria-hidden="true" /> Harita görünümü
            </div>
          )}
          <div className="absolute bottom-2 right-2 z-[999] bg-surface-raised/90 backdrop-blur-sm text-xs text-text-secondary px-2 py-1 rounded-md border border-border pointer-events-none">
            Büyüt
          </div>
        </button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={venue.name}
        description={`${venue.address}, ${venue.city}`}
        size="lg"
        footer={
          <div className="flex w-full gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-text-primary hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <FontAwesomeIcon icon={faShareNodes} className="w-4 h-4" aria-hidden="true" />
              Paylaş
            </button>

            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-text-primary hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" aria-hidden="true" />
              Apple Maps
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1.5 rounded-md bg-primary text-primary-fg hover:bg-primary-hover px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" aria-hidden="true" />
              Google Maps&apos;te Aç
            </a>
          </div>
        }
      >
        <div className="h-96 rounded-lg overflow-hidden -mx-6 -mt-4">
          {hasCoords ? (
            <LeafletMap
              lat={venue.latitude!}
              lng={venue.longitude!}
              name={venue.name}
              zoom={15}
              interactive
            />
          ) : (
            <div className="w-full h-full bg-surface-overlay flex items-center justify-center text-text-disabled">
              Koordinat bilgisi bulunamadı
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
