'use client';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

const STATUS_CONFIG = {
  operational: { variant: 'success' as const, label: 'Operational', dot: true },
  degraded:    { variant: 'warning' as const, label: 'Degraded',    dot: true },
  outage:      { variant: 'error'   as const, label: 'Outage',      dot: true },
};

const NAV_LINKS = ['About', 'Docs', 'Privacy', 'Terms'];

const SOCIAL_LINKS = [
  { label: 'Twitter / X', icon: '𝕏' },
  { label: 'GitHub',      icon: '⌥' },
  { label: 'LinkedIn',    icon: '🔗' },
];

const SECTION_BREADCRUMBS = [
  { label: 'App', href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'General' },
];

export function AppFooter({
  version = '2.4.1',
  status = 'operational',
}: {
  version?: string;
  status?: 'operational' | 'degraded' | 'outage';
}) {
  const statusCfg = STATUS_CONFIG[status];

  return (
    <footer className="w-full border border-border rounded-xl bg-surface-raised overflow-hidden">
      {/* Main row */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-border">
        {/* Left: product + version badges */}
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="md">Acme App</Badge>
          <Badge variant="neutral" size="md">v{version}</Badge>
        </div>

        {/* Center: nav links */}
        <nav aria-label="Footer navigation" className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Button key={link} variant="ghost" size="sm">
              {link}
            </Button>
          ))}
        </nav>

        {/* Right: status + breadcrumb */}
        <div className="flex items-center gap-3">
          <Badge variant={statusCfg.variant} size="md" dot={statusCfg.dot}>
            {statusCfg.label}
          </Badge>
          <Breadcrumb items={SECTION_BREADCRUMBS} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 bg-surface-base">
        <p className="text-xs text-text-secondary">
          © {new Date().getFullYear()} Acme Corp. All rights reserved.
        </p>

        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map((s) => (
            <Button
              key={s.label}
              variant="ghost"
              size="xs"
              iconOnly
              aria-label={s.label}
              title={s.label}
            >
              {s.icon}
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
