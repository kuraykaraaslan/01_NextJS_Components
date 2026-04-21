'use client';
import { Stepper } from '@/modules/ui/Stepper';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Card } from '@/modules/ui/Card';
import type { StepItem } from '@/modules/ui/Stepper';

type CaseEvent = {
  label: string;
  date: string;
  description: string;
  state: 'complete' | 'active' | 'pending';
};

const CASE_EVENTS: CaseEvent[] = [
  { label: 'Filed', date: '2026-01-10', description: 'Complaint filed with district court', state: 'complete' },
  { label: 'Discovery', date: '2026-02-01', description: 'Evidence exchange period (30 days)', state: 'complete' },
  { label: 'Hearing', date: '2026-04-15', description: 'Pre-trial hearing — motions reviewed', state: 'active' },
  { label: 'Judgment', date: '2026-06-01', description: 'Trial and verdict', state: 'pending' },
  { label: 'Closed', date: 'TBD', description: 'Case closed and archived', state: 'pending' },
];

export function CaseTimeline() {
  const steps: StepItem[] = CASE_EVENTS.map((e) => ({
    label: e.label,
    description: e.description,
    state: e.state,
  }));

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Case Timeline</h3>
        <Stepper steps={steps} orientation="vertical" />
        <div className="space-y-1 border-t border-border pt-3">
          {CASE_EVENTS.map((e, i) => (
            <Tooltip key={i} content={e.description}>
              <div className="flex justify-between text-xs cursor-default">
                <span className="text-text-primary">{e.label}</span>
                <Badge variant={e.state === 'complete' ? 'success' : e.state === 'active' ? 'warning' : 'neutral'} size="sm">{e.date}</Badge>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </Card>
  );
}
