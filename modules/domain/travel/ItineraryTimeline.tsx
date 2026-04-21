import { cn } from '@/libs/utils/cn';
import { Stepper, type StepItem } from '@/modules/ui/Stepper';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

export type ItineraryLeg = {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'transfer' | 'car';
  title: string;
  location: string;
  date: string;
  time?: string;
  duration?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
  details?: string;
  provider?: string;
  confirmationNo?: string;
};

const typeIcon: Record<ItineraryLeg['type'], string> = {
  flight:   '✈',
  hotel:    '🏨',
  activity: '🎟',
  transfer: '🚌',
  car:      '🚗',
};

const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error'; label: string }> = {
  confirmed: { variant: 'success', label: 'Confirmed' },
  pending:   { variant: 'warning', label: 'Pending'   },
  cancelled: { variant: 'error',   label: 'Cancelled' },
};

export function ItineraryTimeline({
  tripName,
  destination,
  legs,
  className,
}: {
  tripName: string;
  destination: string;
  legs: ItineraryLeg[];
  className?: string;
}) {
  const crumbs = [
    { label: 'Trips', href: '/trips' },
    { label: tripName },
  ];

  const stepperItems: StepItem[] = legs.map((leg, i) => ({
    label: leg.title,
    description: `${leg.date}${leg.time ? ' · ' + leg.time : ''}`,
    state: leg.status === 'cancelled' ? 'error' : i === 0 ? 'active' : 'pending',
  }));

  return (
    <div className={cn('space-y-4', className)}>
      <Breadcrumb items={crumbs} />

      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-text-primary">{tripName}</h2>
        <Badge variant="info" size="sm">{destination}</Badge>
        <Badge variant="neutral" size="sm">{legs.length} legs</Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Stepper steps={stepperItems} orientation="vertical" />

        <div className="space-y-3">
          {legs.map((leg) => (
            <Card key={leg.id} variant="outline" className="!rounded-lg">
              <div className="p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-lg">{typeIcon[leg.type]}</span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{leg.title}</p>
                      <p className="text-xs text-text-secondary">{leg.location}</p>
                    </div>
                  </div>
                  {leg.status && (
                    <Badge variant={statusConfig[leg.status].variant} size="sm">{statusConfig[leg.status].label}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-text-disabled">
                  <span>{leg.date}{leg.time ? ' · ' + leg.time : ''}</span>
                  {leg.duration && <span>· {leg.duration}</span>}
                  {leg.provider && <span>· {leg.provider}</span>}
                </div>
                {leg.confirmationNo && (
                  <p className="text-xs font-mono text-text-secondary">Ref: {leg.confirmationNo}</p>
                )}
                {leg.details && <p className="text-xs text-text-secondary">{leg.details}</p>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
