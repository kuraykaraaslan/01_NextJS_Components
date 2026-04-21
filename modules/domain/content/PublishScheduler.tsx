'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DatePicker } from '@/modules/ui/DatePicker';
import { TimePicker } from '@/modules/ui/DateRangePicker';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';

const CHANNEL_OPTIONS = [
  { value: 'website',    label: 'Website' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'social',     label: 'Social media' },
  { value: 'all',        label: 'All channels' },
];

const TZ_OPTIONS = [
  { value: 'UTC',       label: 'UTC' },
  { value: 'America/New_York', label: 'EST / EDT' },
  { value: 'America/Los_Angeles', label: 'PST / PDT' },
  { value: 'Europe/London', label: 'GMT / BST' },
  { value: 'Europe/Istanbul', label: 'TRT (UTC+3)' },
];

export function PublishScheduler({
  contentTitle,
  onSchedule,
  onPublishNow,
  className,
}: {
  contentTitle: string;
  onSchedule?: (date: Date | null, time: string, channel: string, timezone: string) => Promise<void>;
  onPublishNow?: () => Promise<void>;
  className?: string;
}) {
  const [date,     setDate]     = useState<Date | null>(null);
  const [time,     setTime]     = useState('09:00');
  const [channel,  setChannel]  = useState('website');
  const [timezone, setTimezone] = useState('UTC');
  const [loading,  setLoading]  = useState(false);
  const [nowLoading, setNowLoading] = useState(false);
  const [error,    setError]    = useState('');

  const isScheduledInPast = date && new Date(`${date.toDateString()} ${time}`) < new Date();

  async function handleSchedule() {
    if (!date) { setError('Select a publish date'); return; }
    if (isScheduledInPast) { setError('Publish time cannot be in the past'); return; }
    setLoading(true); setError('');
    try { await onSchedule?.(date, time, channel, timezone); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Scheduling failed'); }
    finally { setLoading(false); }
  }

  async function handleNow() {
    setNowLoading(true); setError('');
    try { await onPublishNow?.(); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Publish failed'); }
    finally { setNowLoading(false); }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <p className="text-sm font-semibold text-text-primary">{contentTitle}</p>
        <p className="text-xs text-text-secondary">Configure publish schedule</p>
      </div>

      {error && <AlertBanner variant="error" message={error} dismissible />}
      {isScheduledInPast && !error && (
        <AlertBanner variant="warning" message="Selected time is in the past." />
      )}

      <Select id="pub-channel"  label="Publish channel"   options={CHANNEL_OPTIONS} value={channel}  onChange={(e) => setChannel(e.target.value)} />
      <DatePicker id="pub-date" label="Publish date"      value={date}              onChange={setDate} />
      <TimePicker id="pub-time" label="Publish time"      value={time}              onChange={setTime} />
      <Select id="pub-tz"       label="Timezone"          options={TZ_OPTIONS}      value={timezone}  onChange={(e) => setTimezone(e.target.value)} />

      <div className="flex gap-3">
        {onPublishNow && (
          <Button variant="outline" onClick={handleNow} loading={nowLoading} iconLeft="⚡">
            Publish now
          </Button>
        )}
        <Button variant="primary" fullWidth onClick={handleSchedule} loading={loading} iconLeft="📅">
          Schedule publish
        </Button>
      </div>
    </div>
  );
}
