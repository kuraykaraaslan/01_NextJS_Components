'use client';
import { PageHeader } from '@/modules/ui/PageHeader';
import { Badge } from '@/modules/ui/Badge';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

export function CaseSummaryHeader() {
  return (
    <div className="space-y-3">
      <Breadcrumb
        items={[
          { label: 'Cases', href: '#' },
          { label: 'Criminal', href: '#' },
          { label: 'Case #CR-2026-1234' },
        ]}
      />
      <PageHeader
        title="Case #CR-2026-1234 — State v. Anderson"
        subtitle="Criminal Division · Presiding Judge: Hon. Patricia Moore"
        badge={
          <div className="flex gap-1 flex-wrap">
            <Badge variant="warning">Active</Badge>
            <Badge variant="error">High Priority</Badge>
          </div>
        }
        actions={[
          { label: '✏ Edit', variant: 'outline' },
          { label: '📦 Archive', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
