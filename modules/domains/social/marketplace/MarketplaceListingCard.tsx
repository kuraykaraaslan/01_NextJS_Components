'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTag } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@/modules/ui/Avatar';
import type { MarketplaceListingWithSeller, MarketplaceCondition } from '@/modules/domains/social/types';

const CONDITION_LABELS: Record<MarketplaceCondition, string> = {
  NEW:       'New',
  LIKE_NEW:  'Like New',
  GOOD:      'Good',
  FAIR:      'Fair',
  POOR:      'Poor',
};

type MarketplaceListingCardProps = {
  listing: MarketplaceListingWithSeller;
  href?: string;
  className?: string;
};

export function MarketplaceListingCard({ listing, href, className }: MarketplaceListingCardProps) {
  const thumbnailUrl = listing.imageUrls?.[0];

  const body = (
    <>
      {/* Thumbnail */}
      <div className="aspect-square bg-surface-sunken overflow-hidden rounded-t-xl">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-disabled">
            <FontAwesomeIcon icon={faTag} className="w-8 h-8" aria-hidden="true" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-3">
        <p className="text-sm font-bold text-text-primary leading-tight line-clamp-2 mb-1">
          {listing.title}
        </p>
        <p className="text-base font-bold text-primary mb-1">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: listing.currency }).format(listing.price)}
        </p>
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="inline-flex items-center gap-1 bg-surface-overlay rounded px-1.5 py-0.5">
            <FontAwesomeIcon icon={faTag} className="w-2.5 h-2.5" aria-hidden="true" />
            {CONDITION_LABELS[listing.condition]}
          </span>
          {listing.location && (
            <span className="inline-flex items-center gap-1 truncate max-w-[120px]">
              <FontAwesomeIcon icon={faLocationDot} className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{listing.location}</span>
            </span>
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-border">
          <Avatar src={listing.seller.avatar ?? undefined} name={listing.seller.name} size="xs" />
          <span className="text-xs text-text-secondary truncate">{listing.seller.name}</span>
        </div>
      </div>
    </>
  );

  const baseClass = cn(
    'bg-surface-raised border border-border rounded-xl overflow-hidden flex flex-col',
    href && 'hover:shadow-md hover:border-border-focus transition-all duration-200 cursor-pointer',
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}>
        {body}
      </a>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
