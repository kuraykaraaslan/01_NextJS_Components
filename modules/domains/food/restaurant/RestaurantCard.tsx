'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { RestaurantStatusBadge } from './RestaurantStatusBadge';
import type { RestaurantStatus } from '../types';

type RestaurantCardProps = {
  restaurant: {
    restaurantId: string;
    name: string;
    slug: string;
    description?: string | null;
    cuisineTypes: string[];
    address: string;
    city: string;
    rating?: number;
    deliveryTimeMin?: number;
    deliveryTimeMax?: number;
    status: RestaurantStatus;
  };
  href?: string;
  className?: string;
};

const CUISINE_GRADIENTS: Record<string, string> = {
  Italian:  'from-red-400 to-orange-400',
  Japanese: 'from-pink-400 to-rose-500',
  Turkish:  'from-red-500 to-red-700',
  Mexican:  'from-green-400 to-yellow-400',
  Indian:   'from-orange-400 to-yellow-500',
  American: 'from-blue-400 to-blue-600',
  Vegan:    'from-green-400 to-emerald-500',
  default:  'from-primary to-secondary',
};

function getGradient(cuisineTypes: string[]): string {
  for (const c of cuisineTypes) {
    if (CUISINE_GRADIENTS[c]) return CUISINE_GRADIENTS[c];
  }
  return CUISINE_GRADIENTS.default;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-1 text-warning">
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={cn(
            'w-3 h-3',
            i < full ? 'text-warning' : hasHalf && i === full ? 'text-warning opacity-50' : 'text-border-strong'
          )}
          aria-hidden="true"
        />
      ))}
      <span className="text-xs font-medium text-text-secondary ml-0.5">{rating.toFixed(1)}</span>
    </span>
  );
}

export function RestaurantCard({ restaurant, href, className }: RestaurantCardProps) {
  const gradient = getGradient(restaurant.cuisineTypes);

  const body = (
    <div className="flex flex-col overflow-hidden h-full">
      {/* Image placeholder */}
      <div className={cn('h-36 bg-gradient-to-br flex-shrink-0', gradient)} aria-hidden="true" />

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Name + status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-text-primary line-clamp-1 leading-snug flex-1">
            {restaurant.name}
          </h3>
          <RestaurantStatusBadge status={restaurant.status} size="sm" />
        </div>

        {/* Description */}
        {restaurant.description && (
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>
        )}

        {/* Cuisine tags */}
        {restaurant.cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {restaurant.cuisineTypes.slice(0, 3).map((c) => (
              <span
                key={c}
                className="inline-block rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-text-secondary"
              >
                {c}
              </span>
            ))}
            {restaurant.cuisineTypes.length > 3 && (
              <span className="inline-block rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-text-secondary">
                +{restaurant.cuisineTypes.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer: rating + delivery time */}
        <div className="mt-auto border-t border-border pt-3 flex items-center justify-between gap-2">
          {typeof restaurant.rating === 'number' && restaurant.rating > 0 ? (
            <StarRating rating={restaurant.rating} />
          ) : (
            <span className="text-xs text-text-secondary">No ratings yet</span>
          )}

          {restaurant.deliveryTimeMin && restaurant.deliveryTimeMax && (
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" aria-hidden="true" />
              {restaurant.deliveryTimeMin}–{restaurant.deliveryTimeMax} min
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden h-full',
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
