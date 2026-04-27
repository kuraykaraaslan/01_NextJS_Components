'use client';
import { Badge } from '@/modules/ui/Badge';
import { cn } from '@/libs/utils/cn';
import type { Category } from '../types';

type CategoryBadgeProps = {
  category: Pick<Category, 'title' | 'slug'>;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function CategoryBadge({ category, size = 'md', className }: CategoryBadgeProps) {
  return (
    <Badge variant="primary" size={size} className={className}>
      {category.title}
    </Badge>
  );
}
