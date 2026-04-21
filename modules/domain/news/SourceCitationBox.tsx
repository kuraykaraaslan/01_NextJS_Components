'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

type Citation = {
  id: string;
  publisher: string;
  title: string;
  url: string;
  publishedAt: string;
  credibility: 'high' | 'medium' | 'low';
};

const DEFAULT_CITATIONS: Citation[] = [
  { id: '1', publisher: 'United Nations', title: 'Full text of the Geneva Carbon Accord (2026)', url: 'https://un.org/climateaccord2026', publishedAt: 'Apr 21, 2026', credibility: 'high' },
  { id: '2', publisher: 'IPCC', title: '6th Assessment Report — Synthesis Summary', url: 'https://ipcc.ch/ar6/syr', publishedAt: 'Mar 2023', credibility: 'high' },
  { id: '3', publisher: 'Bloomberg', title: 'How the US-China Finance Deal Was Brokered', url: 'https://bloomberg.com/news/climate-deal-2026', publishedAt: 'Apr 21, 2026', credibility: 'high' },
  { id: '4', publisher: 'Carbon Brief', title: 'Analysis: Is 60% By 2040 Actually Achievable?', url: 'https://carbonbrief.org/analysis-geneva-accord', publishedAt: 'Apr 21, 2026', credibility: 'medium' },
];

const credVariant: Record<string, 'success' | 'warning' | 'error'> = {
  high: 'success',
  medium: 'warning',
  low: 'error',
};

export function SourceCitationBox({
  citations = DEFAULT_CITATIONS,
  className,
}: {
  citations?: Citation[];
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">Sources & Citations</span>
            <Badge variant="neutral" size="sm">{citations.length}</Badge>
          </div>
          <span className="text-text-secondary text-sm">{expanded ? '▲' : '▼'}</span>
        </button>

        {expanded && (
          <div className="border-t border-border divide-y divide-border">
            {citations.map((cite, i) => (
              <div key={cite.id} className="px-4 py-3 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-text-disabled font-mono">[{i + 1}]</span>
                    <span className="text-xs font-semibold text-text-primary">{cite.publisher}</span>
                    <Tooltip content={`Credibility rating: ${cite.credibility} — based on editorial standards and fact-checking practices`}>
                      <span>
                        <Badge variant={credVariant[cite.credibility]} size="sm">
                          {cite.credibility === 'high' ? '✓ High credibility' : cite.credibility === 'medium' ? '~ Medium' : '⚠ Low'}
                        </Badge>
                      </span>
                    </Tooltip>
                  </div>
                  <span className="text-xs text-text-disabled shrink-0">{cite.publishedAt}</span>
                </div>
                <Card className="!bg-surface-sunken px-3 py-2">
                  <p className="text-xs font-medium text-text-primary mb-1">{cite.title}</p>
                  <Tooltip content={`Full URL: ${cite.url}`}>
                    <a
                      href={cite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline underline-offset-2 hover:opacity-70 transition-opacity truncate block max-w-full"
                    >
                      {cite.url}
                    </a>
                  </Tooltip>
                </Card>
              </div>
            ))}
            <div className="px-4 py-3">
              <Button variant="ghost" size="sm">Download citations (.bib)</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
