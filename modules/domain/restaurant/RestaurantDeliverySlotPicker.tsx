'use client';
import { useState } from 'react';
import { DatePicker } from '@/modules/ui/DatePicker';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';

const TIME_SLOTS = [
  { value: '09:00', label: '9:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '18:00', label: '6:00 PM' },
];

const DELIVERY_TYPES = [
  { value: 'delivery', label: 'Home Delivery' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'dine-in', label: 'Dine-in' },
];

export function RestaurantDeliverySlotPicker() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('12:00');
  const [type, setType] = useState('delivery');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!date) { setError('Please select a date'); return; }
    setError('');
    setSubmitted(true);
  }

  return (
    <Card className="max-w-sm">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Schedule Delivery</h3>
          <Badge variant="primary" size="sm">🚚</Badge>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <div className="text-3xl">✓</div>
            <p className="text-sm font-medium text-success-fg">Slot confirmed!</p>
            <Badge variant="success">{type} · {date?.toLocaleDateString()} · {TIME_SLOTS.find((t) => t.value === time)?.label}</Badge>
            <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Change</Button>
          </div>
        ) : (
          <>
            <Select id="delivery-type" label="Delivery type" options={DELIVERY_TYPES} value={type} onChange={(e) => setType(e.target.value)} />
            <DatePicker id="delivery-date" label="Delivery date" value={date} onChange={setDate} />
            <Select id="delivery-time" label="Time slot" options={TIME_SLOTS} value={time} onChange={(e) => setTime(e.target.value)} />
            {error && <p className="text-xs text-error-fg">{error}</p>}
            <Button variant="primary" fullWidth onClick={handleSubmit}>Confirm slot</Button>
          </>
        )}
      </div>
    </Card>
  );
}
