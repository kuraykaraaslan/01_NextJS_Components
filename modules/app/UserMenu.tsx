'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';

export type SafeUser = {
  userId: string;
  email: string;
  phone?: string | null;
  name?: string | null;
  userRole: string;
  userStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  userPreferences: {
    theme?: 'LIGHT' | 'DARK' | 'SYSTEM';
    language?: string;
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    pushNotifications?: boolean;
    newsletter?: boolean;
    newsletterTopics?: { blogDigest: boolean; announcements: boolean; events: boolean };
    timezone?: string;
    dateFormat?: 'DD/MM/YYYY' | 'MM/DD/YYYY';
    timeFormat?: '24H' | '12H';
    firstDayOfWeek?: 'MON' | 'SUN';
  } | null;
  userProfile: {
    name?: string | null;
    username?: string | null;
    biography?: string | null;
    profilePicture?: string | null;
    headerImage?: string | null;
    socialLinks?: unknown[];
    hideProfileFromIndex?: boolean;
  } | null;
};

export function UserMenu({
  user,
  items,
  align = 'right',
}: {
  user: SafeUser;
  items?: DropdownItem[];
  align?: 'left' | 'right';
}) {
  const displayName = user.userProfile?.name ?? user.name ?? user.email;
  const avatar      = user.userProfile?.profilePicture ?? null;

  const defaultItems: DropdownItem[] = items ?? [
    { type: 'item', label: 'Profile',  icon: '👤' },
    { type: 'item', label: 'Settings', icon: '⚙️' },
    { type: 'separator' },
    { type: 'item', label: 'Sign out', icon: '↩️', danger: true },
  ];

  const trigger = (
    <button
      type="button"
      className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      aria-label={`User menu for ${displayName}`}
    >
      <Avatar src={avatar} name={displayName} size="sm" />
      <div className="hidden sm:block text-left min-w-0">
        <p className="text-sm font-medium text-text-primary truncate max-w-[8rem]">{displayName}</p>
        <p className="text-xs text-text-secondary truncate">{user.userRole}</p>
      </div>
      <span aria-hidden="true" className="text-text-disabled text-xs hidden sm:block">▾</span>
    </button>
  );

  const header = (
    <div className="px-3 py-2.5">
      <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
      <p className="text-xs text-text-secondary truncate">{user.email}</p>
    </div>
  );

  return <DropdownMenu trigger={trigger} items={defaultItems} header={header} align={align} />;
}
