'use client';
import { Badge } from '@/modules/ui/Badge';
import type { AIProvider } from '../types';

const providerMeta: Record<AIProvider, { label: string; variant: 'primary' | 'warning' | 'success' | 'neutral' | 'info' | 'error' }> = {
  OPENAI:       { label: 'OpenAI',       variant: 'primary'  },
  ANTHROPIC:    { label: 'Anthropic',    variant: 'warning'  },
  GOOGLE:       { label: 'Google',       variant: 'success'  },
  XAI:          { label: 'xAI',          variant: 'neutral'  },
  DEEPSEEK:     { label: 'DeepSeek',     variant: 'info'     },
  AZURE_OPENAI: { label: 'Azure OpenAI', variant: 'primary'  },
  CUSTOM:       { label: 'Custom',       variant: 'neutral'  },
};

type ModelProviderBadgeProps = {
  provider: AIProvider;
  size?: 'sm' | 'md';
  className?: string;
};

export function ModelProviderBadge({ provider, size = 'md', className }: ModelProviderBadgeProps) {
  const meta = providerMeta[provider] ?? { label: provider, variant: 'neutral' as const };
  return (
    <Badge variant={meta.variant} size={size} className={className}>
      {meta.label}
    </Badge>
  );
}
