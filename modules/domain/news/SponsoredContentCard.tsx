'use client';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';

export function SponsoredContentCard({
  sponsorName = 'GreenTech Solutions',
  title = 'How Renewable Energy Is Reshaping the Global Supply Chain',
  summary = 'Leading enterprises are discovering that sustainability isn\'t just good for the planet — it\'s a competitive advantage that drives measurable ROI.',
  category = 'Energy',
  readTime = '4 min',
  imageColor = 'from-green-400 to-teal-600',
  className,
}: {
  sponsorName?: string;
  title?: string;
  summary?: string;
  category?: string;
  readTime?: string;
  imageColor?: string;
  className?: string;
}) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className={`h-36 bg-gradient-to-br ${imageColor} flex items-center justify-center relative`}>
        <span className="text-white/30 text-5xl font-bold">S</span>
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant="warning" size="sm">Sponsored</Badge>
          <Tooltip content="This is paid content from a sponsor. It has been clearly labeled to distinguish it from editorial journalism. Our sponsors do not influence our reporting.">
            <button
              aria-label="What is sponsored content?"
              className="w-4 h-4 rounded-full bg-black/30 text-white text-xs flex items-center justify-center hover:bg-black/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ?
            </button>
          </Tooltip>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="text-xs text-white/70 bg-black/30 px-2 py-0.5 rounded">
            By {sponsorName}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="neutral" size="sm">{category}</Badge>
          <span className="text-xs text-text-disabled">{readTime} read</span>
        </div>
        <h4 className="text-sm font-semibold text-text-primary leading-snug">{title}</h4>
        <p className="text-xs text-text-secondary leading-relaxed">{summary}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-text-disabled">Presented by {sponsorName}</span>
          <button className="text-xs text-primary hover:underline focus-visible:outline-none">
            Read more →
          </button>
        </div>
      </div>
    </Card>
  );
}
