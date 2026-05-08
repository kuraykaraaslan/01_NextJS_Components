'use client';
import { cn } from '@/libs/utils/cn';
import type { PartnerLogo } from '../types';

type PartnerLogosStripProps = {
  label?: string;
  partners: PartnerLogo[];
  className?: string;
};

export function PartnerLogosStrip({ label, partners, className }: PartnerLogosStripProps) {
  return (
    <div className={cn('py-10', className)}>
      <div className="mx-auto max-w-6xl px-6">
        {label && (
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-text-secondary mb-8">
            {label}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {partners.map((partner) =>
            partner.url ? (
              <a
                key={partner.partnerId}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-7 w-auto object-contain"
                />
              </a>
            ) : (
              <img
                key={partner.partnerId}
                src={partner.logo}
                alt={partner.name}
                className="h-7 w-auto object-contain opacity-50 grayscale"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
