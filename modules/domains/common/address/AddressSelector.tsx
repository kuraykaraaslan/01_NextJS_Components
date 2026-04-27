'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { AddressCard } from './AddressCard';
import { cn } from '@/libs/utils/cn';
import type { Address } from '../AddressTypes';

type AddressSelectorProps = {
  addresses: Address[];
  selectedIndex?: number;
  onSelect: (index: number, address: Address) => void;
  onAdd?: () => void;
  onEdit?: (index: number, address: Address) => void;
  onDelete?: (index: number, address: Address) => void;
  className?: string;
};

export function AddressSelector({
  addresses,
  selectedIndex,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  className,
}: AddressSelectorProps) {
  const [active, setActive] = useState<number | undefined>(selectedIndex);

  function handleSelect(i: number) {
    setActive(i);
    onSelect(i, addresses[i]);
  }

  return (
    <fieldset className={cn('space-y-3', className)}>
      <legend className="sr-only">Select delivery address</legend>

      {addresses.length === 0 ? (
        <p className="text-sm text-text-secondary py-4 text-center">No saved addresses.</p>
      ) : (
        <div className="space-y-2">
          {addresses.map((addr, i) => (
            <label
              key={i}
              className={cn(
                'block cursor-pointer rounded-lg',
                'focus-within:ring-2 focus-within:ring-border-focus',
              )}
            >
              <input
                type="radio"
                name="address-selector"
                value={String(i)}
                checked={active === i}
                onChange={() => handleSelect(i)}
                className="sr-only"
              />
              <AddressCard
                address={addr}
                selected={active === i}
                onEdit={onEdit ? () => onEdit(i, addr) : undefined}
                onDelete={onDelete ? () => onDelete(i, addr) : undefined}
              />
            </label>
          ))}
        </div>
      )}

      {onAdd && (
        <Button variant="outline" size="sm" onClick={onAdd} className="w-full">
          + Add new address
        </Button>
      )}
    </fieldset>
  );
}
