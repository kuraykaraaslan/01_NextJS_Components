'use client';
import { Button } from '@/modules/ui/Button';
import { Modal } from '@/modules/ui/Modal';

type ConfirmVariant = 'danger' | 'warning' | 'info';

const variantConfig: Record<ConfirmVariant, { confirmClass: 'danger' | 'primary' | 'outline'; icon: string }> = {
  danger:  { confirmClass: 'danger',  icon: '⚠' },
  warning: { confirmClass: 'primary', icon: '⚠' },
  info:    { confirmClass: 'primary', icon: 'ℹ' },
};

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
}) {
  const cfg = variantConfig[variant];

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={cfg.confirmClass} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-xl shrink-0 mt-0.5">{cfg.icon}</span>
        <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
      </div>
    </Modal>
  );
}
