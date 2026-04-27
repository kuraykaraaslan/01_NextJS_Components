'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';

type CouponState = 'idle' | 'loading' | 'success' | 'error';

type CouponInputProps = {
  onApply: (code: string) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
  onRemove?: () => void;
  appliedCode?: string;
  className?: string;
};

export function CouponInput({ onApply, onRemove, appliedCode, className }: CouponInputProps) {
  const [code, setCode] = useState('');
  const [state, setState] = useState<CouponState>('idle');
  const [message, setMessage] = useState('');

  async function handleApply() {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setState('loading');
    setMessage('');
    try {
      const result = await onApply(trimmed);
      if (result.success) {
        setState('success');
        setMessage(result.message ?? 'Coupon applied!');
        setCode('');
      } else {
        setState('error');
        setMessage(result.message ?? 'Invalid coupon code.');
      }
    } catch {
      setState('error');
      setMessage('Failed to apply coupon. Try again.');
    }
  }

  function handleRemove() {
    setState('idle');
    setMessage('');
    setCode('');
    onRemove?.();
  }

  if (appliedCode) {
    return (
      <div className={cn('flex items-center justify-between gap-3 rounded-lg bg-success-subtle border border-success px-4 py-2.5', className)}>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-success-fg text-sm" aria-hidden="true">✓</span>
          <span className="text-sm font-medium text-success-fg truncate">
            <span className="font-mono">{appliedCode}</span> applied
          </span>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="xs"
            onClick={handleRemove}
            className="text-success-fg underline hover:no-underline shrink-0"
          >
            Remove
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex gap-2">
        <Input
          id="coupon-code"
          label=""
          placeholder="Enter coupon code"
          value={code}
          onChange={(e) => { setCode(e.target.value.toUpperCase()); setState('idle'); setMessage(''); }}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleApply())}
          className="flex-1"
          aria-label="Coupon code"
        />
        <Button
          variant="outline"
          loading={state === 'loading'}
          disabled={!code.trim()}
          onClick={handleApply}
          className="shrink-0 self-end mb-0.5"
        >
          Apply
        </Button>
      </div>
      {message && (
        <p className={cn('text-xs', state === 'success' ? 'text-success-fg' : 'text-error')}>
          {message}
        </p>
      )}
    </div>
  );
}
