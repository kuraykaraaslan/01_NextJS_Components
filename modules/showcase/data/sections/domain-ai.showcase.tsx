'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { ModelProviderBadge } from '@/modules/domains/ai/model/ModelProviderBadge';
import { ModelTypeBadge } from '@/modules/domains/ai/model/ModelTypeBadge';
import { ModelCard } from '@/modules/domains/ai/model/ModelCard';
import { AIJobStatusBadge } from '@/modules/domains/ai/job/AIJobStatusBadge';
import { ChatMessage } from '@/modules/domains/ai/chat/ChatMessage';
import { UsageStatsCard } from '@/modules/domains/ai/usage/UsageStatsCard';
import type { AIModel, AIChatMessage, AIUsage } from '@/modules/domains/ai/types';

/* ─── demo data ─── */

const DEMO_MODEL_TEXT: AIModel = {
  modelId: 'gpt-4o',
  provider: 'OPENAI',
  name: 'GPT-4o',
  type: 'TEXT',
  contextWindow: 128000,
  maxOutputTokens: 4096,
  pricingPromptPer1k: 0.005,
  pricingCompletionPer1k: 0.015,
  active: true,
  createdAt: new Date('2024-05-13'),
};

const DEMO_MODEL_IMAGE: AIModel = {
  modelId: 'dall-e-3',
  provider: 'OPENAI',
  name: 'DALL-E 3',
  type: 'IMAGE',
  contextWindow: null,
  maxOutputTokens: null,
  pricingPromptPer1k: 0.04,
  pricingCompletionPer1k: null,
  active: false,
  createdAt: new Date('2023-10-03'),
};

const DEMO_USER_MESSAGE: AIChatMessage = {
  messageId: 'msg-demo-1',
  sessionId: 'sess-demo',
  role: 'USER',
  content: 'Write a short intro paragraph about AI trends in 2026.',
  tokens: 18,
  createdAt: new Date(),
};

const DEMO_ASSISTANT_MESSAGE: AIChatMessage = {
  messageId: 'msg-demo-2',
  sessionId: 'sess-demo',
  role: 'ASSISTANT',
  content:
    'Artificial intelligence in 2026 is defined by three major shifts: democratisation of frontier models, agentic workflows, and multimodal reasoning as a standard capability.',
  tokens: 42,
  createdAt: new Date(),
};

const DEMO_USAGE: AIUsage = {
  usageId: 'usage-demo',
  userId: 'user-01',
  modelId: 'gpt-4o',
  tokensPrompt: 512,
  tokensCompletion: 1024,
  cost: 0.01792,
  createdAt: new Date(),
};

const DEMO_USAGE_CHEAP: AIUsage = {
  usageId: 'usage-demo-2',
  userId: 'user-01',
  modelId: 'deepseek-chat',
  tokensPrompt: 1000,
  tokensCompletion: 2000,
  cost: 0.00056,
  createdAt: new Date(),
};

/* ─── builder ─── */

export function buildAIDomainData(): ShowcaseComponent[] {
  return [
    {
      id: 'ai-model-provider-badge',
      title: 'ModelProviderBadge',
      category: 'Domain',
      abbr: 'MP',
      description: 'Colour-coded badge that maps an AI provider name to a semantic variant.',
      filePath: 'modules/domains/ai/model/ModelProviderBadge.tsx',
      sourceCode: `import { ModelProviderBadge } from '@/modules/domains/ai/model/ModelProviderBadge';
<ModelProviderBadge provider="ANTHROPIC" />`,
      variants: [
        {
          title: 'All providers',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'XAI', 'DEEPSEEK', 'AZURE_OPENAI', 'CUSTOM'] as const).map((p) => (
                <ModelProviderBadge key={p} provider={p} />
              ))}
            </div>
          ),
          code: `{(['OPENAI', 'ANTHROPIC', 'GOOGLE', 'XAI', 'DEEPSEEK', 'AZURE_OPENAI', 'CUSTOM'] as const).map((p) => (
  <ModelProviderBadge key={p} provider={p} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['OPENAI', 'ANTHROPIC', 'GOOGLE'] as const).map((p) => (
                <ModelProviderBadge key={p} provider={p} size="sm" />
              ))}
            </div>
          ),
          code: `<ModelProviderBadge provider="OPENAI" size="sm" />`,
        },
      ],
    },
    {
      id: 'ai-model-type-badge',
      title: 'ModelTypeBadge',
      category: 'Domain',
      abbr: 'MT',
      description: 'Badge indicating the modality of an AI model (Text, Image, Embedding, etc.).',
      filePath: 'modules/domains/ai/model/ModelTypeBadge.tsx',
      sourceCode: `import { ModelTypeBadge } from '@/modules/domains/ai/model/ModelTypeBadge';
<ModelTypeBadge type="TEXT" />`,
      variants: [
        {
          title: 'All types',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['TEXT', 'IMAGE', 'EMBEDDING', 'AUDIO', 'VIDEO'] as const).map((t) => (
                <ModelTypeBadge key={t} type={t} />
              ))}
            </div>
          ),
          code: `{(['TEXT', 'IMAGE', 'EMBEDDING', 'AUDIO', 'VIDEO'] as const).map((t) => (
  <ModelTypeBadge key={t} type={t} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['TEXT', 'IMAGE', 'EMBEDDING'] as const).map((t) => (
                <ModelTypeBadge key={t} type={t} size="sm" />
              ))}
            </div>
          ),
          code: `<ModelTypeBadge type="TEXT" size="sm" />`,
        },
      ],
    },
    {
      id: 'ai-model-card',
      title: 'ModelCard',
      category: 'Domain',
      abbr: 'MC',
      description: 'Card summarising an AI model with provider, type badges, context window, and pricing.',
      filePath: 'modules/domains/ai/model/ModelCard.tsx',
      sourceCode: `import { ModelCard } from '@/modules/domains/ai/model/ModelCard';
<ModelCard model={model} href="/models/gpt-4o" />`,
      variants: [
        {
          title: 'Active text model with link',
          preview: (
            <div className="max-w-sm">
              <ModelCard model={DEMO_MODEL_TEXT} href="#" />
            </div>
          ),
          code: `<ModelCard model={model} href="/models/gpt-4o" />`,
        },
        {
          title: 'Inactive image model',
          preview: (
            <div className="max-w-sm">
              <ModelCard model={DEMO_MODEL_IMAGE} />
            </div>
          ),
          code: `<ModelCard model={model} />`,
        },
      ],
    },
    {
      id: 'ai-job-status-badge',
      title: 'AIJobStatusBadge',
      category: 'Domain',
      abbr: 'AJ',
      description: 'Dot + label badge tracking the lifecycle of an async AI job.',
      filePath: 'modules/domains/ai/job/AIJobStatusBadge.tsx',
      sourceCode: `import { AIJobStatusBadge } from '@/modules/domains/ai/job/AIJobStatusBadge';
<AIJobStatusBadge status="RUNNING" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const).map((s) => (
                <AIJobStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const).map((s) => (
  <AIJobStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED'] as const).map((s) => (
                <AIJobStatusBadge key={s} status={s} size="sm" />
              ))}
            </div>
          ),
          code: `<AIJobStatusBadge status="COMPLETED" size="sm" />`,
        },
      ],
    },
    {
      id: 'ai-chat-message',
      title: 'ChatMessage',
      category: 'Domain',
      abbr: 'CM',
      description: 'Chat bubble for AI conversations — USER bubbles are right-aligned (primary bg), ASSISTANT bubbles are left-aligned (surface-raised).',
      filePath: 'modules/domains/ai/chat/ChatMessage.tsx',
      sourceCode: `import { ChatMessage } from '@/modules/domains/ai/chat/ChatMessage';
<ChatMessage message={message} />`,
      variants: [
        {
          title: 'User message',
          layout: 'stack',
          preview: (
            <div className="max-w-lg w-full">
              <ChatMessage message={DEMO_USER_MESSAGE} />
            </div>
          ),
          code: `<ChatMessage message={{ role: 'USER', content: '...' }} />`,
        },
        {
          title: 'Assistant message',
          layout: 'stack',
          preview: (
            <div className="max-w-lg w-full">
              <ChatMessage message={DEMO_ASSISTANT_MESSAGE} />
            </div>
          ),
          code: `<ChatMessage message={{ role: 'ASSISTANT', content: '...' }} />`,
        },
      ],
    },
    {
      id: 'ai-usage-stats-card',
      title: 'UsageStatsCard',
      category: 'Domain',
      abbr: 'US',
      description: 'Card displaying prompt tokens, completion tokens, and cost for a single AI usage record.',
      filePath: 'modules/domains/ai/usage/UsageStatsCard.tsx',
      sourceCode: `import { UsageStatsCard } from '@/modules/domains/ai/usage/UsageStatsCard';
<UsageStatsCard usage={usage} />`,
      variants: [
        {
          title: 'GPT-4o usage',
          layout: 'stack',
          preview: (
            <div className="max-w-xl w-full">
              <UsageStatsCard usage={DEMO_USAGE} />
            </div>
          ),
          code: `<UsageStatsCard usage={usage} />`,
        },
        {
          title: 'Low-cost model',
          layout: 'stack',
          preview: (
            <div className="max-w-xl w-full">
              <UsageStatsCard usage={DEMO_USAGE_CHEAP} />
            </div>
          ),
          code: `<UsageStatsCard usage={cheapUsage} />`,
        },
      ],
    },
  ];
}
