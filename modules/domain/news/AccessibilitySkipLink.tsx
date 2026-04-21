'use client';
import { useState } from 'react';
import { SkipLink, LiveRegion } from '@/modules/ui/SkipLink';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Badge } from '@/modules/ui/Badge';

export function AccessibilitySkipLink({ className }: { className?: string }) {
  const [announcement, setAnnouncement] = useState('');
  const [count, setCount] = useState(0);

  function triggerAnnouncement() {
    const msgs = [
      'Navigation menu opened',
      'Article content loaded',
      'Comment section activated',
      '5 new updates available',
    ];
    setAnnouncement(msgs[count % msgs.length]);
    setCount((c) => c + 1);
  }

  return (
    <div className={`relative ${className}`}>
      {/* SkipLink renders as sr-only until focused */}
      <SkipLink href="#main-content" label="Skip to main content" />
      <SkipLink href="#navigation" label="Skip to navigation" />

      {/* LiveRegion for announcements */}
      <LiveRegion message={announcement} politeness="polite" />

      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-bold text-text-primary">Accessibility Features</h3>
          <Badge variant="success" size="sm">WCAG 2.1 AA</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-surface-overlay border border-border">
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">Skip Navigation Links</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Hidden skip links appear when focused (Tab key). Try pressing Tab on this page to see them.
              </p>
            </div>
            <Tooltip content="Skip links allow keyboard and screen reader users to bypass repetitive navigation and jump directly to main content. Required for WCAG 2.4.1 bypass blocks criterion.">
              <span>
                <Badge variant="info" size="sm">WCAG 2.4.1</Badge>
              </span>
            </Tooltip>
          </div>

          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-surface-overlay border border-border">
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">Live Region Announcer</p>
              <p className="text-xs text-text-secondary mt-0.5">
                Dynamic content changes are announced to screen readers via ARIA live regions.
                {announcement && (
                  <span className="ml-1 text-primary font-medium">Last: &ldquo;{announcement}&rdquo;</span>
                )}
              </p>
            </div>
            <Tooltip content="ARIA live regions notify assistive technology users of content changes without requiring focus. aria-live='polite' waits for the user to finish before announcing.">
              <span>
                <Badge variant="info" size="sm">aria-live</Badge>
              </span>
            </Tooltip>
          </div>

          <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-surface-overlay border border-border">
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary">Keyboard Navigation</p>
              <p className="text-xs text-text-secondary mt-0.5">
                All interactive elements are reachable and operable via keyboard alone.
              </p>
            </div>
            <Tooltip content="All focusable elements have visible focus indicators and logical tab order, meeting WCAG 2.4.3 and 2.4.7 criteria.">
              <span>
                <Badge variant="info" size="sm">WCAG 2.4.3</Badge>
              </span>
            </Tooltip>
          </div>
        </div>

        <button
          onClick={triggerAnnouncement}
          className="w-full py-2.5 px-4 rounded-lg border border-border bg-surface-overlay hover:bg-surface-sunken text-sm text-text-primary font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Trigger live announcement ({count} fired)
        </button>

        <p className="text-xs text-text-disabled">
          Open your screen reader or browser accessibility tree to observe the live region announcements.
        </p>
      </div>
    </div>
  );
}
