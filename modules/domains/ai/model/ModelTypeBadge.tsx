'use client';
import { Badge } from '@/modules/ui/Badge';
import type { AIModelType } from '../types';

const typeMeta: Record<AIModelType, { label: string; variant: 'primary' | 'warning' | 'info' | 'success' | 'error' | 'neutral' }> = {
  TEXT:      { label: 'Text',      variant: 'primary'  },
  IMAGE:     { label: 'Image',     variant: 'warning'  },
  EMBEDDING: { label: 'Embedding', variant: 'info'     },
  AUDIO:     { label: 'Audio',     variant: 'success'  },
  VIDEO:     { label: 'Video',     variant: 'neutral'  },
};

type ModelTypeBadgeProps = {
  type: AIModelType;
  size?: 'sm' | 'md';
  className?: string;
};

export function ModelTypeBadge({ type, size = 'md', className }: ModelTypeBadgeProps) {
  const meta = typeMeta[type] ?? { label: type, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
