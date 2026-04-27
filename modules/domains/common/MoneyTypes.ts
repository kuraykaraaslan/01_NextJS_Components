import { z } from 'zod'

export const CurrencySchema = z.string().default('TRY')

export const MoneySchema = z.object({
  amount: z.number().nonnegative(),
  currency: CurrencySchema,
})

export const PriceFieldsSchema = z.object({
  price: z.number().nonnegative(),
  currency: CurrencySchema,
})

export const OrderTotalsSchema = z.object({
  subtotal: z.number().nonnegative(),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  serviceFee: z.number().nonnegative().default(0),
  shippingTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),
  currency: CurrencySchema,
})

export type Money = z.infer<typeof MoneySchema>
export type OrderTotals = z.infer<typeof OrderTotalsSchema>