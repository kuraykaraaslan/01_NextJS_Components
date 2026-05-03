'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { SchemaObject } from './types';

const TYPE_COLORS: Record<string, string> = {
  string:  'text-green-600 dark:text-green-400',
  number:  'text-blue-600 dark:text-blue-400',
  integer: 'text-blue-600 dark:text-blue-400',
  boolean: 'text-purple-600 dark:text-purple-400',
  array:   'text-orange-600 dark:text-orange-400',
  object:  'text-yellow-600 dark:text-yellow-400',
  null:    'text-text-disabled',
};

type SchemaNodeProps = {
  name?: string;
  schema: SchemaObject;
  required?: boolean;
  depth?: number;
  defaultOpen?: boolean;
};

function $refName(ref?: string | null): string | undefined {
  if (!ref) return undefined;
  return ref.split('/').pop();
}

function Pill({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'warn' }) {
  return (
    <span className={cn(
      'inline-block rounded px-1.5 py-0.5 text-[10px] font-medium border',
      variant === 'warn'
        ? 'bg-warning-subtle text-warning border-warning/30'
        : 'bg-surface-overlay text-text-disabled border-border',
    )}>
      {children}
    </span>
  );
}

function SchemaNode({ name, schema, required = false, depth = 0, defaultOpen = true }: SchemaNodeProps) {
  const [open, setOpen] = useState(defaultOpen || depth === 0);

  const type = schema.type ?? (schema.properties ? 'object' : schema.items ? 'array' : undefined);
  const typeLabel = schema.enum ? 'enum' : (type ?? ($refName(schema.$ref) ?? '?'));
  const typeColor = TYPE_COLORS[type ?? ''] ?? 'text-text-secondary';

  const hasChildren = (type === 'object' && schema.properties) || (type === 'array' && schema.items);
  const enumValues = schema.enum as unknown[] | undefined;

  return (
    <div className={cn('text-sm', depth > 0 && 'ml-4 border-l border-border pl-3')}>
      <div
        className={cn(
          'flex flex-wrap items-start gap-x-2 gap-y-0.5 py-1',
          hasChildren && 'cursor-pointer select-none',
        )}
        onClick={hasChildren ? () => setOpen(o => !o) : undefined}
      >
        {hasChildren ? (
          <FontAwesomeIcon
            icon={open ? faChevronDown : faChevronRight}
            className="mt-0.5 w-3 h-3 text-text-disabled shrink-0"
            aria-hidden="true"
          />
        ) : (
          <span className="w-3 shrink-0" />
        )}

        {name && (
          <span className="font-mono font-semibold text-text-primary">
            {name}
            {required && <span className="ml-0.5 text-error" title="required">*</span>}
          </span>
        )}

        <span className={cn('font-mono text-xs', typeColor)}>
          {typeLabel}
          {schema.format && <span className="text-text-disabled ml-0.5">({schema.format})</span>}
          {type === 'array' && schema.items && (
            <span className="text-text-disabled">
              {'['}
              <span className={TYPE_COLORS[schema.items.type ?? ''] ?? 'text-text-secondary'}>
                {schema.items.type ?? '...'}
              </span>
              {']'}
            </span>
          )}
        </span>

        {schema.nullable && <Pill>nullable</Pill>}
        {schema.readOnly && <Pill>read-only</Pill>}
        {schema.writeOnly && <Pill>write-only</Pill>}
        {schema.deprecated && <Pill variant="warn">deprecated</Pill>}

        {schema.description && (
          <span className="text-text-secondary text-xs italic">{schema.description}</span>
        )}

        {schema.default !== undefined && (
          <span className="text-xs text-text-disabled">
            default: <code className="font-mono">{JSON.stringify(schema.default)}</code>
          </span>
        )}
      </div>

      {enumValues && enumValues.length > 0 && (
        <div className="ml-6 mb-1 flex flex-wrap gap-1">
          {enumValues.map((v, i) => (
            <code key={i} className="rounded bg-surface-overlay px-1.5 py-0.5 text-xs font-mono text-text-primary border border-border">
              {JSON.stringify(v)}
            </code>
          ))}
        </div>
      )}

      {(schema.minLength != null || schema.maxLength != null || schema.pattern) && (
        <div className="ml-6 mb-1 flex flex-wrap gap-2 text-xs text-text-disabled">
          {schema.minLength != null && <span>minLength: {schema.minLength}</span>}
          {schema.maxLength != null && <span>maxLength: {schema.maxLength}</span>}
          {schema.pattern && <span>pattern: <code className="font-mono">{schema.pattern}</code></span>}
        </div>
      )}

      {(schema.minimum != null || schema.maximum != null) && (
        <div className="ml-6 mb-1 flex flex-wrap gap-2 text-xs text-text-disabled">
          {schema.minimum != null && <span>min: {schema.minimum}</span>}
          {schema.maximum != null && <span>max: {schema.maximum}</span>}
          {schema.multipleOf != null && <span>multipleOf: {schema.multipleOf}</span>}
        </div>
      )}

      {schema.allOf && (
        <div className="ml-6 mt-1">
          <span className="text-xs font-semibold text-text-disabled uppercase tracking-wide">allOf</span>
          {schema.allOf.map((s, i) => <SchemaNode key={i} schema={s} depth={depth + 1} defaultOpen={false} />)}
        </div>
      )}
      {schema.anyOf && (
        <div className="ml-6 mt-1">
          <span className="text-xs font-semibold text-text-disabled uppercase tracking-wide">anyOf</span>
          {schema.anyOf.map((s, i) => <SchemaNode key={i} schema={s} depth={depth + 1} defaultOpen={false} />)}
        </div>
      )}
      {schema.oneOf && (
        <div className="ml-6 mt-1">
          <span className="text-xs font-semibold text-text-disabled uppercase tracking-wide">oneOf</span>
          {schema.oneOf.map((s, i) => <SchemaNode key={i} schema={s} depth={depth + 1} defaultOpen={false} />)}
        </div>
      )}

      {open && type === 'object' && schema.properties && (
        <div>
          {Object.entries(schema.properties).map(([key, child]) => (
            <SchemaNode
              key={key}
              name={key}
              schema={child}
              required={schema.required?.includes(key) ?? false}
              depth={depth + 1}
              defaultOpen={false}
            />
          ))}
        </div>
      )}

      {open && type === 'array' && schema.items && (
        <SchemaNode schema={schema.items} depth={depth + 1} defaultOpen={false} />
      )}
    </div>
  );
}

type Props = {
  schema: SchemaObject;
  title?: string;
  className?: string;
};

export function SchemaViewer({ schema, title, className }: Props) {
  return (
    <div className={cn('rounded-lg border border-border bg-surface-base text-sm overflow-hidden', className)}>
      {title && (
        <div className="px-3 py-2 border-b border-border bg-surface-raised text-xs font-semibold text-text-secondary uppercase tracking-wide">
          {title}
        </div>
      )}
      <div className="p-3">
        <SchemaNode schema={schema} defaultOpen={true} />
      </div>
    </div>
  );
}
