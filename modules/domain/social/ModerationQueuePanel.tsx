'use client';
import { useState } from 'react';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Modal } from '@/modules/ui/Modal';
import { Button } from '@/modules/ui/Button';
import type { TableColumn } from '@/modules/ui/AdvancedDataTable';

type ModerationItem = {
  id: string;
  excerpt: string;
  author: string;
  reason: string;
  reportCount: number;
  submitted: string;
  status: 'pending' | 'approved' | 'removed';
};

const INITIAL_ITEMS: ModerationItem[] = [
  { id: 'm1', excerpt: 'This is the best product ever made...', author: 'spam_user99', reason: 'Spam', reportCount: 12, submitted: '2026-04-21', status: 'pending' },
  { id: 'm2', excerpt: 'You are all idiots for thinking...', author: 'angry_poster', reason: 'Hate speech', reportCount: 8, submitted: '2026-04-21', status: 'pending' },
  { id: 'm3', excerpt: 'Check out my site for free money...', author: 'promo_bot', reason: 'Spam', reportCount: 5, submitted: '2026-04-20', status: 'pending' },
  { id: 'm4', excerpt: 'Your post is wrong because...', author: 'debater123', reason: 'Harassment', reportCount: 3, submitted: '2026-04-20', status: 'pending' },
];

export function ModerationQueuePanel() {
  const [items, setItems] = useState<ModerationItem[]>(INITIAL_ITEMS);
  const [actionTarget, setActionTarget] = useState<{ id: string; action: 'approve' | 'remove' } | null>(null);

  const pendingCount = items.filter((i) => i.status === 'pending').length;

  function handleConfirm() {
    if (!actionTarget) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === actionTarget.id ? { ...i, status: actionTarget.action === 'approve' ? 'approved' : 'removed' } : i
      )
    );
    setActionTarget(null);
  }

  const reasonVariant: Record<string, 'error' | 'warning' | 'neutral'> = {
    'Spam': 'warning',
    'Hate speech': 'error',
    'Harassment': 'error',
  };

  const columns: TableColumn<ModerationItem>[] = [
    { key: 'excerpt', header: 'Excerpt', render: (r) => <span className="text-xs text-text-secondary italic line-clamp-1">"{r.excerpt}"</span> },
    { key: 'author', header: 'Author' },
    { key: 'reason', header: 'Reason', render: (r) => <Badge variant={reasonVariant[r.reason] ?? 'neutral'} size="sm">{r.reason}</Badge> },
    { key: 'reportCount', header: 'Reports', align: 'center', render: (r) => <Badge variant="error" size="sm">{r.reportCount}</Badge> },
    { key: 'submitted', header: 'Date' },
    {
      key: 'status', header: 'Status',
      render: (r) => r.status !== 'pending'
        ? <Badge variant={r.status === 'approved' ? 'success' : 'error'} size="sm">{r.status}</Badge>
        : (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setActionTarget({ id: r.id, action: 'approve' })}>✓</Button>
            <Button variant="danger" size="sm" onClick={() => setActionTarget({ id: r.id, action: 'remove' })}>✕</Button>
          </div>
        ),
    },
  ];

  return (
    <div className="space-y-3">
      {pendingCount > 0 && (
        <AlertBanner variant="warning" title="Pending moderation" message={`${pendingCount} post${pendingCount !== 1 ? 's' : ''} awaiting review.`} />
      )}
      <AdvancedDataTable<ModerationItem> columns={columns} rows={items} caption="Moderation queue" />

      <Modal
        open={!!actionTarget}
        onClose={() => setActionTarget(null)}
        title={actionTarget?.action === 'approve' ? 'Approve Post?' : 'Remove Post?'}
        footer={
          <>
            <Button variant="outline" onClick={() => setActionTarget(null)}>Cancel</Button>
            <Button variant={actionTarget?.action === 'approve' ? 'primary' : 'danger'} onClick={handleConfirm}>
              {actionTarget?.action === 'approve' ? 'Approve' : 'Remove'}
            </Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          {actionTarget?.action === 'approve'
            ? 'This post will be approved and made visible to all users.'
            : 'This post will be permanently removed and the user notified.'}
        </p>
      </Modal>
    </div>
  );
}
