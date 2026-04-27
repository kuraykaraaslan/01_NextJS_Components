'use client';
import { useState } from 'react';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { CreditCardVisual } from './CreditCardVisual';
import type { CreditCardInput, CardBrand } from '../PaymentTypes';

function detectBrand(number: string): CardBrand {
  const n = number.replace(/\D/g, '');
  if (/^4/.test(n)) return 'VISA';
  if (/^5[1-5]|^2[2-7]/.test(n)) return 'MASTERCARD';
  if (/^3[47]/.test(n)) return 'AMEX';
  if (/^6/.test(n)) return 'DISCOVER';
  return 'UNKNOWN';
}

function formatNumber(raw: string, brand: CardBrand): string {
  const digits = raw.replace(/\D/g, '');
  const maxLen = brand === 'AMEX' ? 15 : 16;
  const trimmed = digits.slice(0, maxLen);
  if (brand === 'AMEX') {
    return trimmed.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(' ')
    );
  }
  return trimmed.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

type CardFormErrors = {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardholderName?: string;
};

type CreditCardFormProps = {
  onSubmit: (values: CreditCardInput) => Promise<void> | void;
  onCancel?: () => void;
  error?: string;
  className?: string;
};

export function CreditCardForm({ onSubmit, onCancel, error, className }: CreditCardFormProps) {
  const [cardNumber, setCardNumber]       = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiry, setExpiry]               = useState('');
  const [cvv, setCvv]                     = useState('');
  const [cvvFocused, setCvvFocused]       = useState(false);
  const [errors, setErrors]               = useState<CardFormErrors>({});
  const [loading, setLoading]             = useState(false);

  const brand = detectBrand(cardNumber);
  const maxCvv = brand === 'AMEX' ? 4 : 3;

  function validate(): boolean {
    const next: CardFormErrors = {};
    const digits = cardNumber.replace(/\D/g, '');
    const minLen = brand === 'AMEX' ? 15 : 16;
    if (digits.length < minLen) next.cardNumber = `Card number must be ${minLen} digits.`;

    const [mm, yy] = expiry.split('/');
    const month = parseInt(mm ?? '', 10);
    const year  = parseInt(`20${yy ?? ''}`, 10);
    const now   = new Date();
    if (!mm || !yy || month < 1 || month > 12) {
      next.expiry = 'Enter a valid expiry date (MM/YY).';
    } else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
      next.expiry = 'Card has expired.';
    }

    if (cvv.length < maxCvv) next.cvv = `CVV must be ${maxCvv} digits.`;
    if (!cardholderName.trim()) next.cardholderName = 'Cardholder name is required.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit({
        cardNumber:     cardNumber.replace(/\s/g, ''),
        cardholderName: cardholderName.trim(),
        expiryMonth:    expiry.split('/')[0],
        expiryYear:     expiry.split('/')[1],
        cvv,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      className={className}
      actions={
        <>
          {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>}
          <Button type="submit" loading={loading}>Add Card</Button>
        </>
      }
    >
      <div className="flex justify-center mb-2">
        <CreditCardVisual
          cardNumber={cardNumber}
          cardholderName={cardholderName}
          expiryMonth={expiry.split('/')[0] || 'MM'}
          expiryYear={expiry.split('/')[1] || 'YY'}
          cvv={cvv}
          brand={brand}
          flipped={cvvFocused}
        />
      </div>

      <Input
        id="card-number"
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        inputMode="numeric"
        autoComplete="cc-number"
        onChange={(e) => setCardNumber(formatNumber(e.target.value, brand))}
        error={errors.cardNumber}
      />

      <Input
        id="cardholder-name"
        label="Cardholder Name"
        placeholder="Name on card"
        value={cardholderName}
        autoComplete="cc-name"
        onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
        error={errors.cardholderName}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          id="expiry"
          label="Expiry"
          placeholder="MM/YY"
          value={expiry}
          inputMode="numeric"
          autoComplete="cc-exp"
          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
          error={errors.expiry}
        />
        <Input
          id="cvv"
          label="CVV"
          type="password"
          placeholder={'•'.repeat(maxCvv)}
          value={cvv}
          inputMode="numeric"
          autoComplete="cc-csc"
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, maxCvv))}
          onFocus={() => setCvvFocused(true)}
          onBlur={() => setCvvFocused(false)}
          error={errors.cvv}
        />
      </div>
    </Form>
  );
}
