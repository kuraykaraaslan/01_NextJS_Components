'use client';
import { cn } from '@/libs/utils/cn';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { DataTable } from '@/modules/ui/DataTable';
import { EmptyState } from '@/modules/ui/EmptyState';
import { PageHeader, type PageHeaderAction } from '@/modules/ui/PageHeader';
import { Spinner } from '@/modules/ui/Spinner';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import type { TableColumn } from '@/modules/ui/Table';

export function DataListingPage<T extends Record<string, unknown>>({
  title,
  subtitle,
  actions,
  columns,
  rows,
  loading = false,
  error,
  onRetry,
  emptyTitle = 'No items found',
  emptyDescription,
  emptyAction,
  searchable = true,
  selectable = false,
  caption,
  className,
}: {
  title: string;
  subtitle?: string;
  actions?: PageHeaderAction[];
  columns: TableColumn<T>[];
  rows: T[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  searchable?: boolean;
  selectable?: boolean;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-6', className)}>
      <PageHeader title={title} subtitle={subtitle} actions={actions} />

      {error ? (
        <div className="space-y-4">
          <AlertBanner
            variant="error"
            title="Failed to load data"
            message={error}
            action={onRetry ? { label: 'Retry', onClick: onRetry } : undefined}
          />
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : rows.length === 0 ? (
        <EmptyState
          icon="📋"
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      ) : selectable ? (
        <AdvancedDataTable
          columns={columns as never}
          rows={rows as never}
          caption={caption}
          selectable
        />
      ) : (
        <DataTable
          columns={columns}
          rows={rows}
          caption={caption}
          searchable={searchable}
        />
      )}
    </div>
  );
}
