'use client';
import { useState } from 'react';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';
import { Badge } from '@/modules/ui/Badge';

type LiveUpdate = {
  id: string;
  time: string;
  title: string;
  body: string;
  isBreaking?: boolean;
};

const DEFAULT_UPDATES: LiveUpdate[] = [
  { id: 'u5', time: '14:45 GMT', title: 'Summit officially closes', body: 'The President of the General Assembly declared the summit closed after the signing ceremony concluded. Delegates received a standing ovation.', isBreaking: false },
  { id: 'u4', time: '13:20 GMT', title: 'US and China sign joint finance guarantee', body: 'In a historic bilateral moment, representatives of the US and China co-signed a $200B guarantee for climate finance delivery to vulnerable nations.', isBreaking: true },
  { id: 'u3', time: '11:05 GMT', title: 'India joins accord after last-minute concessions', body: 'India reversed its earlier position after G7 nations agreed to accelerate technology transfer provisions for renewable energy manufacturing.', isBreaking: false },
  { id: 'u2', time: '09:30 GMT', title: 'Final text distributed to delegations', body: 'The 47-page final agreement was distributed to all 147 delegations for review. Negotiators have two hours to flag any outstanding objections.', isBreaking: false },
  { id: 'u1', time: '07:15 GMT', title: 'All-night talks yield breakthrough on finance', body: 'After 14 hours of continuous negotiation, the finance working group reached consensus on a $500B annual commitment mechanism.', isBreaking: true },
];

export function LiveUpdatePanel({
  updates = DEFAULT_UPDATES,
  className,
}: {
  updates?: LiveUpdate[];
  className?: string;
}) {
  const [showToast, setShowToast] = useState(false);

  function handleRefresh() {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-surface-overlay flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-text-primary">Live Updates</span>
            <Badge variant="error" size="sm">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
                LIVE
              </span>
            </Badge>
          </div>
          <button
            onClick={handleRefresh}
            className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          >
            Refresh
          </button>
        </div>

        <div className="px-4 py-3 border-b border-border">
          <AlertBanner
            variant="info"
            message="This page is updating live as the summit progresses. Scroll for earlier entries."
          />
        </div>

        <div className="divide-y divide-border">
          {updates.map((update) => (
            <div key={update.id} className="px-4 py-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-text-disabled tabular-nums">
                  {update.time}
                </span>
                {update.isBreaking && (
                  <Badge variant="error" size="sm">Breaking</Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-text-primary">{update.title}</p>
              <p className="text-xs text-text-secondary leading-relaxed">{update.body}</p>
            </div>
          ))}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            variant="info"
            message="Feed refreshed — no new updates"
            onDismiss={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}
