'use client';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { Select, type SelectOption } from '@/modules/ui/Select';
import { MultiSelect, type MultiSelectOption } from '@/modules/ui/MultiSelect';
import { Checkbox } from '@/modules/ui/Checkbox';
import { RadioGroup } from '@/modules/ui/RadioGroup';
import { Toggle } from '@/modules/ui/Toggle';
import { DatePicker } from '@/modules/ui/DatePicker';
import { TimePicker } from '@/modules/ui/DateRangePicker';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export type FormField =
  | { type: 'text' | 'email' | 'password' | 'number' | 'url'; id: string; label: string; placeholder?: string; hint?: string; required?: boolean }
  | { type: 'textarea';     id: string; label: string; placeholder?: string; hint?: string; required?: boolean; rows?: number }
  | { type: 'select';       id: string; label: string; options: SelectOption[];       placeholder?: string; hint?: string; required?: boolean }
  | { type: 'multiselect';  id: string; label: string; options: MultiSelectOption[]; placeholder?: string; hint?: string }
  | { type: 'checkbox';     id: string; label: string; hint?: string }
  | { type: 'radio';        id: string; label: string; options: { value: string; label: string }[]; hint?: string }
  | { type: 'toggle';       id: string; label: string; description?: string }
  | { type: 'date';         id: string; label: string; hint?: string; required?: boolean }
  | { type: 'time';         id: string; label: string; hint?: string; required?: boolean }
  | { type: 'divider';      label?: string }
  | { type: 'section';      label: string; description?: string };

export type FormValues = Record<string, unknown>;
export type FormErrors = Record<string, string>;

export function CreateEditForm({
  title,
  fields,
  values,
  errors = {},
  onChange,
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  submitError,
  columns = 1,
  className,
}: {
  title?: string;
  fields: FormField[];
  values: FormValues;
  errors?: FormErrors;
  onChange: (id: string, value: unknown) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  submitError?: string;
  columns?: 1 | 2;
  className?: string;
}) {
  function renderField(field: FormField) {
    if (field.type === 'divider') {
      return (
        <div className={cn('col-span-full', field.label ? 'flex items-center gap-3' : '')}>
          {field.label && <p className="text-xs font-semibold text-text-disabled uppercase tracking-wider whitespace-nowrap">{field.label}</p>}
          <div className="flex-1 h-px bg-border" />
        </div>
      );
    }
    if (field.type === 'section') {
      return (
        <div className="col-span-full space-y-0.5 pt-2">
          <p className="text-sm font-semibold text-text-primary">{field.label}</p>
          {field.description && <p className="text-xs text-text-secondary">{field.description}</p>}
        </div>
      );
    }
    if (field.type === 'textarea') {
      return (
        <div className={columns === 2 ? 'col-span-full' : ''}>
          <Textarea
            id={field.id}
            label={field.label}
            placeholder={field.placeholder}
            hint={field.hint}
            error={errors[field.id]}
            required={field.required}
            rows={field.rows}
            value={(values[field.id] as string) ?? ''}
            onChange={(e) => onChange(field.id, e.target.value)}
          />
        </div>
      );
    }
    if (field.type === 'select') {
      return (
        <Select
          id={field.id}
          label={field.label}
          options={field.options}
          placeholder={field.placeholder}
          hint={field.hint}
          error={errors[field.id]}
          required={field.required}
          value={(values[field.id] as string) ?? ''}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      );
    }
    if (field.type === 'multiselect') {
      return (
        <MultiSelect
          id={field.id}
          label={field.label}
          options={field.options}
          placeholder={field.placeholder}
          hint={field.hint}
          error={errors[field.id]}
          value={(values[field.id] as string[]) ?? []}
          onChange={(v) => onChange(field.id, v)}
        />
      );
    }
    if (field.type === 'checkbox') {
      return (
        <Checkbox
          id={field.id}
          label={field.label}
          hint={field.hint}
          error={errors[field.id]}
          checked={!!(values[field.id])}
          onChange={(e) => onChange(field.id, e.target.checked)}
        />
      );
    }
    if (field.type === 'radio') {
      return (
        <div className={columns === 2 ? 'col-span-full' : ''}>
          <RadioGroup
            name={field.id}
            legend={field.label}
            error={errors[field.id]}
            options={field.options}
            value={(values[field.id] as string) ?? ''}
            onChange={(v) => onChange(field.id, v)}
          />
        </div>
      );
    }
    if (field.type === 'toggle') {
      return (
        <Toggle
          id={field.id}
          label={field.label}
          description={field.description}
          checked={!!(values[field.id])}
          onChange={(v) => onChange(field.id, v)}
        />
      );
    }
    if (field.type === 'date') {
      return (
        <DatePicker
          id={field.id}
          label={field.label}
          hint={field.hint}
          error={errors[field.id]}
          required={field.required}
          value={(values[field.id] as Date | null) ?? null}
          onChange={(v) => onChange(field.id, v)}
        />
      );
    }
    if (field.type === 'time') {
      return (
        <TimePicker
          id={field.id}
          label={field.label}
          hint={field.hint}
          error={errors[field.id]}
          required={field.required}
          value={(values[field.id] as string) ?? ''}
          onChange={(v) => onChange(field.id, v)}
        />
      );
    }
    return (
      <Input
        id={field.id}
        label={field.label}
        type={field.type}
        placeholder={field.placeholder}
        hint={field.hint}
        error={errors[field.id]}
        required={field.required}
        value={(values[field.id] as string) ?? ''}
        onChange={(e) => onChange(field.id, e.target.value)}
      />
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      )}

      {submitError && (
        <AlertBanner variant="error" message={submitError} />
      )}

      <div className={cn(
        'grid gap-4',
        columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1'
      )}>
        {fields.map((f, i) => (
          <div key={f.type === 'divider' ? `div-${i}` : (f as { id?: string }).id ?? i}>
            {renderField(f)}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
        )}
        <Button variant="primary" onClick={onSubmit} loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
