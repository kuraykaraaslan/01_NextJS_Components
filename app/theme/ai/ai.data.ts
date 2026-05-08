import type { AIModel, AIChatSession, AIChatMessage, AIJob, AIUsage } from '@/modules/domains/ai/types';

/* =========================================================
   MODELS
========================================================= */

export const MODELS: AIModel[] = [
  {
    modelId: 'gpt-4o',
    provider: 'OPENAI',
    name: 'GPT-4o',
    type: 'TEXT',
    contextWindow: 128000,
    maxOutputTokens: 4096,
    pricingPromptPer1k: 0.0025,
    pricingCompletionPer1k: 0.01,
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
    createdAt: new Date('2024-04-09'),
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
  {
    modelId: 'deepseek-chat',
    provider: 'DEEPSEEK',
    name: 'DeepSeek Chat',
    type: 'TEXT',
    contextWindow: 64000,
    maxOutputTokens: 4096,
    pricingPromptPer1k: 0.00014,
    pricingCompletionPer1k: 0.00028,
    active: false,
    createdAt: new Date('2024-02-01'),
  },
];

/* =========================================================
   CHAT SESSIONS + MESSAGES
========================================================= */

export const CHAT_SESSIONS: AIChatSession[] = [
  {
    sessionId: 'sess-001',
    userId: 'user-001',
    title: 'Explain quantum computing',
    modelId: 'gpt-4o',
    createdAt: new Date('2026-05-07T09:15:00Z'),
    updatedAt: new Date('2026-05-07T09:22:00Z'),
  },
  {
    sessionId: 'sess-002',
    userId: 'user-001',
    title: 'Write a REST API in Go',
    modelId: 'claude-3-5-sonnet',
    createdAt: new Date('2026-05-06T14:30:00Z'),
    updatedAt: new Date('2026-05-06T14:48:00Z'),
  },
  {
    sessionId: 'sess-003',
    userId: 'user-001',
    title: 'Marketing copy for product launch',
    modelId: 'gemini-1-5-pro',
    createdAt: new Date('2026-05-05T11:00:00Z'),
    updatedAt: new Date('2026-05-05T11:20:00Z'),
  },
];

export const CHAT_MESSAGES: Record<string, AIChatMessage[]> = {
  'sess-001': [
    {
      messageId: 'msg-001',
      sessionId: 'sess-001',
      role: 'SYSTEM',
      content: 'You are a helpful AI assistant.',
      tokens: 8,
      createdAt: new Date('2026-05-07T09:15:00Z'),
    },
    {
      messageId: 'msg-002',
      sessionId: 'sess-001',
      role: 'USER',
      content: 'Can you explain quantum computing in simple terms?',
      tokens: 12,
      createdAt: new Date('2026-05-07T09:15:30Z'),
    },
    {
      messageId: 'msg-003',
      sessionId: 'sess-001',
      role: 'ASSISTANT',
      content:
        'Quantum computing harnesses the principles of quantum mechanics — superposition and entanglement — to process information in fundamentally different ways than classical computers. Instead of bits that are either 0 or 1, quantum computers use qubits that can be in both states simultaneously. This allows them to explore many solutions in parallel, making them powerful for certain problems like cryptography and molecular simulation.',
      tokens: 78,
      createdAt: new Date('2026-05-07T09:15:45Z'),
    },
    {
      messageId: 'msg-004',
      sessionId: 'sess-001',
      role: 'USER',
      content: 'What are the main challenges in building one?',
      tokens: 11,
      createdAt: new Date('2026-05-07T09:16:00Z'),
    },
    {
      messageId: 'msg-005',
      sessionId: 'sess-001',
      role: 'ASSISTANT',
      content:
        'The biggest challenges include: (1) Decoherence — qubits are extremely fragile and lose their quantum state due to environmental noise. (2) Error rates — current hardware has significant error rates requiring error correction overhead. (3) Scalability — building systems with thousands of stable qubits remains an unsolved engineering problem. (4) Temperature — most qubit technologies require near absolute-zero cooling.',
      tokens: 82,
      createdAt: new Date('2026-05-07T09:16:20Z'),
    },
  ],
  'sess-002': [
    {
      messageId: 'msg-010',
      sessionId: 'sess-002',
      role: 'USER',
      content: 'Write me a simple REST API server in Go with /health and /users endpoints.',
      tokens: 18,
      createdAt: new Date('2026-05-06T14:30:00Z'),
    },
    {
      messageId: 'msg-011',
      sessionId: 'sess-002',
      role: 'ASSISTANT',
      content:
        "Here's a minimal Go REST API:\n\n```go\npackage main\n\nimport (\n  \"encoding/json\"\n  \"net/http\"\n)\n\nfunc main() {\n  http.HandleFunc(\"/health\", healthHandler)\n  http.HandleFunc(\"/users\", usersHandler)\n  http.ListenAndServe(\":8080\", nil)\n}\n\nfunc healthHandler(w http.ResponseWriter, r *http.Request) {\n  json.NewEncoder(w).Encode(map[string]string{\"status\": \"ok\"})\n}\n```",
      tokens: 95,
      createdAt: new Date('2026-05-06T14:30:15Z'),
    },
  ],
};

/* =========================================================
   AI JOBS
========================================================= */

export const AI_JOBS: AIJob[] = [
  {
    jobId: 'job-001',
    type: 'TEXT',
    status: 'COMPLETED',
    requestPayload: { prompt: 'Generate a product description', modelId: 'gpt-4o' },
    responsePayload: { text: 'A cutting-edge product...' },
    errorMessage: null,
    startedAt: new Date('2026-05-07T08:00:00Z'),
    completedAt: new Date('2026-05-07T08:00:03Z'),
    createdAt: new Date('2026-05-07T07:59:58Z'),
  },
  {
    jobId: 'job-002',
    type: 'IMAGE',
    status: 'RUNNING',
    requestPayload: { prompt: 'A futuristic city skyline at dusk', modelId: 'dall-e-3' },
    responsePayload: null,
    errorMessage: null,
    startedAt: new Date('2026-05-07T09:10:00Z'),
    completedAt: null,
    createdAt: new Date('2026-05-07T09:09:55Z'),
  },
  {
    jobId: 'job-003',
    type: 'EMBEDDING',
    status: 'FAILED',
    requestPayload: { texts: ['doc1', 'doc2'], modelId: 'text-embedding-3-large' },
    responsePayload: null,
    errorMessage: 'Rate limit exceeded. Please retry after 60 seconds.',
    startedAt: new Date('2026-05-07T08:45:00Z'),
    completedAt: new Date('2026-05-07T08:45:01Z'),
    createdAt: new Date('2026-05-07T08:44:58Z'),
  },
  {
    jobId: 'job-004',
    type: 'TEXT',
    status: 'PENDING',
    requestPayload: { prompt: 'Summarise quarterly report', modelId: 'claude-3-5-sonnet' },
    responsePayload: null,
    errorMessage: null,
    startedAt: null,
    completedAt: null,
    createdAt: new Date('2026-05-07T09:20:00Z'),
  },
];

/* =========================================================
   USAGE
========================================================= */

export const USAGE_RECORDS: AIUsage[] = [
  {
    usageId: 'usage-001',
    userId: 'user-001',
    modelId: 'gpt-4o',
    tokensPrompt: 1240,
    tokensCompletion: 520,
    cost: 0.008300,
    createdAt: new Date('2026-05-07T09:16:00Z'),
  },
  {
    usageId: 'usage-002',
    userId: 'user-001',
    modelId: 'claude-3-5-sonnet',
    tokensPrompt: 980,
    tokensCompletion: 1450,
    cost: 0.024630,
    createdAt: new Date('2026-05-06T14:48:00Z'),
  },
  {
    usageId: 'usage-003',
    userId: 'user-001',
    modelId: 'text-embedding-3-large',
    tokensPrompt: 8000,
    tokensCompletion: 0,
    cost: 0.001040,
    createdAt: new Date('2026-05-05T11:05:00Z'),
  },
];
