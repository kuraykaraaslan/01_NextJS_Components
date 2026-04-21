'use client';
import { useState } from 'react';
import { Modal } from '@/modules/ui/Modal';
import { Toggle } from '@/modules/ui/Toggle';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';

const CONSENT_CATEGORIES = [
  {
    id: 'essential',
    label: 'Essential cookies',
    description: 'Required for the site to function. Cannot be disabled.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Analytics cookies',
    description: 'Help us understand how you use the site to improve content and performance.',
    required: false,
  },
  {
    id: 'personalisation',
    label: 'Personalisation',
    description: 'Used to remember your preferences and tailor your news feed.',
    required: false,
  },
  {
    id: 'advertising',
    label: 'Advertising',
    description: 'Enables relevant ads based on your interests across the web.',
    required: false,
  },
  {
    id: 'social',
    label: 'Social media',
    description: 'Allows sharing and interaction with social platforms.',
    required: false,
  },
];

export function ConsentPreferences({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [consents, setConsents] = useState<Record<string, boolean>>({
    essential: true,
    analytics: true,
    personalisation: false,
    advertising: false,
    social: false,
  });
  const [saved, setSaved] = useState(false);

  function handleToggle(id: string, checked: boolean) {
    setConsents((prev) => ({ ...prev, [id]: checked }));
    setSaved(false);
  }


  function handleSave() {
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
    }, 1200);
  }

  const acceptedCount = Object.values(consents).filter(Boolean).length;

  return (
    <div className={className}>
      <div className="space-y-3">
        <Button variant="secondary" onClick={() => setOpen(true)} iconLeft="🍪">
          Manage cookie preferences
        </Button>
        <p className="text-xs text-text-disabled">
          <Badge variant="neutral" size="sm">{acceptedCount} of {CONSENT_CATEGORIES.length}</Badge>{' '}
          categories accepted
        </p>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Cookie & Privacy Preferences"
        description="Control how we use cookies to improve your experience."
        size="md"
        scrollable
        footer={
          <div className="flex gap-2 w-full">
            <Button variant="ghost" size="sm" onClick={() => {
              const all: Record<string, boolean> = {};
              CONSENT_CATEGORIES.forEach((c) => { all[c.id] = true; });
              setConsents(all);
            }}>
              Accept all
            </Button>
            <Button variant="ghost" size="sm" onClick={() => {
              const min: Record<string, boolean> = {};
              CONSENT_CATEGORIES.forEach((c) => { min[c.id] = c.required; });
              setConsents(min);
            }}>
              Reject optional
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} loading={saved}>
              Save preferences
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {saved && (
            <AlertBanner variant="success" message="Preferences saved successfully." />
          )}

          <div className="space-y-3">
            {CONSENT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border bg-surface-overlay"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-text-primary">{cat.label}</span>
                    {cat.required && <Badge variant="neutral" size="sm">Required</Badge>}
                  </div>
                  <p className="text-xs text-text-secondary">{cat.description}</p>
                </div>
                <Toggle
                  id={`consent-${cat.id}`}
                  label=""
                  checked={consents[cat.id] ?? false}
                  onChange={(checked) => handleToggle(cat.id, checked)}
                  disabled={cat.required}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
