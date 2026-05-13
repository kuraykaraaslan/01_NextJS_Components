'use client';
import { Badge } from '@/modules/ui/Badge';
import type { AlertSeverity } from '../types';

const severityMeta: Record<AlertSeverity, { label: string; variant: 'info' | 'warning' | 'error' }> = {
  INFO:     { label: 'Info',     variant: 'info' },
  WARNING:  { label: 'Warning',  variant: 'warning' },
  CRITICAL: { label: 'Critical', variant: 'error' },
};

type AlertSeverityBadgeProps = { severity: AlertSeverity; size?: 'sm' | 'md'; className?: string };

export function AlertSeverityBadge({ severity, size = 'md', className }: AlertSeverityBadgeProps) {
  const meta = severityMeta[severity] ?? { label: severity, variant: 'info' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
