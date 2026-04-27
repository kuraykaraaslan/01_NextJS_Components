import { z } from 'zod'

/* =========================================================
   CURRENCY
========================================================= */

export const CurrencySchema = z.string().length(3).default('TRY')

/* =========================================================
   MONEY
========================================================= */

export const MoneySchema = z.object({
  amount: z.number().nonnegative(),
  currency: CurrencySchema,
})

export const PriceFieldsSchema = z.object({
  price: z.number().nonnegative(),
  currency: CurrencySchema,
})

/* =========================================================
   ORDER TOTALS
========================================================= */

export const OrderTotalsSchema = z.object({
  subtotal: z.number().nonnegative(),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  serviceFee: z.number().nonnegative().default(0),
  shippingTotal: z.number().nonnegative().default(0),
  deliveryFee: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
})

/* =========================================================
   TYPES
========================================================= */

export type Money = z.infer<typeof MoneySchema>
export type PriceFields = z.infer<typeof PriceFieldsSchema>
export type OrderTotals = z.infer<typeof OrderTotalsSchema>
