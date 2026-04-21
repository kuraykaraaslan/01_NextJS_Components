'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Stepper, type StepItem } from '@/modules/ui/Stepper';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { Textarea } from '@/modules/ui/Textarea';
import { Checkbox } from '@/modules/ui/Checkbox';
import { Button } from '@/modules/ui/Button';

export type CheckoutAddress = {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  notes?: string;
  saveAddress: boolean;
};

const STEPS: StepItem[] = [
  { label: 'Address',  state: 'active' },
  { label: 'Shipping', state: 'pending' },
  { label: 'Payment',  state: 'pending' },
];

const COUNTRY_OPTIONS = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'TR', label: 'Turkey' },
];

export function CheckoutAddressStep({
  onNext,
  className,
}: {
  onNext?: (address: CheckoutAddress) => void;
  className?: string;
}) {
  const [form, setForm] = useState<CheckoutAddress>({
    firstName: '', lastName: '', line1: '', city: '',
    state: '', zip: '', country: 'US', phone: '', saveAddress: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutAddress, string>>>({});

  function set(key: keyof CheckoutAddress, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e: typeof errors = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName)  e.lastName  = 'Required';
    if (!form.line1)     e.line1     = 'Required';
    if (!form.city)      e.city      = 'Required';
    if (!form.zip)       e.zip       = 'Required';
    if (!form.phone)     e.phone     = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate()) onNext?.(form);
  }

  return (
    <div className={cn('space-y-6', className)}>
      <Stepper steps={STEPS} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="firstName" label="First name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} error={errors.firstName} required />
        <Input id="lastName"  label="Last name"  value={form.lastName}  onChange={(e) => set('lastName',  e.target.value)} error={errors.lastName}  required />
        <div className="sm:col-span-2">
          <Input id="line1" label="Street address" value={form.line1} onChange={(e) => set('line1', e.target.value)} error={errors.line1} required />
        </div>
        <Input id="line2" label="Apartment, suite (optional)" value={form.line2 ?? ''} onChange={(e) => set('line2', e.target.value)} />
        <Input id="city" label="City" value={form.city} onChange={(e) => set('city', e.target.value)} error={errors.city} required />
        <Input id="state" label="State / Province" value={form.state} onChange={(e) => set('state', e.target.value)} />
        <Input id="zip"   label="ZIP / Postal code" value={form.zip}   onChange={(e) => set('zip',   e.target.value)} error={errors.zip} required />
        <Select id="country" label="Country" options={COUNTRY_OPTIONS} value={form.country} onChange={(e) => set('country', e.target.value)} />
        <div className="sm:col-span-2">
          <Input id="phone" label="Phone number" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} required />
        </div>
        <div className="sm:col-span-2">
          <Textarea id="notes" label="Delivery notes (optional)" rows={3} value={form.notes ?? ''} onChange={(e) => set('notes', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <Checkbox id="saveAddress" label="Save this address for future orders" checked={form.saveAddress} onChange={(e) => set('saveAddress', e.target.checked)} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleNext} iconRight="→">Continue to shipping</Button>
      </div>
    </div>
  );
}
