'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import { Tooltip } from '@/modules/ui/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import type { Parameter } from './types';

const locationVariant: Record<string, 'primary' | 'info' | 'warning' | 'neutral'> = {
  path:   'primary',
  query:  'info',
  header: 'warning',
  cookie: 'neutral',
};

type Props = {
  parameters: Parameter[];
  className?: string;
};

export function ParameterTable({ parameters, className }: Props) {
  if (!parameters.length) return null;

  return (
    <div className={cn('overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-raised">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide w-1/4">Name</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide w-20">In</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide w-24">Type</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide w-20">Required</th>
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {parameters.map((param) => (
            <tr key={param.parameterId} className="bg-surface-base hover:bg-surface-raised transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <code className="font-mono text-xs font-semibold text-text-primary">{param.name}</code>
                  {param.deprecated && (
                    <Badge variant="warning" size="sm">deprecated</Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <Badge variant={locationVariant[param.in] ?? 'neutral'} size="sm">
                  {param.in}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <code className="font-mono text-xs text-text-secondary">
                  {param.schema?.type ?? (param.schema?.$ref ? '$ref' : '—')}
                  {param.schema?.format && <span className="text-text-disabled"> ({param.schema.format})</span>}
                </code>
              </td>
              <td className="px-4 py-3">
                {param.required ? (
                  <Badge variant="error" size="sm">required</Badge>
                ) : (
                  <span className="text-xs text-text-disabled">optional</span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-text-secondary">
                <div className="flex items-start gap-1.5">
                  <span className="line-clamp-2">{param.description ?? '—'}</span>
                  {param.schema?.example !== undefined && (
                    <Tooltip content={<span className="font-mono text-xs">e.g. {String(param.schema.example)}</span>} placement="top">
                      <FontAwesomeIcon icon={faCircleInfo} className="w-3.5 h-3.5 text-text-disabled shrink-0 mt-0.5 cursor-help" aria-label="Example value" />
                    </Tooltip>
                  )}
                </div>
                {param.schema?.enum && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {param.schema.enum.map((v, i) => (
                      <code key={i} className="rounded bg-surface-sunken px-1 py-0 text-[10px] font-mono text-text-secondary">
                        {String(v)}
                      </code>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
