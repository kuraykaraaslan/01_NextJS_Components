'use client';
import { useState } from 'react';
import { DetailHeader } from '@/modules/app/DetailHeader';
import { SplashScreen } from '@/modules/app/SplashScreen';
import { Button } from '@/modules/ui/Button';
import type { ShowcaseComponent } from '../showcase.types';

function DetailHeaderBasicDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border">
      <DetailHeader
        title="Invoice #1042"
        subtitle="Created 3 days ago by Jane Doe"
        status="Pending"
        statusVariant="warning"
      >
        <Button variant="outline" size="sm">Edit</Button>
        <Button variant="primary" size="sm">Approve</Button>
      </DetailHeader>
    </div>
  );
}

function DetailHeaderTabsDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border">
      <DetailHeader
        title="Order #8821"
        subtitle="Last updated 2 hours ago"
        status="Shipped"
        statusVariant="success"
        tabs={[
          { value: 'overview', label: 'Overview' },
          { value: 'items',    label: 'Items'    },
          { value: 'history',  label: 'History'  },
          { value: 'notes',    label: 'Notes', disabled: true },
        ]}
        defaultTab="overview"
      >
        <Button variant="ghost" size="sm">Print</Button>
        <Button variant="primary" size="sm">Track</Button>
      </DetailHeader>
    </div>
  );
}

export function buildAppContentData(): ShowcaseComponent[] {
  return [
    {
      id: 'detail-header',
      title: 'DetailHeader',
      category: 'App',
      abbr: 'DH',
      description: 'Page header for detail/record views: title, subtitle, status badge, action buttons, and optional tab navigation.',
      filePath: 'modules/app/DetailHeader.tsx',
      sourceCode: `'use client';
import { DetailHeader } from '@/modules/app/DetailHeader';

<DetailHeader
  title="Invoice #1042"
  subtitle="Created 3 days ago"
  status="Pending"
  statusVariant="warning"
  tabs={[
    { value: 'overview', label: 'Overview' },
    { value: 'items',    label: 'Items'    },
  ]}
  defaultTab="overview"
>
  <Button variant="primary" size="sm">Approve</Button>
</DetailHeader>`,
      variants: [
        {
          title: 'With actions, no tabs',
          layout: 'stack' as const,
          preview: <DetailHeaderBasicDemo />,
          code: `<DetailHeader
  title="Invoice #1042"
  subtitle="Created 3 days ago by Jane Doe"
  status="Pending"
  statusVariant="warning"
>
  <Button variant="outline" size="sm">Edit</Button>
  <Button variant="primary" size="sm">Approve</Button>
</DetailHeader>`,
        },
        {
          title: 'With tabs',
          layout: 'stack' as const,
          preview: <DetailHeaderTabsDemo />,
          code: `<DetailHeader
  title="Order #8821"
  subtitle="Last updated 2 hours ago"
  status="Shipped"
  statusVariant="success"
  tabs={[
    { value: 'overview', label: 'Overview' },
    { value: 'items',    label: 'Items'    },
    { value: 'history',  label: 'History'  },
    { value: 'notes',    label: 'Notes', disabled: true },
  ]}
  defaultTab="overview"
>
  <Button variant="ghost" size="sm">Print</Button>
  <Button variant="primary" size="sm">Track</Button>
</DetailHeader>`,
        },
      ],
    },
    {
      id: 'splash-screen',
      title: 'SplashScreen',
      category: 'App',
      abbr: 'SS',
      description: 'Full-screen overlay shown during app initialisation. Accepts a logo slot, optional progress bar, and fades out when visible=false.',
      filePath: 'modules/app/SplashScreen.tsx',
      sourceCode: `'use client';
import { SplashScreen } from '@/modules/app/SplashScreen';

// Show on mount, hide once data is ready
<SplashScreen
  visible={isLoading}
  logo={<span className="text-4xl font-black text-primary">Acme</span>}
  message="Loading your workspace…"
  progress={progress}
/>`,
      variants: [
        {
          title: 'Logo + message + progress',
          layout: 'stack' as const,
          preview: <SplashProgressDemo />,
          code: `<SplashScreen
  visible={true}
  logo={<span className="text-4xl font-black text-primary">Acme</span>}
  message="Loading your workspace…"
  progress={65}
/>`,
        },
        {
          title: 'Spinner only (no logo)',
          preview: <SplashSpinnerDemo />,
          code: `<SplashScreen visible={true} message="Please wait…" />`,
        },
        {
          title: 'Interactive fade-out',
          layout: 'stack' as const,
          preview: <SplashInteractiveDemo />,
          code: `const [visible, setVisible] = useState(true);

<SplashScreen
  visible={visible}
  logo={<span className="text-4xl font-black text-primary">Acme</span>}
  message="Starting up…"
/>
<Button onClick={() => setVisible(false)}>Dismiss</Button>`,
        },
      ],
    },
  ];
}

function SplashProgressDemo() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border bg-surface-base" style={{ height: 280 }}>
      <SplashScreen
        visible
        logo={<span className="text-4xl font-black text-primary tracking-tight">Acme</span>}
        message="Loading your workspace…"
        progress={65}
        className="absolute"
      />
    </div>
  );
}

function SplashSpinnerDemo() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border bg-surface-base" style={{ height: 200 }}>
      <SplashScreen
        visible
        message="Please wait…"
        className="absolute"
      />
    </div>
  );
}

function SplashInteractiveDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-border bg-surface-base" style={{ height: 280 }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-sm text-text-secondary">App content here</p>
          <Button variant="primary" size="sm" onClick={() => setVisible(true)}>Show splash</Button>
        </div>
      </div>
      <SplashScreen
        visible={visible}
        logo={<span className="text-4xl font-black text-primary tracking-tight">Acme</span>}
        message="Starting up…"
        className="absolute"
      />
      {visible && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <Button variant="outline" size="sm" onClick={() => setVisible(false)}>Dismiss</Button>
        </div>
      )}
    </div>
  );
}
