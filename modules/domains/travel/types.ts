import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'
import { IdSchema, BaseEntitySchema, EmailSchema } from '../common/BaseTypes'
import { CurrencySchema, PriceFieldsSchema, OrderTotalsSchema } from '../common/MoneyTypes'
import { PaymentStatusEnum, PaymentBaseSchema } from '../common/PaymentTypes'
import { LocationSchema } from '../common/LocationTypes'
import { SeoFieldsSchema } from '../common/SeoTypes'

/* =========================================================
   ENUMS
========================================================= */

export const TravelBookingStatusEnum = z.enum([
  'DRAFT',
  'PENDING',
  'CONFIRMED',
  'PAID',
  'CANCELLED',
  'REFUNDED',
  'COMPLETED',
])

// Fix 5: TravelPaymentStatusEnum is identical to PaymentStatusEnum — alias it
export const TravelPaymentStatusEnum = PaymentStatusEnum  // backward compat alias

export const FlightCabinClassEnum = z.enum([
  'ECONOMY',
  'PREMIUM_ECONOMY',
  'BUSINESS',
  'FIRST',
])

export const FlightSegmentStatusEnum = z.enum([
  'SCHEDULED',
  'DELAYED',
  'CANCELLED',
  'DEPARTED',
  'ARRIVED',
])

export const HotelRoomStatusEnum = z.enum([
  'AVAILABLE',
  'HELD',
  'BOOKED',
  'UNAVAILABLE',
])

export const GuestTypeEnum = z.enum([
  'ADULT',
  'CHILD',
  'INFANT',
])

/* =========================================================
   LOCATION
========================================================= */

export const TravelLocationSchema = LocationSchema.extend({
  locationId: IdSchema,

  name: z.string(),
  slug: z.string(),

  city: z.string(),    // required here (override of optional in LocationSchema)
  country: z.string(), // required here
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

export const AirportSchema = LocationSchema.extend({
  airportId: IdSchema,

  name: z.string(),
  code: z.string(),

  city: z.string(),    // required here (override of optional in LocationSchema)
  country: z.string(), // required here

  timezone: z.string().default('UTC'),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   AIRLINE / FLIGHT
========================================================= */

export const AirlineSchema = z.object({
  airlineId: IdSchema,

  name: z.string(),
  code: z.string(),

  logo: z.string().nullable().optional(),
  website: z.url().nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

export const FlightSchema = z.object({
  flightId: IdSchema,

  airlineId: IdSchema,

  flightNumber: z.string(),

  originAirportId: IdSchema,
  destinationAirportId: IdSchema,

  departureAt: z.coerce.date(),
  arrivalAt: z.coerce.date(),

  durationMinutes: z.number().int().positive().nullable().optional(),

  status: FlightSegmentStatusEnum.default('SCHEDULED'),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

export const FlightFareSchema = PriceFieldsSchema.extend({
  fareId: IdSchema,

  flightId: IdSchema,

  cabinClass: FlightCabinClassEnum.default('ECONOMY'),

  name: z.string(),
  description: z.string().nullable().optional(),

  baggageAllowanceKg: z.number().nonnegative().nullable().optional(),
  cabinBaggageIncluded: z.boolean().default(true),

  refundable: z.boolean().default(false),
  changeable: z.boolean().default(false),

  availableSeats: z.number().int().nonnegative(),

  saleStartsAt: z.coerce.date().nullable().optional(),
  saleEndsAt: z.coerce.date().nullable().optional(),

  active: z.boolean().default(true),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

export const FlightSeatSchema = z.object({
  flightSeatId: IdSchema,

  flightId: IdSchema,

  cabinClass: FlightCabinClassEnum.default('ECONOMY'),

  row: z.string(),
  number: z.string(),

  seatLabel: z.string(),

  priceExtra: z.number().nonnegative().default(0),

  status: HotelRoomStatusEnum.default('AVAILABLE'),

  heldBySessionId: z.string().nullable().optional(),
  holdExpiresAt: z.coerce.date().nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   HOTEL
========================================================= */

export const HotelTranslationSchema = z.object({
  id: IdSchema,
  hotelId: IdSchema,
  lang: AppLanguageEnum,

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
}).extend(SeoFieldsSchema.omit({ keywords: true }).shape)

export const HotelSchema = LocationSchema.extend({
  hotelId: IdSchema,

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  locationId: IdSchema,

  address: z.string(),
  city: z.string(),    // required here (override of optional in LocationSchema)
  country: z.string(), // required here

  starRating: z.number().int().min(1).max(5).nullable().optional(),

  images: z.array(z.string()).default([]),

  checkInTime: z.string().nullable().optional(),
  checkOutTime: z.string().nullable().optional(),

  amenities: z.array(z.string()).default([]),

  active: z.boolean().default(true),
}).extend(BaseEntitySchema.shape)

export const HotelRoomTypeSchema = PriceFieldsSchema.extend({
  roomTypeId: IdSchema,

  hotelId: IdSchema,

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  capacityAdults: z.number().int().positive(),
  capacityChildren: z.number().int().nonnegative().default(0),

  bedType: z.string().nullable().optional(),

  images: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),

  basePrice: z.number().nonnegative(),
}).extend(BaseEntitySchema.shape)

export const HotelRoomInventorySchema = PriceFieldsSchema.extend({
  inventoryId: IdSchema,

  hotelId: IdSchema,
  roomTypeId: IdSchema,

  date: z.coerce.date(),

  totalRooms: z.number().int().nonnegative(),
  bookedRooms: z.number().int().nonnegative().default(0),
  heldRooms: z.number().int().nonnegative().default(0),

  price: z.number().nonnegative(),

  status: HotelRoomStatusEnum.default('AVAILABLE'),

  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   TRAVELER / GUEST
========================================================= */

export const TravelerSchema = z.object({
  travelerId: IdSchema,

  userId: IdSchema.nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  email: EmailSchema.nullable().optional(),
  phone: z.string().nullable().optional(),

  type: GuestTypeEnum.default('ADULT'),

  birthDate: z.coerce.date().nullable().optional(),

  nationality: z.string().nullable().optional(),
  passportNumber: z.string().nullable().optional(),
  passportExpiresAt: z.coerce.date().nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   BOOKING
========================================================= */

export const TravelBookingSchema = OrderTotalsSchema.pick({
  subtotal: true,
  serviceFee: true,
  discountTotal: true,
  taxTotal: true,
  total: true,
}).extend({
  bookingId: IdSchema,
  bookingNumber: z.string(),

  userId: IdSchema.nullable().optional(),

  buyerName: z.string(),
  buyerEmail: EmailSchema,
  buyerPhone: z.string().nullable().optional(),

  status: TravelBookingStatusEnum.default('PENDING'),

  currency: CurrencySchema,

  paidAt: z.coerce.date().nullable().optional(),
  cancelledAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

export const FlightBookingItemSchema = z.object({
  flightBookingItemId: IdSchema,

  bookingId: IdSchema,

  flightId: IdSchema,
  fareId: IdSchema,

  travelerId: IdSchema,

  flightSeatId: IdSchema.nullable().optional(),
  seatLabel: z.string().nullable().optional(),

  cabinClass: FlightCabinClassEnum,

  price: z.number().nonnegative(),
  taxTotal: z.number().nonnegative().default(0),
  totalPrice: z.number().nonnegative(),

  ticketNumber: z.string().nullable().optional(),
  pnr: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

export const HotelBookingItemSchema = z.object({
  hotelBookingItemId: IdSchema,

  bookingId: IdSchema,

  hotelId: IdSchema,
  roomTypeId: IdSchema,

  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),

  nights: z.number().int().positive(),

  adults: z.number().int().positive(),
  children: z.number().int().nonnegative().default(0),

  quantity: z.number().int().positive().default(1),

  pricePerNight: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),

  confirmationNumber: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

// Fix 5: Use PaymentBaseSchema directly (status already has PaymentStatusEnum)
export const TravelPaymentSchema = PaymentBaseSchema.extend({
  bookingId: IdSchema,

  paidAt: z.coerce.date().nullable().optional(),
  failedAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),

  rawResponse: z.record(z.string(), z.unknown()).nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   CANCELLATION / REFUND
========================================================= */

export const TravelCancellationSchema = z.object({
  cancellationId: IdSchema,

  bookingId: IdSchema,

  reason: z.string().nullable().optional(),

  refundAmount: z.number().nonnegative().nullable().optional(),
  penaltyAmount: z.number().nonnegative().default(0),

  requestedAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type TravelBookingStatus = z.infer<typeof TravelBookingStatusEnum>
export type TravelPaymentStatus = z.infer<typeof TravelPaymentStatusEnum>
export type FlightCabinClass = z.infer<typeof FlightCabinClassEnum>
export type FlightSegmentStatus = z.infer<typeof FlightSegmentStatusEnum>
export type HotelRoomStatus = z.infer<typeof HotelRoomStatusEnum>
export type GuestType = z.infer<typeof GuestTypeEnum>

export type TravelLocation = z.infer<typeof TravelLocationSchema>
export type Airport = z.infer<typeof AirportSchema>

export type Airline = z.infer<typeof AirlineSchema>
export type Flight = z.infer<typeof FlightSchema>
export type FlightFare = z.infer<typeof FlightFareSchema>
export type FlightSeat = z.infer<typeof FlightSeatSchema>

export type HotelTranslation = z.infer<typeof HotelTranslationSchema>
export type Hotel = z.infer<typeof HotelSchema>
export type HotelRoomType = z.infer<typeof HotelRoomTypeSchema>
export type HotelRoomInventory = z.infer<typeof HotelRoomInventorySchema>

export type Traveler = z.infer<typeof TravelerSchema>

export type TravelBooking = z.infer<typeof TravelBookingSchema>
export type FlightBookingItem = z.infer<typeof FlightBookingItemSchema>
export type HotelBookingItem = z.infer<typeof HotelBookingItemSchema>

export type TravelPayment = z.infer<typeof TravelPaymentSchema>
export type TravelCancellation = z.infer<typeof TravelCancellationSchema>
