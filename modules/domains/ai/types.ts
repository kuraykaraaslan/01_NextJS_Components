import { z } from 'zod'
import { IdSchema } from '../common/BaseTypes'

/* =========================================================
   ENUMS
========================================================= */

export const AIProviderEnum = z.enum([
  'OPENAI',
  'AZURE_OPENAI',
  'ANTHROPIC',
  'GOOGLE',
  'XAI',
  'DEEPSEEK',
  'CUSTOM',
])

export const AIModelTypeEnum = z.enum([
  'TEXT',
  'IMAGE',
  'EMBEDDING',
  'AUDIO',
  'VIDEO',
])

export const AIJobStatusEnum = z.enum([
  'PENDING',
  'RUNNING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
])

export const AIContentTypeEnum = z.enum([
  'BLOG',
  'PRODUCT',
  'EVENT',
  'TRAVEL',
  'CHAT',
  'CUSTOM',
])

export const AIModerationStatusEnum = z.enum([
  'SAFE',
  'FLAGGED',
  'BLOCKED',
])

export const AIMessageRoleEnum = z.enum([
  'SYSTEM',
  'USER',
  'ASSISTANT',
  'TOOL',
])

/* =========================================================
   MODEL CONFIG
========================================================= */

export const AIModelSchema = z.object({
  modelId: IdSchema,

  provider: AIProviderEnum,
  name: z.string(),

  type: AIModelTypeEnum,

  contextWindow: z.number().int().positive().nullable().optional(),
  maxOutputTokens: z.number().int().positive().nullable().optional(),

  pricingPromptPer1k: z.number().nonnegative().nullable().optional(),
  pricingCompletionPer1k: z.number().nonnegative().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   PROMPT TEMPLATE
========================================================= */

export const AIPromptTemplateSchema = z.object({
  templateId: IdSchema,

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  contentType: AIContentTypeEnum,

  systemPrompt: z.string(),
  userPromptTemplate: z.string(),

  variables: z.array(z.string()).default([]),

  version: z.number().int().default(1),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   GENERATION REQUEST / RESPONSE
========================================================= */

export const AIMessageSchema = z.object({
  role: AIMessageRoleEnum,
  content: z.string(),
})

export const AIGenerationRequestSchema = z.object({
  requestId: IdSchema,

  userId: IdSchema.nullable().optional(),

  modelId: IdSchema,

  messages: z.array(AIMessageSchema),

  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().positive().nullable().optional(),

  contentType: AIContentTypeEnum,

  metadata: z.record(z.string(), z.unknown()).optional(),

  createdAt: z.coerce.date().optional(),
})

export const AIGenerationResultSchema = z.object({
  resultId: IdSchema,

  requestId: IdSchema,

  outputText: z.string().nullable().optional(),
  outputJson: z.record(z.string(), z.unknown()).nullable().optional(),

  tokensPrompt: z.number().int().nonnegative(),
  tokensCompletion: z.number().int().nonnegative(),
  tokensTotal: z.number().int().nonnegative(),

  cost: z.number().nonnegative().nullable().optional(),

  latencyMs: z.number().int().nonnegative().nullable().optional(),

  moderationStatus: AIModerationStatusEnum.default('SAFE'),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   AI JOB (ASYNC TASKS)
========================================================= */

export const AIJobSchema = z.object({
  jobId: IdSchema,

  type: AIModelTypeEnum,

  status: AIJobStatusEnum.default('PENDING'),

  requestPayload: z.record(z.string(), z.unknown()),
  responsePayload: z.record(z.string(), z.unknown()).nullable().optional(),

  errorMessage: z.string().nullable().optional(),

  startedAt: z.coerce.date().nullable().optional(),
  completedAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   EMBEDDINGS / RAG
========================================================= */

export const AIEmbeddingSchema = z.object({
  embeddingId: IdSchema,

  entityType: AIContentTypeEnum,
  entityId: IdSchema,

  vector: z.array(z.number()),

  modelId: IdSchema,

  createdAt: z.coerce.date().optional(),
})

export const AIRAGDocumentSchema = z.object({
  docId: IdSchema,

  title: z.string(),
  content: z.string(),

  entityType: AIContentTypeEnum,
  entityId: IdSchema.nullable().optional(),

  embeddingId: IdSchema,

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   CHAT SESSION
========================================================= */

export const AIChatSessionSchema = z.object({
  sessionId: IdSchema,

  userId: IdSchema,

  title: z.string().nullable().optional(),

  modelId: IdSchema,

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

export const AIChatMessageSchema = z.object({
  messageId: IdSchema,

  sessionId: IdSchema,

  role: AIMessageRoleEnum,

  content: z.string(),

  tokens: z.number().int().nonnegative().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   MODERATION
========================================================= */

export const AIModerationSchema = z.object({
  moderationId: IdSchema,

  content: z.string(),

  status: AIModerationStatusEnum,

  categories: z.record(z.string(), z.boolean()).optional(),

  flaggedReason: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   USAGE / BILLING
========================================================= */

export const AIUsageSchema = z.object({
  usageId: IdSchema,

  userId: IdSchema,

  modelId: IdSchema,

  tokensPrompt: z.number().int().nonnegative(),
  tokensCompletion: z.number().int().nonnegative(),

  cost: z.number().nonnegative(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type AIProvider = z.infer<typeof AIProviderEnum>
export type AIModelType = z.infer<typeof AIModelTypeEnum>
export type AIJobStatus = z.infer<typeof AIJobStatusEnum>
export type AIContentType = z.infer<typeof AIContentTypeEnum>
export type AIModerationStatus = z.infer<typeof AIModerationStatusEnum>
export type AIMessageRole = z.infer<typeof AIMessageRoleEnum>

export type AIModel = z.infer<typeof AIModelSchema>
export type AIPromptTemplate = z.infer<typeof AIPromptTemplateSchema>

export type AIMessage = z.infer<typeof AIMessageSchema>
export type AIGenerationRequest = z.infer<typeof AIGenerationRequestSchema>
export type AIGenerationResult = z.infer<typeof AIGenerationResultSchema>

export type AIJob = z.infer<typeof AIJobSchema>

export type AIEmbedding = z.infer<typeof AIEmbeddingSchema>
export type AIRAGDocument = z.infer<typeof AIRAGDocumentSchema>

export type AIChatSession = z.infer<typeof AIChatSessionSchema>
export type AIChatMessage = z.infer<typeof AIChatMessageSchema>

export type AIModeration = z.infer<typeof AIModerationSchema>

export type AIUsage = z.infer<typeof AIUsageSchema>
