'use client';
import { Badge } from '@/modules/ui/Badge';
import type { AIModelType } from '@/modules/domains/ai/types';

type ModelTypeBadgeProps = {
  type: AIModelType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const typeMeta: Record<
  AIModelType,
  { label: string; variant: 'primary' | 'info' | 'success' | 'warning' | 'neutral' }
> = {
  TEXT:      { label: 'Text',      variant: 'primary' },
  IMAGE:     { label: 'Image',     variant: 'success' },
  EMBEDDING: { label: 'Embedding', variant: 'info' },
  AUDIO:     { label: 'Audio',     variant: 'warning' },
  VIDEO:     { label: 'Video',     variant: 'neutral' },
};

export function ModelTypeBadge({ type, size = 'md', className }: ModelTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
