'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Access the basics',
    color: 'from-gray-400 to-gray-600',
    features: [
      { label: '5 articles / month', included: true },
      { label: 'Breaking news alerts', included: true },
      { label: 'Newsletter (weekly)', included: true },
      { label: 'Unlimited access', included: false },
      { label: 'Ad-free reading', included: false },
      { label: 'Exclusive reports', included: false },
    ],
    cta: 'Current plan',
    recommended: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: { monthly: 9.99, annual: 7.99 },
    description: 'For engaged readers',
    color: 'from-blue-500 to-blue-700',
    features: [
      { label: 'Unlimited articles', included: true },
      { label: 'Breaking news alerts', included: true },
      { label: 'Newsletter (daily)', included: true },
      { label: 'Ad-free reading', included: true },
      { label: 'Archive access (10yr)', included: true },
      { label: 'Exclusive investigative', included: false },
    ],
    cta: 'Subscribe',
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: { monthly: 19.99, annual: 15.99 },
    description: 'Everything, no limits',
    color: 'from-amber-500 to-orange-600',
    features: [
      { label: 'Unlimited articles', included: true },
      { label: 'Breaking news alerts', included: true },
      { label: 'Newsletter (daily + custom)', included: true },
      { label: 'Ad-free reading', included: true },
      { label: 'Full archive (20+ years)', included: true },
      { label: 'Exclusive investigative', included: true },
    ],
    cta: 'Go Premium',
    recommended: false,
  },
];

const BILLING_ITEMS: ButtonGroupItem[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual (save 20%)' },
];

export function SubscriptionPlanCards({ className }: { className?: string }) {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <ButtonGroup items={BILLING_ITEMS} value={billing} onChange={setBilling} variant="outline" size="sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`overflow-hidden relative ${plan.recommended ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute top-3 right-3">
                  <Badge variant="info" size="sm">Most popular</Badge>
                </div>
              )}
              <div className={`h-16 bg-gradient-to-r ${plan.color} flex items-center px-4`}>
                <span className="text-white font-bold text-lg">{plan.name}</span>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    {plan.price[billing as 'monthly' | 'annual'] === 0 ? (
                      <span className="text-2xl font-extrabold text-text-primary">Free</span>
                    ) : (
                      <>
                        <span className="text-2xl font-extrabold text-text-primary">
                          ${plan.price[billing as 'monthly' | 'annual'].toFixed(2)}
                        </span>
                        <span className="text-sm text-text-disabled">/mo</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary">{plan.description}</p>
                </div>

                <ul className="space-y-1.5">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs">
                      <span className={`shrink-0 font-bold ${f.included ? 'text-success-fg' : 'text-text-disabled'}`}>
                        {f.included ? '✓' : '–'}
                      </span>
                      <span className={f.included ? 'text-text-primary' : 'text-text-disabled line-through'}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.recommended ? 'primary' : plan.id === 'free' ? 'ghost' : 'secondary'}
                  fullWidth
                  size="sm"
                  disabled={plan.id === 'free'}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
