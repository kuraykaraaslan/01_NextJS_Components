'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Select } from '@/modules/ui/Select';
import { ComboBox, type ComboBoxOption } from '@/modules/ui/ComboBox';
import { Textarea } from '@/modules/ui/Textarea';
import { Button } from '@/modules/ui/Button';

const CATEGORY_OPTIONS = [
  { value: 'mechanical',   label: 'Mechanical failure' },
  { value: 'electrical',   label: 'Electrical fault' },
  { value: 'software',     label: 'Software / PLC issue' },
  { value: 'material',     label: 'Material shortage' },
  { value: 'operator',     label: 'Operator error' },
  { value: 'maintenance',  label: 'Planned maintenance' },
  { value: 'changeover',   label: 'Product changeover' },
  { value: 'quality',      label: 'Quality hold' },
  { value: 'other',        label: 'Other' },
];

const DURATION_OPTIONS = [
  { value: '5',   label: '5 min'  },
  { value: '15',  label: '15 min' },
  { value: '30',  label: '30 min' },
  { value: '60',  label: '1 hour' },
  { value: '120', label: '2 hours' },
  { value: 'custom', label: 'Custom' },
];

export type DowntimeReport = {
  machineId: string;
  category: string;
  specificReason: string;
  duration: string;
  notes: string;
};

export function DowntimeReasonPicker({
  machineId,
  machineName,
  reasonOptions,
  onSubmit,
  onCancel,
  className,
}: {
  machineId: string;
  machineName: string;
  reasonOptions: ComboBoxOption[];
  onSubmit?: (report: DowntimeReport) => void;
  onCancel?: () => void;
  className?: string;
}) {
  const [category,       setCategory]       = useState('');
  const [specificReason, setSpecificReason] = useState('');
  const [duration,       setDuration]       = useState('');
  const [notes,          setNotes]          = useState('');
  const [errors,         setErrors]         = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!category)       e.category = 'Select a category';
    if (!specificReason) e.reason   = 'Select a specific reason';
    if (!duration)       e.duration = 'Select duration';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit?.({ machineId, category, specificReason, duration, notes });
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="pb-3 border-b border-border">
        <p className="text-sm font-semibold text-text-primary">Log downtime: {machineName}</p>
        <p className="text-xs text-text-disabled font-mono">ID: {machineId}</p>
      </div>

      <Select
        id="downtime-category"
        label="Category"
        options={CATEGORY_OPTIONS}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        error={errors.category}
        required
      />

      <ComboBox
        id="downtime-reason"
        label="Specific reason / fault code"
        options={reasonOptions}
        value={specificReason}
        onChange={setSpecificReason}
        placeholder="Search fault codes…"
        error={errors.reason}
        required
      />

      <Select
        id="downtime-duration"
        label="Duration"
        options={DURATION_OPTIONS}
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        error={errors.duration}
        required
      />

      <Textarea
        id="downtime-notes"
        label="Additional notes"
        placeholder="Describe what happened, steps taken, who was notified…"
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button variant="primary" onClick={handleSubmit} iconLeft="📋">Log downtime</Button>
      </div>
    </div>
  );
}
