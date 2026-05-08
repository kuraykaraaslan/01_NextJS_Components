import type { AIModel, AIJob, AIChatSession, AIChatMessage, AIUsage } from '@/modules/domains/ai/types';

/* ─── Models ─── */

export const MODELS: AIModel[] = [
  {
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
  },
  {
    modelId: 'claude-3-5-sonnet',
    provider: 'ANTHROPIC',
    name: 'Claude 3.5 Sonnet',
    type: 'TEXT',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    pricingPromptPer1k: 0.003,
    pricingCompletionPer1k: 0.015,
    active: true,
    createdAt: new Date('2024-06-20'),
  },
  {
    modelId: 'gemini-1-5-pro',
    provider: 'GOOGLE',
    name: 'Gemini 1.5 Pro',
    type: 'TEXT',
    contextWindow: 1000000,
    maxOutputTokens: 8192,
    pricingPromptPer1k: 0.0035,
    pricingCompletionPer1k: 0.0105,
    active: true,
    createdAt: new Date('2024-02-15'),
  },
  {
    modelId: 'dall-e-3',
    provider: 'OPENAI',
    name: 'DALL-E 3',
    type: 'IMAGE',
    contextWindow: null,
    maxOutputTokens: null,
    pricingPromptPer1k: 0.04,
    pricingCompletionPer1k: null,
    active: true,
    createdAt: new Date('2023-10-03'),
  },
  {
    modelId: 'deepseek-chat',
    provider: 'DEEPSEEK',
    name: 'DeepSeek Chat',
    type: 'TEXT',
    contextWindow: 64000,
    maxOutputTokens: 4096,
    pricingPromptPer1k: 0.00014,
    pricingCompletionPer1k: 0.00028,
    active: true,
    createdAt: new Date('2024-01-10'),
  },
  {
    modelId: 'text-embedding-3-large',
    provider: 'OPENAI',
    name: 'text-embedding-3-large',
    type: 'EMBEDDING',
    contextWindow: 8191,
    maxOutputTokens: null,
    pricingPromptPer1k: 0.00013,
    pricingCompletionPer1k: null,
    active: true,
    createdAt: new Date('2024-01-25'),
  },
];

/* ─── Chat Sessions ─── */

export const CHAT_SESSIONS: AIChatSession[] = [
  {
    sessionId: 'sess-01',
    userId: 'user-01',
    title: 'Writing a blog post about AI trends',
    modelId: 'gpt-4o',
    createdAt: new Date('2026-05-07T10:00:00Z'),
    updatedAt: new Date('2026-05-07T10:15:00Z'),
  },
  {
    sessionId: 'sess-02',
    userId: 'user-01',
    title: 'Summarizing research paper',
    modelId: 'claude-3-5-sonnet',
    createdAt: new Date('2026-05-06T14:30:00Z'),
    updatedAt: new Date('2026-05-06T14:45:00Z'),
  },
  {
    sessionId: 'sess-03',
    userId: 'user-02',
    title: 'Code review assistant',
    modelId: 'gemini-1-5-pro',
    createdAt: new Date('2026-05-05T09:20:00Z'),
    updatedAt: new Date('2026-05-05T09:40:00Z'),
  },
];

/* ─── Chat Messages ─── */

export const CHAT_MESSAGES: Record<string, AIChatMessage[]> = {
  'sess-01': [
    {
      messageId: 'msg-01',
      sessionId: 'sess-01',
      role: 'USER',
      content: 'Write a short intro paragraph about the top AI trends in 2026.',
      tokens: 18,
      createdAt: new Date('2026-05-07T10:01:00Z'),
    },
    {
      messageId: 'msg-02',
      sessionId: 'sess-01',
      role: 'ASSISTANT',
      content:
        'Artificial intelligence in 2026 is defined by three major shifts: the democratization of frontier models through open-weight releases, the rise of agentic workflows that chain multiple models together, and the emergence of multimodal reasoning as a standard capability rather than a premium feature.',
      tokens: 62,
      createdAt: new Date('2026-05-07T10:01:05Z'),
    },
    {
      messageId: 'msg-03',
      sessionId: 'sess-01',
      role: 'USER',
      content: 'Can you expand the second point about agentic workflows?',
      tokens: 13,
      createdAt: new Date('2026-05-07T10:02:00Z'),
    },
    {
      messageId: 'msg-04',
      sessionId: 'sess-01',
      role: 'ASSISTANT',
      content:
        'Agentic workflows allow AI models to break down complex tasks into sub-tasks, delegate them to specialised tools or sub-agents, and synthesise the results autonomously. Rather than a single prompt-response cycle, users describe a goal and the system plans, executes, and iterates — dramatically extending what can be accomplished without human intervention at each step.',
      tokens: 78,
      createdAt: new Date('2026-05-07T10:02:10Z'),
    },
  ],
  'sess-02': [
    {
      messageId: 'msg-05',
      sessionId: 'sess-02',
      role: 'USER',
      content: 'Summarise this research paper abstract in three bullet points.',
      tokens: 14,
      createdAt: new Date('2026-05-06T14:31:00Z'),
    },
    {
      messageId: 'msg-06',
      sessionId: 'sess-02',
      role: 'ASSISTANT',
      content:
        '• The study benchmarks seven large language models on multi-step reasoning tasks.\n• Constitutional AI fine-tuning consistently reduces harmful outputs without degrading performance.\n• Retrieval-augmented generation improves factual accuracy by 34% on closed-domain questions.',
      tokens: 55,
      createdAt: new Date('2026-05-06T14:31:08Z'),
    },
  ],
  'sess-03': [
    {
      messageId: 'msg-07',
      sessionId: 'sess-03',
      role: 'USER',
      content: 'Review this TypeScript function for potential null dereference issues.',
      tokens: 16,
      createdAt: new Date('2026-05-05T09:21:00Z'),
    },
    {
      messageId: 'msg-08',
      sessionId: 'sess-03',
      role: 'ASSISTANT',
      content:
        'I see two potential null dereference sites: (1) `user.profile.avatar` — `profile` could be undefined if the join returns no row. Guard with optional chaining: `user.profile?.avatar`. (2) `items[0].id` — the array might be empty; use `items[0]?.id ?? null` instead.',
      tokens: 72,
      createdAt: new Date('2026-05-05T09:21:12Z'),
    },
  ],
};

/* ─── Jobs ─── */

export const JOBS: AIJob[] = [
  {
    jobId: 'job-01',
    type: 'TEXT',
    status: 'COMPLETED',
    requestPayload: { prompt: 'Generate a product description for a wireless headphone.' },
    responsePayload: { text: 'Experience pure sound freedom with our latest wireless headphones...' },
    startedAt: new Date('2026-05-07T08:00:05Z'),
    completedAt: new Date('2026-05-07T08:00:07Z'),
    createdAt: new Date('2026-05-07T08:00:00Z'),
  },
  {
    jobId: 'job-02',
    type: 'TEXT',
    status: 'RUNNING',
    requestPayload: { prompt: 'Translate the following document to Spanish.' },
    startedAt: new Date('2026-05-08T09:14:00Z'),
    createdAt: new Date('2026-05-08T09:13:58Z'),
  },
  {
    jobId: 'job-03',
    type: 'IMAGE',
    status: 'PENDING',
    requestPayload: { prompt: 'A futuristic city skyline at dusk, digital art.' },
    createdAt: new Date('2026-05-08T09:15:00Z'),
  },
  {
    jobId: 'job-04',
    type: 'EMBEDDING',
    status: 'FAILED',
    requestPayload: { text: 'Customer review batch #1047' },
    errorMessage: 'Input token limit exceeded (8192).',
    createdAt: new Date('2026-05-07T16:00:00Z'),
  },
  {
    jobId: 'job-05',
    type: 'TEXT',
    status: 'CANCELLED',
    requestPayload: { prompt: 'Write a marketing email for the summer sale.' },
    createdAt: new Date('2026-05-06T12:00:00Z'),
  },
];

/* ─── Usages ─── */

export const USAGES: AIUsage[] = [
  {
    usageId: 'usage-01',
    userId: 'user-01',
    modelId: 'gpt-4o',
    tokensPrompt: 512,
    tokensCompletion: 1024,
    cost: 0.01792,
    createdAt: new Date('2026-05-07T10:01:05Z'),
  },
  {
    usageId: 'usage-02',
    userId: 'user-01',
    modelId: 'claude-3-5-sonnet',
    tokensPrompt: 320,
    tokensCompletion: 640,
    cost: 0.0072,
    createdAt: new Date('2026-05-06T14:31:08Z'),
  },
  {
    usageId: 'usage-03',
    userId: 'user-02',
    modelId: 'gemini-1-5-pro',
    tokensPrompt: 800,
    tokensCompletion: 1200,
    cost: 0.01540,
    createdAt: new Date('2026-05-05T09:21:12Z'),
  },
  {
    usageId: 'usage-04',
    userId: 'user-01',
    modelId: 'dall-e-3',
    tokensPrompt: 50,
    tokensCompletion: 0,
    cost: 0.04,
    createdAt: new Date('2026-05-07T08:00:07Z'),
  },
  {
    usageId: 'usage-05',
    userId: 'user-03',
    modelId: 'deepseek-chat',
    tokensPrompt: 1000,
    tokensCompletion: 2000,
    cost: 0.00056,
    createdAt: new Date('2026-05-04T11:00:00Z'),
  },
  {
    usageId: 'usage-06',
    userId: 'user-02',
    modelId: 'text-embedding-3-large',
    tokensPrompt: 4000,
    tokensCompletion: 0,
    cost: 0.00052,
    createdAt: new Date('2026-05-03T15:30:00Z'),
  },
];
