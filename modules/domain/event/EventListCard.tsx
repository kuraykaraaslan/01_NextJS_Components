'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';

type EventListCardProps = {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  time?: string;
  venue: string;
  city: string;
  emoji: string;
  accent: string;
  minPrice: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  hot?: boolean;
  soldOut?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function EventListCard({
  title,
  subtitle,
  category,
  date,
  time,
  venue,
  city,
  emoji,
  accent,
  minPrice,
  currency = '$',
  rating,
  reviewCount,
  hot = false,
  soldOut = false,
  className,
  ...rest
}: EventListCardProps) {
  return (
    <div
      className={cn(
        'group flex gap-4 p-4 rounded-xl border border-border bg-surface-base transition-all',
        className,
      )}
      {...rest}
    >
      {/* Thumbnail */}
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center shrink-0 text-4xl select-none"
        style={{ background: `linear-gradient(135deg, ${accent}44, ${accent}11)` }}
      >
        {emoji}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="primary" size="sm" className="capitalize shrink-0">{category}</Badge>
              {hot && !soldOut && <Badge variant="error" size="sm" className="shrink-0">🔥 Hot</Badge>}
              {soldOut && <Badge variant="neutral" size="sm" className="shrink-0">Sold Out</Badge>}
            </div>

            {/* Title */}
            <h3 className="font-bold text-text-primary text-sm mt-1 group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{subtitle}</p>
            )}
          </div>

          {/* Price */}
          <div className="text-right shrink-0">
            <p className="text-xs text-text-secondary">From</p>
            <p className="text-base font-black text-primary">
              {soldOut ? '—' : `${currency}${minPrice}`}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
          <span>📅 {date}</span>
          {time && <span>🕐 {time}</span>}
          <span className="hidden sm:inline">📍 {venue}</span>
          <span>🏙 {city}</span>
        </div>

        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <span className="text-warning">{'★'.repeat(Math.round(rating))}</span>
            <span className="font-semibold text-text-primary">{rating}</span>
            {reviewCount !== undefined && (
              <span>({reviewCount.toLocaleString()} reviews)</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
