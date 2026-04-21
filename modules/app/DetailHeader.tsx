'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { PageHeader, type PageHeaderAction } from '@/modules/ui/PageHeader';
import { useState } from 'react';

export type DetailTab = ButtonGroupItem;

export function DetailHeader({
  title,
  subtitle,
  status,
  statusVariant = 'neutral',
  badge,
  actions,
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
  actions?: PageHeaderAction[];
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
        <PageHeader
          title={title}
          subtitle={subtitle}
          actions={actions}
          badge={
            <>
              {status && (
                <Badge variant={statusVariant}>{status}</Badge>
              )}
              {badge}
            </>
          }
          className="border-none pb-4"
        />
        {tabs && tabs.length > 0 && (
          <div className="-mb-px">
            <ButtonGroup
              items={tabs}
              value={activeTab}
              onChange={handleTab}
              variant="ghost"
              className="gap-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}
