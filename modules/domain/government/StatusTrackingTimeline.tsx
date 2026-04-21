'use client';
import { useState } from 'react';
import { Stepper } from '@/modules/ui/Stepper';
import { Badge } from '@/modules/ui/Badge';
import { Toast } from '@/modules/ui/Toast';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { LiveRegion } from '@/modules/ui/SkipLink';
import type { StepItem } from '@/modules/ui/Stepper';

type AppStatus = {
  label: string;
  description: string;
  date: string;
  state: 'complete' | 'active' | 'pending' | 'error';
};

const INITIAL_STATUSES: AppStatus[] = [
  { label: 'Submitted', description: 'Application received', date: '2026-04-01', state: 'complete' },
  { label: 'Under Review', description: 'Documents being verified', date: '2026-04-05', state: 'active' },
  { label: 'Additional Info', description: 'May require more documents', date: '—', state: 'pending' },
  { label: 'Decision', description: 'Approved or rejected', date: '—', state: 'pending' },
];

export function StatusTrackingTimeline() {
  const [statuses, setStatuses] = useState<AppStatus[]>(INITIAL_STATUSES);
  const [announcement, setAnnouncement] = useState('');
  const [showToast, setShowToast] = useState(false);

  function advanceStatus() {
    setStatuses((prev) => {
      const activeIdx = prev.findIndex((s) => s.state === 'active');
      if (activeIdx === -1 || activeIdx >= prev.length - 1) return prev;
      const next = [...prev];
      next[activeIdx] = { ...next[activeIdx], state: 'complete', date: '2026-04-21' };
      next[activeIdx + 1] = { ...next[activeIdx + 1], state: 'active', date: '2026-04-21' };
      setAnnouncement(`Application status updated to: ${next[activeIdx + 1].label}`);
      setShowToast(true);
      return next;
    });
  }

  const steps: StepItem[] = statuses.map((s) => ({
    label: s.label,
    description: s.description,
    state: s.state,
  }));

  const activeStatus = statuses.find((s) => s.state === 'active');

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Application Status</h3>
          {activeStatus && (
            <Badge variant="warning">
              Current: {activeStatus.label}
            </Badge>
          )}
        </div>

        <LiveRegion message={announcement} politeness="assertive" />

        {showToast && (
          <Toast variant="info" message={announcement} onDismiss={() => setShowToast(false)} duration={3000} />
        )}

        <Stepper steps={steps} orientation="vertical" />

        <div className="border-t border-border pt-3 space-y-1">
          {statuses.filter((s) => s.state === 'complete' || s.state === 'active').map((s, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-text-primary">{s.label}</span>
              <Badge variant={s.state === 'complete' ? 'success' : 'warning'} size="sm">{s.date}</Badge>
            </div>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={advanceStatus} disabled={statuses[statuses.length - 1].state !== 'pending'}>
          Simulate status update
        </Button>
      </div>
    </Card>
  );
}
