'use client';
import { cn } from '@/libs/utils/cn';
import type { EventCategory } from './types';

type Props = {
  category: Pick<EventCategory, 'title' | 'slug' | 'image'>;
  size?: 'sm' | 'md';
  href?: string;
  className?: string;
};

export function EventCategoryBadge({ category, size = 'sm', href, className }: Props) {
  const base = cn(
    'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-overlay font-medium text-text-secondary hover:text-text-primary hover:bg-surface-sunken transition-colors',
    size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1',
    className,
  );

  const inner = (
    <>
      {category.image && (
        <img src={category.image} alt="" className="h-3.5 w-3.5 rounded-full object-cover" />
      )}
      {category.title}
    </>
  );

  if (href) {
    return <a href={href} className={base}>{inner}</a>;
  }

  return <span className={base}>{inner}</span>;
}
