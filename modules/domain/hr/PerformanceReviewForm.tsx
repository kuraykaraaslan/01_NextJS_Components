'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { RadioGroup } from '@/modules/ui/RadioGroup';
import { Toggle } from '@/modules/ui/Toggle';
import { Button } from '@/modules/ui/Button';

const RATING_OPTIONS = [
  { value: '5', label: '5 – Exceptional' },
  { value: '4', label: '4 – Exceeds expectations' },
  { value: '3', label: '3 – Meets expectations' },
  { value: '2', label: '2 – Below expectations' },
  { value: '1', label: '1 – Unsatisfactory' },
];

export type PerformanceReview = {
  employeeName: string;
  period: string;
  overallRating: string;
  strengths: string;
  improvements: string;
  goals: string;
  recommendPromotion: boolean;
  recommendBonus: boolean;
  additionalComments: string;
};

export function PerformanceReviewForm({
  employeeName,
  period,
  onSubmit,
  onCancel,
  className,
}: {
  employeeName: string;
  period: string;
  onSubmit?: (review: PerformanceReview) => void;
  onCancel?: () => void;
  className?: string;
}) {
  const [rating,    setRating]    = useState('3');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [goals,     setGoals]     = useState('');
  const [promo,     setPromo]     = useState(false);
  const [bonus,     setBonus]     = useState(false);
  const [comments,  setComments]  = useState('');
  const [errors,    setErrors]    = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!strengths)    e.strengths    = 'Required';
    if (!improvements) e.improvements = 'Required';
    if (!goals)        e.goals        = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit?.({ employeeName, period, overallRating: rating, strengths, improvements, goals, recommendPromotion: promo, recommendBonus: bonus, additionalComments: comments });
  }

  return (
    <div className={cn('space-y-5', className)}>
      <div className="pb-3 border-b border-border">
        <p className="text-sm font-semibold text-text-primary">{employeeName}</p>
        <p className="text-xs text-text-secondary">Review period: {period}</p>
      </div>

      <RadioGroup
        name="performance-rating"
        legend="Overall performance rating"
        options={RATING_OPTIONS}
        value={rating}
        onChange={setRating}
      />

      <Textarea
        id="strengths"
        label="Key strengths"
        placeholder="Describe the employee's notable achievements and strengths…"
        rows={3}
        value={strengths}
        onChange={(e) => setStrengths(e.target.value)}
        error={errors.strengths}
        required
      />

      <Textarea
        id="improvements"
        label="Areas for improvement"
        placeholder="Identify specific areas where development is needed…"
        rows={3}
        value={improvements}
        onChange={(e) => setImprovements(e.target.value)}
        error={errors.improvements}
        required
      />

      <Textarea
        id="goals"
        label="Goals for next period"
        placeholder="Set measurable goals for the upcoming review period…"
        rows={3}
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
        error={errors.goals}
        required
      />

      <div className="space-y-3 pt-2">
        <Toggle id="recommend-promo"  label="Recommend for promotion" description="Employee is ready for next-level responsibility" checked={promo}  onChange={setPromo} />
        <Toggle id="recommend-bonus"  label="Recommend for bonus"     description="Employee merits performance bonus consideration"  checked={bonus}  onChange={setBonus} />
      </div>

      <Textarea
        id="comments"
        label="Additional comments (optional)"
        rows={2}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button variant="primary" onClick={handleSubmit} iconLeft="✓">Submit review</Button>
      </div>
    </div>
  );
}
