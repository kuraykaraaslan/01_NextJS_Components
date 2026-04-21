'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { DatePicker } from '@/modules/ui/DatePicker';
import { Select } from '@/modules/ui/Select';
import { Checkbox } from '@/modules/ui/Checkbox';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'other', label: 'Other' },
];

export function AttendeeForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [country, setCountry] = useState('us');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email address';
    if (!consent) e.consent = 'You must agree to the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="max-w-sm">
        <div className="p-5 text-center space-y-3">
          <div className="text-3xl">✅</div>
          <h3 className="text-base font-semibold text-text-primary">Registration Complete</h3>
          <Badge variant="success">{name}</Badge>
          <p className="text-xs text-text-secondary">Confirmation sent to {email}</p>
          <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Edit details</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-sm">
      <div className="p-5 space-y-4">
        <h3 className="text-base font-semibold text-text-primary">Attendee Details</h3>
        <Input id="att-name" label="Full name" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} required />
        <Input id="att-email" label="Email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
        <Input id="att-phone" label="Phone" type="tel" placeholder="+1 555 000 1234" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <DatePicker id="att-dob" label="Date of birth" value={dob} onChange={setDob} />
        <Select id="att-country" label="Country" options={COUNTRIES} value={country} onChange={(e) => setCountry(e.target.value)} />
        <Checkbox id="att-consent" label="I agree to the event terms and privacy policy" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        {errors.consent && <p className="text-xs text-error-fg">{errors.consent}</p>}
        <Button variant="primary" fullWidth onClick={handleSubmit}>Submit registration</Button>
      </div>
    </Card>
  );
}
