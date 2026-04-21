'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Input } from '@/modules/ui/Input';

const PRESET_AMOUNTS = [5, 10, 25, 50];

export function DonationCTA({
  supporterCount = 28741,
  className,
}: {
  supporterCount?: number;
  className?: string;
}) {
  const [selected, setSelected] = useState<number | null>(10);
  const [custom, setCustom] = useState('');
  const [donated, setDonated] = useState(false);
  const [loading, setLoading] = useState(false);

  const amount = custom ? parseFloat(custom) : selected;
  const isValid = amount !== null && !isNaN(amount as number) && (amount as number) > 0;

  function handleDonate() {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDonated(true);
    }, 1000);
  }

  if (donated) {
    return (
      <Card className={`text-center p-6 ${className}`}>
        <div className="text-4xl mb-3">❤️</div>
        <p className="text-base font-bold text-text-primary">Thank you for your support!</p>
        <p className="text-sm text-text-secondary mt-1 mb-3">
          Your ${amount?.toFixed(2)} donation helps fund independent journalism.
        </p>
        <Badge variant="success" size="sm">
          You are now one of {(supporterCount + 1).toLocaleString()} supporters
        </Badge>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-text-primary">Support independent journalism</p>
          <p className="text-xs text-text-secondary">
            Reader donations fund our award-winning reporting. No paywalls, no shareholders.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Badge variant="success" size="sm">
              ❤ {supporterCount.toLocaleString()} supporters
            </Badge>
          </div>
        </div>

        {/* Preset amounts */}
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => { setSelected(amt); setCustom(''); }}
              className={`py-2.5 rounded-lg text-sm font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                selected === amt && !custom
                  ? 'bg-primary text-primary-fg border-primary'
                  : 'bg-surface-overlay border-border text-text-primary hover:bg-surface-sunken'
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <Input
          id="donation-custom"
          label="Or enter a custom amount (USD)"
          type="number"
          placeholder="e.g. 15"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
        />

        <Button
          variant="primary"
          fullWidth
          onClick={handleDonate}
          loading={loading}
          disabled={!isValid}
        >
          Donate {isValid ? `$${(amount as number).toFixed(2)}` : ''}
        </Button>

        <p className="text-xs text-text-disabled text-center">
          Secure payment via Stripe. Cancel or modify at any time.
        </p>
      </div>
    </Card>
  );
}
