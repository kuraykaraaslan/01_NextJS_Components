'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { cn } from '@/libs/utils/cn';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: '$29',
    annualPrice: '$23',
    features: ['5 team members', '10 GB storage', 'Basic analytics', 'Email support'],
    cta: 'Get started',
    current: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: '$79',
    annualPrice: '$63',
    features: ['25 team members', '100 GB storage', 'Advanced analytics', 'Priority support', 'API access'],
    cta: 'Upgrade now',
    current: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: '$199',
    annualPrice: '$159',
    features: ['Unlimited members', '1 TB storage', 'Custom analytics', 'Dedicated support', 'SSO', 'SLA'],
    cta: 'Contact sales',
    current: false,
  },
];

const BILLING_ITEMS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual (save 20%)' },
];

export function BillingPlanCard() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <ButtonGroup items={BILLING_ITEMS} value={billing} onChange={setBilling} size="sm" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <Card key={plan.id} className={cn(plan.current && 'ring-2 ring-primary')}>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-text-primary">{plan.name}</h3>
                {plan.current && <Badge variant="primary" size="sm">Current plan</Badge>}
              </div>
              <div>
                <span className="text-3xl font-bold text-text-primary">
                  {billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-text-secondary text-sm">/mo</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {plan.features.map((f) => (
                  <Badge key={f} variant="neutral" size="sm">{f}</Badge>
                ))}
              </div>
              <Button
                variant={plan.current ? 'outline' : 'primary'}
                fullWidth
              >
                {plan.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
