'use client';
import { useState } from 'react';
import { DatePicker } from '@/modules/ui/DatePicker';
import { Select } from '@/modules/ui/Select';
import { Modal } from '@/modules/ui/Modal';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';

const HEARING_TYPES = [
  { value: 'motion', label: 'Motion Hearing' },
  { value: 'trial', label: 'Trial' },
  { value: 'deposition', label: 'Deposition' },
  { value: 'status', label: 'Status Conference' },
];

const COURTROOMS = [
  { value: 'cr1', label: 'Courtroom 1 — Judge Moore' },
  { value: 'cr3', label: 'Courtroom 3 — Judge Patel' },
  { value: 'cr7', label: 'Courtroom 7 — Judge Williams' },
];

const TIME_SLOTS = [
  { value: '09:00', label: '9:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '16:00', label: '4:00 PM' },
];

export function HearingCalendar() {
  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState('motion');
  const [courtroom, setCourtroom] = useState('cr1');
  const [time, setTime] = useState('09:00');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [scheduled, setScheduled] = useState(false);

  function handleSchedule() {
    if (!date) { setError('Please select a hearing date'); return; }
    setError('');
    setModalOpen(true);
  }

  function confirmSchedule() {
    setScheduled(true);
    setModalOpen(false);
  }

  return (
    <Card className="max-w-sm">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Schedule Hearing</h3>
          {scheduled && <Badge variant="success" size="sm">Scheduled</Badge>}
        </div>

        <Select id="hearing-type" label="Hearing type" options={HEARING_TYPES} value={type} onChange={(e) => setType(e.target.value)} />
        <DatePicker id="hearing-date" label="Hearing date" value={date} onChange={setDate} />
        <Select id="hearing-time" label="Time slot" options={TIME_SLOTS} value={time} onChange={(e) => setTime(e.target.value)} />
        <Select id="hearing-courtroom" label="Courtroom" options={COURTROOMS} value={courtroom} onChange={(e) => setCourtroom(e.target.value)} />

        {error && <p className="text-xs text-error-fg">{error}</p>}
        <Button variant="primary" fullWidth onClick={handleSchedule}>Schedule Hearing</Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Hearing"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={confirmSchedule}>Confirm</Button>
          </>
        }
      >
        <div className="space-y-2">
          <p className="text-sm text-text-secondary">Please confirm the following hearing details:</p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Type</span>
              <Badge variant="primary" size="sm">{HEARING_TYPES.find((t) => t.value === type)?.label}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Date</span>
              <span className="font-medium">{date?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Time</span>
              <span className="font-medium">{TIME_SLOTS.find((t) => t.value === time)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Courtroom</span>
              <span className="font-medium">{COURTROOMS.find((c) => c.value === courtroom)?.label}</span>
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
