'use client';
import { useState } from 'react';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { cn } from '@/libs/utils/cn';

type Reaction = {
  emoji: string;
  label: string;
  count: number;
  users: string[];
};

const DEFAULT_REACTIONS: Reaction[] = [
  { emoji: '👍', label: 'Like', count: 42, users: ['Alice', 'Bob', 'Carol', '39 others'] },
  { emoji: '❤️', label: 'Love', count: 17, users: ['David', 'Emma', '15 others'] },
  { emoji: '😂', label: 'Haha', count: 8, users: ['Frank', 'Grace', '6 others'] },
  { emoji: '😮', label: 'Wow', count: 5, users: ['Henry', '4 others'] },
  { emoji: '😢', label: 'Sad', count: 2, users: ['Iris', 'Jack'] },
];

export function ForumReactionBar() {
  const [reactions, setReactions] = useState<Reaction[]>(DEFAULT_REACTIONS);
  const [myReactions, setMyReactions] = useState<Set<string>>(new Set());

  function toggle(emoji: string) {
    const mine = myReactions.has(emoji);
    setMyReactions((prev) => {
      const next = new Set(prev);
      mine ? next.delete(emoji) : next.add(emoji);
      return next;
    });
    setReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji ? { ...r, count: mine ? r.count - 1 : r.count + 1 } : r
      )
    );
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {reactions.map((r) => {
        const active = myReactions.has(r.emoji);
        return (
          <Tooltip key={r.emoji} content={r.users.join(', ')}>
            <button
              type="button"
              onClick={() => toggle(r.emoji)}
              aria-label={`${r.label}: ${r.count} reactions`}
              aria-pressed={active}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                active
                  ? 'bg-primary text-primary-fg border-primary'
                  : 'bg-surface-base border-border text-text-primary hover:bg-surface-overlay'
              )}
            >
              <span>{r.emoji}</span>
              <Badge variant={active ? 'primary' : 'neutral'} size="sm">{r.count}</Badge>
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
