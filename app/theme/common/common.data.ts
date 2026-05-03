import type { SavedCard, PaymentBase } from '@/modules/domains/common/PaymentTypes';
import type { OrderTotals } from '@/modules/domains/common/MoneyTypes';
import type { Address } from '@/modules/domains/common/AddressTypes';
import type { Cart } from '@/modules/domains/common/CartTypes';
import type { SafeUser } from '@/modules/domains/common/types';

/* ─── User ─── */

export const DEMO_USER: SafeUser = {
  userId:     'user-demo-001',
  email:      'john.doe@example.com',
  phone:      '+90 555 123 45 67',
  userRole:   'AUTHOR',
  userStatus: 'ACTIVE',
  userPreferences: {
    theme:              'SYSTEM',
    language:           'en',
    emailNotifications: true,
    pushNotifications:  false,
    newsletter:         true,
    timezone:           'Europe/Istanbul',
  },
  userProfile: {
    name:           'John Doe',
    username:       'johndoe',
    biography:      'Full-stack developer passionate about design systems and component-driven development.',
    profilePicture: null,
  },
};

/* ─── Addresses ─── */

export const SAVED_ADDRESSES: Address[] = [
  {
    fullName:     'John Doe',
    phone:        '+90 555 123 45 67',
    addressLine1: 'Atatürk Caddesi No:42 Daire:5',
    addressLine2: 'Levent Mah.',
    city:         'Istanbul',
    state:        'Istanbul',
    postalCode:   '34330',
    country:      'Turkey',
    countryCode:  'TR',
  },
  {
    fullName:     'John Doe',
    phone:        '+90 555 987 65 43',
    addressLine1: 'Kızılay Meydanı Sk. No:8',
    addressLine2: null,
    city:         'Ankara',
    state:        'Ankara',
    postalCode:   '06420',
    country:      'Turkey',
    countryCode:  'TR',
  },
];

/* ─── Cards ─── */

export const SAVED_CARDS: SavedCard[] = [
  {
    cardId:         'card-1',
    last4:          '4242',
    brand:          'VISA',
    cardholderName: 'JOHN DOE',
    expiryMonth:    '08',
    expiryYear:     '27',
    isDefault:      true,
  },
  {
    cardId:         'card-2',
    last4:          '5555',
    brand:          'MASTERCARD',
    cardholderName: 'JOHN DOE',
    expiryMonth:    '12',
    expiryYear:     '26',
  },
  {
    cardId:         'card-3',
    last4:          '3782',
    brand:          'AMEX',
    cardholderName: 'JOHN DOE',
    expiryMonth:    '03',
    expiryYear:     '28',
  },
];

/* ─── Cart ─── */

export const DEMO_CART: Cart = {
  cartId: 'cart-demo-001',
  items: [
    {
      cartItemId:  'ci-1',
      productId:   'prod-1',
      name:        'Pro Plan — Annual',
      description: 'Full access to all features, priority support',
      image:       null,
      variant:     'Billing: Yearly',
      price:       999.90,
      currency:    'TRY',
      quantity:    1,
      maxQuantity: 1,
    },
    {
      cartItemId:  'ci-2',
      productId:   'prod-2',
      name:        'Design System Add-on',
      description: 'Component library + Figma kit',
      image:       null,
      variant:     null,
      price:       150.00,
      currency:    'TRY',
      quantity:    2,
      maxQuantity: 5,
    },
    {
      cartItemId:  'ci-3',
      productId:   'prod-3',
      name:        'Priority Support',
      description: '12-month dedicated support package',
      image:       null,
      variant:     null,
      price:       130.00,
      currency:    'TRY',
      quantity:    1,
      maxQuantity: 1,
    },
  ],
  totals: {
    subtotal:      1429.90,
    discountTotal: 130.00,
    taxTotal:      208.78,
    serviceFee:    29.99,
    shippingTotal: 0,
    total:         1538.67,
    currency:      'TRY',
  },
};

/* ─── Orders ─── */

export const DEMO_ORDERS: PaymentBase[] = [
  {
    paymentId:         'pay-001',
    provider:          'Stripe',
    providerPaymentId: 'pi_3NxA1',
    method:            'CREDIT_CARD',
    status:            'PAID',
    amount:            1538.67,
    currency:          'TRY',
  },
  {
    paymentId:         'pay-002',
    provider:          'Stripe',
    providerPaymentId: 'pi_3NwB2',
    method:            'CREDIT_CARD',
    status:            'REFUNDED',
    amount:            299.90,
    currency:          'TRY',
  },
  {
    paymentId:         'pay-003',
    provider:          'PayPal',
    providerPaymentId: 'PAYID-MXY123',
    method:            'WALLET',
    status:            'PAID',
    amount:            89.00,
    currency:          'TRY',
  },
  {
    paymentId:         'pay-004',
    provider:          'Stripe',
    providerPaymentId: 'pi_3NvC3',
    method:            'CREDIT_CARD',
    status:            'FAILED',
    amount:            450.00,
    currency:          'TRY',
  },
  {
    paymentId:         'pay-005',
    provider:          'Stripe',
    providerPaymentId: 'pi_3NuD4',
    method:            'DEBIT_CARD',
    status:            'PENDING',
    amount:            750.00,
    currency:          'TRY',
  },
];

/* ─── Checkout totals ─── */

export const ORDER_TOTALS: OrderTotals = {
  subtotal:      1299.90,
  discountTotal: 130.00,
  taxTotal:      208.78,
  serviceFee:    29.99,
  shippingTotal: 0,
  total:         1408.67,
  currency:      'TRY',
};
