'use client';
import { TicketPurchaseBox } from '@/modules/domains/event/TicketPurchaseBox';
import { VenueMapBox } from '@/modules/domains/event/VenueMapBox';
import type { EventSectionPricing, Venue } from '@/modules/domains/event/types';

type TicketSidebarBoxProps = {
  priceLabel: string;
  pricings: EventSectionPricing[];
  canBuy: boolean;
  isSoldOut: boolean;
  isCancelled: boolean;
  eventSlug: string;
  remainingCapacity?: number | null;
  venue?: Venue | null;
};

export function TicketSidebarBox({
  priceLabel,
  pricings,
  canBuy,
  isSoldOut,
  isCancelled,
  eventSlug,
  remainingCapacity,
  venue,
}: TicketSidebarBoxProps) {
  return (
    <aside className="lg:sticky lg:top-24 space-y-4">
      <TicketPurchaseBox
        priceLabel={priceLabel}
        pricings={pricings}
        canBuy={canBuy}
        isSoldOut={isSoldOut}
        isCancelled={isCancelled}
        eventSlug={eventSlug}
        remainingCapacity={remainingCapacity}
      />

      {venue && <VenueMapBox venue={venue} />}
    </aside>
  );
}
