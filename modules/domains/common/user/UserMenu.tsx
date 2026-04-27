'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';
import { SafeUser } from '../types';
import { cn } from '@/libs/utils/cn';

export function UserMenu({
  user,
  items,
  align = 'right',
  onlyAvatar = false,
}: {
  user: SafeUser;
  items?: DropdownItem[];
  align?: 'left' | 'right';
  onlyAvatar?: boolean;
}) {
  const displayName = user.userProfile?.name ?? user.email;
  const avatar      = user.userProfile?.profilePicture ?? null;

  const defaultItems: DropdownItem[] = items ?? [
    { type: 'item', label: 'Profile',  icon: '👤' },
    { type: 'item', label: 'Settings', icon: '⚙️' },
    { type: 'separator' },
    { type: 'item', label: 'Sign out', icon: '↩️', danger: true },
  ];

  const trigger = (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`User menu for ${displayName}`}
      className={cn("gap-2 px-2")}
    >
      <Avatar src={avatar} name={displayName} size="sm" />
      {!onlyAvatar && (
        <div className="hidden sm:block text-left min-w-0">
          <p className="text-sm font-medium text-text-primary truncate max-w-[8rem]">{displayName}</p>
          <p className="text-xs text-text-secondary truncate">{user.userRole}</p>
        </div>
      )}
      <span aria-hidden="true" className="text-text-disabled text-xs hidden sm:block">▾</span>
    </Button>
  );

  const header = (
    <div className="px-3 py-2.5">
      <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
      <p className="text-xs text-text-secondary truncate">{user.email}</p>
    </div>
  );

  return <DropdownMenu trigger={trigger} items={defaultItems} header={header} align={align} />;
}
