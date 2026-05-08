'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import type { JobWithData } from '../types';

type JobMetaProps = { job: JobWithData; className?: string };

function formatSalary(min?: number | null, max?: number | null, currency?: string): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`;
  const c = currency ?? 'USD';
  if (min && max) return `${c} ${fmt(min)}–${fmt(max)}`;
  if (min) return `${c} ${fmt(min)}+`;
  if (max) return `up to ${c} ${fmt(max)}`;
  return null;
}

function timeAgo(date?: Date | null): string {
  if (!date) return '';
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function JobMeta({ job, className }: JobMetaProps) {
  const salary = job.salaryVisible ? formatSalary(job.salaryMin, job.salaryMax, job.currency) : null;

  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary', className)}>
      {job.location && (
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5" aria-hidden="true" />
          {job.location}
        </span>
      )}
      {salary && (
        <span className="flex items-center gap-1 font-medium text-text-primary">
          {salary}
          <span className="text-text-secondary font-normal">/yr</span>
        </span>
      )}
      {job.positions > 1 && (
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" aria-hidden="true" />
          {job.positions} positions
        </span>
      )}
      {job.publishedAt && (
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" aria-hidden="true" />
          {timeAgo(job.publishedAt)}
        </span>
      )}
    </div>
  );
}
