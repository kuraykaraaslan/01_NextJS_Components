'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { useState } from 'react';

export type DetailTab = {
  value: string;
  label: string;
  disabled?: boolean;
};

export function DetailHeader({
  title,
  subtitle,
  status,
  statusVariant = 'neutral',
  badge,
  children,
  tabs,
  defaultTab,
  onTabChange,
  className,
}: {
  title: string;
  subtitle?: string;
  status?: string;
  statusVariant?: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'primary';
  badge?: React.ReactNode;
  children?: React.ReactNode;
  tabs?: DetailTab[];
  defaultTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs?.[0]?.value ?? '');

  function handleTab(v: string) {
    setActiveTab(v);
    onTabChange?.(v);
  }

  return (
    <div className={cn('border-b border-border bg-surface-raised', className)}>
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-start justify-between gap-4 pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-text-primary leading-tight">{title}</h1>
              {status && <Badge variant={statusVariant}>{status}</Badge>}
              {badge}
            </div>
            {subtitle && (
              <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
            )}
          </div>
          {children && (
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              {children}
            </div>
          )}
        </div>
        {tabs && tabs.length > 0 && (
          <div role="tablist" aria-label="Detail navigation" className="flex -mb-px">
            {tabs.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  aria-disabled={tab.disabled}
                  onClick={() => !tab.disabled && handleTab(tab.value)}
                  className={cn(
                    'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong',
                    tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
