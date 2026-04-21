'use client';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { Select, type SelectOption } from '@/modules/ui/Select';
import { MultiSelect, type MultiSelectOption } from '@/modules/ui/MultiSelect';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import { TagInput } from '@/modules/ui/TagInput';

export type FilterField =
  | { type: 'select';      id: string; label: string; options: SelectOption[];      placeholder?: string }
  | { type: 'multiselect'; id: string; label: string; options: MultiSelectOption[]; placeholder?: string }
  | { type: 'daterange';   id: string; label: string }
  | { type: 'tags';        id: string; label: string; placeholder?: string };

export type FilterValues = Record<string, string | string[] | DateRange | null>;

export function FilterBar({
  fields,
  values,
  onChange,
  onApply,
  onReset,
  applyLabel = 'Apply',
  resetLabel = 'Reset',
  className,
}: {
  fields: FilterField[];
  values: FilterValues;
  onChange: (id: string, value: FilterValues[string]) => void;
  onApply?: () => void;
  onReset?: () => void;
  applyLabel?: string;
  resetLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-end gap-3 p-4 bg-surface-raised border border-border rounded-xl', className)}>
      {fields.map((f) => {
        if (f.type === 'select') {
          return (
            <div key={f.id} className="min-w-36 flex-1">
              <Select
                id={`filter-${f.id}`}
                label={f.label}
                options={f.options}
                placeholder={f.placeholder ?? 'All'}
                value={(values[f.id] as string) ?? ''}
                onChange={(e) => onChange(f.id, e.target.value)}
              />
            </div>
          );
        }
        if (f.type === 'multiselect') {
          return (
            <div key={f.id} className="min-w-44 flex-1">
              <MultiSelect
                id={`filter-${f.id}`}
                label={f.label}
                options={f.options}
                value={(values[f.id] as string[]) ?? []}
                onChange={(v) => onChange(f.id, v)}
                placeholder={f.placeholder ?? 'Any'}
              />
            </div>
          );
        }
        if (f.type === 'daterange') {
          return (
            <div key={f.id} className="min-w-56 flex-1">
              <DateRangePicker
                id={`filter-${f.id}`}
                label={f.label}
                value={(values[f.id] as DateRange) ?? { start: null, end: null }}
                onChange={(v) => onChange(f.id, v)}
              />
            </div>
          );
        }
        if (f.type === 'tags') {
          return (
            <div key={f.id} className="min-w-44 flex-1">
              <TagInput
                id={`filter-${f.id}`}
                label={f.label}
                value={(values[f.id] as string[]) ?? []}
                onChange={(v) => onChange(f.id, v)}
                placeholder={f.placeholder ?? 'Add tag…'}
              />
            </div>
          );
        }
        return null;
      })}

      <div className="flex items-center gap-2 shrink-0 self-end pb-0.5">
        {onReset && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            {resetLabel}
          </Button>
        )}
        {onApply && (
          <Button variant="primary" size="sm" onClick={onApply}>
            {applyLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
