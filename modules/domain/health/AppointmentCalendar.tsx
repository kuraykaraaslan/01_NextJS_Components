'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DatePicker } from '@/modules/ui/DatePicker';
import { TimePicker } from '@/modules/ui/DateRangePicker';
import { Button } from '@/modules/ui/Button';
import { Modal } from '@/modules/ui/Modal';

export type Appointment = {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  location?: string;
};

export function AppointmentCalendar({
  appointments = [],
  onBook,
  className,
}: {
  appointments?: Appointment[];
  onBook?: (date: Date | null, time: string) => Promise<void>;
  className?: string;
}) {
  const [modalOpen, setModalOpen]   = useState(false);
  const [date, setDate]             = useState<Date | null>(null);
  const [time, setTime]             = useState('09:00');
  const [loading, setLoading]       = useState(false);

  async function handleBook() {
    setLoading(true);
    try { await onBook?.(date, time); setModalOpen(false); }
    finally { setLoading(false); }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Upcoming appointments</h3>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} iconLeft="+">
          Book
        </Button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-sm text-text-secondary py-4 text-center">No upcoming appointments.</p>
      ) : (
        <div className="space-y-2">
          {appointments.map((appt) => (
            <div key={appt.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-surface-raised">
              <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary-subtle text-primary shrink-0">
                <span className="text-lg font-bold leading-none">{appt.date.split('-')[2]}</span>
                <span className="text-[10px] uppercase">{new Date(appt.date).toLocaleString('en', { month: 'short' })}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{appt.type}</p>
                <p className="text-xs text-text-secondary">{appt.doctor} · {appt.time}</p>
                {appt.location && <p className="text-xs text-text-disabled">{appt.location}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Book appointment"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleBook} loading={loading}>Confirm booking</Button>
          </>
        }
      >
        <div className="space-y-4">
          <DatePicker id="appt-date" label="Preferred date" value={date} onChange={setDate} required />
          <TimePicker id="appt-time" label="Preferred time" value={time} onChange={setTime} required />
        </div>
      </Modal>
    </div>
  );
}
