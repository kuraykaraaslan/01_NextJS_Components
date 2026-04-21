'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Stepper, type StepItem } from '@/modules/ui/Stepper';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Toast } from '@/modules/ui/Toast';
import { Button } from '@/modules/ui/Button';

export type ApprovalStage = {
  id: string;
  label: string;
  description?: string;
  status: 'complete' | 'active' | 'pending' | 'error';
  approver?: string;
  approvedAt?: string;
  rejectionReason?: string;
};

const ACTION_ITEMS: ButtonGroupItem[] = [
  { value: 'approve', label: '✓ Approve' },
  { value: 'revise',  label: '↩ Request revision' },
  { value: 'reject',  label: '✗ Reject' },
];

export function ContentApprovalWorkflow({
  contentTitle,
  stages,
  currentStageId,
  canAct = false,
  onApprove,
  onRequestRevision,
  onReject,
  className,
}: {
  contentTitle: string;
  stages: ApprovalStage[];
  currentStageId?: string;
  canAct?: boolean;
  onApprove?: () => Promise<void>;
  onRequestRevision?: () => Promise<void>;
  onReject?: () => Promise<void>;
  className?: string;
}) {
  const [action,  setAction]  = useState('approve');
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState('');

  const currentStage = stages.find((s) => s.id === currentStageId);
  const hasFailed = stages.some((s) => s.status === 'error');
  const isComplete = stages.every((s) => s.status === 'complete');

  const stepperItems: StepItem[] = stages.map((s) => ({
    label: s.label,
    description: s.approver ? `${s.approver}${s.approvedAt ? ' · ' + s.approvedAt : ''}` : s.description,
    state: s.status,
  }));

  async function handleAction() {
    setLoading(true);
    try {
      if (action === 'approve')  { await onApprove?.();          setToast('Content approved.'); }
      if (action === 'revise')   { await onRequestRevision?.();  setToast('Revision requested.'); }
      if (action === 'reject')   { await onReject?.();           setToast('Content rejected.'); }
    } finally { setLoading(false); }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{contentTitle}</h3>
          <p className="text-xs text-text-secondary mt-0.5">Approval workflow</p>
        </div>
      </div>

      {hasFailed && (
        <AlertBanner
          variant="error"
          title="Workflow blocked"
          message={currentStage?.rejectionReason ?? 'Content was rejected. Address feedback and resubmit.'}
        />
      )}

      {isComplete && (
        <AlertBanner variant="success" message="All stages approved. Content is ready to publish." />
      )}

      <Stepper steps={stepperItems} orientation="vertical" />

      {canAct && !isComplete && !hasFailed && (
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-xs font-semibold text-text-secondary">Your action</p>
          <ButtonGroup items={ACTION_ITEMS} value={action} onChange={setAction} variant="outline" size="sm" />
          <Button
            variant={action === 'approve' ? 'primary' : action === 'reject' ? 'danger' : 'outline'}
            onClick={handleAction}
            loading={loading}
          >
            {action === 'approve' ? 'Approve content' : action === 'revise' ? 'Request revision' : 'Reject content'}
          </Button>
        </div>
      )}

      {toast && (
        <Toast variant="success" message={toast} onDismiss={() => setToast('')} />
      )}
    </div>
  );
}
