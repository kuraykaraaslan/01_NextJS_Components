'use client';
import { EventHeroCard } from '@/modules/domain/event/EventHeroCard';
import { TicketTierSelector } from '@/modules/domain/event/TicketTierSelector';
import { EventSeatMapSelector } from '@/modules/domain/event/EventSeatMapSelector';
import { CheckoutStepper } from '@/modules/domain/event/CheckoutStepper';
import { AttendeeForm } from '@/modules/domain/event/AttendeeForm';
import { RefundRequestModal } from '@/modules/domain/event/RefundRequestModal';
import type { ShowcaseComponent } from '../showcase.types';

export function buildEventData(): ShowcaseComponent[] {
  return [
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
