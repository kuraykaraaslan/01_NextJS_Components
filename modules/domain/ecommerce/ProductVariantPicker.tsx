'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';
import { Select, type SelectOption } from '@/modules/ui/Select';
import { MultiSelect, type MultiSelectOption } from '@/modules/ui/MultiSelect';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { TagInput } from '@/modules/ui/TagInput';

export type VariantConfig =
  | { type: 'select';      id: string; label: string; options: SelectOption[] }
  | { type: 'multiselect'; id: string; label: string; options: MultiSelectOption[] }
  | { type: 'buttons';     id: string; label: string; options: ButtonGroupItem[] }
  | { type: 'tags';        id: string; label: string; placeholder?: string };

export type VariantValues = Record<string, string | string[]>;

export function ProductVariantPicker({
  variants,
  values,
  onChange,
  className,
}: {
  variants: VariantConfig[];
  values: VariantValues;
  onChange: (id: string, value: string | string[]) => void;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {variants.map((v) => {
        if (v.type === 'select') {
          return (
            <Select
              key={v.id}
              id={v.id}
              label={v.label}
              options={v.options}
              value={(values[v.id] as string) ?? ''}
              onChange={(e) => onChange(v.id, e.target.value)}
            />
          );
        }
        if (v.type === 'multiselect') {
          return (
            <MultiSelect
              key={v.id}
              id={v.id}
              label={v.label}
              options={v.options}
              value={(values[v.id] as string[]) ?? []}
              onChange={(val) => onChange(v.id, val)}
            />
          );
        }
        if (v.type === 'buttons') {
          return (
            <div key={v.id} className="space-y-1.5">
              <p className="text-sm font-medium text-text-primary">{v.label}</p>
              <ButtonGroup
                items={v.options}
                value={(values[v.id] as string) ?? ''}
                onChange={(val) => onChange(v.id, val)}
                variant="outline"
                size="sm"
              />
            </div>
          );
        }
        if (v.type === 'tags') {
          return (
            <TagInput
              key={v.id}
              id={v.id}
              label={v.label}
              placeholder={v.placeholder}
              value={(values[v.id] as string[]) ?? []}
              onChange={(val) => onChange(v.id, val)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
