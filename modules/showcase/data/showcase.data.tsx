'use client';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { Input } from '@/modules/ui/Input';
import { Avatar } from '@/modules/ui/Avatar';
import { Spinner } from '@/modules/ui/Spinner';
import { SkeletonLine, SkeletonAvatar, SkeletonText, SkeletonCard } from '@/modules/ui/Skeleton';
import { Checkbox } from '@/modules/ui/Checkbox';
import { RadioGroup } from '@/modules/ui/RadioGroup';
import { Select } from '@/modules/ui/Select';
import { Textarea } from '@/modules/ui/Textarea';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Card } from '@/modules/ui/Card';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';
import { EmptyState } from '@/modules/ui/EmptyState';
import { Pagination } from '@/modules/ui/Pagination';
import { Modal } from '@/modules/ui/Modal';
import { Drawer } from '@/modules/ui/Drawer';
import { Tooltip } from '@/modules/ui/Tooltip';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Table } from '@/modules/ui/Table';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { useState } from 'react';

export type ShowcaseVariant = {
  title: string;
  preview: React.ReactNode;
  code: string;
};

export type ShowcaseComponent = {
  id: string;
  title: string;
  category: 'Atom' | 'Molecule' | 'Organism';
  abbr: string;
  description: string;
  filePath: string;
  sourceCode: string;
  variants: ShowcaseVariant[];
};

// ─── Wrappers for stateful organisms ─────────────────────────────────────────

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        description="Are you sure you want to proceed? This action cannot be undone."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          This will permanently delete all selected items and their associated data.
        </p>
      </Modal>
    </div>
  );
}

function DrawerDemo({ side }: { side?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Open {side === 'left' ? 'Left' : 'Right'} Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Settings"
        side={side}
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">Drawer content goes here.</p>
      </Drawer>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export function buildShowcaseData(): ShowcaseComponent[] {
  return [
    // ── Atoms ──────────────────────────────────────────────────────────────
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
      ],
    },
    // ── Molecules ──────────────────────────────────────────────────────────
    {
      id: 'input',
      title: 'Input',
      category: 'Molecule',
      abbr: 'In',
      description: 'Label + input + hint + error mesajından oluşan form alanı. Dört parça aria-describedby ile birbirine bağlanır.',
      filePath: 'modules/ui/Input.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function Input({ id, label, hint, error, required, className, ...props }) {
  const describedBy = [hint && !error ? \`\${id}-hint\` : null, error ? \`\${id}-error\` : null].filter(Boolean).join(' ');
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
      </label>
      <input id={id} required={required} aria-invalid={!!error} aria-describedby={describedBy || undefined}
        className={cn('block w-full rounded-md border px-3 py-2 text-sm transition-colors text-text-primary placeholder:text-text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken', error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border bg-surface-base', className)}
        {...props} />
      {hint && !error && <p id={\`\${id}-hint\`} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={\`\${id}-error\`} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: <div className="w-full max-w-xs"><Input id="sc-in-default" label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email." /></div>,
          code: `<Input id="email" label="Email" type="email" placeholder="you@example.com" hint="We'll never share your email." />`,
        },
        {
          title: 'Error',
          preview: <div className="w-full max-w-xs"><Input id="sc-in-error" label="Email" type="email" error="A valid email address is required." required /></div>,
          code: `<Input id="email" label="Email" type="email" error="A valid email address is required." required />`,
        },
        {
          title: 'Disabled',
          preview: <div className="w-full max-w-xs"><Input id="sc-in-disabled" label="Email" type="email" placeholder="you@example.com" disabled /></div>,
          code: `<Input id="email" label="Email" type="email" placeholder="you@example.com" disabled />`,
        },
      ],
    },
    {
      id: 'checkbox',
      title: 'Checkbox',
      category: 'Molecule',
      abbr: 'Cb',
      description: 'Label + checkbox + opsiyonel hint / hata mesajı. aria-describedby bağlantısı kurulmuş, error durumunda border-error uygulanır.',
      filePath: 'modules/ui/Checkbox.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function Checkbox({ id, label, hint, error, disabled, className, ...props }) {
  const hintId = hint ? \`\${id}-hint\` : undefined;
  const errorId = error ? \`\${id}-error\` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input id={id} type="checkbox" disabled={disabled} aria-describedby={describedBy} aria-invalid={!!error}
        className={cn('mt-0.5 h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed', error && 'border-error')} {...props} />
      <div>
        <label htmlFor={id} className={cn('text-sm font-medium', disabled ? 'text-text-disabled' : 'text-text-primary')}>{label}</label>
        {hint && !error && <p id={hintId} className="text-xs text-text-secondary mt-0.5">{hint}</p>}
        {error && <p id={errorId} className="text-xs text-error mt-0.5" role="alert">{error}</p>}
      </div>
    </div>
  );
}`,
      variants: [
        { title: 'Default', preview: <Checkbox id="sc-cb-default" label="I agree to the Terms of Service" />, code: `<Checkbox id="accept" label="I agree to the Terms of Service" />` },
        { title: 'With hint', preview: <Checkbox id="sc-cb-hint" label="Subscribe to newsletter" hint="We send weekly updates, no spam." />, code: `<Checkbox id="newsletter" label="Subscribe to newsletter" hint="We send weekly updates, no spam." />` },
        { title: 'Error', preview: <Checkbox id="sc-cb-error" label="I agree to the Terms of Service" error="You must accept the terms." />, code: `<Checkbox id="accept" label="I agree to the Terms of Service" error="You must accept the terms." />` },
        { title: 'Disabled', preview: <Checkbox id="sc-cb-disabled" label="Checked and disabled" defaultChecked disabled />, code: `<Checkbox id="accept" label="Checked and disabled" defaultChecked disabled />` },
      ],
    },
    {
      id: 'radio-group',
      title: 'RadioGroup',
      category: 'Molecule',
      abbr: 'Rg',
      description: 'fieldset + legend tabanlı radio grubu. WCAG uyumlu klavye navigasyonu için fieldset/legend zorunludur.',
      filePath: 'modules/ui/RadioGroup.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function RadioGroup({ name, legend, options, value, onChange, error, disabled, className }) {
  return (
    <fieldset className={cn('space-y-1', className)}>
      <legend className="text-sm font-medium text-text-primary mb-2">{legend}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt.value} className={cn('flex items-start gap-2', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}>
            <input type="radio" name={name} value={opt.value} checked={value === opt.value} disabled={disabled}
              onChange={() => onChange?.(opt.value)} className="mt-0.5 h-4 w-4 border-border text-primary focus-visible:ring-2 focus-visible:ring-border-focus" />
            <div>
              <span className="text-sm text-text-primary">{opt.label}</span>
              {opt.hint && <p className="text-xs text-text-secondary">{opt.hint}</p>}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-error mt-1" role="alert">{error}</p>}
    </fieldset>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <RadioGroup
              name="sc-rg-notify"
              legend="Notification preference"
              options={[
                { value: 'email', label: 'Email', hint: 'Sent to your primary email' },
                { value: 'sms', label: 'SMS' },
                { value: 'none', label: 'None' },
              ]}
            />
          ),
          code: `<RadioGroup\n  name="notify"\n  legend="Notification preference"\n  options={[\n    { value: 'email', label: 'Email' },\n    { value: 'sms', label: 'SMS' },\n    { value: 'none', label: 'None' },\n  ]}\n/>`,
        },
        {
          title: 'Disabled',
          preview: (
            <RadioGroup
              name="sc-rg-disabled"
              legend="Notification preference"
              options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }]}
              value="email"
              disabled
            />
          ),
          code: `<RadioGroup name="notify" legend="Notification preference" options={[...]} value="email" disabled />`,
        },
      ],
    },
    {
      id: 'select',
      title: 'Select',
      category: 'Molecule',
      abbr: 'Sl',
      description: 'Label + select + hint + error anatomy. appearance-none ile native dropdown stilini override eder.',
      filePath: 'modules/ui/Select.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function Select({ id, label, options, placeholder, hint, error, disabled, required, className, ...props }) {
  const hintId = hint ? \`\${id}-hint\` : undefined;
  const errorId = error ? \`\${id}-error\` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}{required && <span className="text-error ml-1" aria-hidden="true">*</span>}
      </label>
      <select id={id} disabled={disabled} required={required} aria-describedby={describedBy} aria-invalid={!!error}
        className={cn('block w-full rounded-md border px-3 py-2 text-sm transition-colors appearance-none bg-surface-base text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken', error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border')} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <div className="w-full max-w-xs">
              <Select id="sc-sl-default" label="Country" placeholder="Select a country" hint="Choose your country of residence."
                options={[{ value: 'tr', label: 'Turkey' }, { value: 'us', label: 'United States' }, { value: 'de', label: 'Germany' }]} />
            </div>
          ),
          code: `<Select id="country" label="Country" placeholder="Select a country"\n  options={[{ value: 'tr', label: 'Turkey' }, ...]} hint="Choose your country." />`,
        },
        {
          title: 'Error',
          preview: (
            <div className="w-full max-w-xs">
              <Select id="sc-sl-error" label="Country" placeholder="Select a country" error="Please select a country."
                options={[{ value: 'tr', label: 'Turkey' }]} required />
            </div>
          ),
          code: `<Select id="country" label="Country" placeholder="Select a country" error="Please select a country." required />`,
        },
        {
          title: 'Disabled',
          preview: (
            <div className="w-full max-w-xs">
              <Select id="sc-sl-disabled" label="Country" options={[{ value: 'tr', label: 'Turkey' }]} disabled />
            </div>
          ),
          code: `<Select id="country" label="Country" options={[...]} disabled />`,
        },
      ],
    },
    {
      id: 'textarea',
      title: 'Textarea',
      category: 'Molecule',
      abbr: 'Ta',
      description: 'Label + textarea + hint + error anatomy. resize-y ile dikey boyutlandırma aktif, aria-describedby bağlantısı kurulmuş.',
      filePath: 'modules/ui/Textarea.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function Textarea({ id, label, hint, error, disabled, required, rows = 4, className, ...props }) {
  const hintId = hint ? \`\${id}-hint\` : undefined;
  const errorId = error ? \`\${id}-error\` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}{required && <span className="text-error ml-1" aria-hidden="true">*</span>}
      </label>
      <textarea id={id} rows={rows} disabled={disabled} required={required} aria-describedby={describedBy} aria-invalid={!!error}
        className={cn('block w-full rounded-md border px-3 py-2 text-sm transition-colors resize-y text-text-primary placeholder:text-text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken', error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border bg-surface-base', className)} {...props} />
      {hint && !error && <p id={hintId} className="text-xs text-text-secondary">{hint}</p>}
      {error && <p id={errorId} className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: <div className="w-full max-w-xs"><Textarea id="sc-ta-default" label="Message" placeholder="Write your message…" hint="Max 500 characters." rows={3} /></div>,
          code: `<Textarea id="message" label="Message" placeholder="Write your message…" hint="Max 500 characters." />`,
        },
        {
          title: 'Error',
          preview: <div className="w-full max-w-xs"><Textarea id="sc-ta-error" label="Message" error="Message is required." required rows={3} /></div>,
          code: `<Textarea id="message" label="Message" error="Message is required." required />`,
        },
        {
          title: 'Disabled',
          preview: <div className="w-full max-w-xs"><Textarea id="sc-ta-disabled" label="Message" placeholder="Not editable" disabled rows={3} /></div>,
          code: `<Textarea id="message" label="Message" placeholder="Not editable" disabled />`,
        },
      ],
    },
    {
      id: 'search-bar',
      title: 'SearchBar',
      category: 'Molecule',
      abbr: 'Sb',
      description: 'role="searchbox" + arama ikonu + temizle butonu. Controlled / uncontrolled modda çalışır.',
      filePath: 'modules/ui/SearchBar.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

export function SearchBar({ id = 'search', placeholder = 'Search…', value, onChange, onClear, className }) {
  const [internal, setInternal] = useState('');
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internal;
  function handleChange(e) { if (!controlled) setInternal(e.target.value); onChange?.(e.target.value); }
  function handleClear() { if (!controlled) setInternal(''); onChange?.(''); onClear?.(); }
  return (
    <div className={cn('relative flex items-center', className)}>
      <span aria-hidden="true" className="absolute left-3 text-text-disabled pointer-events-none select-none">⌕</span>
      <input id={id} type="search" role="searchbox" value={currentValue} onChange={handleChange} placeholder={placeholder} autoComplete="off"
        className={cn('block w-full rounded-md border border-border bg-surface-base px-3 py-2 pl-8 text-sm text-text-primary placeholder:text-text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus transition-colors', currentValue && 'pr-8')} />
      {currentValue && (
        <button type="button" onClick={handleClear} aria-label="Clear search" className="absolute right-2 text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none rounded">✕</button>
      )}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: <div className="w-full max-w-xs"><SearchBar placeholder="Search components…" /></div>,
          code: `<SearchBar placeholder="Search components…" />`,
        },
        {
          title: 'With value',
          preview: <div className="w-full max-w-xs"><SearchBar value="Button" onChange={() => {}} /></div>,
          code: `<SearchBar value="Button" onChange={(v) => console.log(v)} />`,
        },
      ],
    },
    // ── Organisms ──────────────────────────────────────────────────────────
    {
      id: 'card',
      title: 'Card',
      category: 'Organism',
      abbr: 'Ca',
      description: 'Raised / flat / outline varyantlı içerik konteyneri. title + subtitle + headerRight + footer slotları desteklenir.',
      filePath: 'modules/ui/Card.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function Card({ title, subtitle, headerRight, footer, children, variant = 'raised', className }) {
  return (
    <div className={cn('rounded-xl border border-border overflow-hidden', variant === 'raised' && 'bg-surface-raised shadow-sm', variant === 'flat' && 'bg-surface-base', variant === 'outline' && 'bg-transparent', className)}>
      {(title || headerRight) && (
        <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border">
          <div>
            {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
          </div>
          {headerRight && <div className="shrink-0">{headerRight}</div>}
        </div>
      )}
      {children && <div className="px-6 py-4">{children}</div>}
      {footer && <div className="px-6 py-3 border-t border-border bg-surface-base">{footer}</div>}
    </div>
  );
}`,
      variants: [
        {
          title: 'Raised',
          preview: (
            <div className="w-full max-w-sm">
              <Card title="User profile" subtitle="Manage your account details" headerRight={<Badge variant="success">Active</Badge>}>
                <p className="text-sm text-text-secondary">Card body content goes here.</p>
              </Card>
            </div>
          ),
          code: `<Card title="User profile" subtitle="Manage your account" headerRight={<Badge variant="success">Active</Badge>}>\n  <p>Card body content goes here.</p>\n</Card>`,
        },
        {
          title: 'With footer',
          preview: (
            <div className="w-full max-w-sm">
              <Card title="Confirm deletion" footer={<div className="flex gap-2"><Button variant="outline" size="sm">Cancel</Button><Button variant="danger" size="sm">Delete</Button></div>}>
                <p className="text-sm text-text-secondary">This action is irreversible.</p>
              </Card>
            </div>
          ),
          code: `<Card title="Confirm deletion" footer={<><Button variant="outline" size="sm">Cancel</Button><Button variant="danger" size="sm">Delete</Button></>}>\n  <p>This action is irreversible.</p>\n</Card>`,
        },
        {
          title: 'Outline',
          preview: (
            <div className="w-full max-w-sm">
              <Card variant="outline" title="Outline card">
                <p className="text-sm text-text-secondary">Transparent background, border only.</p>
              </Card>
            </div>
          ),
          code: `<Card variant="outline" title="Outline card">\n  <p>Transparent background, border only.</p>\n</Card>`,
        },
      ],
    },
    {
      id: 'alert-banner',
      title: 'AlertBanner',
      category: 'Organism',
      abbr: 'Ab',
      description: 'Sayfa düzeyinde bilgi, uyarı veya hata mesajı. role="alert" ile ekran okuyucular için duyurulur. dismissible özelliği eklenebilir.',
      filePath: 'modules/ui/AlertBanner.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

const variantMap = {
  success: { container: 'bg-success-subtle border-success text-success-fg', icon: '✓' },
  warning: { container: 'bg-warning-subtle border-warning text-warning-fg', icon: '⚠' },
  error:   { container: 'bg-error-subtle border-error text-error-fg',       icon: '✕' },
  info:    { container: 'bg-info-subtle border-info text-info-fg',          icon: 'ℹ' },
};

export function AlertBanner({ variant = 'info', title, message, dismissible = false, className }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const { container, icon } = variantMap[variant];
  return (
    <div role="alert" className={cn('flex items-start gap-3 rounded-lg border p-4', container, className)}>
      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">{icon}</span>
      <div className="flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <p className={cn(title && 'mt-0.5')}>{message}</p>
      </div>
      {dismissible && (
        <button type="button" aria-label="Dismiss" onClick={() => setDismissed(true)} className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
      )}
    </div>
  );
}`,
      variants: [
        { title: 'Info', preview: <AlertBanner variant="info" title="System update" message="A new version is available. Please refresh the page." dismissible />, code: `<AlertBanner variant="info" title="System update" message="A new version is available." dismissible />` },
        { title: 'Success', preview: <AlertBanner variant="success" message="Profile updated successfully." dismissible />, code: `<AlertBanner variant="success" message="Profile updated successfully." dismissible />` },
        { title: 'Warning', preview: <AlertBanner variant="warning" title="Maintenance window" message="The service will be unavailable from 2–4 AM UTC." />, code: `<AlertBanner variant="warning" title="Maintenance window" message="The service will be unavailable from 2–4 AM UTC." />` },
        { title: 'Error', preview: <AlertBanner variant="error" title="Something went wrong" message="Unable to load the resource. Please try again." />, code: `<AlertBanner variant="error" title="Something went wrong" message="Unable to load the resource. Please try again." />` },
      ],
    },
    {
      id: 'toast',
      title: 'Toast',
      category: 'Organism',
      abbr: 'To',
      description: 'Auto-dismiss bildirimi (error hariç). 4–6s sonra kaybolur. ToastRegion konteyneri ile fixed konumda render edilir.',
      filePath: 'modules/ui/Toast.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useState } from 'react';

const variantMap = {
  success: { container: 'bg-success-subtle border-success text-success-fg', icon: '✓' },
  warning: { container: 'bg-warning-subtle border-warning text-warning-fg', icon: '⚠' },
  error:   { container: 'bg-error-subtle border-error text-error-fg',       icon: '✕' },
  info:    { container: 'bg-info-subtle border-info text-info-fg',          icon: 'ℹ' },
};

export function Toast({ variant = 'info', message, duration, onDismiss, className }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (variant === 'error') return;
    const t = setTimeout(() => { setVisible(false); onDismiss?.(); }, duration ?? 5000);
    return () => clearTimeout(t);
  }, [variant, duration, onDismiss]);
  if (!visible) return null;
  const { container, icon } = variantMap[variant];
  return (
    <div role={variant === 'error' ? 'alert' : undefined} aria-live={variant === 'error' ? undefined : 'polite'}
      className={cn('max-w-sm w-full rounded-lg border p-4 shadow-lg flex items-start gap-3 pointer-events-auto', container, className)}>
      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold">{icon}</span>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button type="button" aria-label="Dismiss" onClick={() => { setVisible(false); onDismiss?.(); }} className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
    </div>
  );
}`,
      variants: [
        { title: 'Success', preview: <Toast variant="success" message="Profile saved successfully." />, code: `<Toast variant="success" message="Profile saved successfully." />` },
        { title: 'Warning', preview: <Toast variant="warning" message="Your session will expire in 5 minutes." />, code: `<Toast variant="warning" message="Your session will expire in 5 minutes." />` },
        { title: 'Error (no auto-dismiss)', preview: <Toast variant="error" message="Failed to save. Please try again." />, code: `<Toast variant="error" message="Failed to save. Please try again." />` },
        { title: 'Info', preview: <Toast variant="info" message="New comment added to your post." />, code: `<Toast variant="info" message="New comment added to your post." />` },
      ],
    },
    {
      id: 'empty-state',
      title: 'EmptyState',
      category: 'Organism',
      abbr: 'Es',
      description: 'Veri yokken gösterilen boş durum mesajı. icon + title + description + action slotları desteklenir.',
      filePath: 'modules/ui/EmptyState.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-6', className)}>
      {icon && <div className="h-12 w-12 rounded-full bg-surface-sunken flex items-center justify-center text-text-disabled text-2xl mb-4" aria-hidden="true">{icon}</div>}
      <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      {description && <p className="mt-1 text-sm text-text-secondary max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}`,
      variants: [
        {
          title: 'With action',
          preview: (
            <EmptyState icon="📁" title="No projects yet" description="Create your first project to get started." action={<Button variant="primary" size="sm">New project</Button>} />
          ),
          code: `<EmptyState icon="📁" title="No projects yet" description="Create your first project to get started." action={<Button variant="primary" size="sm">New project</Button>} />`,
        },
        {
          title: 'Minimal',
          preview: <EmptyState title="No results found" description="Try adjusting your search or filters." />,
          code: `<EmptyState title="No results found" description="Try adjusting your search or filters." />`,
        },
      ],
    },
    {
      id: 'pagination',
      title: 'Pagination',
      category: 'Organism',
      abbr: 'Pg',
      description: 'Sayfa navigasyonu. Ellipsis ile büyük sayfa sayılarını kısaltır. aria-label ve aria-current="page" ile erişilebilir.',
      filePath: 'modules/ui/Pagination.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function Pagination({ page, totalPages, onPageChange, className }) {
  // builds visible pages with ellipsis ...
  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)}>
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} aria-label="Go to previous page" className="...">‹</button>
      {/* page buttons */}
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} aria-label="Go to next page" className="...">›</button>
    </nav>
  );
}`,
      variants: [
        {
          title: 'Interactive',
          preview: <PaginationDemo />,
          code: `const [page, setPage] = useState(1);\n<Pagination page={page} totalPages={10} onPageChange={setPage} />`,
        },
      ],
    },
    {
      id: 'modal',
      title: 'Modal',
      category: 'Organism',
      abbr: 'Md',
      description: 'Odak yönetimi, Escape kapatma, backdrop tıklama ile kapatma. role="dialog" + aria-modal + aria-labelledby zorunludur.',
      filePath: 'modules/ui/Modal.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef } from 'react';

export function Modal({ open, onClose, title, description, children, footer, size = 'md', className }) {
  const panelRef = useRef(null);
  useEffect(() => { if (!open) return; const prev = document.activeElement; panelRef.current?.focus(); return () => prev?.focus(); }, [open]);
  useEffect(() => { if (!open) return; const onKey = (e) => { if (e.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [open, onClose]);
  if (!open) return null;
  const sizeClass = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' }[size];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} tabIndex={-1} className={cn('relative z-10 w-full rounded-xl border border-border bg-surface-raised shadow-xl flex flex-col focus-visible:outline-none', sizeClass, className)}>
        <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="text-base font-semibold text-text-primary">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
        </div>
        {children && <div className="px-6 py-4 flex-1">{children}</div>}
        {footer && <div className="px-6 py-4 border-t border-border flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Confirmation dialog',
          preview: <ModalDemo />,
          code: `const [open, setOpen] = useState(false);\n<Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>\n<Modal open={open} onClose={() => setOpen(false)} title="Confirm action"\n  description="Are you sure you want to proceed?"\n  footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button variant="danger" onClick={() => setOpen(false)}>Delete</Button></>}>\n  <p>This will permanently delete all selected items.</p>\n</Modal>`,
        },
      ],
    },
    {
      id: 'drawer',
      title: 'Drawer',
      category: 'Organism',
      abbr: 'Dr',
      description: 'Ekranın kenarından süzülen panel. Sol / sağ taraf seçeneği, odak yönetimi ve Escape kapatma dahildir.',
      filePath: 'modules/ui/Drawer.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef } from 'react';

export function Drawer({ open, onClose, title, side = 'right', children, footer, className }) {
  // focus trap + Escape key handler
  return (
    <div className={cn('fixed inset-0 z-50 flex', !open && 'pointer-events-none')} aria-modal="true" role="dialog" aria-label={title}>
      <div className={cn('absolute inset-0 bg-black/50 transition-opacity duration-200', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} aria-hidden="true" />
      <div className={cn('relative flex flex-col w-80 max-w-full h-full bg-surface-raised shadow-xl transition-transform duration-200 focus-visible:outline-none', side === 'right' ? 'ml-auto border-l border-border' : 'mr-auto border-r border-border', open ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full', className)}>
        <div className="flex items-center justify-between gap-3 px-4 py-4 border-b border-border shrink-0">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close drawer" className="text-text-disabled hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">{children}</div>
        {footer && <div className="px-4 py-4 border-t border-border shrink-0 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Right drawer',
          preview: <DrawerDemo side="right" />,
          code: `const [open, setOpen] = useState(false);\n<Button variant="outline" onClick={() => setOpen(true)}>Open Drawer</Button>\n<Drawer open={open} onClose={() => setOpen(false)} title="Settings" side="right"\n  footer={<><Button variant="outline">Cancel</Button><Button variant="primary">Save</Button></>}>\n  <p>Drawer content goes here.</p>\n</Drawer>`,
        },
        {
          title: 'Left drawer',
          preview: <DrawerDemo side="left" />,
          code: `<Drawer open={open} onClose={() => setOpen(false)} title="Navigation" side="left">...</Drawer>`,
        },
      ],
    },
    {
      id: 'tooltip',
      title: 'Tooltip',
      category: 'Organism',
      abbr: 'Tt',
      description: 'Hover ve focus ile görünür yardım metni. role="tooltip" + aria-describedby bağlantısı ile erişilebilir. 4 yön desteklenir.',
      filePath: 'modules/ui/Tooltip.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useRef, useState } from 'react';

export function Tooltip({ content, placement = 'top', children, className }) {
  const [visible, setVisible] = useState(false);
  const id = useRef(\`tooltip-\${Math.random().toString(36).slice(2)}\`).current;
  const placementClass = { top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5', bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5', left: 'right-full top-1/2 -translate-y-1/2 mr-1.5', right: 'left-full top-1/2 -translate-y-1/2 ml-1.5' }[placement];
  return (
    <span className={cn('relative inline-flex items-center', className)} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>
      <span aria-describedby={id}>{children}</span>
      <span id={id} role="tooltip" className={cn('absolute z-50 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium shadow-md bg-surface-overlay text-text-primary border border-border transition-opacity duration-150 pointer-events-none', placementClass, visible ? 'opacity-100' : 'opacity-0')}>{content}</span>
    </span>
  );
}`,
      variants: [
        {
          title: 'Placements',
          preview: (
            <div className="flex flex-wrap items-center justify-center gap-6 py-4">
              {(['top','bottom','left','right'] as const).map((p) => (
                <Tooltip key={p} content={`Tooltip ${p}`} placement={p}>
                  <Button variant="outline" size="sm">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
                </Tooltip>
              ))}
            </div>
          ),
          code: `<Tooltip content="Help text" placement="top">\n  <Button variant="outline" size="sm">Hover me</Button>\n</Tooltip>`,
        },
      ],
    },
    {
      id: 'dropdown-menu',
      title: 'DropdownMenu',
      category: 'Organism',
      abbr: 'Dm',
      description: 'role="menu" + role="menuitem" ile erişilebilir dropdown. Escape ile kapanır, dışarı tıklamada kapanır. Danger ve disabled item desteği var.',
      filePath: 'modules/ui/DropdownMenu.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useEffect, useRef, useState } from 'react';

export function DropdownMenu({ trigger, items, align = 'left', className }) {
  const [open, setOpen] = useState(false);
  // outside click + Escape handlers
  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((p) => !p)} aria-haspopup="menu" aria-expanded={open}>{trigger}</div>
      {open && (
        <div role="menu" className={cn('absolute z-50 mt-1 min-w-[10rem] rounded-lg border border-border bg-surface-raised shadow-lg py-1', align === 'right' ? 'right-0' : 'left-0')}>
          {items.map((item, i) => item.type === 'separator' ? <div key={i} role="separator" className="my-1 border-t border-border" /> : (
            <button key={i} role="menuitem" type="button" disabled={item.disabled} onClick={() => { item.onClick?.(); setOpen(false); }}
              className={cn('flex w-full items-center gap-2 px-3 py-2 text-sm text-left transition-colors focus-visible:outline-none focus-visible:bg-surface-overlay', item.danger ? 'text-error hover:bg-error-subtle' : 'text-text-primary hover:bg-surface-overlay', item.disabled && 'opacity-50 cursor-not-allowed')}>
              {item.icon && <span aria-hidden="true">{item.icon}</span>}{item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <DropdownMenu
              trigger={<Button variant="outline" size="sm">Actions ▾</Button>}
              items={[
                { label: 'Edit', icon: '✏' },
                { label: 'Duplicate', icon: '⧉' },
                { type: 'separator' },
                { label: 'Delete', icon: '🗑', danger: true },
              ]}
            />
          ),
          code: `<DropdownMenu\n  trigger={<Button variant="outline" size="sm">Actions ▾</Button>}\n  items={[\n    { label: 'Edit', icon: '✏' },\n    { label: 'Duplicate', icon: '⧉' },\n    { type: 'separator' },\n    { label: 'Delete', icon: '🗑', danger: true },\n  ]}\n/>`,
        },
        {
          title: 'Right-aligned',
          preview: (
            <div className="flex justify-end w-full max-w-xs">
              <DropdownMenu
                align="right"
                trigger={<Button variant="ghost" size="sm">⋮</Button>}
                items={[
                  { label: 'View details' },
                  { label: 'Export', icon: '↗' },
                  { label: 'Archive', disabled: true },
                  { type: 'separator' },
                  { label: 'Remove', danger: true },
                ]}
              />
            </div>
          ),
          code: `<DropdownMenu align="right"\n  trigger={<Button variant="ghost" size="sm">⋮</Button>}\n  items={[{ label: 'View details' }, { label: 'Remove', danger: true }]}\n/>`,
        },
      ],
    },
    {
      id: 'table',
      title: 'Table',
      category: 'Organism',
      abbr: 'Tb',
      description: 'Responsive tablo. scope="col" başlıklar, hover satır vurgusu, boş durum mesajı ve özel cell render desteği.',
      filePath: 'modules/ui/Table.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function Table({ columns, rows, caption, emptyMessage = 'No results found.', className }) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-border', className)}>
      <table className="w-full text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-surface-sunken border-b border-border">
          <tr>{columns.map((col) => <th key={col.key} scope="col" className="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-left">{col.header}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface-base">
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-text-secondary">{emptyMessage}</td></tr>
          ) : rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-overlay transition-colors">
              {columns.map((col) => <td key={col.key} className="px-4 py-3 text-text-primary">{col.render ? col.render(row) : String(row[col.key] ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
      variants: [
        {
          title: 'With data',
          preview: (
            <Table
              caption="Users table"
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
                { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{String(row.status)}</Badge> },
              ]}
              rows={[
                { name: 'Jane Doe', email: 'jane@example.com', role: 'Admin', status: 'Active' },
                { name: 'John Smith', email: 'john@example.com', role: 'Member', status: 'Inactive' },
              ]}
            />
          ),
          code: `<Table\n  columns={[\n    { key: 'name', header: 'Name' },\n    { key: 'email', header: 'Email' },\n    { key: 'status', header: 'Status', render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'neutral'}>{row.status}</Badge> },\n  ]}\n  rows={[{ name: 'Jane Doe', email: 'jane@example.com', status: 'Active' }]}\n/>`,
        },
        {
          title: 'Empty state',
          preview: (
            <Table
              caption="Empty table"
              columns={[{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }]}
              rows={[]}
              emptyMessage="No users found. Invite your team to get started."
            />
          ),
          code: `<Table columns={[...]} rows={[]} emptyMessage="No users found." />`,
        },
      ],
    },
    {
      id: 'tab-group',
      title: 'TabGroup',
      category: 'Organism',
      abbr: 'Tg',
      description: 'role="tablist" / role="tab" / role="tabpanel" ARIA pattern. Ok tuşları ile navigasyon, tabIndex=-1 aktif olmayan tablar için.',
      filePath: 'modules/ui/TabGroup.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';
import { useState } from 'react';

export function TabGroup({ tabs, defaultTab, label = 'Tabs', className }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id ?? '');
  function handleKeyDown(e, index) {
    if (e.key === 'ArrowRight') setActive(tabs[(index + 1) % tabs.length].id);
    else if (e.key === 'ArrowLeft') setActive(tabs[(index - 1 + tabs.length) % tabs.length].id);
  }
  return (
    <div className={cn('w-full', className)}>
      <div role="tablist" aria-label={label} className="flex border-b border-border">
        {tabs.map((tab, i) => (
          <button key={tab.id} role="tab" id={\`tab-btn-\${tab.id}\`} aria-selected={tab.id === active} aria-controls={\`tabpanel-\${tab.id}\`} tabIndex={tab.id === active ? 0 : -1}
            onClick={() => setActive(tab.id)} onKeyDown={(e) => handleKeyDown(e, i)}
            className={cn('px-4 py-2.5 text-sm font-medium border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus', tab.id === active ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border')}>
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} id={\`tabpanel-\${tab.id}\`} role="tabpanel" aria-labelledby={\`tab-btn-\${tab.id}\`} tabIndex={0} hidden={tab.id !== active} className="py-4 focus-visible:outline-none">
          {tab.content}
        </div>
      ))}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <div className="w-full">
              <TabGroup
                label="Account settings"
                tabs={[
                  { id: 'profile', label: 'Profile', content: <p className="text-sm text-text-secondary">Profile settings content.</p> },
                  { id: 'security', label: 'Security', content: <p className="text-sm text-text-secondary">Security settings content.</p> },
                  { id: 'billing', label: 'Billing', content: <p className="text-sm text-text-secondary">Billing settings content.</p> },
                ]}
              />
            </div>
          ),
          code: `<TabGroup\n  label="Account settings"\n  tabs={[\n    { id: 'profile', label: 'Profile', content: <ProfileSettings /> },\n    { id: 'security', label: 'Security', content: <SecuritySettings /> },\n    { id: 'billing', label: 'Billing', content: <BillingSettings /> },\n  ]}\n/>`,
        },
      ],
    },
    {
      id: 'breadcrumb',
      title: 'Breadcrumb',
      category: 'Organism',
      abbr: 'Bc',
      description: 'nav aria-label="Breadcrumb" sarıcı ile erişilebilir. Son öge aria-current="page" ile işaretlenir, ayrılıcı aria-hidden.',
      filePath: 'modules/ui/Breadcrumb.tsx',
      sourceCode: `import { cn } from '@/libs/utils/cn';

export function Breadcrumb({ items, className }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <><a href={item.href} className="text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded">{item.label}</a><span aria-hidden="true" className="text-text-disabled">›</span></>
              ) : (
                <span className={isLast ? 'text-text-primary font-medium' : 'text-text-secondary'} aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb' }]} />
          ),
          code: `<Breadcrumb items={[\n  { label: 'Home', href: '/' },\n  { label: 'Components', href: '/components' },\n  { label: 'Breadcrumb' },\n]} />`,
        },
        {
          title: 'Long path',
          preview: (
            <Breadcrumb items={[{ label: 'Dashboard', href: '/' }, { label: 'Users', href: '/users' }, { label: 'Settings', href: '/users/settings' }, { label: 'Permissions' }]} />
          ),
          code: `<Breadcrumb items={[\n  { label: 'Dashboard', href: '/' },\n  { label: 'Users', href: '/users' },\n  { label: 'Settings', href: '/users/settings' },\n  { label: 'Permissions' },\n]} />`,
        },
      ],
    },
  ];
}
