'use client';
import { ProductionLineStatus } from '@/modules/domain/manufacturing/ProductionLineStatus';
import { WorkOrderBoard } from '@/modules/domain/manufacturing/WorkOrderBoard';
import { MachineHealthCard } from '@/modules/domain/manufacturing/MachineHealthCard';
import { DowntimeReasonPicker } from '@/modules/domain/manufacturing/DowntimeReasonPicker';
import { InventoryReorderPanel } from '@/modules/domain/manufacturing/InventoryReorderPanel';
import type { ShowcaseComponent } from '../showcase.types';

export function buildManufacturingData(): ShowcaseComponent[] {
  return [
    {
      id: 'mf-production-line',
      title: 'ProductionLineStatus',
      category: 'Domain' as const,
      abbr: 'Pl',
      description: 'Production line monitoring table with efficiency bars, fault alerts with acknowledge action, and status badges.',
      filePath: 'modules/domain/manufacturing/ProductionLineStatus.tsx',
      sourceCode: `import { ProductionLineStatus } from '@/modules/domain/manufacturing/ProductionLineStatus';\n\n<ProductionLineStatus\n  lines={productionLines}\n  onAcknowledge={(id) => acknowledgeAlert(id)}\n/>`,
      variants: [
        {
          title: 'Production line monitor',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ProductionLineStatus
                lines={[
                  { id: 'l1', name: 'Line A', product: 'Widget X200', status: 'running', efficiency: 94, unitsPerHour: 380, targetUph: 400, shift: 'Morning' },
                  { id: 'l2', name: 'Line B', product: 'Widget Y400', status: 'fault', efficiency: 0, unitsPerHour: 0, targetUph: 350, shift: 'Morning', lastAlert: 'Conveyor jam detected at 09:42' },
                  { id: 'l3', name: 'Line C', product: 'Component Z1', status: 'maintenance', efficiency: 0, unitsPerHour: 0, targetUph: 200, shift: 'Afternoon' },
                ]}
                onAcknowledge={() => {}}
              />
            </div>
          ),
          code: `<ProductionLineStatus\n  lines={[\n    { id: 'l1', name: 'Line A', product: 'Widget X200', status: 'running', efficiency: 94, unitsPerHour: 380, targetUph: 400, shift: 'Morning' },\n    { id: 'l2', name: 'Line B', product: 'Widget Y400', status: 'fault', efficiency: 0, unitsPerHour: 0, targetUph: 350, shift: 'Morning', lastAlert: 'Conveyor jam' },\n  ]}\n  onAcknowledge={(id) => acknowledgeAlert(id)}\n/>`,
        },
      ],
    },

    {
      id: 'mf-work-order',
      title: 'WorkOrderBoard',
      category: 'Domain' as const,
      abbr: 'Wo',
      description: 'Work order table/card view with progress bars, priority badges, status badges, and action dropdown.',
      filePath: 'modules/domain/manufacturing/WorkOrderBoard.tsx',
      sourceCode: `import { WorkOrderBoard } from '@/modules/domain/manufacturing/WorkOrderBoard';\n\n<WorkOrderBoard\n  orders={workOrders}\n  onStart={(id) => startOrder(id)}\n  onPause={(id) => pauseOrder(id)}\n  onCancel={(id) => cancelOrder(id)}\n/>`,
      variants: [
        {
          title: 'Work order board',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <WorkOrderBoard
                orders={[
                  { id: 'wo1', orderNo: 'WO-2042', product: 'Widget X200', quantity: 500, completed: 312, priority: 'high', status: 'in-progress', dueDate: '2026-04-22', assignedLine: 'Line A' },
                  { id: 'wo2', orderNo: 'WO-2043', product: 'Component Z1', quantity: 1000, completed: 0, priority: 'medium', status: 'queued', dueDate: '2026-04-25' },
                  { id: 'wo3', orderNo: 'WO-2041', product: 'Widget Y400', quantity: 200, completed: 200, priority: 'low', status: 'completed', dueDate: '2026-04-20' },
                ]}
                onStart={() => {}}
                onPause={() => {}}
                onCancel={() => {}}
              />
            </div>
          ),
          code: `<WorkOrderBoard\n  orders={[\n    { id: 'wo1', orderNo: 'WO-2042', product: 'Widget X200', quantity: 500, completed: 312, priority: 'high', status: 'in-progress', dueDate: '2026-04-22' },\n    { id: 'wo2', orderNo: 'WO-2043', product: 'Component Z1', quantity: 1000, completed: 0, priority: 'medium', status: 'queued', dueDate: '2026-04-25' },\n  ]}\n  onStart={(id) => startOrder(id)}\n  onPause={(id) => pauseOrder(id)}\n/>`,
        },
      ],
    },

    {
      id: 'mf-machine-health',
      title: 'MachineHealthCard',
      category: 'Domain' as const,
      abbr: 'Mh',
      description: 'Machine health card with temperature/vibration/uptime metrics, health score bar, and fault codes.',
      filePath: 'modules/domain/manufacturing/MachineHealthCard.tsx',
      sourceCode: `import { MachineHealthCard } from '@/modules/domain/manufacturing/MachineHealthCard';\n\n<MachineHealthCard\n  machineId="MCH-001"\n  machineName="CNC Router #3"\n  temperature={72}\n  vibration={0.3}\n  uptimePct={97.5}\n  status="ok"\n/>`,
      variants: [
        {
          title: 'Machine health card',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <MachineHealthCard
                machineId="MCH-003"
                machineName="CNC Router #3"
                location="Assembly Hall B"
                temperature={72}
                vibration={0.3}
                uptimePct={97.5}
                lastMaintenance="2026-03-15"
                nextMaintenance="2026-06-15"
                status="ok"
              />
            </div>
          ),
          code: `<MachineHealthCard\n  machineId="MCH-003"\n  machineName="CNC Router #3"\n  temperature={72}\n  vibration={0.3}\n  uptimePct={97.5}\n  lastMaintenance="2026-03-15"\n  nextMaintenance="2026-06-15"\n  status="ok"\n/>`,
        },
      ],
    },

    {
      id: 'mf-downtime',
      title: 'DowntimeReasonPicker',
      category: 'Domain' as const,
      abbr: 'Dr',
      description: 'Downtime logging form with category select, fault-code ComboBox, duration picker, and notes textarea.',
      filePath: 'modules/domain/manufacturing/DowntimeReasonPicker.tsx',
      sourceCode: `import { DowntimeReasonPicker } from '@/modules/domain/manufacturing/DowntimeReasonPicker';\n\n<DowntimeReasonPicker\n  machineId="MCH-003"\n  machineName="CNC Router #3"\n  reasonOptions={faultCodes}\n  onSubmit={(report) => logDowntime(report)}\n/>`,
      variants: [
        {
          title: 'Downtime reason picker',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <DowntimeReasonPicker
                machineId="MCH-003"
                machineName="CNC Router #3"
                reasonOptions={[
                  { value: 'E101', label: 'E101 – Spindle overload' },
                  { value: 'E204', label: 'E204 – Coolant low' },
                  { value: 'E312', label: 'E312 – Tool changer fault' },
                  { value: 'E401', label: 'E401 – Axis limit exceeded' },
                ]}
                onSubmit={() => {}}
              />
            </div>
          ),
          code: `<DowntimeReasonPicker\n  machineId="MCH-003"\n  machineName="CNC Router #3"\n  reasonOptions={[\n    { value: 'E101', label: 'E101 – Spindle overload' },\n    { value: 'E204', label: 'E204 – Coolant low' },\n  ]}\n  onSubmit={(report) => logDowntime(report)}\n  onCancel={() => closePanel()}\n/>`,
        },
      ],
    },

    {
      id: 'mf-inventory',
      title: 'InventoryReorderPanel',
      category: 'Domain' as const,
      abbr: 'Ir',
      description: 'Inventory reorder panel with critical-stock alerts, editable order quantities, and bulk reorder submission.',
      filePath: 'modules/domain/manufacturing/InventoryReorderPanel.tsx',
      sourceCode: `import { InventoryReorderPanel } from '@/modules/domain/manufacturing/InventoryReorderPanel';\n\n<InventoryReorderPanel\n  items={inventoryItems}\n  onReorder={async (orders) => placeReorders(orders)}\n/>`,
      variants: [
        {
          title: 'Inventory reorder panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <InventoryReorderPanel
                items={[
                  { id: 'i1', sku: 'RAW-1001', name: 'Aluminum rod 6mm', currentStock: 45, reorderPoint: 100, reorderQty: 500, unit: 'pcs', supplier: 'MetalCo', leadDays: 7 },
                  { id: 'i2', sku: 'RAW-1002', name: 'Steel plate 2mm', currentStock: 220, reorderPoint: 200, reorderQty: 1000, unit: 'pcs', supplier: 'SteelWorks', leadDays: 14 },
                  { id: 'i3', sku: 'CONS-001', name: 'Cutting fluid', currentStock: 8, reorderPoint: 20, reorderQty: 50, unit: 'liters', supplier: 'ChemSupply', leadDays: 3 },
                ]}
                onReorder={async () => {}}
              />
            </div>
          ),
          code: `<InventoryReorderPanel\n  items={[\n    { id: 'i1', sku: 'RAW-1001', name: 'Aluminum rod', currentStock: 45, reorderPoint: 100, reorderQty: 500, unit: 'pcs', supplier: 'MetalCo', leadDays: 7 },\n  ]}\n  onReorder={async (orders) => {\n    await placeReorders(orders);\n  }}\n/>`,
        },
      ],
    },
  ];
}
