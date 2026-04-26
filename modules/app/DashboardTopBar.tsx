'use client';
import { cn } from '@/libs/utils/cn';
import { SearchBar } from '@/modules/ui/SearchBar';
import { UserMenu, type SafeUser } from '@/modules/app/UserMenu';
import { type DropdownItem } from '@/modules/ui/DropdownMenu';

type DashboardTopBarProps = {
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  user?: SafeUser;
  userMenuItems?: DropdownItem[];
  className?: string;
};

export function DashboardTopBar({
  searchable,
  searchPlaceholder = 'Search…',
  actions,
  user,
  userMenuItems,
  className,
}: DashboardTopBarProps) {
  return (
    <div className={cn('flex items-center gap-3 flex-1', className)}>
      {searchable && (
        <div className="hidden sm:block flex-1 max-w-xs">
          <SearchBar id="dashboard-topbar-search" placeholder={searchPlaceholder} />
        </div>
      )}
      <div className={cn('flex items-center gap-1', !(searchable) && 'ml-auto')}>
        {actions}
        {user && (
          <UserMenu user={user} items={userMenuItems} align="right" />
        )}
      </div>
    </div>
  );
}
