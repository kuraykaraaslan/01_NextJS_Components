'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DatePicker } from '@/modules/ui/DatePicker';
import { TimePicker } from '@/modules/ui/DateRangePicker';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';

const SLOT_OPTIONS = [
  { value: 'morning',   label: 'Morning (08:00–12:00)' },
  { value: 'afternoon', label: 'Afternoon (12:00–17:00)' },
  { value: 'evening',   label: 'Evening (17:00–21:00)' },
  { value: 'specific',  label: 'Specific time' },
];

export function DeliverySlotPicker({
  onConfirm,
  className,
}: {
  onConfirm?: (date: Date | null, slot: string, specificTime?: string) => void;
  className?: string;
}) {
  const [date,         setDate]         = useState<Date | null>(null);
  const [slot,         setSlot]         = useState('morning');
  const [specificTime, setSpecificTime] = useState('09:00');
  const [errors,       setErrors]       = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!date) e.date = 'Select a delivery date';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleConfirm() {
    if (!validate()) return;
    onConfirm?.(date, slot, slot === 'specific' ? specificTime : undefined);
  }

  return (
    <div className={cn('space-y-4', className)}>
      <DatePicker
        id="delivery-date"
        label="Delivery date"
        value={date}
        onChange={setDate}
        error={errors.date}
        required
      />
      <Select
        id="delivery-slot"
        label="Delivery window"
        options={SLOT_OPTIONS}
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
      />
      {slot === 'specific' && (
        <TimePicker
          id="delivery-time"
          label="Specific time"
          value={specificTime}
          onChange={setSpecificTime}
        />
      )}
      <Button variant="primary" fullWidth onClick={handleConfirm} iconLeft="📦">
        Confirm delivery slot
      </Button>
    </div>
  );
}
