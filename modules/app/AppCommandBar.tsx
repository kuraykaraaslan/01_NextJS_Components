'use client';
import { useState } from 'react';
import { Modal } from '@/modules/ui/Modal';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';

type CommandItem = {
  icon: string;
  label: string;
  shortcut?: string;
  category: string;
};

const ALL_COMMANDS: CommandItem[] = [
  // Navigation
  { icon: '🏠', label: 'Go to Dashboard',  shortcut: 'G D', category: 'Navigation' },
  { icon: '📁', label: 'Go to Projects',   shortcut: 'G P', category: 'Navigation' },
  { icon: '👥', label: 'Go to Team',       shortcut: 'G T', category: 'Navigation' },
  { icon: '⚙️', label: 'Go to Settings',   shortcut: 'G S', category: 'Navigation' },
  { icon: '📊', label: 'Go to Analytics',  shortcut: 'G A', category: 'Navigation' },
  // Actions
  { icon: '➕', label: 'New Project',      shortcut: '⌘N',  category: 'Actions' },
  { icon: '📧', label: 'Send Invite',      shortcut: '⌘I',  category: 'Actions' },
  { icon: '📤', label: 'Export Data',      shortcut: '⌘E',  category: 'Actions' },
  { icon: '🔒', label: 'Lock Screen',      shortcut: '⌘L',  category: 'Actions' },
  // Recent
  { icon: '🕐', label: 'Project Alpha',    category: 'Recent' },
  { icon: '🕑', label: 'Q3 Report',        category: 'Recent' },
  { icon: '🕒', label: 'Design Review',    category: 'Recent' },
];

const CATEGORIES = ['Navigation', 'Actions', 'Recent'];

export function AppCommandBar() {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? ALL_COMMANDS.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_COMMANDS;

  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: filtered.filter((c) => c.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        iconRight={<Badge variant="neutral" size="sm">⌘K</Badge>}
      >
        Quick actions…
      </Button>

      <Modal
        open={open}
        onClose={() => { setOpen(false); setQuery(''); }}
        title="Command Palette"
        description="Search for actions, navigate, or run recent commands."
        size="lg"
        scrollable
      >
        <div className="space-y-4">
          {/* Search */}
          <SearchBar
            id="command-bar-search"
            placeholder="Type a command or search…"
            value={query}
            onChange={setQuery}
            onClear={() => setQuery('')}
          />

          {/* Pro tip */}
          <AlertBanner
            variant="info"
            message="Pro tip: Press ⌘K from anywhere to open this palette."
          />

          {/* Commands */}
          {grouped.length === 0 && (
            <p className="text-sm text-text-secondary text-center py-4">
              No commands found for &quot;{query}&quot;
            </p>
          )}

          {grouped.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="neutral" size="sm">{group.category}</Badge>
              </div>
              <div className="space-y-0.5">
                {group.items.map((cmd) => (
                  <button
                    key={cmd.label}
                    type="button"
                    onClick={() => setOpen(false)}
                    className="
                      w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm
                      text-text-primary hover:bg-surface-overlay transition-colors
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus
                    "
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{cmd.icon}</span>
                      {cmd.label}
                    </span>
                    {cmd.shortcut && (
                      <Badge variant="neutral" size="sm">{cmd.shortcut}</Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
