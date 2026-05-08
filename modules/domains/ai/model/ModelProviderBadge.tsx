'use client';
import { cn } from '@/libs/utils/cn';
import type { AIProvider } from '@/modules/domains/ai/types';

type ModelProviderBadgeProps = {
  provider: AIProvider;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const providerMeta: Record<
  AIProvider,
  { label: string; bgClass: string; textClass: string }
> = {
  OPENAI:       { label: 'OpenAI',       bgClass: 'bg-[#10a37f]/15', textClass: 'text-[#10a37f]' },
  AZURE_OPENAI: { label: 'Azure OpenAI', bgClass: 'bg-[#0078d4]/15', textClass: 'text-[#0078d4]' },
  ANTHROPIC:    { label: 'Anthropic',    bgClass: 'bg-[#d97706]/15', textClass: 'text-[#d97706]' },
  GOOGLE:       { label: 'Google',       bgClass: 'bg-[#4285f4]/15', textClass: 'text-[#4285f4]' },
  XAI:          { label: 'xAI',          bgClass: 'bg-surface-sunken', textClass: 'text-text-primary' },
  DEEPSEEK:     { label: 'DeepSeek',     bgClass: 'bg-[#2563eb]/15', textClass: 'text-[#2563eb]' },
  CUSTOM:       { label: 'Custom',       bgClass: 'bg-surface-sunken', textClass: 'text-text-secondary' },
};

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function ModelProviderBadge({ provider, size = 'md', className }: ModelProviderBadgeProps) {
  const meta = providerMeta[provider] ?? { label: provider, bgClass: 'bg-surface-sunken', textClass: 'text-text-secondary' };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        meta.bgClass,
        meta.textClass,
        sizeClasses[size],
        className
      )}
    >
      {meta.label}
    </span>
  );
}
