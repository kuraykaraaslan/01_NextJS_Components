'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { Select } from '@/modules/ui/Select';
import { FileInput } from '@/modules/ui/FileInput';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Toast } from '@/modules/ui/Toast';

const CATEGORIES = [
  { value: 'infrastructure', label: 'Infrastructure & Roads' },
  { value: 'waste', label: 'Waste & Sanitation' },
  { value: 'noise', label: 'Noise Complaint' },
  { value: 'services', label: 'Government Services' },
  { value: 'safety', label: 'Public Safety' },
  { value: 'other', label: 'Other' },
];

const CONTACT_PREFS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'none', label: 'No contact needed' },
];

export function ComplaintRequestForm() {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('email');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!category) e.category = 'Please select a category';
    if (!subject.trim()) e.subject = 'Subject is required';
    if (!description.trim()) e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Submit a Complaint</h3>
          <Badge variant="neutral" size="sm">Citizen Request</Badge>
        </div>

        {submitted && (
          <Toast variant="success" message="Your complaint has been submitted. Reference: CMP-2026-4829" onDismiss={() => setSubmitted(false)} />
        )}

        <Select id="complaint-category" label="Category" options={CATEGORIES} value={category} onChange={(e) => setCategory(e.target.value)} error={errors.category} />
        <Input id="complaint-subject" label="Subject" placeholder="Brief summary of your complaint" value={subject} onChange={(e) => setSubject(e.target.value)} error={errors.subject} required />
        <Textarea id="complaint-desc" label="Description" placeholder="Please describe your complaint in detail, including location, dates, and any relevant information…" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} required />
        <FileInput id="complaint-attach" label="Attachments (optional)" multiple accept=".pdf,.jpg,.png" hint="Photos, documents (max 5MB each)" />
        <Select id="complaint-contact" label="Preferred contact" options={CONTACT_PREFS} value={contact} onChange={(e) => setContact(e.target.value)} />

        <Button variant="primary" fullWidth onClick={handleSubmit}>Submit Complaint</Button>
      </div>
    </Card>
  );
}
