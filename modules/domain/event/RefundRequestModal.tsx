'use client';
import { useState } from 'react';
import { Modal } from '@/modules/ui/Modal';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export function RefundRequestModal() {
  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!ref.trim()) e.ref = 'Booking reference is required';
    if (!reason.trim()) e.reason = 'Please provide a reason';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setRef('');
      setReason('');
    }, 1500);
  }

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Request Refund</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Request a Refund"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleSubmit} loading={submitted}>Submit Request</Button>
          </>
        }
      >
        <div className="space-y-4">
          <AlertBanner
            variant="info"
            title="7-Day Refund Policy"
            message="Refunds are available within 7 days of purchase for events more than 14 days away. Processing takes 3–5 business days."
          />
          <Input id="refund-ref" label="Booking reference" placeholder="TCK-12345" value={ref} onChange={(e) => setRef(e.target.value)} error={errors.ref} required />
          <Textarea id="refund-reason" label="Reason for refund" placeholder="Please describe why you are requesting a refund…" rows={4} value={reason} onChange={(e) => setReason(e.target.value)} error={errors.reason} required />
        </div>
      </Modal>
    </div>
  );
}
