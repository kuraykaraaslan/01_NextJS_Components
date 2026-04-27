import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'

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

export const PaymentStatusEnum = z.enum([
  'PENDING',
  'AUTHORIZED',
  'PAID',
  'FAILED',
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

export const DiscountTypeEnum = z.enum([
  'PERCENTAGE',
  'FIXED_AMOUNT',
  'FREE_DELIVERY',
])

/* =========================================================
   LOCATION
========================================================= */

export const LocationSchema = z.object({
  locationId: z.string(),

  city: z.string(),
  country: z.string(),
  countryCode: z.string().nullable().optional(),

  latitude: z.number(),
  longitude: z.number(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   RESTAURANT
========================================================= */

export const RestaurantTranslationSchema = z.object({
  id: z.string(),
  restaurantId: z.string(),
  lang: AppLanguageEnum,

  name: z.string(),
  description: z.string().nullable().optional(),
})

export const RestaurantSchema = z.object({
  restaurantId: z.string(),

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  cuisineTypes: z.array(z.string()).default([]),

  locationId: z.string(),

  address: z.string(),
  city: z.string(),
  country: z.string(),

  latitude: z.number(),
  longitude: z.number(),

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
  categoryId: z.string(),
  restaurantId: z.string(),

  name: z.string(),
  description: z.string().nullable().optional(),

  sortOrder: z.number().int().nonnegative().default(0),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

export const MenuItemSchema = z.object({
  menuItemId: z.string(),

  restaurantId: z.string(),
  categoryId: z.string(),

  name: z.string(),
  description: z.string().nullable().optional(),

  image: z.string().nullable().optional(),

  basePrice: z.number().nonnegative(),
  currency: z.string().default('TRY'),

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
  variantId: z.string(),

  menuItemId: z.string(),

  name: z.string(), // Small / Medium / Large

  price: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

export const MenuItemOptionGroupSchema = z.object({
  optionGroupId: z.string(),

  menuItemId: z.string(),

  name: z.string(),

  minSelect: z.number().int().nonnegative().default(0),
  maxSelect: z.number().int().positive().default(1),

  required: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

export const MenuItemOptionSchema = z.object({
  optionId: z.string(),

  optionGroupId: z.string(),

  name: z.string(),

  price: z.number().nonnegative().default(0),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   CUSTOMER / ADDRESS
========================================================= */

export const CustomerSchema = z.object({
  customerId: z.string(),

  userId: z.string().nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  email: z.string().email(),
  phone: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

export const AddressSchema = z.object({
  addressId: z.string(),

  customerId: z.string(),

  label: z.string().nullable().optional(),

  addressLine: z.string(),

  city: z.string(),
  country: z.string(),

  latitude: z.number(),
  longitude: z.number(),

  isDefault: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   CART
========================================================= */

export const CartSchema = z.object({
  cartId: z.string(),

  userId: z.string().nullable().optional(),
  sessionId: z.string().nullable().optional(),

  restaurantId: z.string(),

  subtotal: z.number().nonnegative().default(0),
  deliveryFee: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),

  currency: z.string().default('TRY'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const CartItemSchema = z.object({
  cartItemId: z.string(),
  cartId: z.string(),

  menuItemId: z.string(),
  variantId: z.string().nullable().optional(),

  name: z.string(),

  quantity: z.number().int().positive(),

  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),

  selectedOptions: z.array(z.object({
    optionId: z.string(),
    name: z.string(),
    price: z.number(),
  })).default([]),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   ORDER
========================================================= */

export const OrderSchema = z.object({
  orderId: z.string(),
  orderNumber: z.string(),

  restaurantId: z.string(),

  customerId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),

  status: OrderStatusEnum.default('PENDING'),

  subtotal: z.number().nonnegative(),
  deliveryFee: z.number().nonnegative(),
  discountTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),

  currency: z.string().default('TRY'),

  addressId: z.string(),

  note: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),

  acceptedAt: z.coerce.date().nullable().optional(),
  preparedAt: z.coerce.date().nullable().optional(),
  deliveredAt: z.coerce.date().nullable().optional(),
})

export const OrderItemSchema = z.object({
  orderItemId: z.string(),
  orderId: z.string(),

  menuItemId: z.string(),
  variantId: z.string().nullable().optional(),

  name: z.string(),

  quantity: z.number().int().positive(),

  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),

  selectedOptions: z.array(z.object({
    optionId: z.string(),
    name: z.string(),
    price: z.number(),
  })).default([]),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

export const PaymentSchema = z.object({
  paymentId: z.string(),
  orderId: z.string(),

  provider: z.string(),

  status: PaymentStatusEnum.default('PENDING'),

  amount: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  paidAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   DELIVERY
========================================================= */

export const CourierSchema = z.object({
  courierId: z.string(),

  name: z.string(),
  phone: z.string().nullable().optional(),

  vehicleType: z.string().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

export const DeliverySchema = z.object({
  deliveryId: z.string(),

  orderId: z.string(),
  courierId: z.string().nullable().optional(),

  status: DeliveryStatusEnum.default('PENDING'),

  pickupAt: z.coerce.date().nullable().optional(),
  deliveredAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   COUPON
========================================================= */

export const CouponSchema = z.object({
  couponId: z.string(),

  code: z.string(),

  discountType: DiscountTypeEnum,
  discountValue: z.number().positive(),

  minOrderAmount: z.number().nonnegative().nullable().optional(),

  maxUses: z.number().int().positive().nullable().optional(),
  usedCount: z.number().int().nonnegative().default(0),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type Restaurant = z.infer<typeof RestaurantSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type Delivery = z.infer<typeof DeliverySchema>