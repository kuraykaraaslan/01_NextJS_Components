'use client';
import { useState } from 'react';
import { Stepper } from '@/modules/ui/Stepper';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';
import type { StepItem } from '@/modules/ui/Stepper';

const STEPS = ['Seats', 'Details', 'Payment', 'Confirm'];

const CARD_TYPES = [
  { value: 'visa', label: 'Visa' },
  { value: 'mc', label: 'Mastercard' },
  { value: 'amex', label: 'American Express' },
];

export function CheckoutStepper() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState('');
  const [cardType, setCardType] = useState('visa');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps: StepItem[] = STEPS.map((label, i) => ({
    label,
    state: i < step ? 'complete' : i === step ? 'active' : 'pending',
  }));

  function validate() {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!name.trim()) e.name = 'Name required';
      if (!email.trim()) e.email = 'Email required';
    }
    if (step === 2) {
      if (!card.trim()) e.card = 'Card number required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
  }

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-5">
        <Stepper steps={steps} />

        <div className="min-h-[120px]">
          {step === 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-text-primary">Seat Summary</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Row A, Seat 1</Badge>
                <Badge variant="primary">Row A, Seat 2</Badge>
                <Badge variant="success">General Admission × 2</Badge>
                <Badge variant="neutral">Total: $98</Badge>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <Input id="checkout-name" label="Full name" placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} required />
              <Input id="checkout-email" label="Email" type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} required />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <Select id="checkout-card-type" label="Card type" options={CARD_TYPES} value={cardType} onChange={(e) => setCardType(e.target.value)} />
              <Input id="checkout-card" label="Card number" placeholder="•••• •••• •••• ••••" value={card} onChange={(e) => setCard(e.target.value)} error={errors.card} required />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2 text-center py-4">
              <div className="text-4xl">🎉</div>
              <h4 className="text-base font-semibold text-text-primary">Booking Confirmed!</h4>
              <p className="text-sm text-text-secondary">Your tickets have been sent to {email || 'your email'}.</p>
              <Badge variant="success">Ref: TCK-{Math.floor(Math.random() * 90000) + 10000}</Badge>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          {step > 0 && step < STEPS.length - 1 && (
            <Button variant="outline" onClick={back}>Back</Button>
          )}
          {step < STEPS.length - 1 && (
            <Button variant="primary" onClick={next}>
              {step === STEPS.length - 2 ? 'Confirm & Pay' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
