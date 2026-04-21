'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { TagInput } from '@/modules/ui/TagInput';
import { MultiSelect, type MultiSelectOption } from '@/modules/ui/MultiSelect';
import { Button } from '@/modules/ui/Button';

const ROUTE_OPTIONS: MultiSelectOption[] = [
  { value: 'oral',       label: 'Oral' },
  { value: 'iv',         label: 'IV' },
  { value: 'topical',    label: 'Topical' },
  { value: 'inhaled',    label: 'Inhaled' },
  { value: 'sublingual', label: 'Sublingual' },
];

export type Prescription = {
  drug: string;
  dosage: string;
  frequency: string;
  duration: string;
  routes: string[];
  warnings: string[];
  instructions: string;
};

export function PrescriptionEditor({
  initial,
  onSave,
  onCancel,
  className,
}: {
  initial?: Partial<Prescription>;
  onSave?: (rx: Prescription) => void;
  onCancel?: () => void;
  className?: string;
}) {
  const [drug,         setDrug]         = useState(initial?.drug         ?? '');
  const [dosage,       setDosage]       = useState(initial?.dosage       ?? '');
  const [frequency,    setFrequency]    = useState(initial?.frequency    ?? '');
  const [duration,     setDuration]     = useState(initial?.duration     ?? '');
  const [routes,       setRoutes]       = useState<string[]>(initial?.routes    ?? []);
  const [warnings,     setWarnings]     = useState<string[]>(initial?.warnings  ?? []);
  const [instructions, setInstructions] = useState(initial?.instructions ?? '');
  const [errors,       setErrors]       = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!drug)      e.drug      = 'Drug name is required';
    if (!dosage)    e.dosage    = 'Dosage is required';
    if (!frequency) e.frequency = 'Frequency is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave?.({ drug, dosage, frequency, duration, routes, warnings, instructions });
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input id="rx-drug" label="Drug / medication" placeholder="e.g. Amoxicillin 500mg" value={drug} onChange={(e) => setDrug(e.target.value)} error={errors.drug} required />
        </div>
        <Input id="rx-dosage"    label="Dosage"     placeholder="e.g. 500mg" value={dosage}    onChange={(e) => setDosage(e.target.value)}    error={errors.dosage}    required />
        <Input id="rx-frequency" label="Frequency"  placeholder="e.g. 3× daily" value={frequency} onChange={(e) => setFrequency(e.target.value)} error={errors.frequency} required />
        <Input id="rx-duration"  label="Duration"   placeholder="e.g. 7 days"   value={duration}  onChange={(e) => setDuration(e.target.value)} />
        <MultiSelect
          id="rx-routes"
          label="Administration routes"
          options={ROUTE_OPTIONS}
          value={routes}
          onChange={setRoutes}
        />
        <div className="sm:col-span-2">
          <TagInput id="rx-warnings" label="Warnings / contraindications" placeholder="Type and press Enter…" value={warnings} onChange={setWarnings} />
        </div>
        <div className="sm:col-span-2">
          <Textarea id="rx-instructions" label="Special instructions" rows={3} value={instructions} onChange={(e) => setInstructions(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button variant="primary" onClick={handleSave} iconLeft="💊">Save prescription</Button>
      </div>
    </div>
  );
}
