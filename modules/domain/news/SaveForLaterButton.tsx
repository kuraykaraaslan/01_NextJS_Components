'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Toast } from '@/modules/ui/Toast';

export function SaveForLaterButton({
  initialSaved = false,
  savedCount = 3241,
  articleTitle = 'Global Leaders Reach Landmark Climate Agreement',
  className,
}: {
  initialSaved?: boolean;
  savedCount?: number;
  articleTitle?: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [count, setCount] = useState(savedCount);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  function handleToggle() {
    const willSave = !saved;
    setSaved(willSave);
    setCount((c) => willSave ? c + 1 : c - 1);
    setToastMsg(willSave ? `"${articleTitle}" saved to your reading list` : 'Removed from reading list');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }

  return (
    <div className={`relative inline-flex flex-col items-start gap-1 ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant={saved ? 'secondary' : 'outline'}
          size="sm"
          onClick={handleToggle}
          iconLeft={saved ? '🔖' : '🔖'}
        >
          {saved ? 'Saved' : 'Save for later'}
        </Button>
        <Badge variant={saved ? 'success' : 'neutral'} size="sm">
          {count.toLocaleString()} saves
        </Badge>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            variant={saved ? 'success' : 'info'}
            message={toastMsg}
            onDismiss={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}
