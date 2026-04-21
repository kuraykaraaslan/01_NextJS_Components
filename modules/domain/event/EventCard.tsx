'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';

type EventCardProps = {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  venue: string;
  city: string;
  emoji: string;
  accent: string;
  minPrice: number;
  currency?: string;
  hot?: boolean;
  soldOut?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function EventCard({
  title,
  subtitle,
  category,
  date,
  venue,
  city,
  emoji,
  accent,
  minPrice,
  currency = '$',
  hot = false,
  soldOut = false,
  className,
  ...rest
}: EventCardProps) {
  return (
    <div
      className={cn(
        'group rounded-xl overflow-hidden border border-border bg-surface-base transition-all',
        className,
      )}
      {...rest}
    >
      {/* Banner */}
      <div
        className="h-36 flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${accent}44 0%, ${accent}11 100%)` }}
      >
        <span className="text-5xl select-none">{emoji}</span>
        {hot && !soldOut && (
          <span className="absolute top-2 right-2 bg-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
            🔥 Hot
          </span>
        )}
        {soldOut && (
          <span className="absolute top-2 left-2 bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Sold Out
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <Badge variant="primary" size="sm" className="capitalize">{category}</Badge>

        <h3 className="font-bold text-text-primary text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-xs text-text-secondary line-clamp-1">{subtitle}</p>
        )}

        <p className="text-xs text-text-secondary">{date}</p>
        <p className="text-xs text-text-secondary truncate">{venue} · {city}</p>

        <div className="flex items-center justify-between pt-1 border-t border-border">
          <span className="text-xs text-text-secondary">From</span>
          <span className="text-sm font-black text-primary">
            {soldOut ? 'Sold Out' : `${currency}${minPrice}`}
          </span>
        </div>
      </div>
    </div>
  );
}
