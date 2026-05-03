'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/modules/ui/Badge';
import { EndpointRow } from './EndpointRow';
import type { ApiTag, PathItem } from './types';

type TaggedPath = {
  pathItem: PathItem;
};

type Props = {
  tag: ApiTag;
  paths: TaggedPath[];
  defaultOpen?: boolean;
  className?: string;
};

export function ApiTagSection({ tag, paths, defaultOpen = true, className }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const totalOps = paths.reduce((acc, { pathItem }) => acc + (pathItem.operations?.length ?? 0), 0);

  return (
    <section className={cn('rounded-xl border border-border overflow-hidden', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center gap-3 px-5 py-4 text-left',
          'bg-surface-raised hover:bg-surface-overlay transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          open && 'border-b border-border',
        )}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className={cn('w-4 h-4 text-text-disabled shrink-0 transition-transform', !open && '-rotate-90')}
          aria-hidden="true"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text-primary">{tag.name}</h3>
            <Badge variant="neutral" size="sm">{totalOps}</Badge>
          </div>
          {tag.description && (
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{tag.description}</p>
          )}
        </div>

        {tag.externalDocs && (
          <a
            href={tag.externalDocs.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
            aria-label={`External docs for ${tag.name}`}
          >
            Docs
            <FontAwesomeIcon icon={faExternalLink} className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
      </button>

      {open && (
        <div className="p-4 space-y-2 bg-surface-base">
          {paths.flatMap(({ pathItem }) =>
            (pathItem.operations ?? []).map((op) => (
              <EndpointRow
                key={op.operationId}
                path={pathItem.path}
                operation={op}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}
