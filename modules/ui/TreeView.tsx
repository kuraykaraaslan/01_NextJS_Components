'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

function TreeItem({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: TreeNode;
  depth: number;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = node.id === selectedId;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasChildren) setExpanded((v) => !v);
      else onSelect?.(node.id);
    }
    if (e.key === 'ArrowRight' && hasChildren && !expanded) setExpanded(true);
    if (e.key === 'ArrowLeft' && hasChildren && expanded) setExpanded(false);
  }

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? expanded : undefined}
      aria-selected={isSelected}
    >
      <div
        tabIndex={0}
        onClick={() => {
          if (hasChildren) setExpanded((v) => !v);
          else onSelect?.(node.id);
        }}
        onKeyDown={onKeyDown}
        style={{ paddingLeft: `${depth * 1.25}rem` }}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          'hover:bg-surface-overlay transition-colors',
          isSelected && 'bg-primary-subtle text-primary font-medium'
        )}
      >
        {hasChildren ? (
          <span aria-hidden="true" className="text-text-disabled w-3 shrink-0 flex items-center justify-center">
            <FontAwesomeIcon icon={expanded ? faChevronDown : faChevronRight} className="w-2.5 h-2.5" />
          </span>
        ) : (
          <span className="w-3 shrink-0" aria-hidden="true" />
        )}
        <span>{node.label}</span>
      </div>

      {hasChildren && expanded && (
        <ul role="group" className="ml-0">
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TreeView({
  nodes,
  selectedId,
  onSelect,
  label = 'Tree',
  className,
}: {
  nodes: TreeNode[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  label?: string;
  className?: string;
}) {
  return (
    <ul
      role="tree"
      aria-label={label}
      className={cn('space-y-0.5', className)}
    >
      {nodes.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
