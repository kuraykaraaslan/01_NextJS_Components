'use client';
import { useState } from 'react';
import { Drawer } from '@/modules/ui/Drawer';
import { Button } from '@/modules/ui/Button';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';

type Notification = {
  id: string;
  from: string;
  message: string;
  time: string;
  type: 'mention' | 'system' | 'all';
  unread: boolean;
};

const NOTIFICATIONS: Notification[] = [
  { id: '1', from: 'Alice Chen', message: 'mentioned you in a comment on "Q2 Roadmap"', time: '2m ago', type: 'mention', unread: true },
  { id: '2', from: 'System', message: 'Your export is ready to download', time: '15m ago', type: 'system', unread: true },
  { id: '3', from: 'Bob Wilson', message: 'mentioned you in the API review thread', time: '1h ago', type: 'mention', unread: true },
  { id: '4', from: 'System', message: 'Scheduled maintenance: April 25, 2:00-4:00 AM UTC', time: '3h ago', type: 'system', unread: false },
  { id: '5', from: 'Carol Diaz', message: 'shared a file with you: Q1 Budget.xlsx', time: '5h ago', type: 'all', unread: false },
  { id: '6', from: 'System', message: 'Your subscription renews in 7 days', time: '1d ago', type: 'system', unread: false },
];

function NotificationItem({ n }: { n: Notification }) {
  return (
    <div className={`flex gap-3 py-3 px-1 rounded-lg ${n.unread ? 'bg-primary-subtle' : ''}`}>
      <Avatar name={n.from} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-primary">
          <span className="font-medium">{n.from}</span>{' '}
          <span className="text-text-secondary">{n.message}</span>
        </p>
        <Badge variant="neutral" size="sm">{n.time}</Badge>
      </div>
      {n.unread && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" aria-label="Unread" />}
    </div>
  );
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false);

  const allCount = NOTIFICATIONS.filter((n) => n.unread).length;
  const mentionCount = NOTIFICATIONS.filter((n) => n.type === 'mention' && n.unread).length;
  const systemCount = NOTIFICATIONS.filter((n) => n.type === 'system' && n.unread).length;

  const tabs = [
    {
      id: 'all',
      label: 'All',
      badge: allCount > 0 ? <Badge variant="primary" size="sm">{allCount}</Badge> : undefined,
      content: (
        <div className="space-y-1">
          {NOTIFICATIONS.map((n) => <NotificationItem key={n.id} n={n} />)}
        </div>
      ),
    },
    {
      id: 'mentions',
      label: 'Mentions',
      badge: mentionCount > 0 ? <Badge variant="warning" size="sm">{mentionCount}</Badge> : undefined,
      content: (
        <div className="space-y-1">
          {NOTIFICATIONS.filter((n) => n.type === 'mention').map((n) => <NotificationItem key={n.id} n={n} />)}
        </div>
      ),
    },
    {
      id: 'system',
      label: 'System',
      badge: systemCount > 0 ? <Badge variant="neutral" size="sm">{systemCount}</Badge> : undefined,
      content: (
        <div className="space-y-1">
          {NOTIFICATIONS.filter((n) => n.type === 'system').map((n) => <NotificationItem key={n.id} n={n} />)}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)} iconLeft="🔔">
        Notifications
        {allCount > 0 && (
          <Badge variant="error" size="sm">{allCount}</Badge>
        )}
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Notifications">
        <TabGroup tabs={tabs} label="Notification categories" />
      </Drawer>
    </div>
  );
}
