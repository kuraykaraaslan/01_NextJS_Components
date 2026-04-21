'use client';
import { useState } from 'react';
import { FileInput } from '@/modules/ui/FileInput';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export function FileUploadSection({
  id = 'file-upload',
  label = 'Upload files',
  hint,
  multiple = false,
  accept,
  maxSizeBytes,
  allowedTypes,
  onUpload,
  uploadLabel = 'Upload',
  className,
}: {
  id?: string;
  label?: string;
  hint?: string;
  multiple?: boolean;
  accept?: string;
  maxSizeBytes?: number;
  allowedTypes?: string[];
  onUpload?: (files: File[]) => Promise<void>;
  uploadLabel?: string;
  className?: string;
}) {
  const [state, setState] = useState<UploadState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  async function handleUpload() {
    if (!onUpload) return;
    setState('uploading');
    setErrorMsg('');
    try {
      await onUpload([]);
      setState('success');
      setShowSuccess(true);
    } catch (e: unknown) {
      setState('error');
      setErrorMsg(e instanceof Error ? e.message : 'Upload failed. Please try again.');
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {state === 'error' && (
        <AlertBanner
          variant="error"
          title="Upload failed"
          message={errorMsg}
          dismissible
        />
      )}

      <FileInput
        id={id}
        label={label}
        hint={hint}
        multiple={multiple}
        accept={accept}
        maxSizeBytes={maxSizeBytes}
        allowedTypes={allowedTypes}
        disabled={state === 'uploading'}
      />

      {onUpload && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleUpload}
            loading={state === 'uploading'}
            disabled={state === 'uploading'}
          >
            {uploadLabel}
          </Button>
        </div>
      )}

      {showSuccess && (
        <Toast
          variant="success"
          message="Files uploaded successfully."
          onDismiss={() => { setShowSuccess(false); setState('idle'); }}
        />
      )}
    </div>
  );
}
