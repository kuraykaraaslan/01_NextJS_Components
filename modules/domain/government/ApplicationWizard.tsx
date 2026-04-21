'use client';
import { useState } from 'react';
import { Stepper } from '@/modules/ui/Stepper';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { DatePicker } from '@/modules/ui/DatePicker';
import { Button } from '@/modules/ui/Button';
import { FileInput } from '@/modules/ui/FileInput';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import type { StepItem } from '@/modules/ui/Stepper';

const STEP_LABELS = ['Personal Info', 'Documents', 'Review', 'Submit'];

const ID_TYPES = [
  { value: 'passport', label: 'Passport' },
  { value: 'dl', label: "Driver's License" },
  { value: 'ssn', label: 'Social Security Card' },
];

export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idType, setIdType] = useState('passport');
  const [dob, setDob] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const refCode = `APP-2026-${Math.floor(Math.random() * 90000) + 10000}`;

  const steps: StepItem[] = STEP_LABELS.map((label, i) => ({
    label,
    state: i < step ? 'complete' : i === step ? 'active' : 'pending',
  }));

  function validate() {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!firstName.trim()) e.firstName = 'First name required';
      if (!lastName.trim()) e.lastName = 'Last name required';
      if (!email.trim()) e.email = 'Email required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
  }

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-5">
        <Stepper steps={steps} />

        <div className="min-h-[180px]">
          {step === 0 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input id="wiz-fname" label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors.firstName} required />
                <Input id="wiz-lname" label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors.lastName} required />
              </div>
              <Input id="wiz-email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
              <Select id="wiz-id-type" label="ID type" options={ID_TYPES} value={idType} onChange={(e) => setIdType(e.target.value)} />
              <DatePicker id="wiz-dob" label="Date of birth" value={dob} onChange={setDob} />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">Upload required documents for your application.</p>
              <FileInput id="wiz-docs" label="Identity documents" multiple accept=".pdf,.jpg,.png" hint="PDF, JPG or PNG (max 10MB each)" />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-text-primary">Review your application</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary">Name</span><span>{firstName} {lastName}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Email</span><span>{email}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">ID type</span><Badge variant="primary" size="sm">{idType}</Badge></div>
                <div className="flex justify-between"><span className="text-text-secondary">Date of Birth</span><span>{dob?.toLocaleDateString() ?? '—'}</span></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-3">
              <div className="text-4xl">🎉</div>
              <h4 className="text-base font-semibold text-text-primary">Application Submitted!</h4>
              <p className="text-sm text-text-secondary">Your reference number:</p>
              <Badge variant="success">{refCode}</Badge>
              <p className="text-xs text-text-secondary">Keep this number for future correspondence.</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          {step > 0 && step < STEP_LABELS.length - 1 && (
            <Button variant="outline" onClick={back}>Back</Button>
          )}
          {step < STEP_LABELS.length - 1 && (
            <Button variant="primary" onClick={next}>
              {step === STEP_LABELS.length - 2 ? 'Submit Application' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
