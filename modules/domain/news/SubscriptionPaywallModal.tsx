'use client';
import { useState } from 'react';
import { Modal } from '@/modules/ui/Modal';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Badge } from '@/modules/ui/Badge';

const BENEFITS = [
  { label: 'Unlimited article access', badge: '∞' },
  { label: 'Ad-free reading experience', badge: '✓' },
  { label: 'Exclusive investigative reports', badge: 'New' },
  { label: 'Archive access (20+ years)', badge: '20yr' },
  { label: 'Weekly editor\'s briefing', badge: '✉' },
  { label: 'PDF & offline reading', badge: '📱' },
];

export function SubscriptionPaywallModal({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <div className="space-y-3">
        <Button variant="primary" onClick={() => setOpen(true)} iconLeft="🔒">
          Trigger paywall (after 3 free articles)
        </Button>
        <p className="text-xs text-text-disabled">Click to preview the subscription paywall modal.</p>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="You've reached your free article limit"
        description="Subscribe to continue reading and access all our journalism."
        size="md"
        footer={
          <div className="flex gap-2 w-full">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Maybe later
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Subscribe from $9.99/month
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <AlertBanner
            variant="warning"
            title="3 of 3 free articles used"
            message="You have read all your free articles for this month. Subscribe for unlimited access."
          />

          <div>
            <p className="text-sm font-semibold text-text-primary mb-3">
              Subscribers get all this — and more:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-overlay border border-border"
                >
                  <Badge variant="success" size="sm">{b.badge}</Badge>
                  <span className="text-xs font-medium text-text-primary">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-text-disabled text-center">
            Cancel anytime. No long-term contracts.
          </p>
        </div>
      </Modal>
    </div>
  );
}
