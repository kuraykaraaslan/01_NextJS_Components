'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRulerCombined, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { PropertyTypeBadge } from './PropertyTypeBadge';
import { ListingTypeBadge } from '../listing/ListingTypeBadge';
import type { PropertyType, ListingType, PropertyStatus } from '../types';

type PropertyCardData = {
  propertyId: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  type: PropertyType;
  listingType: ListingType;
  status: PropertyStatus;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  city: string;
  imageUrl?: string | null;
};

type PropertyCardProps = {
  property: PropertyCardData;
  href?: string;
  className?: string;
};

function formatPrice(price: number, currency: string): string {
  if (currency === 'TRY') {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
}

export function PropertyCard({ property, href, className }: PropertyCardProps) {
  const body = (
    <div className="flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-sunken shrink-0">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary-subtle via-surface-overlay to-surface-sunken flex items-center justify-center">
            <FontAwesomeIcon icon={faLocationDot} className="w-10 h-10 text-text-disabled" aria-hidden="true" />
          </div>
        )}
        {/* Badge overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <PropertyTypeBadge type={property.type} size="sm" />
          <ListingTypeBadge type={property.listingType} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Price */}
        <div>
          <p className="text-xl font-bold text-text-primary leading-tight">
            {formatPrice(property.price, property.currency)}
          </p>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-text-primary line-clamp-2 leading-snug">
          {property.title}
        </h3>

        {/* Specs row */}
        {(property.bedrooms != null || property.bathrooms != null || property.area != null) && (
          <div className="flex items-center gap-3 text-xs text-text-secondary">
            {property.bedrooms != null && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faBed} className="w-3.5 h-3.5" aria-hidden="true" />
                {property.bedrooms} bd
              </span>
            )}
            {property.bathrooms != null && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faBath} className="w-3.5 h-3.5" aria-hidden="true" />
                {property.bathrooms} ba
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faRulerCombined} className="w-3.5 h-3.5" aria-hidden="true" />
                {property.area} m²
              </span>
            )}
          </div>
        )}

        {/* Location */}
        <div className="mt-auto flex items-center gap-1.5 text-xs text-text-secondary border-t border-border pt-3">
          <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-primary" aria-hidden="true" />
          {property.city}
        </div>
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised overflow-hidden flex flex-col',
    href && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </a>
    );
  }

  return <div className={baseClass}>{body}</div>;
}
