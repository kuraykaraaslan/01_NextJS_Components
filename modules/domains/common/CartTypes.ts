import { z } from 'zod'
import { IdSchema } from './BaseTypes'
import { CurrencySchema, OrderTotalsSchema } from './MoneyTypes'

/* =========================================================
   CART ITEM
========================================================= */

export const CartItemSchema = z.object({
  cartItemId: IdSchema,
  productId:  IdSchema,
  name:        z.string(),
  description: z.string().nullable().optional(),
  image:       z.string().nullable().optional(),
  variant:     z.string().nullable().optional(),
  price:       z.number().nonnegative(),
  currency:    CurrencySchema,
  quantity:    z.number().int().positive(),
  maxQuantity: z.number().int().positive().nullable().optional(),
})

/* =========================================================
   CART
========================================================= */

export const CartSchema = z.object({
  cartId: IdSchema,
  items:  z.array(CartItemSchema),
  totals: OrderTotalsSchema,
})

/* =========================================================
   TYPES
========================================================= */

export type CartItem = z.infer<typeof CartItemSchema>
export type Cart     = z.infer<typeof CartSchema>
