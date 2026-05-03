'use client';
import { cn } from '@/libs/utils/cn';

function getStatusStyle(code: number | string): string {
  const n = typeof code === 'string' ? parseInt(code, 10) : code;
  if (n >= 200 && n < 300) return 'bg-success-subtle text-success-fg border-success/30';
  if (n >= 300 && n < 400) return 'bg-info-subtle text-info-fg border-info/30';
  if (n >= 400 && n < 500) return 'bg-warning-subtle text-warning-fg border-warning/30';
  if (n >= 500) return 'bg-error-subtle text-error-fg border-error/30';
  return 'bg-surface-overlay text-text-secondary border-border';
}

const STATUS_LABELS: Record<string, string> = {
  '200': 'OK', '201': 'Created', '202': 'Accepted', '204': 'No Content',
  '301': 'Moved Permanently', '302': 'Found',
  '400': 'Bad Request', '401': 'Unauthorized', '403': 'Forbidden',
  '404': 'Not Found', '405': 'Method Not Allowed', '409': 'Conflict',
  '422': 'Unprocessable Entity', '429': 'Too Many Requests',
  '500': 'Internal Server Error', '502': 'Bad Gateway', '503': 'Service Unavailable',
};

type Props = {
  code: number | string;
  showLabel?: boolean;
  className?: string;
};

export function StatusCodeBadge({ code, showLabel = true, className }: Props) {
  const label = showLabel ? STATUS_LABELS[String(code)] : null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border font-mono font-semibold',
        'text-xs px-2 py-0.5',
        getStatusStyle(code),
        className,
      )}
    >
      <span>{code}</span>
      {label && <span className="font-sans font-normal opacity-75">{label}</span>}
    </span>
  );
}
