'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Button } from '@/modules/ui/Button';

export function AdSlotBanner({
  sponsorName = 'Acme Corp',
  adLabel = 'Advertisement',
  ctaText = 'Learn more',
  ctaUrl = '#',
  className,
}: {
  sponsorName?: string;
  adLabel?: string;
  ctaText?: string;
  ctaUrl?: string;
  className?: string;
}) {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className={className}>
      <Card className="overflow-hidden border-dashed border-2 border-border/60">
        {/* Ad label */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-surface-sunken border-b border-border/50">
          <span className="text-xs font-medium text-text-disabled uppercase tracking-wider">{adLabel}</span>
          <button
            onClick={() => setClosed(true)}
            aria-label="Close advertisement"
            className="text-text-disabled hover:text-text-primary transition-colors text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          >
            ✕
          </button>
        </div>

        {/* Ad content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-surface-overlay to-surface-sunken border border-border flex items-center justify-center shrink-0">
              <span className="text-2xl">🏢</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-text-disabled uppercase mb-1">{sponsorName}</p>
              <p className="text-sm font-bold text-text-primary leading-snug">
                Transform your business with next-generation solutions
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Trusted by over 50,000 companies worldwide. Start your free trial today.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 text-center border border-primary/20">
            <p className="text-sm font-semibold text-text-primary">Special offer for our readers</p>
            <p className="text-xs text-text-secondary mt-0.5">Get 3 months free on any annual plan</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" onClick={() => window.open(ctaUrl, '_blank')}>
              {ctaText}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setClosed(true)}>
              No thanks
            </Button>
          </div>
        </div>

        <div className="px-3 pb-3">
          <AlertBanner
            variant="info"
            message={`This is a paid advertisement from ${sponsorName}. It does not represent editorial opinion.`}
            className="!py-1.5 !text-xs"
          />
        </div>
      </Card>
    </div>
  );
}
