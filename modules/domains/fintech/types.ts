import { z } from 'zod'

/* =========================================================
   ENUMS
========================================================= */

export const CurrencyEnum = z.enum([
  'TRY',
  'USD',
  'EUR',
  'GBP',
  'BTC',
  'ETH',
])

export const WalletTypeEnum = z.enum([
  'USER',
  'SYSTEM',
  'MERCHANT',
])

export const WalletStatusEnum = z.enum([
  'ACTIVE',
  'FROZEN',
  'CLOSED',
])

export const TransactionTypeEnum = z.enum([
  'DEPOSIT',
  'WITHDRAW',
  'TRANSFER',
  'PAYMENT',
  'REFUND',
  'FX',
  'FEE',
])

export const TransactionStatusEnum = z.enum([
  'PENDING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
])

export const PaymentMethodEnum = z.enum([
  'CARD',
  'BANK_TRANSFER',
  'WALLET',
  'CRYPTO',
])

export const FXStatusEnum = z.enum([
  'PENDING',
  'COMPLETED',
  'FAILED',
])

/* =========================================================
   WALLET
========================================================= */

export const WalletSchema = z.object({
  walletId: z.string(),

  userId: z.string().nullable().optional(),

  type: WalletTypeEnum.default('USER'),
  status: WalletStatusEnum.default('ACTIVE'),

  currency: CurrencyEnum,

  balance: z.number().default(0),
  availableBalance: z.number().default(0),
  lockedBalance: z.number().default(0),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   WALLET ACCOUNT (IBAN / CRYPTO / ETC)
========================================================= */

export const WalletAccountSchema = z.object({
  walletAccountId: z.string(),

  walletId: z.string(),

  type: z.enum(['IBAN', 'CRYPTO', 'CARD']),

  iban: z.string().nullable().optional(),
  bankName: z.string().nullable().optional(),

  address: z.string().nullable().optional(), // crypto address

  label: z.string().nullable().optional(),

  verified: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TRANSACTION
========================================================= */

export const TransactionSchema = z.object({
  transactionId: z.string(),

  walletId: z.string(),

  type: TransactionTypeEnum,
  status: TransactionStatusEnum.default('PENDING'),

  amount: z.number(),
  currency: CurrencyEnum,

  fee: z.number().default(0),

  reference: z.string().nullable().optional(),

  description: z.string().nullable().optional(),

  metadata: z.record(z.unknown()).nullable().optional(),

  createdAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   DOUBLE ENTRY LEDGER (CRITICAL)
========================================================= */

export const LedgerEntrySchema = z.object({
  entryId: z.string(),

  transactionId: z.string(),

  debitWalletId: z.string(),
  creditWalletId: z.string(),

  amount: z.number(),
  currency: CurrencyEnum,

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   FX (FOREX)
========================================================= */

export const FXRateSchema = z.object({
  rateId: z.string(),

  baseCurrency: CurrencyEnum,
  quoteCurrency: CurrencyEnum,

  rate: z.number(),

  source: z.string().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

export const FXTransactionSchema = z.object({
  fxTransactionId: z.string(),

  fromWalletId: z.string(),
  toWalletId: z.string(),

  fromCurrency: CurrencyEnum,
  toCurrency: CurrencyEnum,

  fromAmount: z.number(),
  toAmount: z.number(),

  rate: z.number(),

  fee: z.number().default(0),

  status: FXStatusEnum.default('PENDING'),

  createdAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   PAYMENT
========================================================= */

export const PaymentSchema = z.object({
  paymentId: z.string(),

  userId: z.string().nullable().optional(),
  walletId: z.string().nullable().optional(),

  method: PaymentMethodEnum,

  amount: z.number(),
  currency: CurrencyEnum,

  status: TransactionStatusEnum.default('PENDING'),

  provider: z.string().nullable().optional(),
  providerPaymentId: z.string().nullable().optional(),

  metadata: z.record(z.unknown()).nullable().optional(),

  createdAt: z.coerce.date().optional(),
  completedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   CARD (TOKENIZED)
========================================================= */

export const CardSchema = z.object({
  cardId: z.string(),

  userId: z.string(),

  last4: z.string(),
  brand: z.string(),

  expiryMonth: z.number(),
  expiryYear: z.number(),

  token: z.string(), // PSP token

  default: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   BANK ACCOUNT
========================================================= */

export const BankAccountSchema = z.object({
  bankAccountId: z.string(),

  userId: z.string(),

  iban: z.string(),
  bankName: z.string(),

  accountHolderName: z.string(),

  verified: z.boolean().default(false),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   LIMITS / COMPLIANCE
========================================================= */

export const UserLimitSchema = z.object({
  limitId: z.string(),

  userId: z.string(),

  dailyLimit: z.number().nullable().optional(),
  monthlyLimit: z.number().nullable().optional(),

  usedToday: z.number().default(0),
  usedThisMonth: z.number().default(0),

  currency: CurrencyEnum,

  updatedAt: z.coerce.date().nullable().optional(),
})

export const KYCStatusEnum = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
])

export const KYCSchema = z.object({
  kycId: z.string(),

  userId: z.string(),

  status: KYCStatusEnum.default('PENDING'),

  documentType: z.string().nullable().optional(),
  documentNumber: z.string().nullable().optional(),

  approvedAt: z.coerce.date().nullable().optional(),
  rejectedAt: z.coerce.date().nullable().optional(),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   TYPES
========================================================= */

export type Currency = z.infer<typeof CurrencyEnum>
export type Wallet = z.infer<typeof WalletSchema>
export type WalletAccount = z.infer<typeof WalletAccountSchema>

export type Transaction = z.infer<typeof TransactionSchema>
export type LedgerEntry = z.infer<typeof LedgerEntrySchema>

export type FXRate = z.infer<typeof FXRateSchema>
export type FXTransaction = z.infer<typeof FXTransactionSchema>

export type Payment = z.infer<typeof PaymentSchema>

export type Card = z.infer<typeof CardSchema>
export type BankAccount = z.infer<typeof BankAccountSchema>

export type UserLimit = z.infer<typeof UserLimitSchema>
export type KYC = z.infer<typeof KYCSchema>