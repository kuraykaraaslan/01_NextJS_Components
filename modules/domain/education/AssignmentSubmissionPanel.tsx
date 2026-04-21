'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { FileInput } from '@/modules/ui/FileInput';
import { Textarea } from '@/modules/ui/Textarea';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';

export function AssignmentSubmissionPanel({
  assignmentTitle,
  dueDate,
  instructions,
  maxFileSizeBytes = 20 * 1024 * 1024,
  allowedTypes = ['.pdf', '.docx', '.zip'],
  onSubmit,
  className,
}: {
  assignmentTitle: string;
  dueDate?: string;
  instructions?: string;
  maxFileSizeBytes?: number;
  allowedTypes?: string[];
  onSubmit?: (notes: string) => Promise<void>;
  className?: string;
}) {
  const [notes,   setNotes]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);

  const isOverdue = dueDate ? new Date(dueDate) < new Date() : false;

  async function handleSubmit() {
    setLoading(true);
    setError('');
    try {
      await onSubmit?.(notes);
      setSuccess(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-text-primary">{assignmentTitle}</h3>
          {dueDate && (
            <p className={cn('text-xs mt-0.5', isOverdue ? 'text-error-fg' : 'text-text-secondary')}>
              {isOverdue ? '⚠ Past due: ' : 'Due: '}{dueDate}
            </p>
          )}
        </div>
      </div>

      {instructions && (
        <AlertBanner variant="info" message={instructions} />
      )}

      {isOverdue && (
        <AlertBanner variant="warning" message="This assignment is past due. Late submissions may be penalized." />
      )}

      {error && (
        <AlertBanner variant="error" message={error} dismissible />
      )}

      <FileInput
        id="assignment-files"
        label="Attach files"
        hint={`Accepted: ${allowedTypes.join(', ')} · Max ${Math.round(maxFileSizeBytes / (1024 * 1024))} MB per file`}
        multiple
        accept={allowedTypes.join(',')}
        maxSizeBytes={maxFileSizeBytes}
        allowedTypes={allowedTypes}
      />

      <Textarea
        id="submission-notes"
        label="Notes to instructor (optional)"
        placeholder="Add any comments or context about your submission…"
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Button
        variant="primary"
        fullWidth
        loading={loading}
        onClick={handleSubmit}
        iconLeft="📤"
      >
        Submit assignment
      </Button>

      {success && (
        <Toast
          variant="success"
          message="Assignment submitted successfully!"
          onDismiss={() => setSuccess(false)}
        />
      )}
    </div>
  );
}
