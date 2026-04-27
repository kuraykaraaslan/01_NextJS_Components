import { z } from 'zod'

/* =========================================================
   GEO POINT
========================================================= */

export const GeoPointSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

/* =========================================================
   LOCATION
========================================================= */

export const LocationSchema = z.object({
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  countryCode: z.string().length(2).nullable().optional(),
  postalCode: z.string().nullable().optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type GeoPoint = z.infer<typeof GeoPointSchema>
export type Location = z.infer<typeof LocationSchema>
