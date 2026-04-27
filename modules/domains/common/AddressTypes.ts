import { z } from 'zod'
import { LocationSchema } from './LocationTypes'

/* =========================================================
   ADDRESS
========================================================= */

export const AddressSchema = LocationSchema.extend({
  addressLine1: z.string(),
  addressLine2: z.string().nullable().optional(),
  fullName: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type Address = z.infer<typeof AddressSchema>
