'use client';
import { useState } from 'react';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

const PROGRESS_LEVELS = [
  { label: '0%', value: '', description: 'Just started' },
  { label: '25%', value: 'intro section read', description: 'Introduction' },
  { label: '50%', value: 'intro section read midpoint halfway analysis body', description: 'Halfway' },
  { label: '75%', value: 'intro section read midpoint halfway analysis body conclusion synthesis', description: 'Nearly done' },
  { label: '100%', value: 'intro section read midpoint halfway analysis body conclusion synthesis complete finished full article read through end summary', description: 'Completed' },
];

const READING_RULES: ScoreRule[] = [
  { label: 'Introduction read', check: (v) => v.includes('intro'), points: 20 },
  { label: 'Section 1 read', check: (v) => v.includes('section'), points: 20 },
  { label: 'Midpoint reached', check: (v) => v.includes('midpoint'), points: 20 },
  { label: 'Analysis read', check: (v) => v.includes('analysis'), points: 20 },
  { label: 'Conclusion reached', check: (v) => v.includes('conclusion'), points: 20 },
];

export function ReadingProgressBar({
  title = 'Global Leaders Reach Landmark Climate Agreement',
  totalWords = 2847,
  readTime = '8 min read',
  className,
}: {
  title?: string;
  totalWords?: number;
  readTime?: string;
  className?: string;
}) {
  const [progressIdx, setProgressIdx] = useState(2);

  const current = PROGRESS_LEVELS[progressIdx];
  const wordsRead = Math.round((progressIdx / (PROGRESS_LEVELS.length - 1)) * totalWords);

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-text-primary line-clamp-1 flex-1">
              {title}
            </h3>
            <Badge variant="info" size="sm">{readTime}</Badge>
            <Badge variant="neutral" size="sm">{totalWords.toLocaleString()} words</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm">{wordsRead.toLocaleString()} words read</Badge>
            <span className="text-xs text-text-disabled">·</span>
            <span className="text-xs text-text-secondary">{current.description}</span>
          </div>
        </div>

        <ContentScoreBar
          value={current.value}
          rules={READING_RULES}
          label="Reading progress"
        />

        {/* Simulate progress buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-text-disabled">Simulate progress:</span>
          {PROGRESS_LEVELS.map((level, i) => (
            <Button
              key={i}
              variant={progressIdx === i ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setProgressIdx(i)}
            >
              {level.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
