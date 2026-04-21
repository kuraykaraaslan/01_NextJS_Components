'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { ComboBox, type ComboBoxOption } from '@/modules/ui/ComboBox';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD – US Dollar' },
  { value: 'EUR', label: 'EUR – Euro' },
  { value: 'GBP', label: 'GBP – British Pound' },
  { value: 'TRY', label: 'TRY – Turkish Lira' },
];

export function TransferForm({
  beneficiaryOptions,
  availableBalance,
  onSubmit,
  className,
}: {
  beneficiaryOptions: ComboBoxOption[];
  availableBalance: number;
  onSubmit?: (data: { beneficiary: string; amount: string; currency: string; note: string }) => Promise<void>;
  className?: string;
}) {
  const [beneficiary, setBeneficiary] = useState('');
  const [amount, setAmount]           = useState('');
  const [currency, setCurrency]       = useState('USD');
  const [note, setNote]               = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');
  const [errors, setErrors]           = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!beneficiary)                    e.beneficiary = 'Select a beneficiary';
    if (!amount || isNaN(Number(amount))) e.amount      = 'Enter a valid amount';
    else if (Number(amount) > availableBalance) e.amount = `Exceeds available balance ($${availableBalance})`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await onSubmit?.({ beneficiary, amount, currency, note });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {error && <AlertBanner variant="error" message={error} dismissible />}

      <AlertBanner
        variant="info"
        message={`Available balance: $${availableBalance.toFixed(2)}`}
      />

      <ComboBox
        id="beneficiary"
        label="To (beneficiary)"
        options={beneficiaryOptions}
        value={beneficiary}
        onChange={setBeneficiary}
        placeholder="Search beneficiaries…"
        error={errors.beneficiary}
        required
      />

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            id="amount"
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
            required
          />
        </div>
        <div className="w-44">
          <Select
            id="currency"
            label="Currency"
            options={CURRENCY_OPTIONS}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
      </div>

      <Input
        id="note"
        label="Reference / note (optional)"
        placeholder="e.g. Invoice #1042"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button variant="primary" fullWidth onClick={handleSubmit} loading={loading} iconLeft="↗">
        Send transfer
      </Button>
    </div>
  );
}
