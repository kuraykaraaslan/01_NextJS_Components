'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { Toggle } from '@/modules/ui/Toggle';
import { Toast } from '@/modules/ui/Toast';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

export function BreakingNewsComposer({ className }: { className?: string }) {
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [isBreaking, setIsBreaking] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const canPublish = headline.trim().length > 5;

  function handlePublish() {
    if (!canPublish) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowToast(true);
      setHeadline('');
      setBody('');
      setTimeout(() => setShowToast(false), 4000);
    }, 800);
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-text-primary">Quick Composer</h3>
            {isBreaking && (
              <Badge variant="error" size="sm">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
                  BREAKING
                </span>
              </Badge>
            )}
          </div>
          <Toggle
            id="breaking-toggle"
            label="Mark as BREAKING"
            checked={isBreaking}
            onChange={(checked) => setIsBreaking(checked)}
          />
        </div>

        {isBreaking && (
          <div className="bg-error-subtle border border-error/30 rounded-lg px-4 py-2">
            <p className="text-xs text-error-fg font-medium">
              Breaking news will trigger push notifications and be pinned to the top of all category pages.
            </p>
          </div>
        )}

        <Input
          id="breaking-headline"
          label="Headline *"
          placeholder="Write a clear, factual breaking news headline…"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          hint={`${headline.length} chars`}
          error={headline.length > 0 && headline.length < 5 ? 'Headline too short' : undefined}
        />

        <Textarea
          id="breaking-body"
          label="Initial body (optional)"
          placeholder="Add the first paragraph of the breaking story. Can be updated as more details emerge."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          hint={`${body.split(/\s+/).filter(Boolean).length} words`}
        />

        <div className="flex items-center gap-2 pt-1 border-t border-border">
          <Button
            variant={isBreaking ? 'danger' : 'primary'}
            onClick={handlePublish}
            loading={loading}
            disabled={!canPublish}
          >
            {isBreaking ? '🔴 Publish Breaking News' : 'Publish article'}
          </Button>
          <Button variant="ghost" onClick={() => { setHeadline(''); setBody(''); }}>
            Clear
          </Button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <Toast
            variant="success"
            message={`${isBreaking ? 'Breaking news' : 'Article'} published successfully!`}
            onDismiss={() => setShowToast(false)}
          />
        </div>
      )}
    </div>
  );
}
