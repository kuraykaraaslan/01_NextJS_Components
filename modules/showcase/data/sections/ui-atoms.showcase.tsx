'use client';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Avatar } from '@/modules/ui/Avatar';
import { Spinner } from '@/modules/ui/Spinner';
import { SkeletonLine, SkeletonAvatar, SkeletonText, SkeletonCard, SkeletonTableRow } from '@/modules/ui/Skeleton';
import { AvatarGroup } from '@/modules/ui/Avatar';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { SkipLink, LiveRegion } from '@/modules/ui/SkipLink';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

function ButtonGroupDemo() {
  const [v, setV] = useState('week');
  return (
    <ButtonGroup
      value={v}
      onChange={setV}
      items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
    />
  );
}

function BadgeDismissibleDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="primary" dismissible onDismiss={() => setTags((t) => t.filter((x) => x !== tag))}>
          {tag}
        </Badge>
      ))}
      {tags.length === 0 && <span className="text-sm text-text-secondary">All dismissed</span>}
    </div>
  );
}

function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="primary" loading>
        Saving…
      </Button>
      <Button variant="outline" loading>
        Loading details
      </Button>
    </div>
  );
}

function AvatarImageDemo() {
  const imageSrc = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="#3b82f6"/><text x="64" y="74" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="white">JD</text></svg>`
  )}`;

  return (
    <div className="flex items-center gap-4">
      <Avatar src={imageSrc} name="Jane Doe" size="md" />
      <Avatar src={imageSrc} name="Jane Doe" size="md" status="online" />
      <div>
        <p className="text-sm font-medium text-text-primary">Image source</p>
        <p className="text-xs text-text-secondary">Uses the same sizing and status rules</p>
      </div>
    </div>
  );
}

function ButtonGroupVariantDemo({ variant }: { variant: 'primary' | 'secondary' | 'ghost' | 'outline' }) {
  return (
    <ButtonGroup
      value="week"
      onChange={() => {}}
      variant={variant}
      items={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  );
}

export function buildAtomsData(): ShowcaseComponent[] {
  return [
    {
      id: 'button',
      title: 'Button',
      category: 'Atom',
      abbr: 'Bt',
      description: 'Temel interaktif element. 5 görsel stil (variant) ve 5 boyut (size) destekler. disabled ve loading durumları yerleşiktir.',
      filePath: 'modules/ui/Button.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-primary text-primary-fg hover:bg-primary-hover',
  secondary: 'bg-secondary text-secondary-fg hover:bg-secondary-hover',
  ghost:     'bg-transparent text-text-primary hover:bg-surface-overlay',
  danger:    'bg-error text-text-inverse hover:opacity-90',
  outline:   'border border-border text-text-primary hover:bg-surface-overlay',
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3 text-lg',
};

export function Button({ children, variant = 'primary', size = 'md', disabled, loading, ...props }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center gap-2 rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant], sizeClasses[size]
      )}
      {...props}
    >
      {children}
    </button>
  );
}`,
      variants: [
        { title: 'Primary', preview: <Button variant="primary">Primary</Button>, code: `<Button variant="primary">Primary</Button>` },
        { title: 'Secondary', preview: <Button variant="secondary">Secondary</Button>, code: `<Button variant="secondary">Secondary</Button>` },
        { title: 'Ghost', preview: <Button variant="ghost">Ghost</Button>, code: `<Button variant="ghost">Ghost</Button>` },
        { title: 'Danger', preview: <Button variant="danger">Danger</Button>, code: `<Button variant="danger">Danger</Button>` },
        { title: 'Outline', preview: <Button variant="outline">Outline</Button>, code: `<Button variant="outline">Outline</Button>` },
        { title: 'Disabled', preview: <Button variant="primary" disabled>Disabled</Button>, code: `<Button variant="primary" disabled>Disabled</Button>` },
        {
          title: 'Sizes',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              {(['xs','sm','md','lg','xl'] as const).map((s) => <Button key={s} variant="primary" size={s}>{s.toUpperCase()}</Button>)}
            </div>
          ),
          code: `<Button size="xs">XS</Button>\n<Button size="sm">SM</Button>\n<Button size="md">MD</Button>\n<Button size="lg">LG</Button>\n<Button size="xl">XL</Button>`,
        },
        {
          title: 'Icon left / right',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary" iconLeft="⬇">Download</Button>
              <Button variant="outline" iconRight="→">Next</Button>
              <Button variant="secondary" iconLeft="✉" iconRight="↗">Send</Button>
            </div>
          ),
          code: `<Button iconLeft="⬇">Download</Button>\n<Button variant="outline" iconRight="→">Next</Button>`,
        },
        {
          title: 'Icon only',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              {(['primary', 'outline', 'ghost', 'danger'] as const).map((v) => (
                <Button key={v} variant={v} iconOnly aria-label="Delete item">✕</Button>
              ))}
            </div>
          ),
          code: `<Button iconOnly aria-label="Delete item">✕</Button>`,
        },
        {
          title: 'Full width',
          layout: 'stack' as const,
          preview: (
            <div className="w-full space-y-2">
              <Button variant="primary" fullWidth>Full-width primary</Button>
              <Button variant="outline" fullWidth>Full-width outline</Button>
            </div>
          ),
          code: `<Button fullWidth>Full-width</Button>`,
        },
        {
          title: 'Selected / active state',
          preview: (
            <div className="flex gap-2">
              <Button variant="outline" selected>Selected</Button>
              <Button variant="outline">Default</Button>
            </div>
          ),
          code: `<Button variant="outline" selected>Selected</Button>`,
        },
        {
          title: 'Loading state',
          preview: <ButtonLoadingDemo />,
          code: `<Button variant="primary" loading>Saving…</Button>`,
        },
      ],
    },
    {
      id: 'badge',
      title: 'Badge',
      category: 'Atom',
      abbr: 'Bg',
      description: 'Durum, kategori veya etiket göstergesi. Feedback varyantları yalnızca semantik anlamlarına uygun bağlamlarda kullanılır.',
      filePath: 'modules/ui/Badge.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

const variantMap = {
  success: 'bg-success-subtle text-success-fg',
  error:   'bg-error-subtle text-error-fg',
  warning: 'bg-warning-subtle text-warning-fg',
  info:    'bg-info-subtle text-info-fg',
  neutral: 'bg-surface-sunken text-text-secondary',
  primary: 'bg-primary-subtle text-primary',
};

export function Badge({ children, variant = 'neutral', className }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', variantMap[variant], className)}>
      {children}
    </span>
  );
}`,
      variants: [
        { title: 'Success', preview: <Badge variant="success">Active</Badge>, code: `<Badge variant="success">Active</Badge>` },
        { title: 'Error', preview: <Badge variant="error">Inactive</Badge>, code: `<Badge variant="error">Inactive</Badge>` },
        { title: 'Warning', preview: <Badge variant="warning">Pending</Badge>, code: `<Badge variant="warning">Pending</Badge>` },
        { title: 'Info', preview: <Badge variant="info">New</Badge>, code: `<Badge variant="info">New</Badge>` },
        { title: 'Neutral', preview: <Badge variant="neutral">Design</Badge>, code: `<Badge variant="neutral">Design</Badge>` },
        { title: 'Primary', preview: <Badge variant="primary">Frontend</Badge>, code: `<Badge variant="primary">Frontend</Badge>` },
        {
          title: 'Sizes',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
              <Badge variant="primary" size="lg">Large</Badge>
            </div>
          ),
          code: `<Badge size="sm">Small</Badge>\n<Badge size="md">Medium</Badge>\n<Badge size="lg">Large</Badge>`,
        },
        {
          title: 'Dot badge',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="warning" dot>Away</Badge>
              <Badge variant="error" dot>Busy</Badge>
              <Badge variant="neutral" dot>Offline</Badge>
            </div>
          ),
          code: `<Badge variant="success" dot>Online</Badge>\n<Badge variant="warning" dot>Away</Badge>`,
        },
        {
          title: 'Dismissible',
          preview: <BadgeDismissibleDemo />,
          code: `<Badge variant="primary" dismissible onDismiss={() => remove(tag)}>React</Badge>`,
        },
      ],
    },
    {
      id: 'avatar',
      title: 'Avatar',
      category: 'Atom',
      abbr: 'Av',
      description: 'Kullanıcı profil fotoğrafı veya baş harfleri gösterici. 5 boyut destekler. Fotoğraf yoksa bg-primary-subtle / text-primary ile initials render edilir.',
      filePath: 'modules/ui/Avatar.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

const sizeMap = {
  xs: 'h-6 w-6 text-xs',  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg',
};

function getInitials(name) {
  return name.trim().split(/\\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase() || '?';
}

export function Avatar({ src, name, size = 'md', className }) {
  const sizeClass = sizeMap[size];
  if (src) return <img src={src} alt={name} className={cn(sizeClass, 'rounded-full object-cover border border-border shrink-0', className)} />;
  return (
    <span aria-label={name} className={cn(sizeClass, 'rounded-full bg-primary-subtle text-primary font-semibold flex items-center justify-center shrink-0 border border-primary-subtle select-none', className)}>
      {getInitials(name)}
    </span>
  );
}`,
      variants: [
        {
          title: 'Initials (sizes)',
          preview: (
            <div className="flex items-center gap-3">
              {(['xs','sm','md','lg','xl'] as const).map((s) => <Avatar key={s} name="Jane Doe" size={s} />)}
            </div>
          ),
          code: `<Avatar name="Jane Doe" size="xs" />\n<Avatar name="Jane Doe" size="sm" />\n<Avatar name="Jane Doe" size="md" />\n<Avatar name="Jane Doe" size="lg" />\n<Avatar name="Jane Doe" size="xl" />`,
        },
        {
          title: 'With label',
          preview: (
            <div className="flex items-center gap-3">
              <Avatar name="John Smith" size="md" />
              <div>
                <p className="text-sm font-medium text-text-primary">John Smith</p>
                <p className="text-xs text-text-secondary">john@example.com</p>
              </div>
            </div>
          ),
          code: `<div className="flex items-center gap-3">
  <Avatar name="John Smith" size="md" />
  <div>
    <p className="text-sm font-medium text-text-primary">John Smith</p>
    <p className="text-xs text-text-secondary">john@example.com</p>
  </div>
</div>`,
        },
        {
          title: 'Image source',
          preview: <AvatarImageDemo />,
          code: `<Avatar src="/avatar.jpg" name="Jane Doe" />`,
        },
        {
          title: 'Status dot',
          preview: (
            <div className="flex items-center gap-4">
              <Avatar name="Alice" size="md" status="online" />
              <Avatar name="Bob" size="md" status="away" />
              <Avatar name="Carol" size="md" status="busy" />
              <Avatar name="Dave" size="md" status="offline" />
            </div>
          ),
          code: `<Avatar name="Alice" status="online" />\n<Avatar name="Bob" status="away" />\n<Avatar name="Carol" status="busy" />\n<Avatar name="Dave" status="offline" />`,
        },
        {
          title: 'AvatarGroup',
          preview: (
            <AvatarGroup
              avatars={[
                { name: 'Alice' },
                { name: 'Bob' },
                { name: 'Carol' },
                { name: 'Dave' },
                { name: 'Eve' },
                { name: 'Frank' },
              ]}
              max={4}
            />
          ),
          code: `<AvatarGroup\n  avatars={[{ name: 'Alice' }, { name: 'Bob' }, ...]}\n  max={4}\n/>`,
        },
      ],
    },
    {
      id: 'spinner',
      title: 'Spinner',
      category: 'Atom',
      abbr: 'Sp',
      description: 'CSS border tabanlı yükleme göstergesi. FontAwesome gerektirmez. 5 boyut, border-border / border-t-primary renk sistemi.',
      filePath: 'modules/ui/Spinner.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

const sizeMap = {
  xs: 'h-3 w-3 border', sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2', lg: 'h-8 w-8 border-[3px]', xl: 'h-12 w-12 border-4',
};

export function Spinner({ size = 'md', className }) {
  return (
    <>
      <span aria-hidden="true" className={cn('inline-block rounded-full border-border border-t-primary animate-spin', sizeMap[size], className)} />
      <span className="sr-only">Loading…</span>
    </>
  );
}`,
      variants: [
        {
          title: 'Sizes',
          preview: (
            <div className="flex items-center gap-4">
              {(['xs','sm','md','lg','xl'] as const).map((s) => <Spinner key={s} size={s} />)}
            </div>
          ),
          code: `<Spinner size="xs" />\n<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />\n<Spinner size="xl" />`,
        },
        {
          title: 'In a Button',
          preview: <Button variant="primary" loading>Loading…</Button>,
          code: `<Button variant="primary" loading>Loading…</Button>`,
        },
      ],
    },
    {
      id: 'skeleton',
      title: 'Skeleton',
      category: 'Atom',
      abbr: 'Sk',
      description: 'İçerik yüklenmeden önce yer tutan animasyonlu placeholder. animate-pulse bg-surface-sunken kullanır. aria-busy="true" ile erişilebilirlik sağlanır.',
      filePath: 'modules/ui/Skeleton.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

const base = 'animate-pulse bg-surface-sunken';

export function SkeletonLine({ width = 'w-full', className }) {
  return <div className={cn(base, 'h-3 rounded', width, className)} />;
}

export function SkeletonAvatar({ size = 'md', className }) {
  const s = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' }[size];
  return <div className={cn(base, 'rounded-full shrink-0', s, className)} />;
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)} aria-busy="true" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={i === lines - 1 ? 'w-4/5' : 'w-full'} />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('bg-surface-raised border border-border rounded-xl p-6 space-y-4', className)} aria-busy="true">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="w-2/3" />
          <SkeletonLine width="w-1/2" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}`,
      variants: [
        {
          title: 'Lines',
          preview: (
            <div className="w-full max-w-xs space-y-2">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-3/4" />
              <SkeletonLine width="w-1/2" />
            </div>
          ),
          code: `<SkeletonLine width="w-full" />\n<SkeletonLine width="w-3/4" />\n<SkeletonLine width="w-1/2" />`,
        },
        {
          title: 'Text block',
          preview: <div className="w-full max-w-xs"><SkeletonText lines={4} /></div>,
          code: `<SkeletonText lines={4} />`,
        },
        {
          title: 'Card',
          preview: <div className="w-full max-w-sm"><SkeletonCard /></div>,
          code: `<SkeletonCard />`,
        },
        {
          title: 'Table rows',
          preview: (
            <div className="w-full overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <tbody>
                  <SkeletonTableRow cols={4} />
                  <SkeletonTableRow cols={4} />
                  <SkeletonTableRow cols={4} />
                </tbody>
              </table>
            </div>
          ),
          code: `<table className="w-full"><tbody><SkeletonTableRow cols={4} /></tbody></table>`,
        },
      ],
    },
    // ── New components ─────────────────────────────────────────────────────
    {
      id: 'button-group',
      title: 'ButtonGroup',
      category: 'Molecule',
      abbr: 'BG',
      description: 'Segmented button group for mutually-exclusive options. Supports multiple variants and sizes.',
      filePath: 'modules/ui/ButtonGroup.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\n\nexport function ButtonGroup({ items, value, onChange, variant = 'outline', size = 'md' }) {\n  return (\n    <div role="group" className="inline-flex rounded-md overflow-hidden border border-border divide-x divide-border">\n      {items.map((item) => (\n        <button key={item.value} type="button" aria-pressed={item.value === value}\n          onClick={() => onChange(item.value)}\n          className={cn('px-4 py-2 text-sm font-medium transition-colors', item.value === value ? 'bg-surface-overlay font-semibold' : 'bg-surface-base hover:bg-surface-overlay')}>\n          {item.label}\n        </button>\n      ))}\n    </div>\n  );\n}`,
      variants: [
        {
          title: 'Outline (default)',
          preview: <ButtonGroupDemo />,
          code: `function Demo() {\n  const [v, setV] = useState('week');\n  return (\n    <ButtonGroup value={v} onChange={setV}\n      items={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}\n    />\n  );\n}`,
        },
        {
          title: 'Sizes',
          preview: (
            <div className="flex flex-wrap items-center gap-4">
              {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
                <ButtonGroup key={s} value="a" onChange={() => {}} size={s}
                  items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }]}
                />
              ))}
            </div>
          ),
          code: `<ButtonGroup size="sm" value="a" onChange={setV} items={[...]} />\n<ButtonGroup size="md" value="a" onChange={setV} items={[...]} />`,
          layout: 'stack' as const,
        },
        {
          title: 'Primary / secondary / ghost',
          layout: 'stack' as const,
          preview: (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Primary</p>
                <ButtonGroupVariantDemo variant="primary" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Secondary</p>
                <ButtonGroupVariantDemo variant="secondary" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Ghost</p>
                <ButtonGroupVariantDemo variant="ghost" />
              </div>
            </div>
          ),
          code: `<ButtonGroup variant="primary" value="week" onChange={setV} items={[...]} />\n<ButtonGroup variant="secondary" value="week" onChange={setV} items={[...]} />\n<ButtonGroup variant="ghost" value="week" onChange={setV} items={[...]} />`,
        },
      ],
    },
    {
      id: 'skip-link',
      title: 'SkipLink + LiveRegion',
      category: 'Atom',
      abbr: 'Sl',
      description: 'SkipLink is visually hidden until focused, enabling keyboard users to bypass navigation. LiveRegion announces dynamic content to screen readers.',
      filePath: 'modules/ui/SkipLink.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\n\nexport function SkipLink({ href = '#main-content', label = 'Skip to main content' }) {}\nexport function LiveRegion({ message, politeness = 'polite' }) {}`,
      variants: [
        {
          title: 'SkipLink (focus to reveal)',
          layout: 'stack' as const,
          preview: (
            <div className="space-y-2">
              <p className="text-xs text-text-secondary">Tab into the area below to reveal the skip link:</p>
              <div className="border border-dashed border-border rounded-md p-4 space-y-2">
                <SkipLink href="#demo-main" />
                <p className="text-sm text-text-primary" id="demo-main">Main content area</p>
              </div>
            </div>
          ),
          code: `// Place at top of layout:\n<SkipLink href="#main-content" />\n\n// Linked target:\n<main id="main-content">...</main>`,
        },
        {
          title: 'LiveRegion',
          layout: 'stack' as const,
          preview: (() => {
            function LiveRegionDemo() {
              const [msg, setMsg] = useState('');
              const [count, setCount] = useState(0);
              function announce() {
                const n = count + 1;
                setCount(n);
                setMsg('');
                setTimeout(() => setMsg(`Announcement #${n} sent`), 50);
              }
              return (
                <div className="space-y-3">
                  <Button variant="outline" size="sm" onClick={announce}>Send announcement</Button>
                  {msg && <p className="text-xs text-text-secondary">(screen reader hears: "{msg}")</p>}
                  <LiveRegion message={msg} />
                </div>
              );
            }
            return <LiveRegionDemo />;
          })(),
          code: `function Demo() {\n  const [msg, setMsg] = useState('');\n  return (\n    <>\n      <button onClick={() => setMsg('Action completed')}>Act</button>\n      <LiveRegion message={msg} />\n    </>\n  );\n}`,
        },
      ],
    },
  ];
}
