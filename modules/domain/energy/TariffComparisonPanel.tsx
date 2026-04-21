'use client';
import { Table } from '@/modules/ui/Table';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

type TariffPlan = {
  id: string;
  name: string;
  pricePerUnit: string;
  peakRate: string;
  offPeakRate: string;
  monthlyCharge: string;
};

const RESIDENTIAL: TariffPlan[] = [
  { id: 'r1', name: 'Basic Residential', pricePerUnit: '$0.12', peakRate: '$0.18', offPeakRate: '$0.08', monthlyCharge: '$5' },
  { id: 'r2', name: 'Time-of-Use', pricePerUnit: 'Variable', peakRate: '$0.22', offPeakRate: '$0.07', monthlyCharge: '$8' },
  { id: 'r3', name: 'Green Energy', pricePerUnit: '$0.15', peakRate: '$0.20', offPeakRate: '$0.10', monthlyCharge: '$10' },
];

const COMMERCIAL: TariffPlan[] = [
  { id: 'c1', name: 'Small Business', pricePerUnit: '$0.10', peakRate: '$0.16', offPeakRate: '$0.07', monthlyCharge: '$15' },
  { id: 'c2', name: 'Medium Enterprise', pricePerUnit: '$0.09', peakRate: '$0.14', offPeakRate: '$0.06', monthlyCharge: '$35' },
];

const INDUSTRIAL: TariffPlan[] = [
  { id: 'i1', name: 'Manufacturing', pricePerUnit: '$0.08', peakRate: '$0.12', offPeakRate: '$0.05', monthlyCharge: '$120' },
  { id: 'i2', name: 'Data Centre', pricePerUnit: '$0.07', peakRate: '$0.11', offPeakRate: '$0.05', monthlyCharge: '$200' },
];

function TariffTable({ plans }: { plans: TariffPlan[] }) {
  return (
    <div className="space-y-3">
      <Table
        caption="Tariff plans"
        columns={[
          { key: 'name', header: 'Plan' },
          { key: 'pricePerUnit', header: 'Price/kWh' },
          { key: 'peakRate', header: 'Peak', render: (r) => <Badge variant="error" size="sm">{r.peakRate}</Badge> },
          { key: 'offPeakRate', header: 'Off-Peak', render: (r) => <Badge variant="success" size="sm">{r.offPeakRate}</Badge> },
          { key: 'monthlyCharge', header: 'Standing Charge' },
          { key: 'actions', header: '', align: 'right', render: () => <Button variant="primary" size="sm">Switch</Button> },
        ]}
        rows={plans}
      />
    </div>
  );
}

export function TariffComparisonPanel() {
  const tabs = [
    { id: 'residential', label: 'Residential', content: <TariffTable plans={RESIDENTIAL} /> },
    { id: 'commercial', label: 'Commercial', content: <TariffTable plans={COMMERCIAL} /> },
    { id: 'industrial', label: 'Industrial', content: <TariffTable plans={INDUSTRIAL} /> },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-text-primary">Tariff Comparison</h3>
      <TabGroup tabs={tabs} label="Tariff categories" />
    </div>
  );
}
