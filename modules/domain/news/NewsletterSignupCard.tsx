'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Checkbox } from '@/modules/ui/Checkbox';
import { Select } from '@/modules/ui/Select';
import { Card } from '@/modules/ui/Card';

const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily digest' },
  { value: 'weekly', label: 'Weekly roundup' },
  { value: 'breaking', label: 'Breaking news only' },
  { value: 'custom', label: 'Custom — topic-based' },
];

export function NewsletterSignupCard({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = emailValid && consent && !loading;

  function handleSubmit() {
    if (!canSubmit) {
      if (!emailValid) setError('Please enter a valid email address.');
      else if (!consent) setError('Please agree to the privacy policy.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <Card className={className}>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-text-primary">Stay informed</h3>
          <p className="text-sm text-text-secondary mt-1">
            Join 2.4 million readers who get our newsletter. No spam — cancel anytime.
          </p>
        </div>

        {submitted ? (
          <AlertBanner
            variant="success"
            title="You're subscribed!"
            message={`We'll send your ${FREQUENCY_OPTIONS.find((f) => f.value === frequency)?.label.toLowerCase() ?? 'newsletter'} to ${email}.`}
            dismissible
          />
        ) : (
          <>
            <Input
              id="newsletter-email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !emailValid ? error : undefined}
            />
            <Select
              id="newsletter-frequency"
              label="Delivery frequency"
              options={FREQUENCY_OPTIONS}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
            <Checkbox
              id="newsletter-consent"
              label="I agree to receive email newsletters and accept the privacy policy"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            {error && consent && !emailValid && (
              <AlertBanner variant="error" message={error} />
            )}
            <Button
              variant="primary"
              fullWidth
              onClick={handleSubmit}
              loading={loading}
              disabled={!canSubmit}
            >
              Subscribe now
            </Button>
            <p className="text-xs text-text-disabled text-center">
              Over 2.4M subscribers · Unsubscribe at any time
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
