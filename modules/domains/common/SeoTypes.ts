import { z } from 'zod'

/* =========================================================
   SEO FIELDS
========================================================= */

export const SeoFieldsSchema = z.object({
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  keywords: z.array(z.string()).nullable().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type SeoFields = z.infer<typeof SeoFieldsSchema>
