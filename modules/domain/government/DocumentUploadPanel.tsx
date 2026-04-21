'use client';
import { useState } from 'react';
import { FileInput } from '@/modules/ui/FileInput';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Button } from '@/modules/ui/Button';
import { Toast } from '@/modules/ui/Toast';
import { Badge } from '@/modules/ui/Badge';
import { SkeletonLine } from '@/modules/ui/Skeleton';
import { Card } from '@/modules/ui/Card';

type UploadedFile = {
  name: string;
  type: string;
  size: string;
};

export function DocumentUploadPanel() {
  const [uploads] = useState<UploadedFile[]>([
    { name: 'passport_scan.pdf', type: 'PDF', size: '2.1 MB' },
    { name: 'utility_bill.jpg', type: 'JPG', size: '0.8 MB' },
  ]);
  const [uploading, setUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function simulateUpload() {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setShowToast(true);
    }, 2000);
  }

  const typeVariant: Record<string, 'error' | 'primary' | 'neutral'> = {
    PDF: 'error',
    JPG: 'primary',
    PNG: 'neutral',
  };

  return (
    <Card className="max-w-sm">
      <div className="p-5 space-y-4">
        <h3 className="text-base font-semibold text-text-primary">Document Upload</h3>

        <AlertBanner
          variant="info"
          title="File size limit"
          message="Maximum 10 MB per file. Accepted formats: PDF, JPG, PNG."
        />

        {showToast && (
          <Toast variant="success" message="Documents uploaded successfully." onDismiss={() => setShowToast(false)} duration={3000} />
        )}

        <FileInput
          id="govt-docs"
          label="Upload documents"
          multiple
          accept=".pdf,.jpg,.png"
          hint="Drag and drop or click to browse"
          maxSizeBytes={10 * 1024 * 1024}
        />

        {uploading && (
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">Uploading…</p>
            <SkeletonLine width="w-3/4" />
            <SkeletonLine width="w-1/2" />
          </div>
        )}

        {uploads.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Uploaded files</h4>
            {uploads.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Badge variant={typeVariant[f.type] ?? 'neutral'} size="sm">{f.type}</Badge>
                <span className="flex-1 truncate text-text-primary font-mono text-xs">{f.name}</span>
                <Badge variant="neutral" size="sm">{f.size}</Badge>
              </div>
            ))}
          </div>
        )}

        <Button variant="primary" fullWidth onClick={simulateUpload} loading={uploading}>
          Upload All
        </Button>
      </div>
    </Card>
  );
}
