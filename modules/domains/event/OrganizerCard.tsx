'use client';
import { cn } from '@/libs/utils/cn';
import type { Organizer } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';

type Props = {
  organizer: Organizer;
  className?: string;
};

export function OrganizerCard({ organizer, className }: Props) {
  const href = `/themes/event/organizers/${organizer.slug}`;
  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised p-4', className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary mb-3">Organizatör</p>
      <a
        href={href}
        className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        {organizer.logo ? (
          <img
            src={organizer.logo}
            alt={organizer.name}
            className="h-12 w-12 rounded-xl object-cover border border-border shrink-0"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-fg text-lg font-bold shrink-0">
            {organizer.name[0]}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate group-hover:text-primary transition-colors text-text-primary">
              {organizer.name}
            </span>
            {organizer.verified && (
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-fg shrink-0"
                title="Doğrulanmış organizatör"
              >
                <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" aria-hidden="true" />
              </span>
            )}
          </div>
          {organizer.description && (
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{organizer.description}</p>
          )}
        </div>
      </a>
      {(organizer.website || organizer.email) && (
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-secondary border-t border-border pt-3">
          {organizer.website && (
            <a
              href={organizer.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <FontAwesomeIcon icon={faGlobe} className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" />Web sitesi
            </a>
          )}
          {organizer.email && (
            <a href={`mailto:${organizer.email}`} className="hover:text-primary transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" />{organizer.email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
