'use client';
import { ShipmentStatusBoard } from '@/modules/domain/logistics/ShipmentStatusBoard';
import { RouteMapSidePanel } from '@/modules/domain/logistics/RouteMapSidePanel';
import { DeliverySlotPicker } from '@/modules/domain/logistics/DeliverySlotPicker';
import { WarehouseBinView } from '@/modules/domain/logistics/WarehouseBinView';
import { DriverAssignmentTable } from '@/modules/domain/logistics/DriverAssignmentTable';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

export function buildLogisticsData(): ShowcaseComponent[] {
  return [
    {
      id: 'lg-shipment-board',
      title: 'ShipmentStatusBoard',
      category: 'Domain' as const,
      abbr: 'Sb',
      description: 'Searchable shipment table with status badges, fault/delay alerts, and selectable rows.',
      filePath: 'modules/domain/logistics/ShipmentStatusBoard.tsx',
      sourceCode: `import { ShipmentStatusBoard } from '@/modules/domain/logistics/ShipmentStatusBoard';\n\n<ShipmentStatusBoard shipments={shipments} />`,
      variants: [
        {
          title: 'Shipment board',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ShipmentStatusBoard shipments={[
                { id: '1', trackingNo: 'TRK-001234', origin: 'Istanbul', destination: 'London', carrier: 'DHL', status: 'in-transit', eta: '2026-04-22' },
                { id: '2', trackingNo: 'TRK-001235', origin: 'Berlin', destination: 'Paris', carrier: 'FedEx', status: 'delivered', eta: '2026-04-20' },
                { id: '3', trackingNo: 'TRK-001236', origin: 'Madrid', destination: 'Rome', carrier: 'UPS', status: 'delayed', eta: '2026-04-25' },
                { id: '4', trackingNo: 'TRK-001237', origin: 'Warsaw', destination: 'Vienna', carrier: 'DHL', status: 'failed', eta: '2026-04-21' },
              ]} />
            </div>
          ),
          code: `<ShipmentStatusBoard\n  shipments={[\n    { id: '1', trackingNo: 'TRK-001234', origin: 'Istanbul', destination: 'London', carrier: 'DHL', status: 'in-transit', eta: '2026-04-22' },\n    { id: '2', trackingNo: 'TRK-001236', origin: 'Madrid', destination: 'Rome', carrier: 'UPS', status: 'delayed', eta: '2026-04-25' },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'lg-route-map',
      title: 'RouteMapSidePanel',
      category: 'Domain' as const,
      abbr: 'Rm',
      description: 'Drawer showing route stops timeline with status dots, distance/duration cards, and list/map toggle.',
      filePath: 'modules/domain/logistics/RouteMapSidePanel.tsx',
      sourceCode: `import { RouteMapSidePanel } from '@/modules/domain/logistics/RouteMapSidePanel';\n\n<RouteMapSidePanel\n  open={open}\n  onClose={() => setOpen(false)}\n  routeId="RT-1042"\n  stops={stops}\n  totalDistance="248 km"\n  totalDuration="3h 20min"\n/>`,
      variants: [
        {
          title: 'Route side panel (trigger)',
          layout: 'stack' as const,
          preview: (() => {
            function Demo() {
              const [open, setOpen] = useState(false);
              return (
                <div>
                  <button type="button" onClick={() => setOpen(true)} className="px-4 py-2 rounded-lg bg-primary text-primary-fg text-sm font-medium">
                    Open route panel
                  </button>
                  <RouteMapSidePanel
                    open={open}
                    onClose={() => setOpen(false)}
                    routeId="RT-1042"
                    totalDistance="248 km"
                    totalDuration="3h 20min"
                    stops={[
                      { id: 's1', label: 'Warehouse A', address: '12 Industrial St, Istanbul', status: 'departed', eta: '08:00' },
                      { id: 's2', label: 'Customer #1', address: '45 Main Blvd, Ankara', status: 'arrived', eta: '11:30' },
                      { id: 's3', label: 'Customer #2', address: '7 Park Ave, Izmir', status: 'pending', eta: '15:00' },
                    ]}
                  />
                </div>
              );
            }
            return <Demo />;
          })(),
          code: `<RouteMapSidePanel\n  open={open}\n  onClose={() => setOpen(false)}\n  routeId="RT-1042"\n  stops={[\n    { id: 's1', label: 'Warehouse A', address: '12 Industrial St', status: 'departed', eta: '08:00' },\n    { id: 's2', label: 'Customer #1', address: '45 Main Blvd', status: 'pending', eta: '11:30' },\n  ]}\n  totalDistance="248 km"\n  totalDuration="3h 20min"\n/>`,
        },
      ],
    },

    {
      id: 'lg-delivery-slot',
      title: 'DeliverySlotPicker',
      category: 'Domain' as const,
      abbr: 'Ds',
      description: 'Delivery date and time-window picker with optional specific-time TimePicker and validation.',
      filePath: 'modules/domain/logistics/DeliverySlotPicker.tsx',
      sourceCode: `import { DeliverySlotPicker } from '@/modules/domain/logistics/DeliverySlotPicker';\n\n<DeliverySlotPicker\n  onConfirm={(date, slot, specificTime) => scheduleDelivery({ date, slot, specificTime })}\n/>`,
      variants: [
        {
          title: 'Delivery slot picker',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <DeliverySlotPicker />
            </div>
          ),
          code: `<DeliverySlotPicker\n  onConfirm={(date, slot, specificTime) => {\n    scheduleDelivery({ date, slot, specificTime });\n  }}\n/>`,
        },
      ],
    },

    {
      id: 'lg-warehouse-bin',
      title: 'WarehouseBinView',
      category: 'Domain' as const,
      abbr: 'Wb',
      description: 'Searchable TreeView of warehouse zones/bins with capacity utilization bar on selection.',
      filePath: 'modules/domain/logistics/WarehouseBinView.tsx',
      sourceCode: `import { WarehouseBinView } from '@/modules/domain/logistics/WarehouseBinView';\n\n<WarehouseBinView bins={bins} onSelectBin={(id) => loadBinDetails(id)} />`,
      variants: [
        {
          title: 'Warehouse bin view',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <WarehouseBinView
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                bins={[
                  { id: 'A', label: 'Zone A', children: [
                    { id: 'A1', label: 'A-01', sku: 'SKU-1001', capacity: 100, used: 82 },
                    { id: 'A2', label: 'A-02', sku: 'SKU-1002', capacity: 100, used: 45 },
                  ] as any },
                  { id: 'B', label: 'Zone B', children: [
                    { id: 'B1', label: 'B-01', sku: 'SKU-2001', capacity: 200, used: 195 },
                    { id: 'B2', label: 'B-02', sku: 'SKU-2002', capacity: 200, used: 60 },
                  ] as any },
                ]}
                onSelectBin={() => {}}
              />
            </div>
          ),
          code: `<WarehouseBinView\n  bins={[\n    { id: 'A', label: 'Zone A', children: [\n      { id: 'A1', label: 'A-01', sku: 'SKU-1001', capacity: 100, used: 82 },\n    ]},\n  ]}\n  onSelectBin={(id) => loadBinDetails(id)}\n/>`,
        },
      ],
    },

    {
      id: 'lg-driver-table',
      title: 'DriverAssignmentTable',
      category: 'Domain' as const,
      abbr: 'Da',
      description: 'Route-driver assignment table with per-row ComboBox, avatar group, and paginated DataTable.',
      filePath: 'modules/domain/logistics/DriverAssignmentTable.tsx',
      sourceCode: `import { DriverAssignmentTable } from '@/modules/domain/logistics/DriverAssignmentTable';\n\n<DriverAssignmentTable\n  rows={routes}\n  driverOptions={drivers}\n  onAssign={(routeId, driverId) => assign(routeId, driverId)}\n/>`,
      variants: [
        {
          title: 'Driver assignment table',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <DriverAssignmentTable
                rows={[
                  { id: 'r1', routeId: 'RT-1001', origin: 'Istanbul', destination: 'Ankara', assignedDrivers: [{ name: 'Ali Yılmaz' }], status: 'pending' },
                  { id: 'r2', routeId: 'RT-1002', origin: 'Ankara', destination: 'Izmir', assignedDrivers: [], status: 'unassigned' },
                  { id: 'r3', routeId: 'RT-1003', origin: 'Bursa', destination: 'Eskişehir', assignedDrivers: [{ name: 'Mehmet K.' }, { name: 'Fatma S.' }], status: 'assigned' },
                ]}
                driverOptions={[
                  { value: 'd1', label: 'Ali Yılmaz' },
                  { value: 'd2', label: 'Fatma Şahin' },
                  { value: 'd3', label: 'Ömer Demir' },
                ]}
                onAssign={() => {}}
              />
            </div>
          ),
          code: `<DriverAssignmentTable\n  rows={routes}\n  driverOptions={[\n    { value: 'd1', label: 'Ali Yılmaz' },\n    { value: 'd2', label: 'Fatma Şahin' },\n  ]}\n  onAssign={(routeId, driverId) => assign(routeId, driverId)}\n/>`,
        },
      ],
    },
  ];
}
