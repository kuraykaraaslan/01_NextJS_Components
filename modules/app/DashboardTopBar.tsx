'use client';
import { cn } from '@/libs/utils/cn';
import { SearchBar } from '@/modules/ui/SearchBar';

type DashboardTopBarProps = {
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function DashboardTopBar({
  searchable,
  searchPlaceholder = 'Search…',
  actions,
  className,
}: DashboardTopBarProps) {
  return (
    <div className={cn('flex items-center gap-3 flex-1', className)}>
      {searchable && (
        <div className="hidden sm:block flex-1 max-w-xs">
          <SearchBar id="dashboard-topbar-search" placeholder={searchPlaceholder} />
        </div>
      )}
      {actions && (
        <div className={cn('flex items-center gap-1', !searchable && 'ml-auto')}>
          {actions}
        </div>
      )}
    </div>
  );
}
