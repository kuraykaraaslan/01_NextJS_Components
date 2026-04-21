'use client';
import { Stepper } from '@/modules/ui/Stepper';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Card } from '@/modules/ui/Card';
import type { StepItem } from '@/modules/ui/Stepper';

const ORDER_STEPS: Array<StepItem & { time: string }> = [
  { label: 'Order Placed', description: 'We received your order', state: 'complete', time: '6:30 PM' },
  { label: 'Confirmed', description: 'Restaurant confirmed', state: 'complete', time: '6:32 PM' },
  { label: 'Preparing', description: 'Your food is being made', state: 'active', time: '6:35 PM' },
  { label: 'Out for Delivery', description: 'Driver on the way', state: 'pending', time: 'Est. 7:00 PM' },
  { label: 'Delivered', description: 'Enjoy your meal!', state: 'pending', time: 'Est. 7:10 PM' },
];

const isDelayed = false;

export function OrderTrackingTimeline() {
  const steps: StepItem[] = ORDER_STEPS.map((s) => ({
    label: s.label,
    description: s.description,
    state: s.state,
  }));

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Order #4821</h3>
          <Badge variant="warning" size="sm">Preparing</Badge>
        </div>

        {isDelayed && (
          <AlertBanner variant="warning" title="Delay notice" message="Your order is running about 15 minutes late. We apologize for the inconvenience." />
        )}

        <Stepper steps={steps} orientation="vertical" />

        <div className="space-y-1 border-t border-border pt-3">
          {ORDER_STEPS.map((s, i) => (
            <div key={i} className="flex justify-between text-xs text-text-secondary">
              <span>{s.label}</span>
              <Badge variant="neutral" size="sm">{s.time}</Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
