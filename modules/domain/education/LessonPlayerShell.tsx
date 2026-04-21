'use client';
import { cn } from '@/libs/utils/cn';
import { PageHeader } from '@/modules/ui/PageHeader';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Button } from '@/modules/ui/Button';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

export type LessonTab = { id: string; label: string; content: React.ReactNode };

export function LessonPlayerShell({
  courseName,
  courseHref,
  sectionName,
  sectionHref,
  lessonTitle,
  tabs,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  children,
  className,
}: {
  courseName: string;
  courseHref?: string;
  sectionName?: string;
  sectionHref?: string;
  lessonTitle: string;
  tabs?: LessonTab[];
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const crumbs = [
    { label: 'Courses', href: '/courses' },
    ...(courseName  ? [{ label: courseName,  href: courseHref  }] : []),
    ...(sectionName ? [{ label: sectionName, href: sectionHref }] : []),
    { label: lessonTitle },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Breadcrumb items={crumbs} />

      <PageHeader
        title={lessonTitle}
        actions={[
          ...(hasPrev && onPrev ? [{ label: '← Prev', onClick: onPrev, variant: 'outline' as const }] : []),
          ...(hasNext && onNext ? [{ label: 'Next →', onClick: onNext, variant: 'primary' as const }] : []),
        ]}
      />

      <div className="rounded-xl overflow-hidden border border-border bg-surface-raised aspect-video flex items-center justify-center">
        {children ?? (
          <div className="flex flex-col items-center gap-3 text-text-disabled">
            <span className="text-5xl">▶</span>
            <p className="text-sm">Video player</p>
          </div>
        )}
      </div>

      {tabs && tabs.length > 0 && (
        <TabGroup
          tabs={tabs.map((t) => ({ id: t.id, label: t.label, content: t.content }))}
        />
      )}
    </div>
  );
}
