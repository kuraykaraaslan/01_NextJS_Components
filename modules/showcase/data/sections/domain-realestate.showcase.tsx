'use client';
import { PropertyCard } from '@/modules/domain/realestate/PropertyCard';
import { FloorPlanViewerPanel } from '@/modules/domain/realestate/FloorPlanViewerPanel';
import { AvailabilityCalendar } from '@/modules/domain/realestate/AvailabilityCalendar';
import { MortgageEstimator } from '@/modules/domain/realestate/MortgageEstimator';
import { OfferComparisonTable } from '@/modules/domain/realestate/OfferComparisonTable';
import type { ShowcaseComponent } from '../showcase.types';

export function buildRealEstateData(): ShowcaseComponent[] {
  return [
    {
      id: 're-property-card',
      title: 'PropertyCard',
      category: 'Domain' as const,
      abbr: 'Pc',
      description: 'Real estate listing card with image tabs, price, bed/bath/sqm stats, status badge, and contact CTA.',
      filePath: 'modules/domain/realestate/PropertyCard.tsx',
      sourceCode: `import { PropertyCard } from '@/modules/domain/realestate/PropertyCard';\n\n<PropertyCard id="p1" title="Modern Apartment" address="123 Main St" price={450000} type="sale" bedrooms={3} bathrooms={2} sqm={120} onContact={() => {}} />`,
      variants: [
        {
          title: 'Property listing card',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-xs">
              <PropertyCard
                id="p1"
                title="Modern Apartment – City Center"
                address="123 Bağdat Cad, Kadıköy, Istanbul"
                price={450000}
                type="sale"
                status="active"
                bedrooms={3}
                bathrooms={2}
                sqm={120}
                badge="New listing"
                onContact={() => {}}
                onSave={() => {}}
              />
            </div>
          ),
          code: `<PropertyCard\n  id="p1"\n  title="Modern Apartment"\n  address="123 Main St, Istanbul"\n  price={450000}\n  type="sale"\n  status="active"\n  bedrooms={3}\n  bathrooms={2}\n  sqm={120}\n  onContact={handleContact}\n  onSave={handleSave}\n/>`,
        },
      ],
    },

    {
      id: 're-floor-plan',
      title: 'FloorPlanViewerPanel',
      category: 'Domain' as const,
      abbr: 'Fp',
      description: 'Floor plan viewer with floor tabs, zoom controls, room tooltips, and full-screen modal.',
      filePath: 'modules/domain/realestate/FloorPlanViewerPanel.tsx',
      sourceCode: `import { FloorPlanViewerPanel } from '@/modules/domain/realestate/FloorPlanViewerPanel';\n\n<FloorPlanViewerPanel\n  propertyTitle="Modern Apartment"\n  plans={[\n    { id: 'g', label: 'Ground floor', rooms: [{name:'Living',sqm:32,x:'20%',y:'40%'}] },\n    { id: '1', label: '1st floor',   rooms: [{name:'Bedroom 1',sqm:18,x:'30%',y:'20%'}] },\n  ]}\n/>`,
      variants: [
        {
          title: 'Floor plan viewer',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <FloorPlanViewerPanel
                propertyTitle="Modern Apartment"
                plans={[
                  { id: 'g', label: 'Ground', rooms: [{ name: 'Living Room', sqm: 32, x: '20%', y: '40%' }, { name: 'Kitchen', sqm: 14, x: '60%', y: '30%' }] },
                  { id: '1', label: '1st Floor', rooms: [{ name: 'Master Bedroom', sqm: 20, x: '25%', y: '30%' }, { name: 'Bathroom', sqm: 8, x: '65%', y: '60%' }] },
                ]}
              />
            </div>
          ),
          code: `<FloorPlanViewerPanel\n  propertyTitle="Modern Apartment"\n  plans={[\n    { id: 'g', label: 'Ground', rooms: [{name:'Living Room',sqm:32,x:'20%',y:'40%'}] },\n    { id: '1', label: '1st Floor', rooms: [{name:'Master Bedroom',sqm:20,x:'25%',y:'30%'}] },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 're-availability',
      title: 'AvailabilityCalendar',
      category: 'Domain' as const,
      abbr: 'Ac',
      description: 'Date range booking picker with blocked-period badges, nightly price calculator, and book CTA.',
      filePath: 'modules/domain/realestate/AvailabilityCalendar.tsx',
      sourceCode: `import { AvailabilityCalendar } from '@/modules/domain/realestate/AvailabilityCalendar';\n\n<AvailabilityCalendar\n  pricePerNight={150}\n  blockedPeriods={[{label:'Booked',start:'2026-04-24',end:'2026-04-28'}]}\n  onBook={(range) => bookProperty(range)}\n/>`,
      variants: [
        {
          title: 'Availability calendar',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <AvailabilityCalendar
                pricePerNight={150}
                blockedPeriods={[{ label: 'Booked', start: '2026-04-24', end: '2026-04-28' }]}
              />
            </div>
          ),
          code: `<AvailabilityCalendar\n  pricePerNight={150}\n  blockedPeriods={[\n    { label: 'Booked', start: '2026-04-24', end: '2026-04-28' },\n  ]}\n  onBook={(range) => bookProperty(range)}\n/>`,
        },
      ],
    },

    {
      id: 're-mortgage',
      title: 'MortgageEstimator',
      category: 'Domain' as const,
      abbr: 'Me',
      description: 'Mortgage calculator with down-payment affordability score bar and live monthly payment output.',
      filePath: 'modules/domain/realestate/MortgageEstimator.tsx',
      sourceCode: `import { MortgageEstimator } from '@/modules/domain/realestate/MortgageEstimator';\n\n<MortgageEstimator\n  currency="USD"\n  onApply={(data) => applyForMortgage(data)}\n/>`,
      variants: [
        {
          title: 'Mortgage estimator',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <MortgageEstimator currency="USD" onApply={() => {}} />
            </div>
          ),
          code: `<MortgageEstimator\n  currency="USD"\n  onApply={({ price, downPayment, rate, term }) => {\n    applyForMortgage({ price, downPayment, rate, term });\n  }}\n/>`,
        },
      ],
    },

    {
      id: 're-offer-compare',
      title: 'OfferComparisonTable',
      category: 'Domain' as const,
      abbr: 'Oc',
      description: 'Offer comparison table sortable by price/date, with highest-offer badge and contingency tooltips.',
      filePath: 'modules/domain/realestate/OfferComparisonTable.tsx',
      sourceCode: `import { OfferComparisonTable } from '@/modules/domain/realestate/OfferComparisonTable';\n\n<OfferComparisonTable\n  offers={offers}\n  onAccept={(id) => acceptOffer(id)}\n  onReject={(id) => rejectOffer(id)}\n/>`,
      variants: [
        {
          title: 'Offer comparison',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <OfferComparisonTable
                offers={[
                  { id: 'o1', buyerName: 'John & Mary Smith', offerAmount: 465000, earnestMoney: 15000, closingDate: '2026-05-15', contingencies: [], financing: 'cash', status: 'pending' },
                  { id: 'o2', buyerName: 'Tech Corp LLC', offerAmount: 450000, earnestMoney: 20000, closingDate: '2026-06-01', contingencies: ['Inspection', 'Financing'], financing: 'conventional', status: 'pending' },
                  { id: 'o3', buyerName: 'Alice & Bob Chen', offerAmount: 445000, earnestMoney: 10000, closingDate: '2026-05-20', contingencies: ['Inspection'], financing: 'fha', status: 'countered' },
                ]}
                onAccept={() => {}}
                onReject={() => {}}
              />
            </div>
          ),
          code: `<OfferComparisonTable\n  offers={[\n    { id: 'o1', buyerName: 'John Smith', offerAmount: 465000, earnestMoney: 15000, closingDate: '2026-05-15', contingencies: [], financing: 'cash', status: 'pending' },\n    { id: 'o2', buyerName: 'Alice Chen', offerAmount: 450000, earnestMoney: 20000, closingDate: '2026-06-01', contingencies: ['Inspection'], financing: 'conventional', status: 'pending' },\n  ]}\n  onAccept={(id) => acceptOffer(id)}\n  onReject={(id) => rejectOffer(id)}\n/>`,
        },
      ],
    },
  ];
}
