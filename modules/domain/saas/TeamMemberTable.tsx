'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import type { TableColumn } from '@/modules/ui/AdvancedDataTable';

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
};

const DEFAULT_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Alice Chen', email: 'alice@acme.com', role: 'Admin', status: 'active', lastActive: '2 min ago' },
  { id: '2', name: 'Bob Wilson', email: 'bob@acme.com', role: 'Editor', status: 'active', lastActive: '1 hr ago' },
  { id: '3', name: 'Carol Diaz', email: 'carol@acme.com', role: 'Viewer', status: 'inactive', lastActive: '5 days ago' },
  { id: '4', name: 'David Park', email: 'david@acme.com', role: 'Editor', status: 'active', lastActive: '30 min ago' },
  { id: '5', name: 'Emma Brown', email: 'emma@acme.com', role: 'Viewer', status: 'active', lastActive: 'Just now' },
  { id: '6', name: 'Frank Li', email: 'frank@acme.com', role: 'Admin', status: 'inactive', lastActive: '2 weeks ago' },
];

const roleVariant: Record<string, 'warning' | 'primary' | 'neutral'> = {
  Admin: 'warning',
  Editor: 'primary',
  Viewer: 'neutral',
};

const COLUMNS: TableColumn<TeamMember>[] = [
  {
    key: 'name',
    header: 'Member',
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar name={row.name} size="sm" />
        <div>
          <p className="text-sm font-medium text-text-primary">{row.name}</p>
          <p className="text-xs text-text-secondary">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => <Badge variant={roleVariant[row.role] ?? 'neutral'} size="sm">{row.role}</Badge>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'neutral'} size="sm">
        {row.status === 'active' ? '● Active' : '○ Inactive'}
      </Badge>
    ),
  },
  { key: 'lastActive', header: 'Last Active' },
];

export function TeamMemberTable({ members = DEFAULT_MEMBERS }: { members?: TeamMember[] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Team Members</h3>
        <Badge variant="neutral" size="sm">{members.length} members</Badge>
      </div>
      <AdvancedDataTable<TeamMember>
        columns={COLUMNS}
        rows={members}
        caption="Team members table"
        selectable
      />
    </div>
  );
}
