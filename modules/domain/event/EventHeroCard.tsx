'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';

export type EventInfo = {
  name: string;
  date: string;
  venue: string;
  organizer: string;
  ticketsLeft: number;
};

const DEFAULT_EVENT: EventInfo = {
  name: 'TechConf 2026 — The Future of AI',
  date: 'May 15–17, 2026',
  venue: 'Convention Center, San Francisco',
  organizer: 'TechConf Inc.',
  ticketsLeft: 48,
};

export function EventHeroCard({ event = DEFAULT_EVENT }: { event?: EventInfo }) {
  return (
    <Card>
      <div className="p-6 space-y-4">
        <Breadcrumb
          items={[
            { label: 'Events', href: '#' },
            { label: 'Technology', href: '#' },
            { label: event.name },
          ]}
        />

        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
          <span className="text-4xl">🎤</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-primary">{event.name}</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">📅 {event.date}</Badge>
            <Badge variant="neutral">📍 {event.venue}</Badge>
            <Badge variant="neutral">🏢 {event.organizer}</Badge>
            <Badge variant={event.ticketsLeft < 50 ? 'warning' : 'success'}>
              🎟 {event.ticketsLeft} tickets left
            </Badge>
          </div>
        </div>

        <Button variant="primary" iconLeft="🎟">Buy Tickets</Button>
      </div>
    </Card>
  );
}
