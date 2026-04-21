import { cn } from '@/libs/utils/cn';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Card } from '@/modules/ui/Card';

export type SEOCheck = {
  id: string;
  label: string;
  description: string;
  status: 'pass' | 'fail' | 'warning';
  impact: 'high' | 'medium' | 'low';
};

const SEO_RULES: ScoreRule[] = [
  { label: 'Has focus keyword',       check: (v) => v.length > 0,  points: 20 },
  { label: 'Keyword in title',        check: (v) => v.includes('|title'), points: 20 },
  { label: 'Keyword in first 100 chars', check: (v) => v.includes('|body'), points: 20 },
  { label: 'Meta description set',    check: (v) => v.includes('|meta'), points: 20 },
  { label: 'Sufficient word count',   check: (v) => v.includes('|wordcount'), points: 20 },
];

const impactVariant: Record<string, 'error' | 'warning' | 'neutral'> = {
  high:   'error',
  medium: 'warning',
  low:    'neutral',
};

const statusIcon: Record<string, string> = {
  pass:    '✓',
  fail:    '✗',
  warning: '!',
};

const statusColor: Record<string, string> = {
  pass:    'text-success-fg',
  fail:    'text-error-fg',
  warning: 'text-warning-fg',
};

export function SEOScorePanel({
  focusKeyword,
  checks,
  scoreValue,
  className,
}: {
  focusKeyword: string;
  checks: SEOCheck[];
  scoreValue: string;
  className?: string;
}) {
  const passing = checks.filter((c) => c.status === 'pass').length;
  const failing = checks.filter((c) => c.status === 'fail').length;
  const warnings = checks.filter((c) => c.status === 'warning').length;

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">SEO analysis</h3>
            {focusKeyword && (
              <p className="text-xs text-text-secondary mt-0.5">Focus: <span className="font-medium text-text-primary">"{focusKeyword}"</span></p>
            )}
          </div>
          <div className="flex gap-1.5">
            <Badge variant="success"  size="sm">{passing} passed</Badge>
            {warnings > 0 && <Badge variant="warning" size="sm">{warnings} warnings</Badge>}
            {failing  > 0 && <Badge variant="error"   size="sm">{failing} failed</Badge>}
          </div>
        </div>

        <ContentScoreBar value={scoreValue} rules={SEO_RULES} label="Overall score" />

        <div className="space-y-2">
          {checks.map((check) => (
            <Tooltip key={check.id} content={check.description}>
              <div className="flex items-center gap-2.5 cursor-default py-1">
                <span className={cn('text-sm font-bold w-4 shrink-0', statusColor[check.status])}>
                  {statusIcon[check.status]}
                </span>
                <span className="flex-1 text-sm text-text-primary">{check.label}</span>
                <Badge variant={impactVariant[check.impact]} size="sm">{check.impact}</Badge>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
    </Card>
  );
}
