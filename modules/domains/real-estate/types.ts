import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'

/* =========================================================
   ENUMS
========================================================= */

export const PropertyStatusEnum = z.enum([
  'DRAFT',
  'ACTIVE',
  'PUBLISHED',
  'SOLD',
  'RENTED',
  'ARCHIVED',
])

export const PropertyTypeEnum = z.enum([
  'APARTMENT',
  'HOUSE',
  'VILLA',
  'LAND',
  'COMMERCIAL',
  'OFFICE',
])

export const ListingTypeEnum = z.enum([
  'SALE',
  'RENT',
  'SHORT_TERM',
])

export const PropertyConditionEnum = z.enum([
  'NEW',
  'GOOD',
  'RENOVATED',
  'NEEDS_RENOVATION',
])

export const ListingStatusEnum = z.enum([
  'ACTIVE',
  'INACTIVE',
  'EXPIRED',
  'SOLD',
  'RENTED',
])

export const BookingStatusEnum = z.enum([
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
])

export const PaymentStatusEnum = z.enum([
  'PENDING',
  'PAID',
  'FAILED',
  'REFUNDED',
])

/* =========================================================
   TRANSLATIONS
========================================================= */

export const PropertyTranslationSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  lang: AppLanguageEnum,

  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),

  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
})

/* =========================================================
   LOCATION
========================================================= */

export const PropertyLocationSchema = z.object({
  locationId: z.string(),

  country: z.string(),
  countryCode: z.string().nullable().optional(),

  city: z.string(),
  district: z.string().nullable().optional(),
  neighborhood: z.string().nullable().optional(),

  address: z.string().nullable().optional(),

  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   OWNER / AGENT
========================================================= */

export const RealEstateAgentSchema = z.object({
  agentId: z.string(),

  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable().optional(),

  company: z.string().nullable().optional(),

  avatar: z.string().nullable().optional(),

  verified: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

export const PropertyOwnerSchema = z.object({
  ownerId: z.string(),

  userId: z.string().nullable().optional(),

  name: z.string(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PROPERTY
========================================================= */

export const PropertySchema = z.object({
  propertyId: z.string(),

  title: z.string(),
  slug: z.string(),

  description: z.string().nullable().optional(),

  propertyType: PropertyTypeEnum,
  condition: PropertyConditionEnum.default('GOOD'),

  locationId: z.string(),

  ownerId: z.string().nullable().optional(),
  agentId: z.string().nullable().optional(),

  bedrooms: z.number().int().nonnegative().nullable().optional(),
  bathrooms: z.number().int().nonnegative().nullable().optional(),

  areaSize: z.number().nonnegative().nullable().optional(),
  lotSize: z.number().nonnegative().nullable().optional(),

  yearBuilt: z.number().int().nullable().optional(),

  floor: z.number().int().nullable().optional(),
  totalFloors: z.number().int().nullable().optional(),

  parkingSpaces: z.number().int().nullable().optional(),

  furnished: z.boolean().default(false),

  images: z.array(z.string()).default([]),

  amenities: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   LISTING
========================================================= */

export const PropertyListingSchema = z.object({
  listingId: z.string(),

  propertyId: z.string(),

  listingType: ListingTypeEnum,

  price: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  rentPeriod: z.enum(['MONTHLY', 'YEARLY']).nullable().optional(),

  deposit: z.number().nonnegative().nullable().optional(),

  availableFrom: z.coerce.date().nullable().optional(),

  status: ListingStatusEnum.default('ACTIVE'),

  featured: z.boolean().default(false),

  viewCount: z.number().int().nonnegative().default(0),

  publishedAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   PROPERTY WITH DATA
========================================================= */

export const PropertyWithDataSchema = PropertySchema.extend({
  location: PropertyLocationSchema,
  agent: RealEstateAgentSchema.nullable().optional(),
  owner: PropertyOwnerSchema.nullable().optional(),
  listings: z.array(PropertyListingSchema).optional(),
  translations: z.array(PropertyTranslationSchema).optional(),
})

/* =========================================================
   SHORT TERM BOOKING (Airbnb style)
========================================================= */

export const PropertyBookingSchema = z.object({
  bookingId: z.string(),

  propertyId: z.string(),
  listingId: z.string(),

  userId: z.string(),

  guestCount: z.number().int().positive(),

  checkInDate: z.coerce.date(),
  checkOutDate: z.coerce.date(),

  nights: z.number().int().positive(),

  subtotal: z.number().nonnegative(),
  serviceFee: z.number().nonnegative().default(0),
  cleaningFee: z.number().nonnegative().default(0),
  total: z.number().nonnegative(),

  currency: z.string().default('TRY'),

  status: BookingStatusEnum.default('PENDING'),

  createdAt: z.coerce.date().optional(),
  confirmedAt: z.coerce.date().nullable().optional(),
  cancelledAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

export const RealEstatePaymentSchema = z.object({
  paymentId: z.string(),

  bookingId: z.string().nullable().optional(),
  listingId: z.string().nullable().optional(),

  amount: z.number().nonnegative(),
  currency: z.string().default('TRY'),

  provider: z.string(),

  status: PaymentStatusEnum.default('PENDING'),

  paidAt: z.coerce.date().nullable().optional(),
  refundedAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   FAVORITES / SAVED
========================================================= */

export const PropertyFavoriteSchema = z.object({
  favoriteId: z.string(),

  userId: z.string(),
  propertyId: z.string(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type PropertyStatus = z.infer<typeof PropertyStatusEnum>
export type PropertyType = z.infer<typeof PropertyTypeEnum>
export type ListingType = z.infer<typeof ListingTypeEnum>
export type PropertyCondition = z.infer<typeof PropertyConditionEnum>
export type ListingStatus = z.infer<typeof ListingStatusEnum>

export type Property = z.infer<typeof PropertySchema>
export type PropertyWithData = z.infer<typeof PropertyWithDataSchema>
export type PropertyTranslation = z.infer<typeof PropertyTranslationSchema>

export type PropertyLocation = z.infer<typeof PropertyLocationSchema>

export type RealEstateAgent = z.infer<typeof RealEstateAgentSchema>
export type PropertyOwner = z.infer<typeof PropertyOwnerSchema>

export type PropertyListing = z.infer<typeof PropertyListingSchema>

export type PropertyBooking = z.infer<typeof PropertyBookingSchema>
export type RealEstatePayment = z.infer<typeof RealEstatePaymentSchema>

export type PropertyFavorite = z.infer<typeof PropertyFavoriteSchema>