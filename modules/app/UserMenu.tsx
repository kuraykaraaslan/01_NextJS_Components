'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';

export type UserMenuUser = {
  name: string;
  email: string;
  avatar?: string | null;
  role?: string;
  badge?: string;
};

export function UserMenu({
  user,
  items,
  align = 'right',
}: {
  user: UserMenuUser;
  items?: DropdownItem[];
  align?: 'left' | 'right';
}) {
  const defaultItems: DropdownItem[] = items ?? [
    { type: 'item', label: 'Profile', icon: '👤' },
    { type: 'item', label: 'Settings', icon: '⚙' },
    { type: 'separator' },
    { type: 'item', label: 'Sign out', icon: '↩', danger: true },
  ];

  const trigger = (
    <button
      type="button"
      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      aria-label={`User menu for ${user.name}`}
    >
      <Avatar src={user.avatar} name={user.name} size="sm" />
      <div className="hidden sm:block text-left min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-text-primary truncate max-w-[8rem]">{user.name}</p>
          {user.badge && <Badge variant="primary" size="sm">{user.badge}</Badge>}
        </div>
        {user.role && <p className="text-xs text-text-secondary truncate">{user.role}</p>}
      </div>
      <span aria-hidden="true" className="text-text-disabled text-xs hidden sm:block">▾</span>
    </button>
  );

  return <DropdownMenu trigger={trigger} items={defaultItems} align={align} />;
}
