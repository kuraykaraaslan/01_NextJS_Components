'use client';
import { useState } from 'react';
import { DatePicker } from '@/modules/ui/DatePicker';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';

const TIMEZONE_OPTIONS = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'EST', label: 'EST (Eastern Standard Time, UTC-5)' },
  { value: 'PST', label: 'PST (Pacific Standard Time, UTC-8)' },
  { value: 'CET', label: 'CET (Central European Time, UTC+1)' },
  { value: 'IST', label: 'IST (India Standard Time, UTC+5:30)' },
  { value: 'JST', label: 'JST (Japan Standard Time, UTC+9)' },
];

const CHANNEL_OPTIONS = [
  { value: 'web', label: 'Website only' },
  { value: 'web-push', label: 'Website + Push notifications' },
  { value: 'web-email', label: 'Website + Email newsletter' },
  { value: 'all', label: 'All channels' },
];

const TIME_OPTIONS = [
  { value: '06:00', label: '6:00 AM' },
  { value: '08:00', label: '8:00 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '20:00', label: '8:00 PM' },
];

export function PublishingScheduler({ className }: { className?: string }) {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('09:00');
  const [timezone, setTimezone] = useState('UTC');
  const [channel, setChannel] = useState('web');
  const [scheduled, setScheduled] = useState(false);

  function handleSchedule() {
    if (!date) return;
    setScheduled(true);
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary">Schedule Publishing</h3>
          {scheduled && <Badge variant="success" size="sm">Scheduled</Badge>}
        </div>

        {scheduled && (
          <AlertBanner
            variant="success"
            title="Article scheduled"
            message={`Your article will be published on ${date?.toLocaleDateString()} at ${time} ${timezone}.`}
            action={{ label: 'Edit schedule', onClick: () => setScheduled(false) }}
          />
        )}

        {!scheduled && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                id="pub-date"
                label="Publish date"
                value={date}
                onChange={setDate}
              />
              <Select
                id="pub-time"
                label="Publish time"
                options={TIME_OPTIONS}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <Select
              id="pub-tz"
              label="Timezone"
              options={TIMEZONE_OPTIONS}
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            />
            <Select
              id="pub-channel"
              label="Distribution channel"
              options={CHANNEL_OPTIONS}
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            />

            <div className="flex items-center gap-2 pt-1">
              <Button variant="primary" disabled={!date} onClick={handleSchedule}>
                Schedule publication
              </Button>
              <Button variant="ghost">Publish now</Button>
            </div>
            {!date && (
              <p className="text-xs text-text-disabled">Select a publish date to schedule.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
