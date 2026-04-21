'use client';
import { useMemo, useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Button } from '@/modules/ui/Button';

const TERM_OPTIONS = [
  { value: '10', label: '10 years' },
  { value: '15', label: '15 years' },
  { value: '20', label: '20 years' },
  { value: '25', label: '25 years' },
  { value: '30', label: '30 years' },
];

const AFFORDABILITY_RULES: ScoreRule[] = [
  { label: 'Down payment ≥ 5%',  check: (v) => parseFloat(v) >= 5,  points: 25 },
  { label: 'Down payment ≥ 10%', check: (v) => parseFloat(v) >= 10, points: 25 },
  { label: 'Down payment ≥ 20%', check: (v) => parseFloat(v) >= 20, points: 25 },
  { label: 'Down payment ≥ 30%', check: (v) => parseFloat(v) >= 30, points: 25 },
];

function calcMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function MortgageEstimator({
  currency = 'USD',
  onApply,
  className,
}: {
  currency?: string;
  onApply?: (data: { price: string; downPayment: string; rate: string; term: string }) => void;
  className?: string;
}) {
  const [price,      setPrice]      = useState('');
  const [downPmt,    setDownPmt]    = useState('');
  const [rate,       setRate]       = useState('6.5');
  const [term,       setTerm]       = useState('30');

  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format;

  const { monthly, downPct, loanAmount } = useMemo(() => {
    const p  = parseFloat(price)   || 0;
    const dp = parseFloat(downPmt) || 0;
    const r  = parseFloat(rate)    || 0;
    const t  = parseInt(term)      || 30;
    const loan = Math.max(0, p - dp);
    return {
      loanAmount: loan,
      downPct: p > 0 ? (dp / p) * 100 : 0,
      monthly: loan > 0 ? calcMonthlyPayment(loan, r, t) : 0,
    };
  }, [price, downPmt, rate, term]);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input id="me-price"    label="Property price"   type="number" placeholder="500000" value={price}   onChange={(e) => setPrice(e.target.value)}   required />
        <Input id="me-downpmt"  label="Down payment"     type="number" placeholder="100000" value={downPmt} onChange={(e) => setDownPmt(e.target.value)} />
        <Input id="me-rate"     label="Interest rate (%)" type="number" placeholder="6.5"  value={rate}    onChange={(e) => setRate(e.target.value)} />
        <Select id="me-term"    label="Loan term"         options={TERM_OPTIONS}             value={term}    onChange={(e) => setTerm(e.target.value)} />
      </div>

      {downPct > 0 && (
        <ContentScoreBar value={String(downPct.toFixed(1))} rules={AFFORDABILITY_RULES} label="Down payment strength" />
      )}

      {monthly > 0 && (
        <div className="rounded-lg border border-border bg-surface-raised p-4 space-y-2">
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Loan amount</span><span className="font-mono">{fmt(loanAmount)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-secondary">
            <span>Term</span><span>{term} years</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-text-primary border-t border-border pt-2">
            <span>Monthly payment</span><span className="tabular-nums">{fmt(monthly)}</span>
          </div>
        </div>
      )}

      {onApply && (
        <Button variant="primary" fullWidth onClick={() => onApply({ price, downPayment: downPmt, rate, term })} iconLeft="🏦">
          Apply for mortgage
        </Button>
      )}
    </div>
  );
}
