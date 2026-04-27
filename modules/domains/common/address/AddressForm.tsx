'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import type { Address } from '../AddressTypes';

type FormValues = {
  fullName: string; phone: string; addressLine1: string; addressLine2: string;
  city: string; state: string; postalCode: string; country: string; countryCode: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type AddressFormProps = {
  initial?: Partial<Address>;
  onSubmit: (values: Address) => Promise<void> | void;
  onCancel?: () => void;
  submitLabel?: string;
  className?: string;
};

function toStr(v: string | null | undefined): string { return v ?? ''; }

function fromAddress(a?: Partial<Address>): FormValues {
  return {
    fullName: toStr(a?.fullName), phone: toStr(a?.phone),
    addressLine1: toStr(a?.addressLine1), addressLine2: toStr(a?.addressLine2),
    city: toStr(a?.city), state: toStr(a?.state),
    postalCode: toStr(a?.postalCode), country: toStr(a?.country), countryCode: toStr(a?.countryCode),
  };
}

function toAddress(v: FormValues): Address {
  return {
    addressLine1: v.addressLine1, addressLine2: v.addressLine2 || null,
    fullName: v.fullName || null, phone: v.phone || null,
    city: v.city || null, state: v.state || null,
    postalCode: v.postalCode || null, country: v.country || null, countryCode: v.countryCode || null,
  };
}

export function AddressForm({ initial, onSubmit, onCancel, submitLabel = 'Save', className }: AddressFormProps) {
  const [values, setValues] = useState<FormValues>(() => fromAddress(initial));
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormValues) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!values.fullName.trim())     next.fullName     = 'Full name is required.';
    if (!values.addressLine1.trim()) next.addressLine1 = 'Address line 1 is required.';
    if (!values.city.trim())         next.city         = 'City is required.';
    if (!values.country.trim())      next.country      = 'Country is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit(toAddress(values)); } finally { setLoading(false); }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      className={className}
      actions={
        <>
          {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>}
          <Button type="submit" loading={loading}>{submitLabel}</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="addr-fullname" label="Full Name" required
          prefixIcon={<FontAwesomeIcon icon={faUser} className="w-3 h-3" />}
          value={values.fullName} onChange={set('fullName')} error={errors.fullName} />
        <Input id="addr-phone" label="Phone" type="tel"
          prefixIcon={<FontAwesomeIcon icon={faPhone} className="w-3 h-3" />}
          value={values.phone} onChange={set('phone')} />
      </div>

      <Input id="addr-line1" label="Address Line 1" required
        prefixIcon={<FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />}
        value={values.addressLine1} onChange={set('addressLine1')} error={errors.addressLine1} />
      <Input id="addr-line2" label="Address Line 2 (optional)"
        value={values.addressLine2} onChange={set('addressLine2')} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input id="addr-city"       label="City"             required value={values.city}       onChange={set('city')}       error={errors.city} />
        <Input id="addr-state"      label="State / District"           value={values.state}      onChange={set('state')} />
        <Input id="addr-postalcode" label="Postal Code"                value={values.postalCode} onChange={set('postalCode')} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="addr-country" label="Country" required
          prefixIcon={<FontAwesomeIcon icon={faGlobe} className="w-3 h-3" />}
          value={values.country} onChange={set('country')} error={errors.country} />
        <Input id="addr-countrycode" label="Country Code (2 letters)"
          value={values.countryCode} onChange={set('countryCode')} maxLength={2} />
      </div>
    </Form>
  );
}
