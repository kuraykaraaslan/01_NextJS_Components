import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'

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

export const TravelPaymentStatusEnum = z.enum([
  'PENDING',
  'AUTHORIZED',
  'PAID',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
])

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

export const TravelLocationSchema = z.object({
  locationId: z.string(),

  name: z.string(),
  slug: z.string(),

  city: z.string(),
  country: z.string(),
  countryCode: z.string().nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const AirportSchema = z.object({
  airportId: z.string(),

  name: z.string(),
  code: z.string(), // IST, ADB, JFK

  city: z.string(),
  country: z.string(),
  countryCode: z.string().nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  timezone: z.string().default('UTC'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   AIRLINE / FLIGHT
========================================================= */

export const AirlineSchema = z.object({
  airlineId: z.string(),

  name: z.string(),
  code: z.string(), // TK, PC, LH

  logo: z.string().nullable().optional(),
  website: z.string().url().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const FlightSchema = z.object({
  flightId: z.string(),

  airlineId: z.string(),

  flightNumber: z.string(),

  originAirportId: z.string(),
  destinationAirportId: z.string(),

  departureAt: z.coerce.date(),
  arrivalAt: z.coerce.date(),

  durationMinutes: z.number().int().positive().nullable().optional(),

  status: FlightSegmentStatusEnum.default('SCHEDULED'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const FlightFareSchema = z.object({
  fareId: z.string(),

  flightId: z.string(),

  cabinClass: FlightCabinClassEnum.default('ECONOMY'),

  name: z.string(), // EcoFly, ExtraFly, PrimeFly
  description: z.string().nullable().optional(),

  price: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  baggageAllowanceKg: z.number().nonnegative().nullable().optional(),
  cabinBaggageIncluded: z.boolean().default(true),

  refundable: z.boolean().default(false),
  changeable: z.boolean().default(false),

  availableSeats: z.number().int().nonnegative(),

  saleStartsAt: z.coerce.date().nullable().optional(),
  saleEndsAt: z.coerce.date().nullable().optional(),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const FlightSeatSchema = z.object({
  flightSeatId: z.string(),

  flightId: z.string(),

  cabinClass: FlightCabinClassEnum.default('ECONOMY'),

  row: z.string(),
  number: z.string(),

  seatLabel: z.string(),

  priceExtra: z.number().nonnegative().default(0),

  status: HotelRoomStatusEnum.default('AVAILABLE'),

  heldBySessionId: z.string().nullable().optional(),
  holdExpiresAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   HOTEL
========================================================= */

export const HotelTranslationSchema = z.object({
  id: z.string(),
  hotelId: z.string(),
  lang: AppLanguageEnum,

  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
})

export const HotelSchema = z.object({
  hotelId: z.string(),

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  locationId: z.string(),

  address: z.string(),
  city: z.string(),
  country: z.string(),
  countryCode: z.string().nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  starRating: z.number().int().min(1).max(5).nullable().optional(),

  images: z.array(z.string()).default([]),

  checkInTime: z.string().nullable().optional(),
  checkOutTime: z.string().nullable().optional(),

  amenities: z.array(z.string()).default([]),

  active: z.boolean().default(true),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const HotelRoomTypeSchema = z.object({
  roomTypeId: z.string(),

  hotelId: z.string(),

  name: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  capacityAdults: z.number().int().positive(),
  capacityChildren: z.number().int().nonnegative().default(0),

  bedType: z.string().nullable().optional(),

  images: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),

  basePrice: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const HotelRoomInventorySchema = z.object({
  inventoryId: z.string(),

  hotelId: z.string(),
  roomTypeId: z.string(),

  date: z.coerce.date(),

  totalRooms: z.number().int().nonnegative(),
  bookedRooms: z.number().int().nonnegative().default(0),
  heldRooms: z.number().int().nonnegative().default(0),

  price: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  status: HotelRoomStatusEnum.default('AVAILABLE'),

  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   TRAVELER / GUEST
========================================================= */

export const TravelerSchema = z.object({
  travelerId: z.string(),

  userId: z.string().nullable().optional(),

  firstName: z.string(),
  lastName: z.string(),

  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),

  type: GuestTypeEnum.default('ADULT'),

  birthDate: z.coerce.date().nullable().optional(),

  nationality: z.string().nullable().optional(),
  passportNumber: z.string().nullable().optional(),
  passportExpiresAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   BOOKING
========================================================= */

export const TravelBookingSchema = z.object({
  bookingId: z.string(),
  bookingNumber: z.string(),

  userId: z.string().nullable().optional(),

  buyerName: z.string(),
  buyerEmail: z.string().email(),
  buyerPhone: z.string().nullable().optional(),

  status: TravelBookingStatusEnum.default('PENDING'),

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

export const FlightBookingItemSchema = z.object({
  flightBookingItemId: z.string(),

  bookingId: z.string(),

  flightId: z.string(),
  fareId: z.string(),

  travelerId: z.string(),

  flightSeatId: z.string().nullable().optional(),
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
  hotelBookingItemId: z.string(),

  bookingId: z.string(),

  hotelId: z.string(),
  roomTypeId: z.string(),

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

export const TravelPaymentSchema = z.object({
  paymentId: z.string(),
  bookingId: z.string(),

  provider: z.string(),
  providerPaymentId: z.string().nullable().optional(),

  status: TravelPaymentStatusEnum.default('PENDING'),

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
   CANCELLATION / REFUND
========================================================= */

export const TravelCancellationSchema = z.object({
  cancellationId: z.string(),

  bookingId: z.string(),

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