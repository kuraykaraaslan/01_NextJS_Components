'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu, type DropdownItem } from '@/modules/ui/DropdownMenu';
import { ComboBox, type ComboBoxOption } from '@/modules/ui/ComboBox';

export type Beneficiary = {
  id: string;
  name: string;
  accountMask: string;
  bank?: string;
  avatar?: string;
  trusted?: boolean;
};

export function BeneficiaryPicker({
  beneficiaries,
  selectedId,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  className,
}: {
  beneficiaries: Beneficiary[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}) {
  const options: ComboBoxOption[] = beneficiaries.map((b) => ({
    value: b.id,
    label: `${b.name} – ${b.accountMask}`,
  }));

  const selected = beneficiaries.find((b) => b.id === selectedId);

  function menuFor(b: Beneficiary): DropdownItem[] {
    return [
      ...(onEdit   ? [{ label: 'Edit',   icon: '✏', onClick: () => onEdit(b.id)   }] : []),
      ...(onDelete ? [{ label: 'Delete', icon: '🗑', danger: true, onClick: () => onDelete(b.id) }] : []),
    ];
  }

  return (
    <div className={cn('space-y-4', className)}>
      <ComboBox
        id="beneficiary-pick"
        label="Select beneficiary"
        options={options}
        value={selectedId ?? ''}
        onChange={onSelect}
        placeholder="Search by name or account…"
      />

      {selected && (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface-raised">
          <Avatar src={selected.avatar} name={selected.name} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-text-primary">{selected.name}</p>
              {selected.trusted && <Badge variant="success" size="sm">Trusted</Badge>}
            </div>
            <p className="text-xs text-text-secondary font-mono">{selected.accountMask}</p>
            {selected.bank && <p className="text-xs text-text-disabled">{selected.bank}</p>}
          </div>
          {(onEdit || onDelete) && (
            <DropdownMenu
              trigger={
                <button type="button" className="p-1.5 rounded hover:bg-surface-overlay text-text-secondary transition-colors" aria-label="Options">
                  ⋮
                </button>
              }
              items={menuFor(selected)}
              align="right"
            />
          )}
        </div>
      )}

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-dashed border-border text-sm text-text-secondary hover:bg-surface-overlay hover:text-text-primary transition-colors"
        >
          <span>+</span> Add new beneficiary
        </button>
      )}
    </div>
  );
}
