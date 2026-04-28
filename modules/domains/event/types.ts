import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'
import { IdSchema, EmailSchema } from '../common/BaseTypes'
import { CurrencySchema } from '../common/MoneyTypes'
import { PaymentStatusEnum, PaymentBaseSchema } from '../common/PaymentTypes'
import { DiscountTypeEnum, CouponBaseSchema } from '../common/DiscountTypes'
import { LocationSchema } from '../common/LocationTypes'

/* =========================================================
   ENUMS
========================================================= */

export const EventStatusEnum = z.enum([
  'DRAFT',
  'PUBLISHED',
  'SCHEDULED',
  'CANCELLED',
  'POSTPONED',
  'SOLD_OUT',
  'ARCHIVED',
])

export const EventVisibilityEnum = z.enum(['PUBLIC', 'PRIVATE', 'UNLISTED'])
export const EventFormatEnum = z.enum(['PHYSICAL', 'ONLINE', 'HYBRID'])

export const SeatStatusEnum = z.enum([
  'AVAILABLE',
  'HELD',
  'SOLD',
  'BLOCKED',
])

export const OrderStatusEnum = z.enum([
  'PENDING',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
  'PARTIALLY_REFUNDED',
])

export const TicketStatusEnum = z.enum([
  'VALID',
  'USED',
  'CANCELLED',
  'REFUNDED',
  'TRANSFERRED',
])

/* =========================================================
   RE-EXPORTS FROM COMMON
========================================================= */

export { PaymentStatusEnum, DiscountTypeEnum }

/* =========================================================
   TRANSLATIONS
========================================================= */

export const EventTranslationSchema = z.object({
  id: IdSchema,
  eventId: IdSchema,
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),

  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
})

export const EventCategoryTranslationSchema = z.object({
  id: IdSchema,
  categoryId: IdSchema,
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
})

/* =========================================================
   CATEGORY
========================================================= */

export const EventCategorySchema = z.object({
  categoryId: IdSchema,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),

  parentId: IdSchema.nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   ORGANIZER
========================================================= */

export const OrganizerSchema = z.object({
  organizerId: IdSchema,

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  logo: z.string().nullable().optional(),
  website: z.url().nullable().optional(),
  email: EmailSchema.nullable().optional(),
  phone: z.string().nullable().optional(),

  verified: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   VENUE / HALL / SECTION / SEAT
========================================================= */

export const VenueSchema = LocationSchema.extend({
  venueId: IdSchema,

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  address: z.string(),
  city: z.string(),
  country: z.string(),

  image: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const VenueSectionSchema = z.object({
  sectionId: IdSchema,
  venueId: IdSchema,

  parentSectionId: IdSchema.nullable().optional(),

  name: z.string(),
  label: z.string().nullable().optional(),

  capacity: z.number().int().nonnegative().nullable().optional(),

  sortOrder: z.number().int().nonnegative().default(0),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const VenueSeatSchema = z.object({
  seatId: IdSchema,
  sectionId: IdSchema,

  row: z.string(),
  number: z.string(),

  label: z.string().nullable().optional(),

  x: z.number().nullable().optional(),
  y: z.number().nullable().optional(),

  accessible: z.boolean().default(false),
  companionSeat: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   EVENT
========================================================= */

export const EventSchema = z.object({
  eventId: IdSchema,

  title: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),

  categoryId: IdSchema,
  organizerId: IdSchema,

  format: EventFormatEnum.default('PHYSICAL'),

  startAt: z.coerce.date(),
  endAt: z.coerce.date().nullable().optional(),

  timezone: z.string().default('UTC'),

  image: z.string().nullable().optional(),
  bannerImage: z.string().nullable().optional(),

  status: EventStatusEnum.default('DRAFT'),
  visibility: EventVisibilityEnum.default('PUBLIC'),

  minPrice: z.number().nonnegative().nullable().optional(),
  maxPrice: z.number().nonnegative().nullable().optional(),
  currency: CurrencySchema,

  totalCapacity: z.number().int().nonnegative().nullable().optional(),
  remainingCapacity: z.number().int().nonnegative().nullable().optional(),

  onlineUrl: z.url().nullable().optional(),

  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),

  publishedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const EventSectionPricingSchema = z.object({
  eventSectionPricingId: IdSchema,

  eventId: IdSchema,
  sectionId: IdSchema,

  name: z.string(),
  description: z.string().nullable().optional(),

  price: z.number().nonnegative(),
  currency: CurrencySchema,

  capacity: z.number().int().nonnegative().nullable().optional(),
  soldCount: z.number().int().nonnegative().default(0),

  saleStartsAt: z.coerce.date().nullable().optional(),
  saleEndsAt: z.coerce.date().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const EventSeatSchema = z.object({
  eventSeatId: IdSchema,

  eventId: IdSchema,
  sectionId: IdSchema,
  seatId: IdSchema,

  pricingId: IdSchema.nullable().optional(),

  status: SeatStatusEnum.default('AVAILABLE'),

  holdExpiresAt: z.coerce.date().nullable().optional(),
  heldBySessionId: z.string().nullable().optional(),
  heldByUserId: IdSchema.nullable().optional(),

  orderId: IdSchema.nullable().optional(),
  ticketId: IdSchema.nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   EVENT WITH DATA
========================================================= */

export const EventWithDataSchema = EventSchema.extend({
  category: EventCategorySchema.pick({
    categoryId: true,
    title: true,
    slug: true,
    image: true,
  }),

  organizer: OrganizerSchema.pick({
    organizerId: true,
    name: true,
    slug: true,
    logo: true,
    verified: true,
  }),

  translations: z.array(EventTranslationSchema).optional(),
})

/* =========================================================
   HOLD / CART
========================================================= */

export const TicketHoldSchema = z.object({
  holdId: IdSchema,

  eventId: IdSchema,
  sectionId: IdSchema,
  seatId: IdSchema,
  eventSeatId: IdSchema,

  pricingId: IdSchema,

  sessionId: z.string(),
  userId: IdSchema.nullable().optional(),

  expiresAt: z.coerce.date(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   ORDER
========================================================= */

export const OrderSchema = z.object({
  orderId: IdSchema,

  userId: IdSchema.nullable().optional(),
  eventId: IdSchema,

  buyerName: z.string(),
  buyerEmail: EmailSchema,
  buyerPhone: z.string().nullable().optional(),

  status: OrderStatusEnum.default('PENDING'),

  subtotal: z.number().nonnegative(),
  serviceFee: z.number().nonnegative().default(0),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),

  currency: CurrencySchema,

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  paidAt: z.coerce.date().nullable().optional(),
  cancelledAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),
})

export const OrderItemSchema = z.object({
  orderItemId: IdSchema,
  orderId: IdSchema,

  eventId: IdSchema,
  sectionId: IdSchema,
  seatId: IdSchema,
  eventSeatId: IdSchema,

  pricingId: IdSchema,

  seatLabel: z.string(),
  sectionName: z.string(),

  unitPrice: z.number().nonnegative(),
  serviceFee: z.number().nonnegative().default(0),
  totalPrice: z.number().nonnegative(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

export const PaymentSchema = PaymentBaseSchema.extend({
  orderId: IdSchema,

  paidAt: z.coerce.date().nullable().optional(),
  failedAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),

  rawResponse: z.record(z.string(), z.unknown()).nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   ISSUED TICKET
========================================================= */

export const IssuedTicketSchema = z.object({
  ticketId: IdSchema,

  orderId: IdSchema,
  orderItemId: IdSchema,

  eventId: IdSchema,
  sectionId: IdSchema,
  seatId: IdSchema,
  eventSeatId: IdSchema,

  pricingId: IdSchema,

  attendeeName: z.string().nullable().optional(),
  attendeeEmail: EmailSchema.nullable().optional(),

  qrCode: z.string(),
  barcode: z.string().nullable().optional(),

  status: TicketStatusEnum.default('VALID'),

  checkedInAt: z.coerce.date().nullable().optional(),
  checkedInBy: z.string().nullable().optional(),

  transferredToUserId: IdSchema.nullable().optional(),
  transferredAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  cancelledAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   CHECK-IN
========================================================= */

export const TicketCheckInSchema = z.object({
  checkInId: IdSchema,

  ticketId: IdSchema,
  eventId: IdSchema,

  checkedInBy: z.string(),
  checkedInAt: z.coerce.date(),

  deviceId: z.string().nullable().optional(),
  gate: z.string().nullable().optional(),

  valid: z.boolean(),
  reason: z.string().nullable().optional(),
})

/* =========================================================
   COUPON
========================================================= */

export const CouponSchema = CouponBaseSchema.extend({
  eventId: IdSchema.nullable().optional(),

  startsAt: z.coerce.date().nullable().optional(),
  expiresAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
}).omit({ maxUsage: true, validFrom: true, validUntil: true, isActive: true }).extend({
  maxUses: z.number().int().positive().nullable().optional(),
  active: z.boolean().default(true),
})

/* =========================================================
   TYPES
========================================================= */

export type EventStatus = z.infer<typeof EventStatusEnum>
export type EventVisibility = z.infer<typeof EventVisibilityEnum>
export type EventFormat = z.infer<typeof EventFormatEnum>

export type SeatStatus = z.infer<typeof SeatStatusEnum>
export type OrderStatus = z.infer<typeof OrderStatusEnum>
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>
export type TicketStatus = z.infer<typeof TicketStatusEnum>
export type DiscountType = z.infer<typeof DiscountTypeEnum>

export type EventTranslation = z.infer<typeof EventTranslationSchema>
export type EventCategoryTranslation = z.infer<typeof EventCategoryTranslationSchema>

export type EventCategory = z.infer<typeof EventCategorySchema>
export type Organizer = z.infer<typeof OrganizerSchema>

export type Venue = z.infer<typeof VenueSchema>
export type VenueSection = z.infer<typeof VenueSectionSchema>
export type VenueSeat = z.infer<typeof VenueSeatSchema>

export type Event = z.infer<typeof EventSchema>
export type EventSectionPricing = z.infer<typeof EventSectionPricingSchema>
export type EventSeat = z.infer<typeof EventSeatSchema>
export type EventWithData = z.infer<typeof EventWithDataSchema>

export type TicketHold = z.infer<typeof TicketHoldSchema>

export type Order = z.infer<typeof OrderSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>

export type Payment = z.infer<typeof PaymentSchema>

export type IssuedTicket = z.infer<typeof IssuedTicketSchema>
export type TicketCheckIn = z.infer<typeof TicketCheckInSchema>

export type Coupon = z.infer<typeof CouponSchema>

/* =========================================================
   ARTIST
========================================================= */

export const ArtistSchema = z.object({
  artistId: IdSchema,
  name: z.string(),
  slug: z.string(),
  bio: z.string().nullable().optional(),
  shortBio: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  genres: z.array(z.string()).default([]),
  origin: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  verified: z.boolean().default(false),
  createdAt: z.coerce.date().optional(),
})

export type Artist = z.infer<typeof ArtistSchema>

/* =========================================================
   CHECKOUT VIEW TYPES
========================================================= */

export const BuyerInfoSchema = z.object({
  name: z.string().min(1),
  email: EmailSchema,
  phone: z.string().min(1),
})

export const CartItemSchema = z.object({
  pricing: EventSectionPricingSchema,
  quantity: z.number().int().min(1),
})

export type BuyerInfo = z.infer<typeof BuyerInfoSchema>
export type CartItem = z.infer<typeof CartItemSchema>
