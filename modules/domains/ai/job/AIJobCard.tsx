'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGears,
  faCalendarAlt,
  faCircleExclamation,
  faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons';
import { AIJobStatusBadge } from './AIJobStatusBadge';
import type { AIJob } from '@/modules/domains/ai/types';

type AIJobCardProps = {
  job: AIJob;
  className?: string;
};

function formatDate(d?: Date | null): string {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const typeLabel: Record<string, string> = {
  TEXT:      'Text Generation',
  IMAGE:     'Image Generation',
  EMBEDDING: 'Embedding',
  AUDIO:     'Audio Processing',
  VIDEO:     'Video Processing',
};

export function AIJobCard({ job, className }: AIJobCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface-raised p-5 flex flex-col gap-4',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGears} className="w-4 h-4 text-text-secondary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-text-primary">
              {typeLabel[job.type] ?? job.type}
            </p>
            <p className="text-xs text-text-secondary font-mono">{job.jobId}</p>
          </div>
        </div>
        <AIJobStatusBadge status={job.status} size="sm" />
      </div>

      {/* Timestamps */}
      <div className="grid grid-cols-2 gap-3 border-t border-border pt-3">
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faCalendarAlt} className="w-3.5 h-3.5 text-text-secondary" aria-hidden="true" />
          <div>
            <p className="text-xs text-text-secondary">Started</p>
            <p className="text-xs font-medium text-text-primary">{formatDate(job.startedAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faFlagCheckered} className="w-3.5 h-3.5 text-text-secondary" aria-hidden="true" />
          <div>
            <p className="text-xs text-text-secondary">Completed</p>
            <p className="text-xs font-medium text-text-primary">{formatDate(job.completedAt)}</p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {job.errorMessage && (
        <div className="flex items-start gap-2 rounded-lg bg-error-subtle border border-error/20 px-3 py-2.5">
          <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 text-error mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-xs text-error leading-relaxed">{job.errorMessage}</p>
        </div>
      )}
    </div>
  );
}
