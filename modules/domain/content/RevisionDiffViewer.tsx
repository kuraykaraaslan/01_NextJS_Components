'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

export type ContentRevision = {
  id: string;
  version: string;
  author: string;
  date: string;
  summary: string;
  content: string;
};

function simpleDiff(a: string, b: string): React.ReactNode[] {
  const aLines = a.split('\n');
  const bLines = b.split('\n');
  const result: React.ReactNode[] = [];

  const maxLen = Math.max(aLines.length, bLines.length);
  for (let i = 0; i < maxLen; i++) {
    const lineA = aLines[i] ?? '';
    const lineB = bLines[i] ?? '';
    if (lineA === lineB) {
      result.push(<div key={i} className="text-text-secondary py-0.5 px-2">{lineB || ' '}</div>);
    } else if (lineA && !lineB) {
      result.push(<div key={`-${i}`} className="bg-error-subtle text-error-fg py-0.5 px-2 line-through">- {lineA}</div>);
    } else if (!lineA && lineB) {
      result.push(<div key={`+${i}`} className="bg-success-subtle text-success-fg py-0.5 px-2">+ {lineB}</div>);
    } else {
      result.push(<div key={`-${i}`} className="bg-error-subtle text-error-fg py-0.5 px-2 line-through">- {lineA}</div>);
      result.push(<div key={`+${i}`} className="bg-success-subtle text-success-fg py-0.5 px-2">+ {lineB}</div>);
    }
  }
  return result;
}

export function RevisionDiffViewer({
  revisions,
  onRestore,
  className,
}: {
  revisions: ContentRevision[];
  onRestore?: (id: string) => void;
  className?: string;
}) {
  const [activeId, setActiveId] = useState(revisions.at(-1)?.id ?? '');

  const current = revisions.find((r) => r.id === activeId);
  const currentIdx = revisions.findIndex((r) => r.id === activeId);
  const prevRev = revisions[currentIdx - 1];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-text-primary">Revision history</h3>
        <Badge variant="neutral" size="sm">{revisions.length} versions</Badge>
      </div>

      {/* Version selector */}
      <div className="flex flex-wrap gap-1.5">
        {revisions.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActiveId(r.id)}
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              r.id === activeId
                ? 'bg-primary text-primary-fg border-primary'
                : 'bg-surface-raised text-text-secondary border-border hover:bg-surface-overlay'
            )}
          >
            v{r.version}
          </button>
        ))}
      </div>

      {current && (
        <Card variant="outline">
          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-text-secondary">
                  Author: <span className="text-text-primary">{current.author}</span> · {current.date}
                </p>
                {current.summary && <p className="text-xs text-text-secondary mt-0.5 italic">{current.summary}</p>}
              </div>
              {onRestore && currentIdx < revisions.length - 1 && (
                <Button variant="outline" size="sm" onClick={() => onRestore(current.id)} iconLeft="↩">Restore</Button>
              )}
            </div>

            <TabGroup
              tabs={[
                {
                  id: 'diff',
                  label: 'Diff',
                  content: prevRev ? (
                    <div className="font-mono text-xs rounded-lg overflow-hidden border border-border bg-surface-sunken p-2 max-h-64 overflow-y-auto space-y-0.5">
                      {simpleDiff(prevRev.content, current.content)}
                    </div>
                  ) : <p className="text-xs text-text-secondary py-2">First revision – no diff available.</p>,
                },
                {
                  id: 'full',
                  label: 'Full text',
                  content: (
                    <pre className="font-mono text-xs rounded-lg border border-border bg-surface-sunken p-3 max-h-64 overflow-y-auto whitespace-pre-wrap">{current.content}</pre>
                  ),
                },
              ]}
            />
          </div>
        </Card>
      )}
    </div>
  );
}
