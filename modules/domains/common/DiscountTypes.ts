import { z } from 'zod'
import { IdSchema } from './BaseTypes'
import { CurrencySchema } from './MoneyTypes'

/* =========================================================
   ENUMS
========================================================= */

export const DiscountTypeEnum = z.enum(['PERCENTAGE', 'FIXED', 'FREE_SHIPPING'])

/* =========================================================
   COUPON BASE SCHEMA
========================================================= */

export const CouponBaseSchema = z.object({
  couponId: IdSchema,
  code: z.string(),
  discountType: DiscountTypeEnum,
  discountValue: z.number().nonnegative(),
  currency: CurrencySchema.optional(),
  maxUsage: z.number().int().positive().nullable().optional(),
  usedCount: z.number().int().nonnegative().default(0),
  validFrom: z.coerce.date().nullable().optional(),
  validUntil: z.coerce.date().nullable().optional(),
  isActive: z.boolean().default(true),
})

/* =========================================================
   TYPES
========================================================= */

export type DiscountType = z.infer<typeof DiscountTypeEnum>
export type CouponBase = z.infer<typeof CouponBaseSchema>
