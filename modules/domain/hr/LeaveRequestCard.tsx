'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Select } from '@/modules/ui/Select';
import { Tooltip } from '@/modules/ui/Tooltip';

const LEAVE_TYPES = [
  { value: 'annual',    label: 'Annual leave' },
  { value: 'sick',      label: 'Sick leave' },
  { value: 'parental',  label: 'Parental leave' },
  { value: 'unpaid',    label: 'Unpaid leave' },
  { value: 'emergency', label: 'Emergency leave' },
];

export type LeaveBalance = {
  type: string;
  used: number;
  total: number;
};

export function LeaveRequestCard({
  employeeName,
  balances = [],
  onSubmit,
  className,
}: {
  employeeName: string;
  balances?: LeaveBalance[];
  onSubmit?: (range: DateRange, type: string) => Promise<void>;
  className?: string;
}) {
  const [range,   setRange]   = useState<DateRange>({ start: null, end: null });
  const [type,    setType]    = useState('annual');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const days = range.start && range.end
    ? Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1
    : 0;

  async function handleSubmit() {
    if (!range.start || !range.end) { setError('Select a date range'); return; }
    setLoading(true);
    setError('');
    try { await onSubmit?.(range, type); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Submit failed'); }
    finally { setLoading(false); }
  }

  const selectedBalance = balances.find((b) => b.type === type);

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Leave request</h3>
          <Badge variant="neutral" size="sm">{employeeName}</Badge>
        </div>

        {balances.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {balances.map((b) => (
              <Tooltip key={b.type} content={`${b.used} used of ${b.total} days`}>
                <span>
                  <Badge variant={b.total - b.used <= 2 ? 'warning' : 'success'} size="sm">
                    {b.type}: {b.total - b.used}d left
                  </Badge>
                </span>
              </Tooltip>
            ))}
          </div>
        )}

        <Select id="leave-type" label="Leave type" options={LEAVE_TYPES} value={type} onChange={(e) => setType(e.target.value)} />
        <DateRangePicker id="leave-range" label="Leave period" value={range} onChange={setRange} />

        {days > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Duration</span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text-primary">{days} day{days !== 1 ? 's' : ''}</span>
              {selectedBalance && days > (selectedBalance.total - selectedBalance.used) && (
                <Badge variant="error" size="sm">Exceeds balance</Badge>
              )}
            </div>
          </div>
        )}

        {error && <p className="text-xs text-error-fg">{error}</p>}

        <Button variant="primary" fullWidth onClick={handleSubmit} loading={loading} iconLeft="📅">
          Submit request
        </Button>
      </div>
    </Card>
  );
}
