'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faMotorcycle } from '@fortawesome/free-solid-svg-icons';
import type { RestaurantStatus } from '../types';

type RestaurantCardProps = {
  restaurant: {
    restaurantId: string;
    name: string;
    slug: string;
    cuisineTypes: string[];
    rating?: number;
    reviewCount?: number;
    deliveryTimeMin?: number;
    deliveryTimeMax?: number;
    deliveryFee?: number;
    status: RestaurantStatus;
    promoText?: string;
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

export function RestaurantCard({ restaurant, href, className }: RestaurantCardProps) {
  const gradient = getGradient(restaurant.cuisineTypes);
  const isOpen = restaurant.status === 'ACTIVE';

  const body = (
    <div className="flex flex-col overflow-hidden h-full">
      {/* Image / gradient cover */}
      <div className={cn('relative h-44 bg-gradient-to-br shrink-0', gradient)} aria-hidden="true">
        {/* Promo badge */}
        {restaurant.promoText && (
          <span className="absolute top-3 left-3 inline-block rounded-md bg-[var(--text-primary)] px-2 py-1 text-xs font-bold text-[var(--surface-base)] tracking-wide">
            {restaurant.promoText}
          </span>
        )}
        {/* Closed overlay */}
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55">
            <span className="rounded-full bg-surface-base px-3 py-1 text-xs font-semibold text-text-primary">
              Temporarily closed
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-sm font-bold text-text-primary line-clamp-1 leading-snug">
          {restaurant.name}
        </h3>

        <p className="text-xs text-text-secondary line-clamp-1">
          {restaurant.cuisineTypes.join(' · ')}
        </p>

        {/* Metrics row */}
        <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5 flex-wrap">
          {typeof restaurant.rating === 'number' && (
            <>
              <span className="flex items-center gap-0.5 font-semibold text-text-primary">
                <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-warning" aria-hidden="true" />
                {restaurant.rating.toFixed(1)}
              </span>
              <span className="text-border-strong" aria-hidden="true">·</span>
            </>
          )}

          {restaurant.deliveryTimeMin != null && restaurant.deliveryTimeMax != null && (
            <>
              <span className="flex items-center gap-0.5">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3" aria-hidden="true" />
                {restaurant.deliveryTimeMin}–{restaurant.deliveryTimeMax} min
              </span>
              <span className="text-border-strong" aria-hidden="true">·</span>
            </>
          )}

          {typeof restaurant.deliveryFee === 'number' && (
            <span className="flex items-center gap-0.5">
              <FontAwesomeIcon icon={faMotorcycle} className="w-3 h-3" aria-hidden="true" />
              {restaurant.deliveryFee === 0 ? (
                <span className="text-success font-medium">Free</span>
              ) : (
                `$${restaurant.deliveryFee.toFixed(2)}`
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden h-full transition-all duration-200',
    isOpen && href && 'hover:shadow-lg hover:border-border-focus cursor-pointer',
    !isOpen && 'opacity-70',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
        aria-label={restaurant.name}
      >
        {body}
      </a>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
