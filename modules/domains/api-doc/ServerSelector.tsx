'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/modules/ui/Badge';
import type { ApiServer } from './types';

const environmentVariant: Record<string, 'success' | 'warning' | 'info' | 'neutral' | 'error'> = {
  production:  'success',
  staging:     'warning',
  development: 'info',
  sandbox:     'neutral',
};

type Props = {
  servers: ApiServer[];
  value?: string;
  onChange?: (serverId: string, server: ApiServer) => void;
  className?: string;
};

export function ServerSelector({ servers, value, onChange, className }: Props) {
  const [selected, setSelected] = useState<string>(value ?? servers[0]?.serverId ?? '');
  const [open, setOpen] = useState(false);

  const active = servers.find((s) => s.serverId === selected) ?? servers[0];

  function select(server: ApiServer) {
    setSelected(server.serverId);
    onChange?.(server.serverId, server);
    setOpen(false);
  }

  if (!servers.length) return null;

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex items-center gap-2 w-full rounded-lg border border-border bg-surface-raised px-3 py-2',
          'text-sm text-text-primary hover:border-border-strong transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        )}
      >
        <FontAwesomeIcon icon={faServer} className="w-3.5 h-3.5 text-text-disabled shrink-0" aria-hidden="true" />
        <span className="flex-1 truncate text-left font-mono text-xs">{active?.url}</span>
        {active?.environment && (
          <Badge variant={environmentVariant[active.environment] ?? 'neutral'} size="sm">
            {active.environment}
          </Badge>
        )}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn('w-3 h-3 text-text-disabled shrink-0 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul
            role="listbox"
            className={cn(
              'absolute z-20 mt-1 w-full rounded-lg border border-border bg-surface-raised shadow-lg',
              'py-1 max-h-60 overflow-auto',
            )}
          >
            {servers.map((server) => (
              <li
                key={server.serverId}
                role="option"
                aria-selected={server.serverId === selected}
                onClick={() => select(server)}
                className={cn(
                  'flex items-start gap-2 px-3 py-2 cursor-pointer text-sm',
                  'hover:bg-surface-overlay transition-colors',
                  server.serverId === selected && 'bg-primary-subtle',
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-text-primary truncate">{server.url}</p>
                  {server.description && (
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{server.description}</p>
                  )}
                </div>
                {server.environment && (
                  <Badge variant={environmentVariant[server.environment] ?? 'neutral'} size="sm" className="shrink-0 mt-0.5">
                    {server.environment}
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
