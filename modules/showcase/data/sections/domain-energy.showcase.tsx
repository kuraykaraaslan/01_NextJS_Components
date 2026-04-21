'use client';
import { ConsumptionKpiCard } from '@/modules/domain/energy/ConsumptionKpiCard';
import { MeterReadingTable } from '@/modules/domain/energy/MeterReadingTable';
import { OutageStatusBoard } from '@/modules/domain/energy/OutageStatusBoard';
import { TariffComparisonPanel } from '@/modules/domain/energy/TariffComparisonPanel';
import { PeakUsageAlertPanel } from '@/modules/domain/energy/PeakUsageAlertPanel';
import { MaintenanceScheduleTable } from '@/modules/domain/energy/MaintenanceScheduleTable';
import type { ShowcaseComponent } from '../showcase.types';

export function buildEnergyData(): ShowcaseComponent[] {
  return [
    {
      id: 'enrg-kpi-card',
      title: 'ConsumptionKpiCard',
      category: 'Domain' as const,
      abbr: 'Ck',
      description: 'Energy KPI grid with 4 metric cards: usage, bill, carbon offset, peak demand — each with a fill bar and tooltip.',
      filePath: 'modules/domain/energy/ConsumptionKpiCard.tsx',
      sourceCode: `import { ConsumptionKpiCard } from '@/modules/domain/energy/ConsumptionKpiCard';\n\n<ConsumptionKpiCard />`,
      variants: [
        {
          title: 'Energy KPI cards',
          layout: 'stack' as const,
          preview: (<div className="w-full"><ConsumptionKpiCard /></div>),
          code: `<ConsumptionKpiCard />`,
        },
      ],
    },
    {
      id: 'enrg-meter-table',
      title: 'MeterReadingTable',
      category: 'Domain' as const,
      abbr: 'Mr',
      description: 'Meter readings DataTable with date range filter, unit and variance badges.',
      filePath: 'modules/domain/energy/MeterReadingTable.tsx',
      sourceCode: `import { MeterReadingTable } from '@/modules/domain/energy/MeterReadingTable';\n\n<MeterReadingTable />`,
      variants: [
        {
          title: 'Meter readings',
          layout: 'stack' as const,
          preview: (<div className="w-full"><MeterReadingTable /></div>),
          code: `<MeterReadingTable />`,
        },
      ],
    },
    {
      id: 'enrg-outage-board',
      title: 'OutageStatusBoard',
      category: 'Domain' as const,
      abbr: 'Os',
      description: 'Outage status board with active outage alert banner, zone table with status badges, and refresh button.',
      filePath: 'modules/domain/energy/OutageStatusBoard.tsx',
      sourceCode: `import { OutageStatusBoard } from '@/modules/domain/energy/OutageStatusBoard';\n\n<OutageStatusBoard />`,
      variants: [
        {
          title: 'Outage status board',
          layout: 'stack' as const,
          preview: (<div className="w-full"><OutageStatusBoard /></div>),
          code: `<OutageStatusBoard />`,
        },
      ],
    },
    {
      id: 'enrg-tariff-compare',
      title: 'TariffComparisonPanel',
      category: 'Domain' as const,
      abbr: 'Tc',
      description: 'Tariff comparison with Residential/Commercial/Industrial tabs, peak/off-peak rate badges, and switch button.',
      filePath: 'modules/domain/energy/TariffComparisonPanel.tsx',
      sourceCode: `import { TariffComparisonPanel } from '@/modules/domain/energy/TariffComparisonPanel';\n\n<TariffComparisonPanel />`,
      variants: [
        {
          title: 'Tariff comparison',
          layout: 'stack' as const,
          preview: (<div className="w-full"><TariffComparisonPanel /></div>),
          code: `<TariffComparisonPanel />`,
        },
      ],
    },
    {
      id: 'enrg-peak-alert',
      title: 'PeakUsageAlertPanel',
      category: 'Domain' as const,
      abbr: 'Pa',
      description: 'Peak usage monitor with load bar, warning alert when near capacity, and color-coded energy-saving tips.',
      filePath: 'modules/domain/energy/PeakUsageAlertPanel.tsx',
      sourceCode: `import { PeakUsageAlertPanel } from '@/modules/domain/energy/PeakUsageAlertPanel';\n\n<PeakUsageAlertPanel />`,
      variants: [
        {
          title: 'Peak usage alert',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><PeakUsageAlertPanel /></div>),
          code: `<PeakUsageAlertPanel />`,
        },
      ],
    },
    {
      id: 'enrg-maintenance',
      title: 'MaintenanceScheduleTable',
      category: 'Domain' as const,
      abbr: 'Ms',
      description: 'Maintenance schedule AdvancedDataTable with inline date editing, type/status/priority badges.',
      filePath: 'modules/domain/energy/MaintenanceScheduleTable.tsx',
      sourceCode: `import { MaintenanceScheduleTable } from '@/modules/domain/energy/MaintenanceScheduleTable';\n\n<MaintenanceScheduleTable />`,
      variants: [
        {
          title: 'Maintenance schedule',
          layout: 'stack' as const,
          preview: (<div className="w-full"><MaintenanceScheduleTable /></div>),
          code: `<MaintenanceScheduleTable />`,
        },
      ],
    },
  ];
}
