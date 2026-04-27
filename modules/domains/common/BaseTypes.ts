import { z } from 'zod'
import { AppLanguageEnum } from './I18nTypes'
import { IdSchema as _IdSchema } from './types'

/* =========================================================
   RE-EXPORTS FROM types.ts
========================================================= */

export {
  IdSchema,
  UuidSchema,
  SlugSchema,
  DateSchema,
  NullableDateSchema,
  EmailSchema,
  PasswordSchema,
  BaseEntitySchema,
  SortOrderEnum,
  StatusEnum,
  PaginationSchema,
} from './types'

/* =========================================================
   ADDITIONAL BASE PRIMITIVES
========================================================= */

export const UrlSchema = z.url()

/* =========================================================
   TRANSLATION BASE SCHEMA
========================================================= */

export const TranslationBaseSchema = z.object({
  id: _IdSchema,
  lang: AppLanguageEnum,
})

export const VisibilityEnum = z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED'])

export const ProcessingStatusEnum = z.enum([
  'UPLOADING',
  'PROCESSING',
  'READY',
  'FAILED',
])

/* =========================================================
   TYPES
========================================================= */

export type Url = z.infer<typeof UrlSchema>
export type Visibility = z.infer<typeof VisibilityEnum>
export type ProcessingStatus = z.infer<typeof ProcessingStatusEnum>
export type TranslationBase = z.infer<typeof TranslationBaseSchema>
