import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'

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

export const PaymentStatusEnum = z.enum([
  'PENDING',
  'AUTHORIZED',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
])

export const TicketStatusEnum = z.enum([
  'VALID',
  'USED',
  'CANCELLED',
  'REFUNDED',
  'TRANSFERRED',
])

export const DiscountTypeEnum = z.enum([
  'PERCENTAGE',
  'FIXED_AMOUNT',
])

/* =========================================================
   TRANSLATIONS
========================================================= */

export const EventTranslationSchema = z.object({
  id: z.string(),
  eventId: z.string(),
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),

  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
})

export const EventCategoryTranslationSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
})

/* =========================================================
   CATEGORY
========================================================= */

export const EventCategorySchema = z.object({
  categoryId: z.string(),

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),

  parentId: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   ORGANIZER
========================================================= */

export const OrganizerSchema = z.object({
  organizerId: z.string(),

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  logo: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),

  verified: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   VENUE / HALL / SECTION / SEAT
========================================================= */

export const VenueSchema = z.object({
  venueId: z.string(),

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  address: z.string(),
  city: z.string(),
  state: z.string().nullable().optional(),
  country: z.string(),
  countryCode: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  image: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const VenueHallSchema = z.object({
  hallId: z.string(),
  venueId: z.string(),

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  capacity: z.number().int().nonnegative().nullable().optional(),
  floor: z.string().nullable().optional(),

  image: z.string().nullable().optional(),
  seatingMapImage: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const VenueSectionSchema = z.object({
  sectionId: z.string(),
  hallId: z.string(),

  parentSectionId: z.string().nullable().optional(),

  name: z.string(),
  label: z.string().nullable().optional(),

  capacity: z.number().int().nonnegative().nullable().optional(),

  sortOrder: z.number().int().nonnegative().default(0),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const VenueSeatSchema = z.object({
  seatId: z.string(),
  sectionId: z.string(),

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
  eventId: z.string(),

  title: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),

  categoryId: z.string(),
  organizerId: z.string(),

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
  currency: z.string().default('TRY'),

  totalCapacity: z.number().int().nonnegative().nullable().optional(),
  remainingCapacity: z.number().int().nonnegative().nullable().optional(),

  onlineUrl: z.string().url().nullable().optional(),

  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),

  publishedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const EventHallSchema = z.object({
  eventHallId: z.string(),
  eventId: z.string(),
  hallId: z.string(),

  capacityOverride: z.number().int().nonnegative().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const EventSectionPricingSchema = z.object({
  eventSectionPricingId: z.string(),

  eventId: z.string(),
  hallId: z.string(),
  sectionId: z.string(),

  name: z.string(),
  description: z.string().nullable().optional(),

  price: z.number().nonnegative(),
  currency: z.string().default('TRY'),

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
  eventSeatId: z.string(),

  eventId: z.string(),
  hallId: z.string(),
  sectionId: z.string(),
  seatId: z.string(),

  pricingId: z.string().nullable().optional(),

  status: SeatStatusEnum.default('AVAILABLE'),

  holdExpiresAt: z.coerce.date().nullable().optional(),
  heldBySessionId: z.string().nullable().optional(),
  heldByUserId: z.string().nullable().optional(),

  orderId: z.string().nullable().optional(),
  ticketId: z.string().nullable().optional(),

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

  halls: z.array(
    EventHallSchema.extend({
      hall: VenueHallSchema,
    })
  ).optional(),

  translations: z.array(EventTranslationSchema).optional(),
})

/* =========================================================
   HOLD / CART
========================================================= */

export const TicketHoldSchema = z.object({
  holdId: z.string(),

  eventId: z.string(),
  hallId: z.string(),
  sectionId: z.string(),
  seatId: z.string(),
  eventSeatId: z.string(),

  pricingId: z.string(),

  sessionId: z.string(),
  userId: z.string().nullable().optional(),

  expiresAt: z.coerce.date(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   ORDER
========================================================= */

export const OrderSchema = z.object({
  orderId: z.string(),

  userId: z.string().nullable().optional(),
  eventId: z.string(),

  buyerName: z.string(),
  buyerEmail: z.string().email(),
  buyerPhone: z.string().nullable().optional(),

  status: OrderStatusEnum.default('PENDING'),

  subtotal: z.number().nonnegative(),
  serviceFee: z.number().nonnegative().default(0),
  discountTotal: z.number().nonnegative().default(0),
  taxTotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),

  currency: z.string().default('TRY'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  paidAt: z.coerce.date().nullable().optional(),
  cancelledAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),
})

export const OrderItemSchema = z.object({
  orderItemId: z.string(),
  orderId: z.string(),

  eventId: z.string(),
  hallId: z.string(),
  sectionId: z.string(),
  seatId: z.string(),
  eventSeatId: z.string(),

  pricingId: z.string(),

  seatLabel: z.string(),
  sectionName: z.string(),
  hallName: z.string(),

  unitPrice: z.number().nonnegative(),
  serviceFee: z.number().nonnegative().default(0),
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
   ISSUED TICKET
========================================================= */

export const IssuedTicketSchema = z.object({
  ticketId: z.string(),

  orderId: z.string(),
  orderItemId: z.string(),

  eventId: z.string(),
  hallId: z.string(),
  sectionId: z.string(),
  seatId: z.string(),
  eventSeatId: z.string(),

  pricingId: z.string(),

  attendeeName: z.string().nullable().optional(),
  attendeeEmail: z.string().email().nullable().optional(),

  qrCode: z.string(),
  barcode: z.string().nullable().optional(),

  status: TicketStatusEnum.default('VALID'),

  checkedInAt: z.coerce.date().nullable().optional(),
  checkedInBy: z.string().nullable().optional(),

  transferredToUserId: z.string().nullable().optional(),
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
  checkInId: z.string(),

  ticketId: z.string(),
  eventId: z.string(),

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

export const CouponSchema = z.object({
  couponId: z.string(),

  code: z.string(),
  eventId: z.string().nullable().optional(),

  discountType: DiscountTypeEnum,
  discountValue: z.number().positive(),

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
export type VenueHall = z.infer<typeof VenueHallSchema>
export type VenueSection = z.infer<typeof VenueSectionSchema>
export type VenueSeat = z.infer<typeof VenueSeatSchema>

export type Event = z.infer<typeof EventSchema>
export type EventHall = z.infer<typeof EventHallSchema>
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