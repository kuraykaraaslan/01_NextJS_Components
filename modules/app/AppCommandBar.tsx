'use client';
import { useState } from 'react';
import { Modal } from '@/modules/ui/Modal';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faUsers, faGear, faChartBar, faPlus, faEnvelope, faFileExport, faLock, faClock } from '@fortawesome/free-solid-svg-icons';

export type CommandItem = {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  category: string;
  onClick?: () => void;
};

const DEFAULT_COMMANDS: CommandItem[] = [
  { icon: <FontAwesomeIcon icon={faHouse} className="w-3.5 h-3.5" aria-hidden="true" />,      label: 'Go to Dashboard',  shortcut: 'G D', category: 'Navigation' },
  { icon: <FontAwesomeIcon icon={faFolder} className="w-3.5 h-3.5" aria-hidden="true" />,     label: 'Go to Projects',   shortcut: 'G P', category: 'Navigation' },
  { icon: <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" aria-hidden="true" />,      label: 'Go to Team',       shortcut: 'G T', category: 'Navigation' },
  { icon: <FontAwesomeIcon icon={faGear} className="w-3.5 h-3.5" aria-hidden="true" />,       label: 'Go to Settings',   shortcut: 'G S', category: 'Navigation' },
  { icon: <FontAwesomeIcon icon={faChartBar} className="w-3.5 h-3.5" aria-hidden="true" />,   label: 'Go to Analytics',  shortcut: 'G A', category: 'Navigation' },
  { icon: <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" aria-hidden="true" />,       label: 'New Project',      shortcut: '⌘N',  category: 'Actions' },
  { icon: <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" aria-hidden="true" />,   label: 'Send Invite',      shortcut: '⌘I',  category: 'Actions' },
  { icon: <FontAwesomeIcon icon={faFileExport} className="w-3.5 h-3.5" aria-hidden="true" />, label: 'Export Data',      shortcut: '⌘E',  category: 'Actions' },
  { icon: <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" aria-hidden="true" />,       label: 'Lock Screen',      shortcut: '⌘L',  category: 'Actions' },
  { icon: <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" aria-hidden="true" />,      label: 'Project Alpha',    category: 'Recent' },
  { icon: <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" aria-hidden="true" />,      label: 'Q3 Report',        category: 'Recent' },
  { icon: <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" aria-hidden="true" />,      label: 'Design Review',    category: 'Recent' },
];

type AppCommandBarProps = {
  items?: CommandItem[];
  onSelect?: (item: CommandItem) => void;
  trigger?: React.ReactNode;
  placeholder?: string;
};

export function AppCommandBar({
  items = DEFAULT_COMMANDS,
  onSelect,
  trigger,
  placeholder = 'Type a command or search…',
}: AppCommandBarProps) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');

  const categories = Array.from(new Set(items.map((c) => c.category)));

  const filtered = query.trim()
    ? items.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const grouped = categories
    .map((cat) => ({ category: cat, items: filtered.filter((c) => c.category === cat) }))
    .filter((g) => g.items.length > 0);

  function handleSelect(item: CommandItem) {
    item.onClick?.();
    onSelect?.(item);
    setOpen(false);
    setQuery('');
  }

  return (
    <>
      <div role="none" onClick={() => setOpen(true)}>
        {trigger ?? (
          <Button
            variant="outline"
            size="sm"
            iconRight={<Badge variant="neutral" size="sm">⌘K</Badge>}
          >
            Quick actions…
          </Button>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => { setOpen(false); setQuery(''); }}
        title="Command Palette"
        description="Search for actions, navigate, or run recent commands."
        size="lg"
        scrollable
      >
        <div className="space-y-4">
          <SearchBar
            id="command-bar-search"
            placeholder={placeholder}
            value={query}
            onChange={setQuery}
            onClear={() => setQuery('')}
          />

          <AlertBanner
            variant="info"
            message="Pro tip: Press ⌘K from anywhere to open this palette."
          />

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
                    onClick={() => handleSelect(cmd)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm text-text-primary hover:bg-surface-overlay transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    <span className="flex items-center gap-2">
                      {cmd.icon && <span aria-hidden="true">{cmd.icon}</span>}
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
