'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { DatePicker } from '@/modules/ui/DatePicker';
import { TimePicker } from '@/modules/ui/DateRangePicker';
import { Table } from '@/modules/ui/Table';
import { Modal } from '@/modules/ui/Modal';
import { Button } from '@/modules/ui/Button';

export type InterviewSlot = {
  id: string;
  candidateName: string;
  role: string;
  interviewers: string[];
  date: string;
  time: string;
  duration: string;
  type: 'phone' | 'video' | 'onsite';
  location?: string;
};

const typeIcon: Record<InterviewSlot['type'], string> = {
  phone:  '📞',
  video:  '💻',
  onsite: '🏢',
};

export function InterviewScheduleMatrix({
  slots,
  onBook,
  className,
}: {
  slots: InterviewSlot[];
  onBook?: (date: Date | null, time: string, candidateName: string) => Promise<void>;
  className?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [date,      setDate]      = useState<Date | null>(null);
  const [time,      setTime]      = useState('10:00');
  const [candidate, setCandidate] = useState('');
  const [loading,   setLoading]   = useState(false);

  async function handleBook() {
    setLoading(true);
    try { await onBook?.(date, time, candidate); setModalOpen(false); }
    finally { setLoading(false); }
  }

  const columns = [
    { key: 'date'          as const, header: 'Date & Time', render: (r: InterviewSlot) => (
      <div><p className="text-sm font-medium text-text-primary">{r.date}</p><p className="text-xs text-text-secondary">{r.time} · {r.duration}</p></div>
    )},
    { key: 'candidateName' as const, header: 'Candidate', render: (r: InterviewSlot) => (
      <div><p className="text-sm text-text-primary">{r.candidateName}</p><p className="text-xs text-text-disabled">{r.role}</p></div>
    )},
    { key: 'type'          as const, header: 'Type', render: (r: InterviewSlot) => (
      <span>{typeIcon[r.type]} {r.type}</span>
    )},
    { key: 'interviewers'  as const, header: 'Interviewers', render: (r: InterviewSlot) => (
      <span className="text-sm text-text-secondary">{r.interviewers.join(', ')}</span>
    )},
    { key: 'location'      as const, header: 'Location', render: (r: InterviewSlot) => (
      <span className="text-xs text-text-secondary">{r.location ?? '—'}</span>
    )},
  ];

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex justify-end">
        {onBook && (
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} iconLeft="+">
            Schedule interview
          </Button>
        )}
      </div>

      <Table columns={columns} rows={slots} caption="Interview schedule" />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Schedule interview"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleBook} loading={loading}>Schedule</Button>
          </>
        }
      >
        <div className="space-y-4">
          <DatePicker id="interview-date" label="Date" value={date} onChange={setDate} required />
          <TimePicker id="interview-time" label="Time" value={time} onChange={setTime} required />
        </div>
      </Modal>
    </div>
  );
}
