import { z } from 'zod'
import { IdSchema, SlugSchema, UrlSchema } from '../common/BaseTypes'

/* =========================================================
   ENUMS
========================================================= */

export const HttpMethodEnum = z.enum([
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'TRACE',
])

export const ParameterLocationEnum = z.enum([
  'path',
  'query',
  'header',
  'cookie',
])

export const SchemaTypeEnum = z.enum([
  'string',
  'number',
  'integer',
  'boolean',
  'array',
  'object',
  'null',
])

export const SchemaFormatEnum = z.enum([
  'int32',
  'int64',
  'float',
  'double',
  'byte',
  'binary',
  'date',
  'date-time',
  'password',
  'email',
  'uri',
  'uuid',
  'hostname',
  'ipv4',
  'ipv6',
])

export const SecuritySchemeTypeEnum = z.enum([
  'apiKey',
  'http',
  'oauth2',
  'openIdConnect',
  'mutualTLS',
])

export const ApiKeyLocationEnum = z.enum([
  'query',
  'header',
  'cookie',
])

export const OAuthFlowTypeEnum = z.enum([
  'implicit',
  'password',
  'clientCredentials',
  'authorizationCode',
])

export const ResponseStatusEnum = z.enum([
  '200',
  '201',
  '202',
  '204',
  '301',
  '302',
  '400',
  '401',
  '403',
  '404',
  '405',
  '409',
  '422',
  '429',
  '500',
  '502',
  '503',
])

export const ContentTypeEnum = z.enum([
  'application/json',
  'application/xml',
  'application/x-www-form-urlencoded',
  'multipart/form-data',
  'text/plain',
  'text/html',
  'application/octet-stream',
])

export const ApiVersionStatusEnum = z.enum([
  'DRAFT',
  'ACTIVE',
  'DEPRECATED',
  'SUNSET',
])

/* =========================================================
   SCHEMA OBJECT (JSON Schema subset)
========================================================= */

export const SchemaObjectSchema: z.ZodType<SchemaObject> = z.lazy(() =>
  z.object({
    type: SchemaTypeEnum.nullable().optional(),
    format: SchemaFormatEnum.nullable().optional(),

    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),

    default: z.unknown().optional(),
    example: z.unknown().optional(),
    examples: z.array(z.unknown()).nullable().optional(),

    enum: z.array(z.unknown()).nullable().optional(),
    const: z.unknown().optional(),

    // String constraints
    minLength: z.number().int().nonnegative().nullable().optional(),
    maxLength: z.number().int().nonnegative().nullable().optional(),
    pattern: z.string().nullable().optional(),

    // Number constraints
    minimum: z.number().nullable().optional(),
    maximum: z.number().nullable().optional(),
    exclusiveMinimum: z.number().nullable().optional(),
    exclusiveMaximum: z.number().nullable().optional(),
    multipleOf: z.number().nullable().optional(),

    // Array constraints
    items: z.lazy(() => SchemaObjectSchema).nullable().optional(),
    minItems: z.number().int().nonnegative().nullable().optional(),
    maxItems: z.number().int().nonnegative().nullable().optional(),
    uniqueItems: z.boolean().nullable().optional(),

    // Object constraints
    properties: z.record(z.string(), z.lazy(() => SchemaObjectSchema)).nullable().optional(),
    required: z.array(z.string()).nullable().optional(),
    additionalProperties: z.union([z.boolean(), z.lazy(() => SchemaObjectSchema)]).nullable().optional(),
    minProperties: z.number().int().nonnegative().nullable().optional(),
    maxProperties: z.number().int().nonnegative().nullable().optional(),

    // Composition
    allOf: z.array(z.lazy(() => SchemaObjectSchema)).nullable().optional(),
    anyOf: z.array(z.lazy(() => SchemaObjectSchema)).nullable().optional(),
    oneOf: z.array(z.lazy(() => SchemaObjectSchema)).nullable().optional(),
    not: z.lazy(() => SchemaObjectSchema).nullable().optional(),

    // OpenAPI extensions
    nullable: z.boolean().nullable().optional(),
    readOnly: z.boolean().nullable().optional(),
    writeOnly: z.boolean().nullable().optional(),
    deprecated: z.boolean().nullable().optional(),

    // $ref pointer
    $ref: z.string().nullable().optional(),
  })
)

/* =========================================================
   INFO
========================================================= */

export const ApiContactSchema = z.object({
  name: z.string().nullable().optional(),
  url: UrlSchema.nullable().optional(),
  email: z.string().email().nullable().optional(),
})

export const ApiLicenseSchema = z.object({
  name: z.string(),
  url: UrlSchema.nullable().optional(),
  identifier: z.string().nullable().optional(),
})

export const ApiInfoSchema = z.object({
  infoId: IdSchema,

  title: z.string(),
  description: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),

  termsOfService: UrlSchema.nullable().optional(),

  contact: ApiContactSchema.nullable().optional(),
  license: ApiLicenseSchema.nullable().optional(),

  version: z.string(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   SERVER
========================================================= */

export const ServerVariableSchema = z.object({
  enum: z.array(z.string()).nullable().optional(),
  default: z.string(),
  description: z.string().nullable().optional(),
})

export const ApiServerSchema = z.object({
  serverId: IdSchema,

  url: z.string(),
  description: z.string().nullable().optional(),

  variables: z.record(z.string(), ServerVariableSchema).nullable().optional(),

  environment: z.enum(['production', 'staging', 'development', 'sandbox']).nullable().optional(),
})

/* =========================================================
   EXTERNAL DOCS
========================================================= */

export const ExternalDocsSchema = z.object({
  url: UrlSchema,
  description: z.string().nullable().optional(),
})

/* =========================================================
   TAG
========================================================= */

export const ApiTagSchema = z.object({
  tagId: IdSchema,

  name: z.string(),
  description: z.string().nullable().optional(),

  externalDocs: ExternalDocsSchema.nullable().optional(),
})

/* =========================================================
   SECURITY SCHEME
========================================================= */

export const OAuthScopeSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const OAuthFlowSchema = z.object({
  authorizationUrl: UrlSchema.nullable().optional(),
  tokenUrl: UrlSchema.nullable().optional(),
  refreshUrl: UrlSchema.nullable().optional(),
  scopes: z.array(OAuthScopeSchema).default([]),
})

export const SecuritySchemeSchema = z.object({
  schemeId: IdSchema,

  name: z.string(),
  type: SecuritySchemeTypeEnum,

  description: z.string().nullable().optional(),

  // apiKey fields
  apiKeyName: z.string().nullable().optional(),
  apiKeyIn: ApiKeyLocationEnum.nullable().optional(),

  // http fields
  scheme: z.string().nullable().optional(),
  bearerFormat: z.string().nullable().optional(),

  // oauth2 flows
  flows: z.record(OAuthFlowTypeEnum, OAuthFlowSchema).nullable().optional(),

  // openIdConnect
  openIdConnectUrl: UrlSchema.nullable().optional(),
})

/* =========================================================
   PARAMETER
========================================================= */

export const ParameterSchema = z.object({
  parameterId: IdSchema,

  name: z.string(),
  in: ParameterLocationEnum,

  description: z.string().nullable().optional(),

  required: z.boolean().optional(),
  deprecated: z.boolean().optional(),
  allowEmptyValue: z.boolean().optional(),

  schema: SchemaObjectSchema.nullable().optional(),

  example: z.unknown().optional(),
  examples: z.record(z.string(), z.unknown()).nullable().optional(),

  style: z.enum(['matrix', 'label', 'form', 'simple', 'spaceDelimited', 'pipeDelimited', 'deepObject']).nullable().optional(),
  explode: z.boolean().nullable().optional(),
  allowReserved: z.boolean().optional(),
})

/* =========================================================
   REQUEST BODY
========================================================= */

export const MediaTypeObjectSchema = z.object({
  schema: SchemaObjectSchema.nullable().optional(),
  example: z.unknown().optional(),
  examples: z.record(z.string(), z.unknown()).nullable().optional(),
})

export const RequestBodySchema = z.object({
  requestBodyId: IdSchema,

  description: z.string().nullable().optional(),
  required: z.boolean().optional(),

  content: z.record(z.string(), MediaTypeObjectSchema),
})

/* =========================================================
   RESPONSE
========================================================= */

export const HeaderObjectSchema = z.object({
  description: z.string().nullable().optional(),
  required: z.boolean().optional(),
  schema: SchemaObjectSchema.nullable().optional(),
  example: z.unknown().optional(),
})

export const LinkObjectSchema = z.object({
  operationId: z.string().nullable().optional(),
  operationRef: z.string().nullable().optional(),
  parameters: z.record(z.string(), z.unknown()).nullable().optional(),
  requestBody: z.unknown().optional(),
  description: z.string().nullable().optional(),
})

export const ApiResponseSchema = z.object({
  responseId: IdSchema,

  statusCode: z.string(),
  description: z.string(),

  headers: z.record(z.string(), HeaderObjectSchema).nullable().optional(),
  content: z.record(z.string(), MediaTypeObjectSchema).nullable().optional(),
  links: z.record(z.string(), LinkObjectSchema).nullable().optional(),
})

/* =========================================================
   OPERATION (endpoint method)
========================================================= */

export const OperationSchema = z.object({
  operationId: IdSchema,

  operationKey: SlugSchema,

  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),

  method: HttpMethodEnum,

  tags: z.array(z.string()).optional(),

  parameters: z.array(ParameterSchema).optional(),

  requestBody: RequestBodySchema.nullable().optional(),

  responses: z.array(ApiResponseSchema).optional(),

  security: z.array(z.record(z.string(), z.array(z.string()))).nullable().optional(),

  deprecated: z.boolean().optional(),

  externalDocs: ExternalDocsSchema.nullable().optional(),

  servers: z.array(ApiServerSchema).nullable().optional(),

  // x-code-samples for documentation rendering
  codeSamples: z.array(
    z.object({
      lang: z.string(),
      label: z.string().nullable().optional(),
      source: z.string(),
    })
  ).nullable().optional(),
})

/* =========================================================
   PATH ITEM
========================================================= */

export const PathItemSchema = z.object({
  pathItemId: IdSchema,

  path: z.string(),

  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),

  operations: z.array(OperationSchema).optional(),

  parameters: z.array(ParameterSchema).optional(),

  servers: z.array(ApiServerSchema).nullable().optional(),
})

/* =========================================================
   COMPONENTS (reusable definitions)
========================================================= */

export const ApiComponentsSchema = z.object({
  schemas: z.record(z.string(), SchemaObjectSchema).nullable().optional(),
  responses: z.record(z.string(), ApiResponseSchema).nullable().optional(),
  parameters: z.record(z.string(), ParameterSchema).nullable().optional(),
  requestBodies: z.record(z.string(), RequestBodySchema).nullable().optional(),
  headers: z.record(z.string(), HeaderObjectSchema).nullable().optional(),
  securitySchemes: z.record(z.string(), SecuritySchemeSchema).nullable().optional(),
  links: z.record(z.string(), LinkObjectSchema).nullable().optional(),
})

/* =========================================================
   WEBHOOK
========================================================= */

export const WebhookSchema = z.object({
  webhookId: IdSchema,

  name: z.string(),
  pathItem: PathItemSchema,

  description: z.string().nullable().optional(),
})

/* =========================================================
   API SPEC (root document)
========================================================= */

export const ApiSpecSchema = z.object({
  specId: IdSchema,

  openapi: z.string().default('3.1.0'),

  info: ApiInfoSchema,

  servers: z.array(ApiServerSchema).default([]),

  paths: z.array(PathItemSchema).default([]),

  webhooks: z.array(WebhookSchema).nullable().optional(),

  components: ApiComponentsSchema.nullable().optional(),

  security: z.array(z.record(z.string(), z.array(z.string()))).nullable().optional(),

  tags: z.array(ApiTagSchema).default([]),

  externalDocs: ExternalDocsSchema.nullable().optional(),

  status: ApiVersionStatusEnum.default('DRAFT'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   API PROJECT (multi-version container)
========================================================= */

export const ApiProjectSchema = z.object({
  projectId: IdSchema,

  name: z.string(),
  slug: SlugSchema,

  description: z.string().nullable().optional(),

  logoUrl: UrlSchema.nullable().optional(),
  websiteUrl: UrlSchema.nullable().optional(),

  specs: z.array(ApiSpecSchema).default([]),

  defaultSpecId: IdSchema.nullable().optional(),

  visibility: z.enum(['PUBLIC', 'PRIVATE', 'TEAM']).default('PRIVATE'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   CHANGELOG
========================================================= */

export const ChangelogEntryTypeEnum = z.enum([
  'ADDED',
  'CHANGED',
  'DEPRECATED',
  'REMOVED',
  'FIXED',
  'SECURITY',
])

export const ChangelogEntrySchema = z.object({
  entryId: IdSchema,

  specId: IdSchema,

  type: ChangelogEntryTypeEnum,

  title: z.string(),
  description: z.string().nullable().optional(),

  affectedPaths: z.array(z.string()).default([]),

  breakingChange: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TRY-IT-OUT (playground / request log)
========================================================= */

export const PlaygroundRequestSchema = z.object({
  requestId: IdSchema,

  operationId: IdSchema,

  url: z.string(),
  method: HttpMethodEnum,

  headers: z.record(z.string(), z.string()).nullable().optional(),
  queryParams: z.record(z.string(), z.string()).nullable().optional(),
  pathParams: z.record(z.string(), z.string()).nullable().optional(),
  body: z.unknown().nullable().optional(),

  responseStatus: z.number().int().nullable().optional(),
  responseHeaders: z.record(z.string(), z.string()).nullable().optional(),
  responseBody: z.unknown().nullable().optional(),

  latencyMs: z.number().int().nonnegative().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type HttpMethod = z.infer<typeof HttpMethodEnum>
export type ParameterLocation = z.infer<typeof ParameterLocationEnum>
export type SchemaType = z.infer<typeof SchemaTypeEnum>
export type SchemaFormat = z.infer<typeof SchemaFormatEnum>
export type SecuritySchemeType = z.infer<typeof SecuritySchemeTypeEnum>
export type OAuthFlowType = z.infer<typeof OAuthFlowTypeEnum>
export type ContentType = z.infer<typeof ContentTypeEnum>
export type ApiVersionStatus = z.infer<typeof ApiVersionStatusEnum>
export type ChangelogEntryType = z.infer<typeof ChangelogEntryTypeEnum>

export interface SchemaObject {
  type?: z.infer<typeof SchemaTypeEnum> | null
  format?: z.infer<typeof SchemaFormatEnum> | null
  title?: string | null
  description?: string | null
  default?: unknown
  example?: unknown
  examples?: unknown[] | null
  enum?: unknown[] | null
  const?: unknown
  minLength?: number | null
  maxLength?: number | null
  pattern?: string | null
  minimum?: number | null
  maximum?: number | null
  exclusiveMinimum?: number | null
  exclusiveMaximum?: number | null
  multipleOf?: number | null
  items?: SchemaObject | null
  minItems?: number | null
  maxItems?: number | null
  uniqueItems?: boolean | null
  properties?: Record<string, SchemaObject> | null
  required?: string[] | null
  additionalProperties?: boolean | SchemaObject | null
  minProperties?: number | null
  maxProperties?: number | null
  allOf?: SchemaObject[] | null
  anyOf?: SchemaObject[] | null
  oneOf?: SchemaObject[] | null
  not?: SchemaObject | null
  nullable?: boolean | null
  readOnly?: boolean | null
  writeOnly?: boolean | null
  deprecated?: boolean | null
  $ref?: string | null
}

export type ApiContact = z.infer<typeof ApiContactSchema>
export type ApiLicense = z.infer<typeof ApiLicenseSchema>
export type ApiInfo = z.infer<typeof ApiInfoSchema>

export type ServerVariable = z.infer<typeof ServerVariableSchema>
export type ApiServer = z.infer<typeof ApiServerSchema>

export type ExternalDocs = z.infer<typeof ExternalDocsSchema>
export type ApiTag = z.infer<typeof ApiTagSchema>

export type OAuthScope = z.infer<typeof OAuthScopeSchema>
export type OAuthFlow = z.infer<typeof OAuthFlowSchema>
export type SecurityScheme = z.infer<typeof SecuritySchemeSchema>

export type Parameter = z.infer<typeof ParameterSchema>

export type MediaTypeObject = z.infer<typeof MediaTypeObjectSchema>
export type RequestBody = z.infer<typeof RequestBodySchema>

export type HeaderObject = z.infer<typeof HeaderObjectSchema>
export type LinkObject = z.infer<typeof LinkObjectSchema>
export type ApiResponse = z.infer<typeof ApiResponseSchema>

export type Operation = z.infer<typeof OperationSchema>
export type PathItem = z.infer<typeof PathItemSchema>

export type ApiComponents = z.infer<typeof ApiComponentsSchema>
export type Webhook = z.infer<typeof WebhookSchema>

export type ApiSpec = z.infer<typeof ApiSpecSchema>
export type ApiProject = z.infer<typeof ApiProjectSchema>

export type ChangelogEntry = z.infer<typeof ChangelogEntrySchema>

export type PlaygroundRequest = z.infer<typeof PlaygroundRequestSchema>
