'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Input } from '@/modules/ui/Input';
import { DarkModeToggle } from './DarkModeToggle';
import { CopyButton } from './CopyButton';
import { cn } from '@/libs/utils/cn';

type Variant = {
  title: string;
  preview: React.ReactNode;
  code: string;
};

type ComponentData = {
  id: string;
  title: string;
  category: 'Atom' | 'Molecule' | 'Organism';
  description: string;
  variants: Variant[];
};

const categoryStyles: Record<string, string> = {
  Atom:     'bg-info-subtle text-info-fg',
  Molecule: 'bg-primary-subtle text-primary',
  Organism: 'bg-success-subtle text-success-fg',
};

const NAV_GROUPS = [
  { label: 'Atoms',     ids: ['button', 'badge'] },
  { label: 'Molecules', ids: ['input'] },
];

function VariantBlock({ variant }: { variant: Variant }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-surface-raised border-b border-border">
        <span className="text-sm font-medium text-text-primary">{variant.title}</span>
      </div>
      <div className="bg-surface-base border-b border-border">
        <div className="flex items-center px-4 py-2 border-b border-border">
          <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Preview</span>
        </div>
        <div className="px-6 py-8 flex flex-wrap gap-3 items-center min-h-24">
          {variant.preview}
        </div>
      </div>
      <div className="bg-surface-sunken">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <span className="text-xs font-mono text-text-secondary">JSX</span>
          <CopyButton code={variant.code} />
        </div>
        <pre className="px-4 py-4 overflow-x-auto text-sm font-mono text-text-primary leading-relaxed">
          <code>{variant.code}</code>
        </pre>
      </div>
    </div>
  );
}

function buildShowcaseData(): ComponentData[] {
  return [
    {
      id: 'button',
      title: 'Button',
      category: 'Atom',
      description:
        'Temel interaktif element. 5 görsel stil (variant) ve 5 boyut (size) destekler. disabled ve loading durumları yerleşiktir.',
      variants: [
        {
          title: 'Primary',
          preview: <Button variant="primary" data-testid="btn-primary">Primary</Button>,
          code: `<Button variant="primary">Primary</Button>`,
        },
        {
          title: 'Secondary',
          preview: <Button variant="secondary" data-testid="btn-secondary">Secondary</Button>,
          code: `<Button variant="secondary">Secondary</Button>`,
        },
        {
          title: 'Ghost',
          preview: <Button variant="ghost" data-testid="btn-ghost">Ghost</Button>,
          code: `<Button variant="ghost">Ghost</Button>`,
        },
        {
          title: 'Danger',
          preview: <Button variant="danger" data-testid="btn-danger">Danger</Button>,
          code: `<Button variant="danger">Danger</Button>`,
        },
        {
          title: 'Outline',
          preview: <Button variant="outline" data-testid="btn-outline">Outline</Button>,
          code: `<Button variant="outline">Outline</Button>`,
        },
        {
          title: 'Disabled',
          preview: (
            <Button variant="primary" disabled data-testid="btn-disabled">
              Disabled
            </Button>
          ),
          code: `<Button variant="primary" disabled>Disabled</Button>`,
        },
        {
          title: 'Sizes',
          preview: (
            <>
              <Button variant="primary" size="xs" data-testid="btn-xs">XS</Button>
              <Button variant="primary" size="sm" data-testid="btn-sm">SM</Button>
              <Button variant="primary" size="md" data-testid="btn-md">MD</Button>
              <Button variant="primary" size="lg" data-testid="btn-lg">LG</Button>
              <Button variant="primary" size="xl" data-testid="btn-xl">XL</Button>
            </>
          ),
          code: `<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>
<Button size="xl">XL</Button>`,
        },
      ],
    },
    {
      id: 'badge',
      title: 'Badge',
      category: 'Atom',
      description:
        'Durum, kategori veya etiket göstergesi. Feedback varyantları yalnızca semantik anlamlarına uygun bağlamlarda kullanılır.',
      variants: [
        {
          title: 'Success',
          preview: <Badge variant="success">Active</Badge>,
          code: `<Badge variant="success">Active</Badge>`,
        },
        {
          title: 'Error',
          preview: <Badge variant="error">Inactive</Badge>,
          code: `<Badge variant="error">Inactive</Badge>`,
        },
        {
          title: 'Warning',
          preview: <Badge variant="warning">Pending</Badge>,
          code: `<Badge variant="warning">Pending</Badge>`,
        },
        {
          title: 'Info',
          preview: <Badge variant="info">New</Badge>,
          code: `<Badge variant="info">New</Badge>`,
        },
        {
          title: 'Neutral',
          preview: <Badge variant="neutral">Design</Badge>,
          code: `<Badge variant="neutral">Design</Badge>`,
        },
        {
          title: 'Primary',
          preview: <Badge variant="primary">Frontend</Badge>,
          code: `<Badge variant="primary">Frontend</Badge>`,
        },
      ],
    },
    {
      id: 'input',
      title: 'Input',
      category: 'Molecule',
      description:
        'Label + input + hint + error mesajından oluşan form alanı. Dört parça aria-describedby ile birbirine bağlanır.',
      variants: [
        {
          title: 'Default',
          preview: (
            <div className="w-full max-w-sm">
              <Input
                id="showcase-default"
                label="Email"
                type="email"
                placeholder="you@example.com"
                hint="We'll never share your email."
                data-testid="input-default"
              />
            </div>
          ),
          code: `<Input
  id="email"
  label="Email"
  type="email"
  placeholder="you@example.com"
  hint="We'll never share your email."
/>`,
        },
        {
          title: 'Error State',
          preview: (
            <div className="w-full max-w-sm">
              <Input
                id="showcase-error"
                label="Email"
                type="email"
                placeholder="you@example.com"
                error="A valid email address is required."
                required
                data-testid="input-error"
              />
            </div>
          ),
          code: `<Input
  id="email"
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="A valid email address is required."
  required
/>`,
        },
        {
          title: 'Disabled',
          preview: (
            <div className="w-full max-w-sm">
              <Input
                id="showcase-disabled"
                label="Email"
                type="email"
                placeholder="you@example.com"
                disabled
                data-testid="input-disabled"
              />
            </div>
          ),
          code: `<Input
  id="email"
  label="Email"
  type="email"
  placeholder="you@example.com"
  disabled
/>`,
        },
      ],
    },
  ];
}

export function ShowcaseLayout() {
  const data = buildShowcaseData();
  const dataMap = Object.fromEntries(data.map((c) => [c.id, c]));
  const [selectedId, setSelectedId] = useState('button');
  const selected = dataMap[selectedId];

  return (
    <div className="flex min-h-screen bg-surface-base font-sans antialiased">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-56 bg-surface-raised border-r border-border flex flex-col z-10">
        <div className="px-5 py-4 border-b border-border">
          <h1 className="text-base font-semibold text-text-primary">UI Showcase</h1>
          <p className="text-xs text-text-secondary mt-0.5">Component library</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-2 mb-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.ids.map((id) => {
                  const item = dataMap[id];
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(id)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                          selectedId === id
                            ? 'bg-primary-subtle text-primary font-medium'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                        )}
                      >
                        <span>{item.title}</span>
                        <span
                          className={cn(
                            'text-xs px-1.5 py-0.5 rounded-full font-medium',
                            categoryStyles[item.category]
                          )}
                        >
                          {item.category}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-border">
          <DarkModeToggle />
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 min-w-0 px-8 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-text-primary leading-tight">{selected.title}</h2>
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                categoryStyles[selected.category]
              )}
            >
              {selected.category}
            </span>
          </div>
          <p className="text-text-secondary">{selected.description}</p>
        </header>

        <div className="space-y-6">
          {selected.variants.map((variant) => (
            <VariantBlock key={variant.title} variant={variant} />
          ))}
        </div>
      </main>
    </div>
  );
}
