'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { TreeView, type TreeNode } from '@/modules/ui/TreeView';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { SearchBar } from '@/modules/ui/SearchBar';

export type BinNode = TreeNode & {
  capacity?: number;
  used?: number;
  sku?: string;
};

function filterTree(nodes: BinNode[], query: string): BinNode[] {
  if (!query) return nodes;
  return nodes.reduce<BinNode[]>((acc, node) => {
    const match = node.label.toLowerCase().includes(query.toLowerCase()) || node.sku?.toLowerCase().includes(query.toLowerCase());
    const filteredChildren = filterTree((node.children ?? []) as BinNode[], query);
    if (match || filteredChildren.length > 0) {
      acc.push({ ...node, children: filteredChildren });
    }
    return acc;
  }, []);
}

export function WarehouseBinView({
  bins,
  onSelectBin,
  className,
}: {
  bins: BinNode[];
  onSelectBin?: (id: string) => void;
  className?: string;
}) {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>();

  const filtered = filterTree(bins, search);

  function handleSelect(id: string) {
    setSelectedId(id);
    onSelectBin?.(id);
  }

  function findNode(nodes: BinNode[], id: string): BinNode | undefined {
    for (const n of nodes) {
      if (n.id === id) return n;
      const found = findNode((n.children ?? []) as BinNode[], id);
      if (found) return found;
    }
  }

  const selected = selectedId ? findNode(bins, selectedId) : undefined;
  const utilPct = selected?.capacity ? Math.round(((selected.used ?? 0) / selected.capacity) * 100) : null;

  return (
    <div className={cn('flex gap-4', className)}>
      <div className="flex-1 space-y-3 min-w-0">
        <SearchBar value={search} onChange={setSearch} placeholder="Search bins, SKUs…" />
        {filtered.length === 0 ? (
          <p className="text-sm text-text-secondary py-4 text-center">No bins match your search.</p>
        ) : (
          <TreeView nodes={filtered} selectedId={selectedId} onSelect={handleSelect} />
        )}
      </div>

      {selected && (
        <div className="w-56 shrink-0 space-y-2 border-l border-border pl-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-text-primary">{selected.label}</p>
            {selected.sku && <Badge variant="neutral" size="sm">{selected.sku}</Badge>}
          </div>
          {selected.capacity != null && (
            <Tooltip content={`${selected.used ?? 0} / ${selected.capacity} units`}>
              <div className="space-y-1 cursor-default">
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>Capacity</span>
                  <span>{utilPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-sunken overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', utilPct! > 90 ? 'bg-error' : utilPct! > 70 ? 'bg-warning' : 'bg-success')}
                    style={{ width: `${utilPct}%` }}
                  />
                </div>
              </div>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
}
