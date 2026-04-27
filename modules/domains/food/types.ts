import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'
import { IdSchema } from '../common/BaseTypes'
import { CurrencySchema } from '../common/MoneyTypes'
import { PaymentStatusEnum, PaymentBaseSchema } from '../common/PaymentTypes'
import { DiscountTypeEnum, CouponBaseSchema } from '../common/DiscountTypes'
import { LocationSchema } from '../common/LocationTypes'

/* =========================================================
   ENUMS
========================================================= */

export const RestaurantStatusEnum = z.enum([
  'ACTIVE',
  'INACTIVE',
  'CLOSED',
])

export const MenuItemStatusEnum = z.enum([
  'AVAILABLE',
  'UNAVAILABLE',
  'OUT_OF_STOCK',
])

export const OrderStatusEnum = z.enum([
  'PENDING',
  'ACCEPTED',
  'PREPARING',
  'READY',
  'PICKED_UP',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
])

export const DeliveryStatusEnum = z.enum([
  'PENDING',
  'ASSIGNED',
  'PICKED_UP',
  'ON_THE_WAY',
  'DELIVERED',
  'FAILED',
])

/* =========================================================
   RE-EXPORTS FROM COMMON
========================================================= */

export { PaymentStatusEnum, DiscountTypeEnum }

/* =========================================================
   RESTAURANT
========================================================= */

export const RestaurantTranslationSchema = z.object({
  id: IdSchema,
  restaurantId: IdSchema,
  lang: AppLanguageEnum,

  name: z.string(),
  description: z.string().nullable().optional(),
})

export const RestaurantSchema = LocationSchema.extend({
  restaurantId: IdSchema,

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  cuisineTypes: z.array(z.string()).default([]),

  locationId: IdSchema,

  address: z.string(),
  city: z.string(),
  country: z.string(),

  phone: z.string().nullable().optional(),

  image: z.string().nullable().optional(),
  bannerImage: z.string().nullable().optional(),

  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().nonnegative().default(0),

  deliveryTimeMin: z.number().int().positive(),
  deliveryTimeMax: z.number().int().positive(),

  minimumOrderAmount: z.number().nonnegative().default(0),
  deliveryFee: z.number().nonnegative().default(0),

  isOpen: z.boolean().default(true),

  status: RestaurantStatusEnum.default('ACTIVE'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   MENU
========================================================= */

export const MenuCategorySchema = z.object({
  categoryId: IdSchema,
  restaurantId: IdSchema,

  name: z.string(),
  description: z.string().nullable().optional(),

  sortOrder: z.number().int().nonnegative().default(0),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

export const MenuItemSchema = z.object({
  menuItemId: IdSchema,

  restaurantId: IdSchema,
  categoryId: IdSchema,

  name: z.string(),
  description: z.string().nullable().optional(),

  image: z.string().nullable().optional(),

  basePrice: z.number().nonnegative(),
  currency: CurrencySchema,

  status: MenuItemStatusEnum.default('AVAILABLE'),

  isVegetarian: z.boolean().default(false),
  isVegan: z.boolean().default(false),

  calories: z.number().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   VARIANTS / OPTIONS
========================================================= */

export const MenuItemVariantSchema = z.object({
  variantId: IdSchema,

  menuItemId: IdSchema,

  name: z.string(),

  price: z.number().nonnegative(),
  currency: CurrencySchema,

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

export const MenuItemOptionGroupSchema = z.object({
  optionGroupId: IdSchema,

  menuItemId: IdSchema,

  name: z.string(),

  minSelect: z.number().int().nonnegative().default(0),
  maxSelect: z.number().int().positive().default(1),

  required: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

export const MenuItemOptionSchema = z.object({
  optionId: IdSchema,

  optionGroupId: IdSchema,

  name: z.string(),

  price: z.number().nonnegative().default(0),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   CUSTOMER / ADDRESS
========================================================= */

export const CustomerSchema = z.object({
  customerId: IdSchema,

  userId: IdSchema.nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  email: z.string().email(),
  phone: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

export const AddressSchema = LocationSchema.extend({
  addressId: IdSchema,

  customerId: IdSchema,

  label: z.string().nullable().optional(),

  addressLine: z.string(),

  city: z.string(),
  country: z.string(),

  isDefault: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   CART
========================================================= */

export const CartSchema = z.object({
  cartId: IdSchema,

  userId: IdSchema.nullable().optional(),
  sessionId: z.string().nullable().optional(),

  restaurantId: IdSchema,

  subtotal: z.number().nonnegative().default(0),
  deliveryFee: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),

  currency: CurrencySchema,

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const CartItemSchema = z.object({
  cartItemId: IdSchema,
  cartId: IdSchema,

  menuItemId: IdSchema,
  variantId: IdSchema.nullable().optional(),

  name: z.string(),

  quantity: z.number().int().positive(),

  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),

  selectedOptions: z.array(z.object({
    optionId: IdSchema,
    name: z.string(),
    price: z.number(),
  })).default([]),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   ORDER
========================================================= */

export const OrderSchema = z.object({
  orderId: IdSchema,
  orderNumber: z.string(),

  restaurantId: IdSchema,

  customerId: IdSchema.nullable().optional(),
  userId: IdSchema.nullable().optional(),

  status: OrderStatusEnum.default('PENDING'),

  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  discountTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),

  currency: CurrencySchema,

  addressId: IdSchema,

  note: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),

  acceptedAt: z.coerce.date().nullable().optional(),
  preparedAt: z.coerce.date().nullable().optional(),
  deliveredAt: z.coerce.date().nullable().optional(),
})

export const OrderItemSchema = z.object({
  orderItemId: IdSchema,
  orderId: IdSchema,

  menuItemId: IdSchema,
  variantId: IdSchema.nullable().optional(),

  name: z.string(),

  quantity: z.number().int().positive(),

  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),

  selectedOptions: z.array(z.object({
    optionId: IdSchema,
    name: z.string(),
    price: z.number(),
  })).default([]),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

export const PaymentSchema = PaymentBaseSchema.extend({
  orderId: IdSchema,

  paidAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   DELIVERY
========================================================= */

export const CourierSchema = z.object({
  courierId: IdSchema,

  name: z.string(),
  phone: z.string().nullable().optional(),

  vehicleType: z.string().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

export const DeliverySchema = z.object({
  deliveryId: IdSchema,

  orderId: IdSchema,
  courierId: IdSchema.nullable().optional(),

  status: DeliveryStatusEnum.default('PENDING'),

  pickupAt: z.coerce.date().nullable().optional(),
  deliveredAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   COUPON
========================================================= */

export const CouponSchema = CouponBaseSchema.extend({
  minOrderAmount: z.number().nonnegative().nullable().optional(),

  createdAt: z.coerce.date().optional(),
}).omit({ maxUsage: true, validFrom: true, validUntil: true, isActive: true }).extend({
  maxUses: z.number().int().positive().nullable().optional(),
  active: z.boolean().default(true),
})

/* =========================================================
   TYPES
========================================================= */

export type Restaurant = z.infer<typeof RestaurantSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type Delivery = z.infer<typeof DeliverySchema>
