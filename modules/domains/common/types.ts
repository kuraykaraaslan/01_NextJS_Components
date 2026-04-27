import { z } from 'zod'
import { AppLanguageEnum } from './I18nTypes'

/* =========================================================
   COMMON
========================================================= */

export const IdSchema = z.string().min(1)
export const UuidSchema = z.string().uuid()
export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)

export const DateSchema = z.coerce.date()
export const NullableDateSchema = z.coerce.date().nullable().optional()

export const EmailSchema = z.string().email()
export const PasswordSchema = z.string().min(8)

export const SortOrderEnum = z.enum(['asc', 'desc'])
export const StatusEnum = z.enum([
  'ACTIVE',
  'INACTIVE',
  'DRAFT',
  'PUBLISHED',
  'ARCHIVED',
])

export const BaseEntitySchema = z.object({
  createdAt: DateSchema.optional(),
  updatedAt: NullableDateSchema,
  deletedAt: NullableDateSchema,
})

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export const ApiSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
})

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  code: z.string().optional(),
  errors: z.array(z.object({
    field: z.string(),
    message: z.string(),
  })).optional(),
})

export const ApiResponseSchema = z.union([
  ApiSuccessSchema,
  ApiErrorSchema,
])

/* =========================================================
   USER
========================================================= */

export const UserRoleEnum = z.enum(['ADMIN', 'AUTHOR', 'USER'])
export const UserStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'BANNED'])

export const ThemeEnum = z.enum(['LIGHT', 'DARK', 'SYSTEM'])
export const LanguageEnum = z.enum(['en']) // extend later dynamically


export const UserPreferencesSchema = z.object({
  theme: ThemeEnum.default('SYSTEM'),
  language: AppLanguageEnum.default('en'),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  newsletter: z.boolean().default(true),
  timezone: z.string().default('UTC'),
})

export const UserProfileSchema = z.object({
  name: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  biography: z.string().nullable().optional(),
  profilePicture: z.string().nullable().optional(),
})

export const UserSchema = z.object({
  userId: IdSchema,
  email: EmailSchema,
  phone: z.string().nullable().optional(),
  password: PasswordSchema,

  userRole: UserRoleEnum.default('USER'),
  userStatus: UserStatusEnum.default('ACTIVE'),

  userPreferences: UserPreferencesSchema.optional(),
  userProfile: UserProfileSchema.optional(),

  createdAt: DateSchema.optional(),
  updatedAt: DateSchema.optional(),
  deletedAt: NullableDateSchema,
})

export const SafeUserSchema = UserSchema.omit({
  password: true,
})

/* =========================================================
   AUTH
========================================================= */

export const LoginRequestSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})

export const RegisterRequestSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const AuthSessionSchema = z.object({
  sessionId: IdSchema,
  userId: IdSchema,
  token: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: DateSchema,
  createdAt: DateSchema,
})

export const AuthResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
  refreshToken: z.string().optional(),
  user: SafeUserSchema.optional(),
})

export const OAuthProviderEnum = z.enum([
  'GOOGLE',
  'GITHUB',
  'DISCORD',
  'MICROSOFT',
])

export const OAuthCallbackSchema = z.object({
  code: z.string(),
  state: z.string().optional(),
  provider: OAuthProviderEnum,
})

/* =========================================================
   TYPES
========================================================= */

// Common
export type Id = z.infer<typeof IdSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type ApiResponse = z.infer<typeof ApiResponseSchema>

// User
export type User = z.infer<typeof UserSchema>
export type SafeUser = z.infer<typeof SafeUserSchema>
export type UserRole = z.infer<typeof UserRoleEnum>
export type UserStatus = z.infer<typeof UserStatusEnum>
export type UserPreferences = z.infer<typeof UserPreferencesSchema>
export type UserProfile = z.infer<typeof UserProfileSchema>

// Auth
export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>
export type ChangePassword = z.infer<typeof ChangePasswordSchema>
export type AuthSession = z.infer<typeof AuthSessionSchema>
export type AuthResponse = z.infer<typeof AuthResponseSchema>
export type OAuthCallback = z.infer<typeof OAuthCallbackSchema>