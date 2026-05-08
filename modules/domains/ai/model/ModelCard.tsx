'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDatabase, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ModelTypeBadge } from './ModelTypeBadge';
import { ModelProviderBadge } from './ModelProviderBadge';
import type { AIModel } from '@/modules/domains/ai/types';

type ModelCardProps = {
  model: AIModel;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function ModelCard({ model, href, onClick, className }: ModelCardProps) {
  const isInteractive = !!(href || onClick);

  const body = (
    <div className="p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-primary truncate leading-snug">
            {model.name}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">{model.modelId}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <FontAwesomeIcon
            icon={faCircle}
            className={cn(
              'w-2 h-2',
              model.active ? 'text-success' : 'text-text-disabled'
            )}
            aria-hidden="true"
          />
          <span className={cn('text-xs font-medium', model.active ? 'text-success' : 'text-text-disabled')}>
            {model.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        <ModelProviderBadge provider={model.provider} size="sm" />
        <ModelTypeBadge type={model.type} size="sm" />
      </div>

      {/* Specs */}
      <div className="border-t border-border pt-3 grid grid-cols-2 gap-3">
        {model.contextWindow != null && (
          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faDatabase} className="w-3.5 h-3.5 text-text-secondary" aria-hidden="true" />
            <div>
              <p className="text-xs text-text-secondary">Context</p>
              <p className="text-sm font-medium text-text-primary">
                {(model.contextWindow / 1000).toFixed(0)}K tokens
              </p>
            </div>
          </div>
        )}
        {(model.pricingPromptPer1k != null || model.pricingCompletionPer1k != null) && (
          <div className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faDollarSign} className="w-3.5 h-3.5 text-text-secondary" aria-hidden="true" />
            <div>
              <p className="text-xs text-text-secondary">Pricing / 1K</p>
              <p className="text-sm font-medium text-text-primary">
                {model.pricingPromptPer1k != null
                  ? `$${model.pricingPromptPer1k.toFixed(4)}`
                  : '—'}
                {' / '}
                {model.pricingCompletionPer1k != null
                  ? `$${model.pricingCompletionPer1k.toFixed(4)}`
                  : '—'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200 cursor-pointer',
    className
  );

  if (href) {
    return <a href={href} className={baseClass}>{body}</a>;
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClass, 'text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </button>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
