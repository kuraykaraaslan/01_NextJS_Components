'use client';
import Link from 'next/link';
import { Badge } from '@/modules/ui/Badge';
import { EventNavbar } from '@/modules/domain/event/EventNavbar';

const NAV_LINKS = [
  { href: '/theme/tickets/events?category=concert',  label: '🎤 Concerts' },
  { href: '/theme/tickets/events?category=sports',   label: '⚽ Sports' },
  { href: '/theme/tickets/events?category=theater',  label: '🎭 Theater' },
  { href: '/theme/tickets/events?category=comedy',   label: '😂 Comedy' },
  { href: '/theme/tickets/events?category=family',   label: '👨‍👩‍👧 Family' },
  { href: '/theme/tickets/events?category=festival', label: '🎪 Festivals' },
  { href: '/theme/tickets/artists',                  label: '⭐ Artists' },
  { href: '/theme/tickets/venues',                   label: '🏟 Venues' },
];

function TicketsFooter() {
  return (
    <footer className="mt-16 text-white" style={{ background: '#0a0f1e' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white text-sm">TM</div>
              <span className="text-base font-black">TixVault</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              The world's largest live event marketplace. Find and buy verified tickets for concerts, sports, theater, and more.
            </p>
            <div className="flex gap-2 mt-4">
              <Badge variant="primary" size="sm">App Store</Badge>
              <Badge variant="neutral" size="sm">Google Play</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-gray-200">Browse Events</h4>
            <ul className="space-y-2">
              {['Concerts', 'Sports', 'Theater & Arts', 'Comedy Shows', 'Family Events', 'Festivals'].map((s) => (
                <li key={s}>
                  <Link href="/theme/tickets/events" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-gray-200">Help & Support</h4>
            <ul className="space-y-2">
              {['Fan Support', 'Ticket Delivery', 'Refund Policy', 'Fan-to-Fan Exchange', 'Accessibility', 'Contact Us'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4 text-gray-200">Company</h4>
            <ul className="space-y-2">
              {['About TixVault', 'Careers', 'Press Room', 'Investor Relations', 'Privacy Policy', 'Terms of Use'].map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 TixVault, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <Badge variant="neutral" size="sm">🔒 Secure Checkout</Badge>
            <Badge variant="success" size="sm">✅ Verified Tickets</Badge>
            <Badge variant="info" size="sm">📞 24/7 Fan Support</Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Skip to main content
      </a>
      <EventNavbar
        logoText="TixVault"
        logoAbbr="TM"
        navLinks={NAV_LINKS}
        searchHref="/theme/tickets/events"
        myTicketsHref="/theme/tickets/events"
      />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <TicketsFooter />
    </div>
  );
}
