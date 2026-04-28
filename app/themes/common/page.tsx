const SECTIONS = [
  {
    id: 'auth',
    title: 'Authentication',
    tag: 'common/auth',
    pages: [
      { title: 'Login',            description: 'Email + password with OAuth providers and remember-me.',                 href: '/themes/common/auth/login',           icon: '🔑' },
      { title: 'Register',         description: 'Account creation with password confirmation and OAuth shortcuts.',        href: '/themes/common/auth/register',        icon: '👤' },
      { title: 'Forgot Password',  description: 'Request a reset link via email.',                                        href: '/themes/common/auth/forgot-password',  icon: '📧' },
      { title: 'Reset Password',   description: 'Set a new password after clicking the email link.',                      href: '/themes/common/auth/reset-password',   icon: '🔐' },
      { title: 'Verify Email',     description: '6-digit OTP entry with countdown timer and paste support.',              href: '/themes/common/auth/verify-email',     icon: '✉️' },
      { title: 'Two-Factor Auth',  description: 'Authenticator-app OTP code entry with recovery options.',               href: '/themes/common/auth/two-factor',       icon: '🛡️' },
    ],
  },
  {
    id: 'cart',
    title: 'Cart',
    tag: 'common/cart',
    pages: [
      { title: 'Shopping Cart',    description: 'Full cart with quantity controls, remove, coupon, and totals.',          href: '/themes/common/cart',                  icon: '🛒' },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    tag: 'common/payment',
    pages: [
      { title: 'Payment Components', description: 'Showcase of all payment UI pieces.',                                  href: '/themes/common/payment',               icon: '💡' },
      { title: 'Checkout',         description: '4-step flow: address → method → card → review.',                        href: '/themes/common/payment/checkout',      icon: '💳' },
    ],
  },
  {
    id: 'utility',
    title: 'Utility',
    tag: 'common/utility',
    pages: [
      { title: 'Not Found (404)',  description: 'Full-page 404 with gradient icon, action buttons and decorative dots.', href: '/themes/common/not-found', icon: '🔍' },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    tag: 'common/user · common/address',
    pages: [
      { title: 'Profile',          description: 'View and edit display name, username, bio, avatar URL.',                href: '/themes/common/account/profile',       icon: '🪪' },
      { title: 'Settings',         description: 'Theme, language, notification toggles and password change.',            href: '/themes/common/account/settings',      icon: '⚙️' },
      { title: 'Address Book',     description: 'Manage delivery addresses with full add / edit / delete.',               href: '/themes/common/account/addresses',     icon: '📍' },
      { title: 'Payment Methods',  description: 'Saved cards: add, remove, set default.',                                href: '/themes/common/account/payment-methods', icon: '💳' },
      { title: 'Order History',    description: 'Filterable list with inline payment detail and totals summary.',         href: '/themes/common/account/orders',        icon: '📦' },
    ],
  },
];

function PageCard({ title, description, href, icon }: { title: string; description: string; href: string; icon: string }) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-border bg-surface-raised p-4 hover:border-primary hover:shadow-md transition-all"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-xl">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{title}</p>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{description}</p>
      </div>
      <span className="text-text-secondary group-hover:text-primary transition-colors shrink-0 mt-0.5 text-sm" aria-hidden="true">→</span>
    </a>
  );
}

export default function CommonThemePage() {
  const totalPages = SECTIONS.reduce((s, sec) => s + sec.pages.length, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-1.5 text-xs font-medium text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          modules/domains/common
        </div>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight">Common Theme</h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
          {totalPages} production-ready pages covering authentication, cart, payment, and account management.
        </p>
      </div>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <section key={section.id} className="space-y-4" aria-labelledby={`${section.id}-heading`}>
          <div className="flex items-center gap-3">
            <h2 id={`${section.id}-heading`} className="text-xl font-semibold text-text-primary">
              {section.title}
            </h2>
            <div className="flex-1 h-px bg-border" aria-hidden="true" />
            <span className="text-xs text-text-secondary font-mono">{section.tag}</span>
          </div>
          <div className="grid gap-3">
            {section.pages.map((page) => (
              <PageCard key={page.href} {...page} />
            ))}
          </div>
        </section>
      ))}

      {/* Components used */}
      <section className="rounded-xl border border-border bg-surface-raised p-6 space-y-3">
        <h2 className="text-sm font-semibold text-text-primary">All components used</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'LoginForm', 'RegisterForm', 'ForgotPasswordForm', 'ChangePasswordForm',
            'OAuthButtons', 'SessionExpiredBanner',
            'CartItem', 'CartSummary', 'CartBadge', 'CartPreview',
            'CreditCardForm', 'CreditCardVisual', 'PaymentMethodSelector',
            'SavedCardSelector', 'PaymentSummaryCard', 'PaymentStatusBadge',
            'OrderTotalsCard', 'CouponInput', 'PriceDisplay',
            'AddressCard', 'AddressForm', 'AddressSelector',
            'UserProfileCard', 'UserProfileForm', 'UserPreferencesForm',
            'UserAvatar', 'UserMenu', 'UserRoleBadge', 'UserStatusBadge',
            'LanguageSwitcher', 'CurrencySelector',
            'NotFoundPage',
          ].map((name) => (
            <span key={name} className="rounded-md bg-surface-overlay px-2.5 py-1 text-xs font-mono text-text-secondary">
              {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
