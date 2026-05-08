'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRight, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type AnnouncementBarProps = {
  message: React.ReactNode;
  cta?: { label: string; href: string; external?: boolean };
  icon?: IconDefinition;
  dismissible?: boolean;
  className?: string;
};

export function AnnouncementBar({
  message,
  cta,
  icon = faBullhorn,
  dismissible = true,
  className,
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      role="banner"
      className={cn(
        'relative bg-primary px-4 py-2.5 text-center',
        className,
      )}
    >
      <p className="text-xs sm:text-sm font-medium text-primary-fg flex items-center justify-center gap-2 flex-wrap">
        {icon && (
          <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5 opacity-80 flex-shrink-0" aria-hidden="true" />
        )}
        <span>{message}</span>
        {cta && (
          <a
            href={cta.href}
            target={cta.external ? '_blank' : undefined}
            rel={cta.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:no-underline font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            {cta.label}
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" aria-hidden="true" />
          </a>
        )}
      </p>

      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            'flex items-center justify-center w-6 h-6 rounded-full',
            'text-primary-fg/70 hover:text-primary-fg hover:bg-white/10 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
          )}
        >
          <FontAwesomeIcon icon={faXmark} className="w-3 h-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
