'use client';
import { cn } from '@/libs/utils/cn';
import type { Organizer } from './types';

type Props = {
  organizer: Organizer;
  className?: string;
};

export function OrganizerCard({ organizer, className }: Props) {
  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised p-4', className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">Organizatör</p>
      <div className="flex items-center gap-3">
        {organizer.logo ? (
          <img
            src={organizer.logo}
            alt={organizer.name}
            className="h-12 w-12 rounded-xl object-cover border border-border"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-fg text-lg font-bold">
            {organizer.name[0]}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-text-primary text-sm truncate">{organizer.name}</span>
            {organizer.verified && (
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-fg text-[10px] font-bold shrink-0"
                title="Doğrulanmış organizatör"
              >
                ✓
              </span>
            )}
          </div>
          {organizer.description && (
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{organizer.description}</p>
          )}
        </div>
      </div>
      {(organizer.website || organizer.email) && (
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-secondary border-t border-border pt-3">
          {organizer.website && (
            <a
              href={organizer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              🌐 Web sitesi
            </a>
          )}
          {organizer.email && (
            <a href={`mailto:${organizer.email}`} className="hover:text-primary transition-colors">
              ✉️ {organizer.email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
