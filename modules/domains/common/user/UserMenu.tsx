'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';
import { SafeUser } from '../types';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
    { type: 'item', label: 'Profile',  icon: <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" aria-hidden="true" /> },
    { type: 'item', label: 'Settings', icon: <FontAwesomeIcon icon={faGear} className="w-3.5 h-3.5" aria-hidden="true" /> },
    { type: 'separator' },
    { type: 'item', label: 'Sign out', icon: <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-3.5 h-3.5" aria-hidden="true" />, danger: true },
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
      <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3 text-text-disabled hidden sm:block" aria-hidden="true" />
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
