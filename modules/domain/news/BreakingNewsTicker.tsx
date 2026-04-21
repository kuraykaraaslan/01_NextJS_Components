'use client';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export type TickerItem = {
  id: string;
  text: string;
  timestamp: string;
};

const DEFAULT_ITEMS: TickerItem[] = [
  { id: '1', text: 'UN Security Council calls emergency session over escalating tensions in the Middle East', timestamp: '10:42 AM' },
  { id: '2', text: 'Federal Reserve Chair signals possible rate cut as inflation data improves', timestamp: '10:15 AM' },
  { id: '3', text: 'Major earthquake measuring 6.8 strikes off coast of Japan — tsunami warning issued', timestamp: '09:58 AM' },
  { id: '4', text: 'Apple unveils next-generation chip at surprise product event', timestamp: '09:30 AM' },
  { id: '5', text: 'European Parliament votes on landmark AI regulation bill', timestamp: '09:05 AM' },
];

export function BreakingNewsTicker({
  items = DEFAULT_ITEMS,
  className,
}: {
  items?: TickerItem[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="rounded-lg border border-error bg-error-subtle overflow-hidden">
        <div className="flex items-stretch">
          {/* LIVE badge column */}
          <div className="flex items-center justify-center bg-error px-3 py-2 shrink-0">
            <Badge variant="error" size="sm">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                LIVE
              </span>
            </Badge>
          </div>
          {/* BREAKING label */}
          <div className="flex items-center bg-error/80 px-3 py-2 shrink-0 border-r border-error/50">
            <span className="text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">Breaking</span>
          </div>
          {/* Scrolling area */}
          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center h-full py-2 px-4 overflow-x-auto gap-6 scrollbar-hide">
              {items.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-2 text-sm text-error-fg font-medium whitespace-nowrap shrink-0"
                >
                  <span className="text-xs text-error-fg/60 tabular-nums">{item.timestamp}</span>
                  {item.text}
                  <span className="text-error-fg/30 mx-1" aria-hidden="true">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom alert */}
        <div className="px-4 py-2 border-t border-error/30">
          <AlertBanner
            variant="error"
            message="Our reporters are on the ground providing real-time coverage. Refresh for the latest updates."
            className="!py-1.5 !text-xs"
          />
        </div>
      </div>
    </div>
  );
}
