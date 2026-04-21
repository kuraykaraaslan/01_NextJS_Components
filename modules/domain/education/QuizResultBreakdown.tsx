import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { DataTable } from '@/modules/ui/DataTable';
import { Badge } from '@/modules/ui/Badge';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Pagination } from '@/modules/ui/Pagination';

export type QuizResultItem = {
  question: string;
  yourAnswer: string;
  correct: boolean;
  points: number;
  maxPoints: number;
};

const SCORE_RULES: ScoreRule[] = [
  { label: 'Passing grade (≥50%)', check: (v) => parseInt(v) >= 50,  points: 40 },
  { label: 'Good (≥70%)',          check: (v) => parseInt(v) >= 70,  points: 30 },
  { label: 'Excellent (≥90%)',     check: (v) => parseInt(v) >= 90,  points: 30 },
];

const PAGE_SIZE = 5;

export function QuizResultBreakdown({
  title,
  items,
  className,
}: {
  title: string;
  items: QuizResultItem[];
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const earned   = items.reduce((s, i) => s + i.points, 0);
  const possible = items.reduce((s, i) => s + i.maxPoints, 0);
  const pct = possible > 0 ? Math.round((earned / possible) * 100) : 0;
  const passed = pct >= 60;

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const paged = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: 'question'   as const, header: 'Question',    render: (r: QuizResultItem) => <p className="text-sm text-text-primary line-clamp-2">{r.question}</p> },
    { key: 'yourAnswer' as const, header: 'Your answer', render: (r: QuizResultItem) => <p className="text-sm text-text-secondary">{r.yourAnswer}</p> },
    { key: 'correct'    as const, header: 'Result', render: (r: QuizResultItem) => (
      <Badge variant={r.correct ? 'success' : 'error'} size="sm">{r.correct ? '✓ Correct' : '✗ Wrong'}</Badge>
    )},
    { key: 'points'     as const, header: 'Points', align: 'right' as const, render: (r: QuizResultItem) => (
      <span className="font-mono text-sm">{r.points}/{r.maxPoints}</span>
    )},
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="p-4 rounded-xl border border-border bg-surface-raised space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">{title}</h3>
          <Badge variant={passed ? 'success' : 'error'} size="md">{passed ? '✓ Passed' : '✗ Failed'}</Badge>
        </div>
        <div className="text-3xl font-bold text-text-primary">{pct}%
          <span className="text-sm font-normal text-text-secondary ml-2">{earned}/{possible} points</span>
        </div>
        <ContentScoreBar value={String(pct)} rules={SCORE_RULES} label="Score" />
      </div>

      <DataTable columns={columns} rows={paged} />
      <Pagination page={page} totalPages={pageCount} onPageChange={setPage} />
    </div>
  );
}
