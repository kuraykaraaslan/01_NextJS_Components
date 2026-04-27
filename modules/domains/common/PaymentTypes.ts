import { z } from 'zod'
import { IdSchema } from './BaseTypes'
import { CurrencySchema } from './MoneyTypes'

/* =========================================================
   ENUMS
========================================================= */

export const PaymentStatusEnum = z.enum([
  'PENDING',
  'AUTHORIZED',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
])

export const PaymentMethodEnum = z.enum([
  'CREDIT_CARD',
  'DEBIT_CARD',
  'BANK_TRANSFER',
  'CASH',
  'WALLET',
  'CRYPTO',
])

/* =========================================================
   PAYMENT BASE SCHEMA
========================================================= */

export const PaymentBaseSchema = z.object({
  paymentId: IdSchema,
  provider: z.string(),
  providerPaymentId: z.string().nullable().optional(),
  method: PaymentMethodEnum.optional(),
  status: PaymentStatusEnum.default('PENDING'),
  amount: z.number().nonnegative(),
  currency: CurrencySchema,
})

/* =========================================================
   TYPES
========================================================= */

export type PaymentStatus = z.infer<typeof PaymentStatusEnum>
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>
export type PaymentBase = z.infer<typeof PaymentBaseSchema>
