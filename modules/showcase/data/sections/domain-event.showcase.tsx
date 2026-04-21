'use client';
import { EventHeroCard } from '@/modules/domain/event/EventHeroCard';
import { EventCard } from '@/modules/domain/event/EventCard';
import { EventListCard } from '@/modules/domain/event/EventListCard';
import { EventNavbar, DEFAULT_LANGUAGES, DEFAULT_CITIES } from '@/modules/domain/event/EventNavbar';
import { TicketTierSelector } from '@/modules/domain/event/TicketTierSelector';
import { EventSeatMapSelector } from '@/modules/domain/event/EventSeatMapSelector';
import { CheckoutStepper } from '@/modules/domain/event/CheckoutStepper';
import { AttendeeForm } from '@/modules/domain/event/AttendeeForm';
import { RefundRequestModal } from '@/modules/domain/event/RefundRequestModal';
import type { ShowcaseComponent } from '../showcase.types';

const DEMO_ACCENT = '#3b82f6';

export function buildEventData(): ShowcaseComponent[] {
  return [
    {
      id: 'evnt-card',
      title: 'EventCard',
      category: 'Domain' as const,
      abbr: 'Ec',
      description: 'Grid-layout event card with gradient emoji banner, category badge, hot/sold-out states, date, venue, and price.',
      filePath: 'modules/domain/event/EventCard.tsx',
      sourceCode: `import { EventCard } from '@/modules/domain/event/EventCard';\n\n<EventCard\n  title="Nova — Midnight Chapters Tour"\n  category="concert"\n  date="Sat, May 10, 2026"\n  venue="Madison Square Garden"\n  city="New York, NY"\n  emoji="🎤"\n  accent="#3b82f6"\n  minPrice={75}\n  hot\n/>`,
      variants: [
        {
          title: 'Default',
          layout: 'side' as const,
          preview: (
            <div className="w-56">
              <EventCard
                title="Nova — Midnight Chapters Tour"
                subtitle="Special guests: The Echoes"
                category="concert"
                date="Sat, May 10, 2026"
                venue="Madison Square Garden"
                city="New York, NY"
                emoji="🎤"
                accent={DEMO_ACCENT}
                minPrice={75}
                hot
              />
            </div>
          ),
          code: `<EventCard\n  title="Nova — Midnight Chapters Tour"\n  subtitle="Special guests: The Echoes"\n  category="concert"\n  date="Sat, May 10, 2026"\n  venue="Madison Square Garden"\n  city="New York, NY"\n  emoji="🎤"\n  accent="#3b82f6"\n  minPrice={75}\n  hot\n/>`,
        },
        {
          title: 'Sold out / alternate category',
          layout: 'side' as const,
          preview: (
            <div className="w-56">
              <EventCard
                title="UFC 305 — Championship Night"
                category="sports"
                date="Sat, Aug 2, 2026"
                venue="T-Mobile Arena"
                city="Las Vegas, NV"
                emoji="🥊"
                accent="#ef4444"
                minPrice={200}
                soldOut
              />
            </div>
          ),
          code: `<EventCard\n  title="UFC 305 — Championship Night"\n  category="sports"\n  date="Sat, Aug 2, 2026"\n  venue="T-Mobile Arena"\n  city="Las Vegas, NV"\n  emoji="🥊"\n  accent="#ef4444"\n  minPrice={200}\n  soldOut\n/>`,
        },
      ],
    },
    {
      id: 'evnt-list-card',
      title: 'EventListCard',
      category: 'Domain' as const,
      abbr: 'El',
      description: 'Horizontal list-row event card with thumbnail, category/hot badges, title, date/time/venue, price, and star rating.',
      filePath: 'modules/domain/event/EventListCard.tsx',
      sourceCode: `import { EventListCard } from '@/modules/domain/event/EventListCard';\n\n<EventListCard\n  title="Hamilton"\n  subtitle="The Original Broadway Musical"\n  category="theater"\n  date="May–Aug 2026"\n  time="7:30 PM"\n  venue="Richard Rodgers Theatre"\n  city="New York, NY"\n  emoji="🎭"\n  accent="#8b5cf6"\n  minPrice={149}\n  rating={5.0}\n  reviewCount={12540}\n/>`,
      variants: [
        {
          title: 'Default',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <EventListCard
                title="Hamilton"
                subtitle="The Original Broadway Musical"
                category="theater"
                date="May–Aug 2026"
                time="7:30 PM"
                venue="Richard Rodgers Theatre"
                city="New York, NY"
                emoji="🎭"
                accent="#8b5cf6"
                minPrice={149}
                rating={5.0}
                reviewCount={12540}
              />
            </div>
          ),
          code: `<EventListCard\n  title="Hamilton"\n  subtitle="The Original Broadway Musical"\n  category="theater"\n  date="May–Aug 2026"\n  time="7:30 PM"\n  venue="Richard Rodgers Theatre"\n  city="New York, NY"\n  emoji="🎭"\n  accent="#8b5cf6"\n  minPrice={149}\n  rating={5.0}\n  reviewCount={12540}\n/>`,
        },
        {
          title: 'Hot event',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <EventListCard
                title="Coldplay — Music of the Spheres"
                subtitle="World Tour 2026 · Eco-powered stadium show"
                category="concert"
                date="Fri, Jun 5, 2026"
                time="7:30 PM"
                venue="MetLife Stadium"
                city="East Rutherford, NJ"
                emoji="🌍"
                accent="#8b5cf6"
                minPrice={65}
                rating={4.9}
                reviewCount={5123}
                hot
              />
            </div>
          ),
          code: `<EventListCard\n  title="Coldplay — Music of the Spheres"\n  category="concert"\n  date="Fri, Jun 5, 2026"\n  time="7:30 PM"\n  venue="MetLife Stadium"\n  city="East Rutherford, NJ"\n  emoji="🌍"\n  accent="#8b5cf6"\n  minPrice={65}\n  rating={4.9}\n  reviewCount={5123}\n  hot\n/>`,
        },
      ],
    },
    {
      id: 'evnt-navbar',
      title: 'EventNavbar',
      category: 'Domain' as const,
      abbr: 'En',
      description: 'Dark ticketing navbar with searchable city picker, language selector (8 languages, 18 cities), promo bar, category nav strip, and responsive mobile menu.',
      filePath: 'modules/domain/event/EventNavbar.tsx',
      sourceCode: `import { EventNavbar, DEFAULT_LANGUAGES, DEFAULT_CITIES } from '@/modules/domain/event/EventNavbar';\n\n<EventNavbar\n  logoText="TixVault"\n  logoAbbr="TM"\n  languages={DEFAULT_LANGUAGES}\n  defaultLanguage="en"\n  cities={DEFAULT_CITIES}\n  defaultCity="New York, NY"\n  navLinks={[\n    { href: '/concerts', label: '🎤 Concerts' },\n    { href: '/sports',   label: '⚽ Sports' },\n  ]}\n  searchHref="/events"\n  myTicketsHref="/my-tickets"\n  onLanguageChange={(lang) => console.log(lang)}\n  onCityChange={(city) => console.log(city)}\n/>`,
      variants: [
        {
          title: 'Full — city + language picker',
          layout: 'stack' as const,
          preview: (
            <div className="w-full overflow-hidden rounded-xl border border-border">
              <EventNavbar
                logoText="TixVault"
                logoAbbr="TM"
                languages={DEFAULT_LANGUAGES}
                defaultLanguage="en"
                cities={DEFAULT_CITIES}
                defaultCity="New York, NY"
                navLinks={[
                  { href: '#concerts',  label: '🎤 Concerts' },
                  { href: '#sports',    label: '⚽ Sports' },
                  { href: '#theater',   label: '🎭 Theater' },
                  { href: '#comedy',    label: '😂 Comedy' },
                  { href: '#family',    label: '👨‍👩‍👧 Family' },
                  { href: '#festivals', label: '🎪 Festivals' },
                ]}
                searchHref="#"
                myTicketsHref="#"
              />
            </div>
          ),
          code: `<EventNavbar\n  logoText="TixVault"\n  logoAbbr="TM"\n  languages={DEFAULT_LANGUAGES}\n  defaultLanguage="en"\n  cities={DEFAULT_CITIES}\n  defaultCity="New York, NY"\n  navLinks={[\n    { href: '/concerts', label: '🎤 Concerts' },\n    { href: '/sports',   label: '⚽ Sports' },\n  ]}\n  searchHref="/events"\n  myTicketsHref="/my-tickets"\n/>`,
        },
        {
          title: 'Turkish locale preset',
          layout: 'stack' as const,
          preview: (
            <div className="w-full overflow-hidden rounded-xl border border-border">
              <EventNavbar
                logoText="BiletVault"
                logoAbbr="BV"
                promoText="🎟 Bilet al, güvenle sat — Fan-to-Fan Exchange"
                languages={DEFAULT_LANGUAGES}
                defaultLanguage="tr"
                cities={DEFAULT_CITIES}
                defaultCity="Istanbul, Turkey"
                navLinks={[
                  { href: '#concerts', label: '🎤 Konserler' },
                  { href: '#sports',   label: '⚽ Spor' },
                  { href: '#theater',  label: '🎭 Tiyatro' },
                  { href: '#comedy',   label: '😂 Komedi' },
                  { href: '#festival', label: '🎪 Festival' },
                ]}
                searchHref="#"
                myTicketsHref="#"
              />
            </div>
          ),
          code: `<EventNavbar\n  logoText="BiletVault"\n  logoAbbr="BV"\n  promoText="🎟 Bilet al, güvenle sat"\n  languages={DEFAULT_LANGUAGES}\n  defaultLanguage="tr"\n  cities={DEFAULT_CITIES}\n  defaultCity="Istanbul, Turkey"\n  navLinks={[\n    { href: '/konserler', label: '🎤 Konserler' },\n    { href: '/spor',      label: '⚽ Spor' },\n  ]}\n/>`,
        },
        {
          title: 'Minimal (no promo, no city/lang)',
          layout: 'stack' as const,
          preview: (
            <div className="w-full overflow-hidden rounded-xl border border-border">
              <EventNavbar
                logoText="EventHub"
                logoAbbr="EH"
                promoText=""
                cities={[]}
                languages={[]}
                navLinks={[
                  { href: '#concerts', label: '🎤 Concerts' },
                  { href: '#sports',   label: '⚽ Sports' },
                  { href: '#theater',  label: '🎭 Theater' },
                ]}
                searchHref="#"
                myTicketsHref="#"
              />
            </div>
          ),
          code: `<EventNavbar\n  logoText="EventHub"\n  logoAbbr="EH"\n  promoText=""\n  cities={[]}\n  languages={[]}\n  navLinks={[\n    { href: '/concerts', label: '🎤 Concerts' },\n    { href: '/sports',   label: '⚽ Sports' },\n  ]}\n/>`,
        },
      ],
    },
    {
      id: 'evnt-hero-card',
      title: 'EventHeroCard',
      category: 'Domain' as const,
      abbr: 'Eh',
      description: 'Event hero card with name, date/venue/organizer badges, ticket availability, and buy button.',
      filePath: 'modules/domain/event/EventHeroCard.tsx',
      sourceCode: `import { EventHeroCard } from '@/modules/domain/event/EventHeroCard';\n\n<EventHeroCard />`,
      variants: [
        {
          title: 'Event hero',
          layout: 'stack' as const,
          preview: (<div className="w-full max-w-xl mx-auto"><EventHeroCard /></div>),
          code: `<EventHeroCard />`,
        },
      ],
    },
    {
      id: 'evnt-ticket-tier',
      title: 'TicketTierSelector',
      category: 'Domain' as const,
      abbr: 'Tt',
      description: 'Ticket tier selection with RadioGroup, feature badges, availability, and quantity selector.',
      filePath: 'modules/domain/event/TicketTierSelector.tsx',
      sourceCode: `import { TicketTierSelector } from '@/modules/domain/event/TicketTierSelector';\n\n<TicketTierSelector />`,
      variants: [
        {
          title: 'Ticket tier selector',
          layout: 'stack' as const,
          preview: (<div className="w-full"><TicketTierSelector /></div>),
          code: `<TicketTierSelector />`,
        },
      ],
    },
    {
      id: 'evnt-seat-map',
      title: 'EventSeatMapSelector',
      category: 'Domain' as const,
      abbr: 'Sm',
      description: 'Interactive 5×8 seat map with available/occupied/selected states and max-seat alert.',
      filePath: 'modules/domain/event/EventSeatMapSelector.tsx',
      sourceCode: `import { EventSeatMapSelector } from '@/modules/domain/event/EventSeatMapSelector';\n\n<EventSeatMapSelector />`,
      variants: [
        {
          title: 'Seat map',
          layout: 'stack' as const,
          preview: (<div className="w-full"><EventSeatMapSelector /></div>),
          code: `<EventSeatMapSelector />`,
        },
      ],
    },
    {
      id: 'evnt-checkout',
      title: 'CheckoutStepper',
      category: 'Domain' as const,
      abbr: 'Cs',
      description: 'Multi-step checkout: Seats → Details → Payment → Confirm with validation at each step.',
      filePath: 'modules/domain/event/CheckoutStepper.tsx',
      sourceCode: `import { CheckoutStepper } from '@/modules/domain/event/CheckoutStepper';\n\n<CheckoutStepper />`,
      variants: [
        {
          title: 'Checkout stepper',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><CheckoutStepper /></div>),
          code: `<CheckoutStepper />`,
        },
      ],
    },
    {
      id: 'evnt-attendee-form',
      title: 'AttendeeForm',
      category: 'Domain' as const,
      abbr: 'Af',
      description: 'Attendee registration form with name, email, phone, DOB, country, and consent checkbox.',
      filePath: 'modules/domain/event/AttendeeForm.tsx',
      sourceCode: `import { AttendeeForm } from '@/modules/domain/event/AttendeeForm';\n\n<AttendeeForm />`,
      variants: [
        {
          title: 'Attendee form',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><AttendeeForm /></div>),
          code: `<AttendeeForm />`,
        },
      ],
    },
    {
      id: 'evnt-refund-modal',
      title: 'RefundRequestModal',
      category: 'Domain' as const,
      abbr: 'Rf',
      description: 'Refund request button that opens a modal with booking reference, reason textarea, and policy alert.',
      filePath: 'modules/domain/event/RefundRequestModal.tsx',
      sourceCode: `import { RefundRequestModal } from '@/modules/domain/event/RefundRequestModal';\n\n<RefundRequestModal />`,
      variants: [
        {
          title: 'Refund request modal',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><RefundRequestModal /></div>),
          code: `<RefundRequestModal />`,
        },
      ],
    },
  ];
}
