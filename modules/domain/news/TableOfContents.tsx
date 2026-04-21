'use client';
import { useState } from 'react';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';

type Section = {
  id: string;
  title: string;
  level: 1 | 2 | 3;
  estimated: string;
};

const DEFAULT_SECTIONS: Section[] = [
  { id: 's1', title: 'Opening: A Historic Night in Geneva', level: 1, estimated: '1 min' },
  { id: 's2', title: 'Background: Why This Summit Was Different', level: 2, estimated: '2 min' },
  { id: 's3', title: 'The 60% Commitment: What It Really Means', level: 1, estimated: '3 min' },
  { id: 's4', title: 'The Finance Deal: Breaking Down $500B', level: 1, estimated: '2 min' },
  { id: 's4a', title: 'US-China Bilateral Guarantee', level: 2, estimated: '1 min' },
  { id: 's4b', title: 'Disbursement Mechanisms', level: 2, estimated: '1 min' },
  { id: 's5', title: 'The Ratchet Mechanism Explained', level: 1, estimated: '2 min' },
  { id: 's6', title: 'Critics and Skeptics', level: 1, estimated: '2 min' },
  { id: 's7', title: 'What Happens Next', level: 1, estimated: '1 min' },
];

export function TableOfContents({
  sections = DEFAULT_SECTIONS,
  className,
}: {
  sections?: Section[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState('s1');

  const readCount = sections.findIndex((s) => s.id === activeId) + 1;

  return (
    <div className={className}>
      <TabGroup
        label="Table of contents"
        tabs={[
          {
            id: 'toc',
            label: 'Contents',
            badge: <Badge variant="neutral" size="sm">{sections.length}</Badge>,
            content: (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-text-secondary">
                    <span className="font-semibold text-text-primary">{readCount}</span> / {sections.length} sections
                  </span>
                  <Badge variant={readCount === sections.length ? 'success' : 'info'} size="sm">
                    {readCount === sections.length ? '✓ Complete' : `${Math.round((readCount / sections.length) * 100)}% read`}
                  </Badge>
                </div>
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all ${
                      activeId === section.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-surface-overlay border border-transparent'
                    }`}
                    style={{ paddingLeft: section.level === 1 ? '0.75rem' : section.level === 2 ? '1.5rem' : '2.25rem' }}
                    onClick={() => setActiveId(section.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveId(section.id)}
                    aria-current={activeId === section.id ? 'true' : undefined}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {activeId === section.id && (
                        <span className="w-1 h-4 rounded-full bg-primary shrink-0" aria-hidden="true" />
                      )}
                      <span className={`text-xs font-medium truncate ${activeId === section.id ? 'text-primary font-semibold' : 'text-text-primary'}`}>
                        {section.title}
                      </span>
                    </div>
                    <span className="text-xs text-text-disabled shrink-0">{section.estimated}</span>
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: 'jump',
            label: 'Jump to',
            content: (
              <div className="grid grid-cols-1 gap-2">
                {sections.filter((s) => s.level === 1).map((section) => (
                  <Button
                    key={section.id}
                    variant={activeId === section.id ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveId(section.id)}
                  >
                    {section.title}
                  </Button>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
