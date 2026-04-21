'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { Stepper, type StepItem } from '@/modules/ui/Stepper';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export type StepFlowStep = {
  id: string;
  label: string;
  description?: string;
  content: (props: {
    values: Record<string, unknown>;
    onChange: (key: string, value: unknown) => void;
    error?: string;
  }) => React.ReactNode;
  validate?: (values: Record<string, unknown>) => string | undefined;
  optional?: boolean;
};

export function StepFlow({
  steps,
  onComplete,
  onCancel,
  completeLabel = 'Finish',
  cancelLabel = 'Cancel',
  nextLabel = 'Next',
  prevLabel = 'Back',
  initialValues = {},
  className,
}: {
  steps: StepFlowStep[];
  onComplete: (values: Record<string, unknown>) => void | Promise<void>;
  onCancel?: () => void;
  completeLabel?: string;
  cancelLabel?: string;
  nextLabel?: string;
  prevLabel?: string;
  initialValues?: Record<string, unknown>;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [stepError, setStepError] = useState<string | undefined>();
  const [completing, setCompleting] = useState(false);

  function onChange(key: string, value: unknown) {
    setValues((v) => ({ ...v, [key]: value }));
    setStepError(undefined);
  }

  function handleNext() {
    const step = steps[current];
    const err = step.validate?.(values);
    if (err) { setStepError(err); return; }
    setStepError(undefined);
    setCurrent((c) => Math.min(c + 1, steps.length - 1));
  }

  async function handleComplete() {
    const step = steps[current];
    const err = step.validate?.(values);
    if (err) { setStepError(err); return; }
    setCompleting(true);
    try {
      await onComplete(values);
    } finally {
      setCompleting(false);
    }
  }

  function handlePrev() {
    setStepError(undefined);
    setCurrent((c) => Math.max(c - 1, 0));
  }

  const stepperItems: StepItem[] = steps.map((s, i) => ({
    label: s.label,
    description: s.description,
    state: i < current ? 'complete' : i === current ? 'active' : 'pending',
  }));

  const isLast = current === steps.length - 1;

  return (
    <div className={cn('space-y-6', className)}>
      <Stepper steps={stepperItems} />

      <div className="min-h-[12rem]">
        {steps[current].content({ values, onChange, error: stepError })}
      </div>

      {stepError && (
        <AlertBanner variant="error" message={stepError} />
      )}

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
        <div>
          {onCancel && current === 0 && (
            <Button variant="ghost" onClick={onCancel}>{cancelLabel}</Button>
          )}
          {current > 0 && (
            <Button variant="outline" onClick={handlePrev}>{prevLabel}</Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-disabled">
            {current + 1} / {steps.length}
          </span>
          {isLast ? (
            <Button variant="primary" onClick={handleComplete} loading={completing}>
              {completeLabel}
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext} iconRight="→">
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
