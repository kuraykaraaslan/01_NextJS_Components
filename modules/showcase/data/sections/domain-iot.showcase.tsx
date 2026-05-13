'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { DeviceStatusBadge } from '@/modules/domains/iot/device/DeviceStatusBadge';
import { DeviceTypeBadge } from '@/modules/domains/iot/device/DeviceTypeBadge';
import { AlertSeverityBadge } from '@/modules/domains/iot/alert/AlertSeverityBadge';
import { DeviceCard } from '@/modules/domains/iot/device/DeviceCard';
import { CloudWorkspaceCard } from '@/modules/domains/iot/workspace/CloudWorkspaceCard';
import { RulesetEditor } from '@/modules/domains/iot/ruleset/RulesetEditor';
import type { Device, CloudWorkspace, RuleNode, RuleEdge } from '@/modules/domains/iot/types';

/* ─── demo data ─── */

const DEMO_DEVICE_ONLINE: Device = {
  deviceId: 'dev-demo-001',
  name: 'Press Line Sensor A1',
  slug: 'press-line-sensor-a1',
  type: 'INTERNAL',
  role: 'DEVICE',
  status: 'ONLINE',
  cloudId: 'cloud-demo',
  model: 'Nexus S200',
  firmware: 'v2.4.1',
  tags: ['production', 'critical'],
  location: { lat: 52.52, lng: 13.405, label: 'Hall A — Bay 3' },
  lastSeenAt: new Date(Date.now() - 45_000),
};

const DEMO_DEVICE_ERROR: Device = {
  deviceId: 'dev-demo-002',
  name: 'Coolant Temp Monitor',
  slug: 'coolant-temp-monitor',
  type: 'INTERNAL',
  role: 'DEVICE',
  status: 'ERROR',
  cloudId: 'cloud-demo',
  model: 'Nexus T100',
  firmware: 'v2.3.8',
  tags: ['coolant', 'temperature'],
  location: { lat: 52.519, lng: 13.404, label: 'Hall A — Coolant Station' },
  lastSeenAt: new Date(Date.now() - 720_000),
};

const DEMO_GATEWAY: Device = {
  deviceId: 'dev-demo-003',
  name: 'Assembly Robot Gateway',
  slug: 'assembly-robot-gateway',
  type: 'INTERNAL',
  role: 'GATEWAY',
  status: 'ONLINE',
  cloudId: 'cloud-demo',
  model: 'Nexus GW500',
  firmware: 'v3.1.0',
  tags: ['assembly', 'gateway'],
  lastSeenAt: new Date(Date.now() - 12_000),
};

const DEMO_WORKSPACE_ACTIVE: CloudWorkspace = {
  cloudId: 'cloud-demo-001',
  name: 'Smart Factory Alpha',
  slug: 'smart-factory-alpha',
  status: 'ACTIVE',
  plan: 'ENTERPRISE',
  deviceCount: 142,
  onlineCount: 138,
  memberCount: 12,
  customDomain: 'iot.acme-factory.com',
  region: 'EU-West',
};

const DEMO_WORKSPACE_SUSPENDED: CloudWorkspace = {
  cloudId: 'cloud-demo-002',
  name: 'Legacy Pilot',
  slug: 'legacy-pilot',
  status: 'SUSPENDED',
  plan: 'FREE',
  deviceCount: 4,
  onlineCount: 0,
  memberCount: 1,
  region: 'US-West',
};

/* ─── rule engine demo data ─── */

const DEMO_NODES: RuleNode[] = [
  { nodeId: 'n1', type: 'TRIGGER',   label: 'MQTT Ingress',   x: 30,  y: 60  },
  { nodeId: 'n2', type: 'FILTER',    label: 'Temp > 85 °C',   x: 240, y: 60  },
  { nodeId: 'n3', type: 'ACTION',    label: 'Send Alert',     x: 460, y: 20  },
  { nodeId: 'n4', type: 'ACTION',    label: 'Log Reading',    x: 460, y: 140 },
];

const DEMO_EDGES: RuleEdge[] = [
  { edgeId: 'e1', sourceNodeId: 'n1', sourcePort: 'out',   targetNodeId: 'n2', targetPort: 'in' },
  { edgeId: 'e2', sourceNodeId: 'n2', sourcePort: 'true',  targetNodeId: 'n3', targetPort: 'in' },
  { edgeId: 'e3', sourceNodeId: 'n2', sourcePort: 'false', targetNodeId: 'n4', targetPort: 'in' },
];

/* ─── showcase builder ─── */

export function buildIoTDomainData(): ShowcaseComponent[] {
  return [
    {
      id: 'iot-device-status-badge',
      title: 'DeviceStatusBadge',
      category: 'Domain',
      abbr: 'DS',
      description: 'Displays device connectivity state — Online, Offline, Error, or Maintenance.',
      filePath: 'modules/domains/iot/device/DeviceStatusBadge.tsx',
      sourceCode: `'use client';
import { Badge } from '@/modules/ui/Badge';
import type { DeviceStatus } from '../types';

export function DeviceStatusBadge({ status, size = 'md', className }) {
  // ...
}`,
      variants: [
        {
          title: 'All states',
          layout: 'side',
          preview: (
            <div className="flex flex-wrap gap-2">
              <DeviceStatusBadge status="ONLINE" />
              <DeviceStatusBadge status="OFFLINE" />
              <DeviceStatusBadge status="ERROR" />
              <DeviceStatusBadge status="MAINTENANCE" />
            </div>
          ),
          code: `<DeviceStatusBadge status="ONLINE" />
<DeviceStatusBadge status="OFFLINE" />
<DeviceStatusBadge status="ERROR" />
<DeviceStatusBadge status="MAINTENANCE" />`,
        },
        {
          title: 'Small size',
          layout: 'side',
          preview: (
            <div className="flex flex-wrap gap-2">
              <DeviceStatusBadge status="ONLINE" size="sm" />
              <DeviceStatusBadge status="ERROR" size="sm" />
            </div>
          ),
          code: `<DeviceStatusBadge status="ONLINE" size="sm" />
<DeviceStatusBadge status="ERROR" size="sm" />`,
        },
      ],
    },
    {
      id: 'iot-device-type-badge',
      title: 'DeviceTypeBadge',
      category: 'Domain',
      abbr: 'DT',
      description: 'Indicates device origin — Internal first-party hardware, third-party Integration, or External feed.',
      filePath: 'modules/domains/iot/device/DeviceTypeBadge.tsx',
      sourceCode: `'use client';
import { Badge } from '@/modules/ui/Badge';
import type { DeviceType } from '../types';

export function DeviceTypeBadge({ type, size = 'md', className }) {
  // ...
}`,
      variants: [
        {
          title: 'All types',
          layout: 'side',
          preview: (
            <div className="flex flex-wrap gap-2">
              <DeviceTypeBadge type="INTERNAL" />
              <DeviceTypeBadge type="INTEGRATION" />
              <DeviceTypeBadge type="EXTERNAL" />
            </div>
          ),
          code: `<DeviceTypeBadge type="INTERNAL" />
<DeviceTypeBadge type="INTEGRATION" />
<DeviceTypeBadge type="EXTERNAL" />`,
        },
        {
          title: 'Small size',
          layout: 'side',
          preview: (
            <div className="flex flex-wrap gap-2">
              <DeviceTypeBadge type="INTERNAL" size="sm" />
              <DeviceTypeBadge type="INTEGRATION" size="sm" />
            </div>
          ),
          code: `<DeviceTypeBadge type="INTERNAL" size="sm" />
<DeviceTypeBadge type="INTEGRATION" size="sm" />`,
        },
      ],
    },
    {
      id: 'iot-alert-severity-badge',
      title: 'AlertSeverityBadge',
      category: 'Domain',
      abbr: 'AS',
      description: 'Alert severity indicator — Info, Warning, or Critical.',
      filePath: 'modules/domains/iot/alert/AlertSeverityBadge.tsx',
      sourceCode: `'use client';
import { Badge } from '@/modules/ui/Badge';
import type { AlertSeverity } from '../types';

export function AlertSeverityBadge({ severity, size = 'md', className }) {
  // ...
}`,
      variants: [
        {
          title: 'All severities',
          layout: 'side',
          preview: (
            <div className="flex flex-wrap gap-2">
              <AlertSeverityBadge severity="INFO" />
              <AlertSeverityBadge severity="WARNING" />
              <AlertSeverityBadge severity="CRITICAL" />
            </div>
          ),
          code: `<AlertSeverityBadge severity="INFO" />
<AlertSeverityBadge severity="WARNING" />
<AlertSeverityBadge severity="CRITICAL" />`,
        },
        {
          title: 'Small',
          layout: 'side',
          preview: (
            <div className="flex flex-wrap gap-2">
              <AlertSeverityBadge severity="WARNING" size="sm" />
              <AlertSeverityBadge severity="CRITICAL" size="sm" />
            </div>
          ),
          code: `<AlertSeverityBadge severity="WARNING" size="sm" />
<AlertSeverityBadge severity="CRITICAL" size="sm" />`,
        },
      ],
    },
    {
      id: 'iot-device-card',
      title: 'DeviceCard',
      category: 'Domain',
      abbr: 'DC',
      description: 'Compact device summary card showing status, type, location, last-seen time and tags.',
      filePath: 'modules/domains/iot/device/DeviceCard.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { DeviceStatusBadge } from './DeviceStatusBadge';
import { DeviceTypeBadge } from './DeviceTypeBadge';
import type { Device } from '../types';

export function DeviceCard({ device, className, onClick }) {
  // ...
}`,
      variants: [
        {
          title: 'Online device',
          layout: 'side',
          preview: (
            <div className="max-w-xs">
              <DeviceCard device={DEMO_DEVICE_ONLINE} />
            </div>
          ),
          code: `<DeviceCard device={device} />`,
        },
        {
          title: 'Error + Gateway',
          layout: 'side',
          preview: (
            <div className="flex flex-col gap-3 max-w-xs">
              <DeviceCard device={DEMO_DEVICE_ERROR} />
              <DeviceCard device={DEMO_GATEWAY} />
            </div>
          ),
          code: `<DeviceCard device={errorDevice} />
<DeviceCard device={gatewayDevice} />`,
        },
      ],
    },
    {
      id: 'iot-cloud-workspace-card',
      title: 'CloudWorkspaceCard',
      category: 'Domain',
      abbr: 'CW',
      description: 'Cloud workspace overview card — status, plan, device counts with online progress bar.',
      filePath: 'modules/domains/iot/workspace/CloudWorkspaceCard.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { Badge } from '@/modules/ui/Badge';
import type { CloudWorkspace } from '../types';

export function CloudWorkspaceCard({ workspace, className, onClick }) {
  // ...
}`,
      variants: [
        {
          title: 'Active workspace',
          layout: 'side',
          preview: (
            <div className="max-w-sm">
              <CloudWorkspaceCard workspace={DEMO_WORKSPACE_ACTIVE} />
            </div>
          ),
          code: `<CloudWorkspaceCard workspace={workspace} />`,
        },
        {
          title: 'Suspended workspace',
          layout: 'side',
          preview: (
            <div className="max-w-sm">
              <CloudWorkspaceCard workspace={DEMO_WORKSPACE_SUSPENDED} />
            </div>
          ),
          code: `<CloudWorkspaceCard workspace={suspendedWorkspace} />`,
        },
      ],
    },
    {
      id: 'iot-ruleset-editor',
      title: 'RulesetEditor',
      category: 'Domain',
      abbr: 'RE',
      description: 'Drag-and-drop visual rule chain editor — build telemetry pipelines with Trigger, Filter, Switch, Transform, and Action nodes.',
      filePath: 'modules/domains/iot/ruleset/RulesetEditor.tsx',
      sourceCode: `'use client';
// Drag nodes from palette onto the canvas.
// Click output ports (filled) → input ports (hollow) to wire them.
// Click an edge to delete it. Select a node to reveal the delete button.

export function RulesetEditor({ initialNodes, initialEdges, readOnly, className }) {
  // ...
}`,
      variants: [
        {
          title: 'With pre-loaded chain',
          layout: 'stack',
          preview: (
            <div className="h-72 w-full rounded-xl overflow-hidden border border-border">
              <RulesetEditor
                initialNodes={DEMO_NODES}
                initialEdges={DEMO_EDGES}
              />
            </div>
          ),
          code: `<RulesetEditor
  initialNodes={nodes}
  initialEdges={edges}
/>`,
        },
        {
          title: 'Empty canvas (editable)',
          layout: 'stack',
          preview: (
            <div className="h-64 w-full rounded-xl overflow-hidden border border-border">
              <RulesetEditor />
            </div>
          ),
          code: `<RulesetEditor />`,
        },
      ],
    },
  ];
}
