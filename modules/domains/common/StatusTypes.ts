import { z } from 'zod'

/* =========================================================
   PUBLISH STATUS
========================================================= */

export const PublishStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])

/* =========================================================
   RE-EXPORTS FROM BaseTypes
========================================================= */

export { VisibilityEnum, ProcessingStatusEnum } from './BaseTypes'

/* =========================================================
   TYPES
========================================================= */

export type PublishStatus = z.infer<typeof PublishStatusEnum>
