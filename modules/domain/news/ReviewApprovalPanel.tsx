'use client';
import { useState } from 'react';
import { Stepper, type StepItem } from '@/modules/ui/Stepper';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Badge } from '@/modules/ui/Badge';
import { Textarea } from '@/modules/ui/Textarea';

type ReviewStage = 'draft' | 'review' | 'approved' | 'published' | 'rejected';

const STAGES: ReviewStage[] = ['draft', 'review', 'approved', 'published'];

function getStepState(stage: ReviewStage, currentStage: ReviewStage, rejected: boolean) {
  const idx = STAGES.indexOf(stage);
  const currentIdx = STAGES.indexOf(currentStage);
  if (rejected && idx === currentIdx) return 'error' as const;
  if (idx < currentIdx) return 'complete' as const;
  if (idx === currentIdx) return 'active' as const;
  return 'pending' as const;
}

export function ReviewApprovalPanel({ className }: { className?: string }) {
  const [stage, setStage] = useState<ReviewStage>('review');
  const [rejected, setRejected] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const steps: StepItem[] = [
    { label: 'Draft', description: 'Author editing', state: getStepState('draft', stage, rejected) },
    { label: 'Review', description: 'Editor review', state: getStepState('review', stage, rejected) },
    { label: 'Approved', description: 'Ready to publish', state: getStepState('approved', stage, rejected) },
    { label: 'Published', description: 'Live on site', state: getStepState('published', stage, rejected) },
  ];

  function handleApprove() {
    setRejected(false);
    setShowFeedback(false);
    const idx = STAGES.indexOf(stage);
    if (idx < STAGES.length - 1) setStage(STAGES[idx + 1]);
  }

  function handleReject() {
    setRejected(true);
    setShowFeedback(true);
  }

  function handleRevise() {
    setRejected(false);
    setShowFeedback(false);
    setStage('draft');
  }

  const alertVariant = rejected ? 'error' : stage === 'published' ? 'success' : stage === 'approved' ? 'info' : 'warning';
  const alertMsg = rejected
    ? 'Article has been sent back for revision.'
    : stage === 'published'
    ? 'Article is live on the site.'
    : stage === 'approved'
    ? 'Article approved. Ready for scheduling.'
    : stage === 'review'
    ? 'Awaiting editorial review.'
    : 'Article is in draft state.';

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-base font-bold text-text-primary">Review & Approval</h3>
          <Badge
            variant={rejected ? 'error' : stage === 'published' ? 'success' : stage === 'approved' ? 'info' : 'warning'}
            size="sm"
          >
            {rejected ? 'Rejected' : stage.charAt(0).toUpperCase() + stage.slice(1)}
          </Badge>
        </div>

        <Stepper steps={steps} orientation="horizontal" />

        <AlertBanner variant={alertVariant} message={alertMsg} />

        {showFeedback && (
          <Textarea
            id="review-feedback"
            label="Feedback for author"
            placeholder="Explain what needs to be revised before re-submission…"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
          />
        )}

        <div className="flex items-center gap-2 flex-wrap">
          {stage !== 'published' && !rejected && (
            <>
              <Button variant="primary" size="sm" onClick={handleApprove}>
                ✓ Approve
              </Button>
              <Button variant="danger" size="sm" onClick={handleReject}>
                ✕ Reject
              </Button>
            </>
          )}
          {rejected && (
            <>
              <Button variant="secondary" size="sm" onClick={handleRevise}>
                Send back for revision
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setRejected(false); setShowFeedback(false); }}>
                Cancel rejection
              </Button>
            </>
          )}
          {stage === 'published' && (
            <Badge variant="success" size="sm">No actions required</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
