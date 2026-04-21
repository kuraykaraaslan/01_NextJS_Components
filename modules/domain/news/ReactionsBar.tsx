'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';

type Reaction = {
  emoji: string;
  label: string;
  count: number;
};

const DEFAULT_REACTIONS: Reaction[] = [
  { emoji: '👍', label: 'Helpful', count: 1247 },
  { emoji: '❤️', label: 'Love this', count: 893 },
  { emoji: '😮', label: 'Surprising', count: 456 },
  { emoji: '😢', label: 'Saddening', count: 234 },
];

export function ReactionsBar({
  reactions: initialReactions = DEFAULT_REACTIONS,
  className,
}: {
  reactions?: Reaction[];
  className?: string;
}) {
  const [reactions, setReactions] = useState(initialReactions);
  const [selected, setSelected] = useState<number | null>(null);

  function handleReact(idx: number) {
    setReactions((prev) =>
      prev.map((r, i) => {
        if (i === idx) return { ...r, count: selected === idx ? r.count - 1 : r.count + 1 };
        if (i === selected) return { ...r, count: r.count - 1 };
        return r;
      })
    );
    setSelected(selected === idx ? null : idx);
  }

  const total = reactions.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className={className}>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs text-text-disabled shrink-0">React:</span>
        <div className="flex flex-wrap gap-2">
          {reactions.map((r, i) => (
            <Tooltip key={i} content={r.label}>
              <button
                onClick={() => handleReact(i)}
                aria-pressed={selected === i}
                aria-label={`${r.label}: ${r.count} reactions`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                  selected === i
                    ? 'bg-primary/10 border-primary text-primary shadow-sm scale-105'
                    : 'bg-surface-overlay border-border hover:bg-surface-sunken'
                }`}
              >
                <span aria-hidden="true">{r.emoji}</span>
                <Badge
                  variant={selected === i ? 'info' : 'neutral'}
                  size="sm"
                >
                  {r.count.toLocaleString()}
                </Badge>
              </button>
            </Tooltip>
          ))}
        </div>
        <span className="text-xs text-text-disabled">
          {total.toLocaleString()} total reactions
        </span>
      </div>
    </div>
  );
}
