'use client';
import { cn } from '@/libs/utils/cn';
import type { EventFormat } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faGlobe, faBolt } from '@fortawesome/free-solid-svg-icons';

type Props = {
  format: EventFormat;
  size?: 'sm' | 'md';
  className?: string;
};

const config: Record<EventFormat, { label: string; icon: React.ReactNode; classes: string }> = {
  PHYSICAL: { label: 'Fiziksel', icon: <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" aria-hidden="true" />, classes: 'bg-primary-subtle text-primary border-primary/20' },
  ONLINE:   { label: 'Online',   icon: <FontAwesomeIcon icon={faGlobe} className="w-3 h-3" aria-hidden="true" />,       classes: 'bg-info-subtle text-info border-info/20' },
  HYBRID:   { label: 'Hibrit',   icon: <FontAwesomeIcon icon={faBolt} className="w-3 h-3" aria-hidden="true" />,        classes: 'bg-warning-subtle text-warning border-warning/20' },
};

export function EventFormatBadge({ format, size = 'sm', className }: Props) {
  const { label, icon, classes } = config[format];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium border rounded-full',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
        classes,
        className,
      )}
    >
      {icon}
      {label}
    </span>
  );
}
