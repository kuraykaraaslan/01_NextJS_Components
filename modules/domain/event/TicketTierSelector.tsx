'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { RadioGroup } from '@/modules/ui/RadioGroup';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';

const TIERS = [
  {
    id: 'general',
    name: 'General Admission',
    price: '$49',
    features: ['Main stage access', 'Networking lunch', 'Digital swag bag'],
    available: 120,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '$149',
    features: ['All GA benefits', 'VIP lounge', 'Speaker Q&A', 'Priority seating'],
    available: 35,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$349',
    features: ['All VIP benefits', 'Workshop access', '1:1 speaker meeting', 'Exclusive dinner'],
    available: 8,
  },
];

const QTY_ITEMS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

export function TicketTierSelector() {
  const [selectedTier, setSelectedTier] = useState('general');
  const [qty, setQty] = useState('1');

  const radioOptions = TIERS.map((t) => ({
    value: t.id,
    label: `${t.name} — ${t.price}`,
    hint: `${t.available} remaining`,
  }));

  const activeTier = TIERS.find((t) => t.id === selectedTier)!;

  return (
    <div className="space-y-4 max-w-lg">
      <RadioGroup
        name="ticket-tier"
        legend="Select ticket tier"
        options={radioOptions}
        value={selectedTier}
        onChange={setSelectedTier}
      />

      {activeTier && (
        <Card className={cn(activeTier.available < 20 ? 'border-warning' : '')}>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-text-primary">{activeTier.name}</h4>
              <Badge variant={activeTier.available < 20 ? 'warning' : 'success'} size="sm">
                {activeTier.available} left
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeTier.features.map((f) => (
                <Badge key={f} variant="neutral" size="sm">{f}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">Qty:</span>
              <ButtonGroup items={QTY_ITEMS} value={qty} onChange={setQty} size="sm" />
              <span className="text-sm font-semibold text-text-primary ml-auto">{activeTier.price} × {qty}</span>
            </div>
          </div>
        </Card>
      )}

      <Button variant="primary" iconLeft="🎟">Add to order</Button>
    </div>
  );
}
