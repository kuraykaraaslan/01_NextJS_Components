'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';

export type PipelineStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

export type Candidate = {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  stage: PipelineStage;
  appliedAt: string;
  score?: number;
  tags?: string[];
  onMoveStage?: (id: string, stage: PipelineStage) => void;
  onView?: (id: string) => void;
  onReject?: (id: string) => void;
};

const STAGES: PipelineStage[] = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];

const stageConfig: Record<PipelineStage, { label: string; variant: 'neutral' | 'primary' | 'info' | 'warning' | 'success' | 'error' }> = {
  applied:   { label: 'Applied',    variant: 'neutral'  },
  screening: { label: 'Screening',  variant: 'info'     },
  interview: { label: 'Interview',  variant: 'primary'  },
  offer:     { label: 'Offer',      variant: 'warning'  },
  hired:     { label: 'Hired',      variant: 'success'  },
  rejected:  { label: 'Rejected',   variant: 'error'    },
};

const VIEW_ITEMS: ButtonGroupItem[] = [
  { value: 'board', label: '⊞ Board' },
  { value: 'list',  label: '☰ List'  },
];

function CandidateCard({ candidate }: { candidate: Candidate }) {
  const items: DropdownItem[] = [
    ...(candidate.onView   ? [{ label: 'View profile', icon: '👤', onClick: () => candidate.onView!(candidate.id) }] : []),
    ...(candidate.onReject ? [{ label: 'Reject',       icon: '✕', danger: true, onClick: () => candidate.onReject!(candidate.id) }] : []),
  ];

  return (
    <Card variant="outline" className="!rounded-lg">
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={candidate.avatar} name={candidate.name} size="sm" />
            <div>
              <p className="text-sm font-medium text-text-primary leading-none">{candidate.name}</p>
              <p className="text-xs text-text-secondary">{candidate.role}</p>
            </div>
          </div>
          {items.length > 0 && (
            <DropdownMenu
              trigger={<button type="button" className="p-1 rounded hover:bg-surface-overlay text-text-disabled text-xs" aria-label="Options">⋮</button>}
              items={items}
              align="right"
            />
          )}
        </div>

        {candidate.score != null && (
          <div className="flex items-center gap-1.5">
            <div className="flex-1 h-1.5 rounded-full bg-surface-sunken">
              <div className="h-full rounded-full bg-primary" style={{ width: `${candidate.score}%` }} />
            </div>
            <span className="text-xs text-text-disabled">{candidate.score}%</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {candidate.tags && candidate.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {candidate.tags.map((t) => <Badge key={t} variant="neutral" size="sm">{t}</Badge>)}
            </div>
          )}
          <span className="text-[10px] text-text-disabled ml-auto">{candidate.appliedAt}</span>
        </div>
      </div>
    </Card>
  );
}

export function CandidatePipelineBoard({
  candidates,
  className,
}: {
  candidates: Candidate[];
  className?: string;
}) {
  const [view, setView] = useState('board');
  const activeStages = STAGES.filter((s) => s !== 'rejected');

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">{candidates.length} candidates</p>
        <ButtonGroup items={VIEW_ITEMS} value={view} onChange={setView} variant="outline" size="sm" />
      </div>

      {view === 'board' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {activeStages.map((stage) => {
            const stageCandidates = candidates.filter((c) => c.stage === stage);
            return (
              <div key={stage} className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <Badge variant={stageConfig[stage].variant} size="sm">{stageConfig[stage].label}</Badge>
                  <span className="text-xs text-text-disabled">{stageCandidates.length}</span>
                </div>
                <div className="space-y-2">
                  {stageCandidates.map((c) => <CandidateCard key={c.id} candidate={c} />)}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {candidates.map((c) => (
            <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface-raised">
              <Avatar src={c.avatar} name={c.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{c.name}</p>
                <p className="text-xs text-text-secondary">{c.role}</p>
              </div>
              <Badge variant={stageConfig[c.stage].variant} size="sm">{stageConfig[c.stage].label}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
