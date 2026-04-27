import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'

/* =========================================================
   ENUMS
========================================================= */

export const ProductStatusEnum = z.enum([
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
  'OUT_OF_STOCK',
])

export const ProductTypeEnum = z.enum([
  'PHYSICAL',
  'DIGITAL',
  'SERVICE',
])

export const StockStatusEnum = z.enum([
  'IN_STOCK',
  'LOW_STOCK',
  'OUT_OF_STOCK',
  'BACKORDER',
])

export const CartStatusEnum = z.enum([
  'ACTIVE',
  'ABANDONED',
  'CONVERTED',
])

export const OrderStatusEnum = z.enum([
  'PENDING',
  'CONFIRMED',
  'PAID',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
  'PARTIALLY_REFUNDED',
])

export const PaymentStatusEnum = z.enum([
  'PENDING',
  'AUTHORIZED',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
])

export const ShipmentStatusEnum = z.enum([
  'PENDING',
  'READY',
  'SHIPPED',
  'IN_TRANSIT',
  'DELIVERED',
  'FAILED',
  'RETURNED',
])

export const DiscountTypeEnum = z.enum([
  'PERCENTAGE',
  'FIXED_AMOUNT',
  'FREE_SHIPPING',
])

export const ReturnStatusEnum = z.enum([
  'REQUESTED',
  'APPROVED',
  'REJECTED',
  'RECEIVED',
  'REFUNDED',
])

/* =========================================================
   TRANSLATIONS
========================================================= */

export const ProductTranslationSchema = z.object({
  id: z.string(),
  productId: z.string(),
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),

  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
})

export const ProductCategoryTranslationSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
})

/* =========================================================
   CATEGORY / BRAND / SUPPLIER
========================================================= */

export const ProductCategorySchema = z.object({
  categoryId: z.string(),

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),

  parentId: z.string().nullable().optional(),

  sortOrder: z.number().int().nonnegative().default(0),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const BrandSchema = z.object({
  brandId: z.string(),

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  logo: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const SupplierSchema = z.object({
  supplierId: z.string(),

  name: z.string(),
  contactName: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),

  website: z.string().url().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   PRODUCT
========================================================= */

export const ProductSchema = z.object({
  productId: z.string(),

  title: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),

  type: ProductTypeEnum.default('PHYSICAL'),
  status: ProductStatusEnum.default('DRAFT'),

  categoryId: z.string(),
  brandId: z.string().nullable().optional(),
  supplierId: z.string().nullable().optional(),

  sku: z.string().nullable().optional(),
  barcode: z.string().nullable().optional(),

  image: z.string().nullable().optional(),
  gallery: z.array(z.string()).default([]),

  basePrice: z.number().nonnegative(),
  salePrice: z.number().nonnegative().nullable().optional(),
  currency: z.string().default('TRY'),

  stockStatus: StockStatusEnum.default('IN_STOCK'),

  taxable: z.boolean().default(true),
  taxRate: z.number().nonnegative().nullable().optional(),

  weight: z.number().nonnegative().nullable().optional(),
  width: z.number().nonnegative().nullable().optional(),
  height: z.number().nonnegative().nullable().optional(),
  length: z.number().nonnegative().nullable().optional(),

  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),

  publishedAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   PRODUCT ATTRIBUTES / VARIANTS
========================================================= */

export const ProductAttributeSchema = z.object({
  attributeId: z.string(),

  name: z.string(),
  slug: z.string(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const ProductAttributeValueSchema = z.object({
  attributeValueId: z.string(),
  attributeId: z.string(),

  value: z.string(),
  slug: z.string(),

  sortOrder: z.number().int().nonnegative().default(0),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const ProductVariantSchema = z.object({
  variantId: z.string(),
  productId: z.string(),

  title: z.string().nullable().optional(),

  sku: z.string(),
  barcode: z.string().nullable().optional(),

  price: z.number().nonnegative(),
  salePrice: z.number().nonnegative().nullable().optional(),
  currency: z.string().default('TRY'),

  image: z.string().nullable().optional(),

  stockStatus: StockStatusEnum.default('IN_STOCK'),

  weight: z.number().nonnegative().nullable().optional(),
  width: z.number().nonnegative().nullable().optional(),
  height: z.number().nonnegative().nullable().optional(),
  length: z.number().nonnegative().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const ProductVariantOptionSchema = z.object({
  variantOptionId: z.string(),

  variantId: z.string(),
  attributeId: z.string(),
  attributeValueId: z.string(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   INVENTORY
========================================================= */

export const WarehouseSchema = z.object({
  warehouseId: z.string(),

  name: z.string(),
  code: z.string(),

  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const InventorySchema = z.object({
  inventoryId: z.string(),

  productId: z.string(),
  variantId: z.string().nullable().optional(),
  warehouseId: z.string().nullable().optional(),

  quantity: z.number().int().nonnegative(),
  reservedQuantity: z.number().int().nonnegative().default(0),

  lowStockThreshold: z.number().int().nonnegative().default(5),

  updatedAt: z.coerce.date().nullable().optional(),
})

export const InventoryMovementTypeEnum = z.enum([
  'IN',
  'OUT',
  'RESERVE',
  'RELEASE',
  'ADJUSTMENT',
  'RETURN',
])

export const InventoryMovementSchema = z.object({
  movementId: z.string(),

  inventoryId: z.string(),

  type: InventoryMovementTypeEnum,
  quantity: z.number().int(),

  reason: z.string().nullable().optional(),

  orderId: z.string().nullable().optional(),
  orderItemId: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PRODUCT WITH DATA
========================================================= */

export const ProductWithDataSchema = ProductSchema.extend({
  category: ProductCategorySchema.pick({
    categoryId: true,
    title: true,
    slug: true,
    image: true,
  }),

  brand: BrandSchema.pick({
    brandId: true,
    name: true,
    slug: true,
    logo: true,
  }).nullable().optional(),

  variants: z.array(ProductVariantSchema).optional(),
  translations: z.array(ProductTranslationSchema).optional(),
})

/* =========================================================
   CUSTOMER / ADDRESS
========================================================= */

export const CustomerSchema = z.object({
  customerId: z.string(),

  userId: z.string().nullable().optional(),

  email: z.string().email(),
  phone: z.string().nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const AddressSchema = z.object({
  addressId: z.string(),

  customerId: z.string().nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  company: z.string().nullable().optional(),

  addressLine1: z.string(),
  addressLine2: z.string().nullable().optional(),

  city: z.string(),
  state: z.string().nullable().optional(),
  country: z.string(),
  countryCode: z.string().nullable().optional(),
  postalCode: z.string(),

  phone: z.string().nullable().optional(),

  isDefaultBilling: z.boolean().default(false),
  isDefaultShipping: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   CART
========================================================= */

export const CartSchema = z.object({
  cartId: z.string(),

  userId: z.string().nullable().optional(),
  customerId: z.string().nullable().optional(),
  sessionId: z.string().nullable().optional(),

  status: CartStatusEnum.default('ACTIVE'),

  currency: z.string().default('TRY'),

  subtotal: z.number().nonnegative().default(0),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  shippingTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),

  expiresAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const CartItemSchema = z.object({
  cartItemId: z.string(),
  cartId: z.string(),

  productId: z.string(),
  variantId: z.string().nullable().optional(),

  title: z.string(),
  sku: z.string().nullable().optional(),
  image: z.string().nullable().optional(),

  quantity: z.number().int().positive(),

  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   ORDER
========================================================= */

export const OrderSchema = z.object({
  orderId: z.string(),
  orderNumber: z.string(),

  userId: z.string().nullable().optional(),
  customerId: z.string().nullable().optional(),

  customerEmail: z.string().email(),
  customerPhone: z.string().nullable().optional(),

  status: OrderStatusEnum.default('PENDING'),

  subtotal: z.number().nonnegative(),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  shippingTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),

  currency: z.string().default('TRY'),

  billingAddressId: z.string().nullable().optional(),
  shippingAddressId: z.string().nullable().optional(),

  note: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),

  confirmedAt: z.coerce.date().nullable().optional(),
  paidAt: z.coerce.date().nullable().optional(),
  cancelledAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),
})

export const OrderItemSchema = z.object({
  orderItemId: z.string(),
  orderId: z.string(),

  productId: z.string(),
  variantId: z.string().nullable().optional(),

  title: z.string(),
  sku: z.string().nullable().optional(),
  image: z.string().nullable().optional(),

  quantity: z.number().int().positive(),

  unitPrice: z.number().nonnegative(),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  totalPrice: z.number().nonnegative(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

export const PaymentSchema = z.object({
  paymentId: z.string(),
  orderId: z.string(),

  provider: z.string(),
  providerPaymentId: z.string().nullable().optional(),

  status: PaymentStatusEnum.default('PENDING'),

  amount: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  paidAt: z.coerce.date().nullable().optional(),
  failedAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),

  rawResponse: z.record(z.unknown()).nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   SHIPPING
========================================================= */

export const ShippingMethodSchema = z.object({
  shippingMethodId: z.string(),

  name: z.string(),
  code: z.string(),

  description: z.string().nullable().optional(),

  basePrice: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const ShipmentSchema = z.object({
  shipmentId: z.string(),
  orderId: z.string(),

  shippingMethodId: z.string().nullable().optional(),

  carrier: z.string().nullable().optional(),
  trackingNumber: z.string().nullable().optional(),
  trackingUrl: z.string().url().nullable().optional(),

  status: ShipmentStatusEnum.default('PENDING'),

  shippedAt: z.coerce.date().nullable().optional(),
  deliveredAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   COUPON
========================================================= */

export const CouponSchema = z.object({
  couponId: z.string(),

  code: z.string(),

  discountType: DiscountTypeEnum,
  discountValue: z.number().positive(),

  minOrderTotal: z.number().nonnegative().nullable().optional(),

  maxUses: z.number().int().positive().nullable().optional(),
  usedCount: z.number().int().nonnegative().default(0),

  startsAt: z.coerce.date().nullable().optional(),
  expiresAt: z.coerce.date().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   REVIEW
========================================================= */

export const ProductReviewStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'SPAM',
])

export const ProductReviewSchema = z.object({
  reviewId: z.string(),

  productId: z.string(),
  customerId: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),

  rating: z.number().int().min(1).max(5),

  title: z.string().nullable().optional(),
  content: z.string(),

  status: ProductReviewStatusEnum.default('PENDING'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   RETURN / REFUND
========================================================= */

export const ReturnRequestSchema = z.object({
  returnId: z.string(),

  orderId: z.string(),
  customerId: z.string().nullable().optional(),

  status: ReturnStatusEnum.default('REQUESTED'),

  reason: z.string(),
  note: z.string().nullable().optional(),

  refundAmount: z.number().nonnegative().nullable().optional(),

  requestedAt: z.coerce.date().optional(),
  approvedAt: z.coerce.date().nullable().optional(),
  rejectedAt: z.coerce.date().nullable().optional(),
  receivedAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),
})

export const ReturnItemSchema = z.object({
  returnItemId: z.string(),
  returnId: z.string(),

  orderItemId: z.string(),
  productId: z.string(),
  variantId: z.string().nullable().optional(),

  quantity: z.number().int().positive(),

  reason: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type ProductStatus = z.infer<typeof ProductStatusEnum>
export type ProductType = z.infer<typeof ProductTypeEnum>
export type StockStatus = z.infer<typeof StockStatusEnum>
export type CartStatus = z.infer<typeof CartStatusEnum>
export type OrderStatus = z.infer<typeof OrderStatusEnum>
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>
export type ShipmentStatus = z.infer<typeof ShipmentStatusEnum>
export type DiscountType = z.infer<typeof DiscountTypeEnum>
export type ReturnStatus = z.infer<typeof ReturnStatusEnum>

export type ProductTranslation = z.infer<typeof ProductTranslationSchema>
export type ProductCategoryTranslation = z.infer<typeof ProductCategoryTranslationSchema>

export type ProductCategory = z.infer<typeof ProductCategorySchema>
export type Brand = z.infer<typeof BrandSchema>
export type Supplier = z.infer<typeof SupplierSchema>

export type Product = z.infer<typeof ProductSchema>
export type ProductWithData = z.infer<typeof ProductWithDataSchema>

export type ProductAttribute = z.infer<typeof ProductAttributeSchema>
export type ProductAttributeValue = z.infer<typeof ProductAttributeValueSchema>
export type ProductVariant = z.infer<typeof ProductVariantSchema>
export type ProductVariantOption = z.infer<typeof ProductVariantOptionSchema>

export type Warehouse = z.infer<typeof WarehouseSchema>
export type Inventory = z.infer<typeof InventorySchema>
export type InventoryMovementType = z.infer<typeof InventoryMovementTypeEnum>
export type InventoryMovement = z.infer<typeof InventoryMovementSchema>

export type Customer = z.infer<typeof CustomerSchema>
export type Address = z.infer<typeof AddressSchema>

export type Cart = z.infer<typeof CartSchema>
export type CartItem = z.infer<typeof CartItemSchema>

export type Order = z.infer<typeof OrderSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>

export type Payment = z.infer<typeof PaymentSchema>

export type ShippingMethod = z.infer<typeof ShippingMethodSchema>
export type Shipment = z.infer<typeof ShipmentSchema>

export type Coupon = z.infer<typeof CouponSchema>

export type ProductReviewStatus = z.infer<typeof ProductReviewStatusEnum>
export type ProductReview = z.infer<typeof ProductReviewSchema>

export type ReturnRequest = z.infer<typeof ReturnRequestSchema>
export type ReturnItem = z.infer<typeof ReturnItemSchema>