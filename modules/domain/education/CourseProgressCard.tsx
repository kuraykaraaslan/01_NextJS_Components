import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Button } from '@/modules/ui/Button';

function makeProgressRules(total: number): ScoreRule[] {
  return [
    { label: 'Started',        check: (v) => parseInt(v) > 0,                    points: 20 },
    { label: '25% complete',   check: (v) => parseInt(v) >= Math.ceil(total / 4), points: 20 },
    { label: '50% complete',   check: (v) => parseInt(v) >= Math.ceil(total / 2), points: 20 },
    { label: '75% complete',   check: (v) => parseInt(v) >= Math.ceil(total * 3 / 4), points: 20 },
    { label: 'Fully complete', check: (v) => parseInt(v) >= total,                points: 20 },
  ];
}

export type CourseProgressCardProps = {
  title: string;
  instructor: string;
  thumbnail?: string;
  category?: string;
  completedLessons: number;
  totalLessons: number;
  estimatedMinutes?: number;
  status?: 'not-started' | 'in-progress' | 'completed' | 'paused';
  onContinue?: () => void;
  onViewCertificate?: () => void;
  className?: string;
};

const statusConfig: Record<string, { variant: 'neutral' | 'primary' | 'success' | 'warning'; label: string }> = {
  'not-started': { variant: 'neutral',  label: 'Not started' },
  'in-progress': { variant: 'primary',  label: 'In progress' },
  'completed':   { variant: 'success',  label: 'Completed' },
  'paused':      { variant: 'warning',  label: 'Paused' },
};

export function CourseProgressCard({
  title, instructor, thumbnail, category,
  completedLessons, totalLessons, estimatedMinutes,
  status = 'not-started', onContinue, onViewCertificate, className,
}: CourseProgressCardProps) {
  const cfg = statusConfig[status];
  const rules = makeProgressRules(totalLessons);

  return (
    <Card hoverable className={className}>
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="w-full h-36 object-cover" />
      ) : (
        <div className="w-full h-36 bg-surface-sunken flex items-center justify-center text-5xl text-text-disabled">🎓</div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {category && <p className="text-xs text-text-disabled mb-0.5">{category}</p>}
            <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">{title}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{instructor}</p>
          </div>
          <Badge variant={cfg.variant} size="sm" className="shrink-0">{cfg.label}</Badge>
        </div>

        <div>
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>{completedLessons}/{totalLessons} lessons</span>
            {estimatedMinutes && <span>{Math.ceil((estimatedMinutes * (totalLessons - completedLessons)) / totalLessons)} min left</span>}
          </div>
          <ContentScoreBar value={String(completedLessons)} rules={rules} label="Progress" />
        </div>

        {status === 'completed' && onViewCertificate ? (
          <Button variant="outline" size="sm" fullWidth onClick={onViewCertificate} iconLeft="🏆">
            View certificate
          </Button>
        ) : onContinue ? (
          <Button variant="primary" size="sm" fullWidth onClick={onContinue} iconLeft="▶">
            {status === 'not-started' ? 'Start course' : 'Continue'}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
