import { cn } from '@/libs/utils/cn';
import { DarkModeToggle } from './DarkModeToggle';

type TopBarProps = {
  title: string;
  subtitle?: string;
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  onMobileMenuOpen: () => void;
};

export function TopBar({
  title,
  subtitle,
  sidebarCollapsed,
  onSidebarToggle,
  onMobileMenuOpen,
}: TopBarProps) {
  const iconBtn = cn(
    'flex items-center justify-center w-8 h-8 rounded-md transition-colors',
    'text-text-secondary hover:text-text-primary hover:bg-surface-overlay',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
  );

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 h-14 px-4 border-b border-border bg-surface-raised/95 backdrop-blur-sm shrink-0">
      {/* Mobile hamburger */}
      <button
        type="button"
        className={cn(iconBtn, 'lg:hidden text-base')}
        onClick={onMobileMenuOpen}
        aria-label="Menüyü aç"
        aria-expanded={false}
      >
        ☰
      </button>

      {/* Desktop collapse toggle */}
      <button
        type="button"
        className={cn(iconBtn, 'hidden lg:flex text-sm font-bold')}
        onClick={onSidebarToggle}
        aria-label={sidebarCollapsed ? "Sidebar'ı genişlet" : "Sidebar'ı daralt"}
      >
        {sidebarCollapsed ? '›' : '‹'}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-secondary truncate leading-none mt-0.5">{subtitle}</p>
        )}
      </div>

      <DarkModeToggle />
    </header>
  );
}
