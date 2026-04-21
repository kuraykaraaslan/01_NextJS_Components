'use client';
import { useState } from 'react';
import { EmptyState } from '@/modules/ui/EmptyState';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Button } from '@/modules/ui/Button';
import { Select } from '@/modules/ui/Select';

type ErrorVariant = 'empty-feed' | '404-article' | 'network-error';

const VARIANTS: Record<ErrorVariant, {
  title: string;
  description: string;
  icon: string;
  alert: { variant: 'info' | 'warning' | 'error'; title: string; message: string };
  action: string;
}> = {
  'empty-feed': {
    title: 'No articles in this category',
    description: 'We haven\'t published any articles in this category yet. Try browsing a different topic or adjusting your filters.',
    icon: '📭',
    alert: { variant: 'info', title: 'Empty category', message: 'Subscribe to be notified when new articles are published here.' },
    action: 'Browse all categories',
  },
  '404-article': {
    title: 'Article not found',
    description: 'The article you\'re looking for may have been removed, renamed, or is temporarily unavailable.',
    icon: '🔍',
    alert: { variant: 'warning', title: 'Article unavailable', message: 'This URL may have changed. Check our archive or search for the topic.' },
    action: 'Search the archive',
  },
  'network-error': {
    title: 'Connection problem',
    description: 'We couldn\'t load the news feed. Please check your internet connection and try again.',
    icon: '📡',
    alert: { variant: 'error', title: 'Network error', message: 'Failed to fetch articles. Our engineers have been notified.' },
    action: 'Try again',
  },
};

const VARIANT_OPTIONS = [
  { value: 'empty-feed', label: 'Empty feed' },
  { value: '404-article', label: '404 — Article not found' },
  { value: 'network-error', label: 'Network error' },
];

export function ErrorOrEmptyState({ className }: { className?: string }) {
  const [variant, setVariant] = useState<ErrorVariant>('empty-feed');
  const [retrying, setRetrying] = useState(false);

  const config = VARIANTS[variant];

  function handleAction() {
    if (variant === 'network-error') {
      setRetrying(true);
      setTimeout(() => setRetrying(false), 1500);
    }
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <Select
          id="error-variant"
          label="Select scenario to preview"
          options={VARIANT_OPTIONS}
          value={variant}
          onChange={(e) => setVariant(e.target.value as ErrorVariant)}
        />

        <AlertBanner
          variant={config.alert.variant}
          title={config.alert.title}
          message={config.alert.message}
          action={variant === 'network-error' ? { label: 'Retry', onClick: handleAction } : undefined}
          dismissible
        />

        <div className="rounded-xl border border-border bg-surface-raised p-6">
          <EmptyState
            title={config.title}
            description={config.description}
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAction}
                loading={retrying}
              >
                {config.action}
              </Button>
            }
          />
        </div>

        {retrying && (
          <div className="text-center">
            <span className="text-xs text-text-secondary animate-pulse">Connecting to server…</span>
          </div>
        )}
      </div>
    </div>
  );
}
