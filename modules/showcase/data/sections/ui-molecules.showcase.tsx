'use client';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Checkbox } from '@/modules/ui/Checkbox';
import { RadioGroup } from '@/modules/ui/RadioGroup';
import { Select } from '@/modules/ui/Select';
import { Textarea } from '@/modules/ui/Textarea';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Toggle } from '@/modules/ui/Toggle';
import { DatePicker } from '@/modules/ui/DatePicker';
import { CheckboxGroup } from '@/modules/ui/CheckboxGroup';
import { TagInput } from '@/modules/ui/TagInput';
import { MultiSelect } from '@/modules/ui/MultiSelect';
import { ComboBox, type ComboBoxOption } from '@/modules/ui/ComboBox';
import { FileInput } from '@/modules/ui/FileInput';
import { DateRangePicker, TimePicker } from '@/modules/ui/DateRangePicker';
import { countries } from 'countries-list';
import * as Flags from 'country-flag-icons/react/3x2';
import { useState } from 'react';
import type { ShowcaseComponent } from '../showcase.types';

const COUNTRY_OPTIONS = Object.entries(countries)
  .map(([code, data]) => {
    const Flag = Flags[code as keyof typeof Flags] as React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
    return {
      value: code,
      label: data.name,
      icon: Flag ? <Flag style={{ width: 20, height: 14, borderRadius: 2 }} /> : null,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

const COMBO_OPTIONS: ComboBoxOption[] = [
  { value: 'nextjs', label: 'Next.js', description: 'App Router framework' },
  { value: 'react', label: 'React', description: 'UI library for components' },
  { value: 'typescript', label: 'TypeScript', description: 'Typed JavaScript' },
  { value: 'tailwind', label: 'Tailwind CSS', description: 'Utility-first CSS toolkit' },
  { value: 'storybook', label: 'Storybook', description: 'Component documentation workspace' },
];


function CountryMultiSelectDemo() {
  const [v, setV] = useState<string[]>([]);
  return (
    <div className="w-full max-w-sm space-y-1">
      <MultiSelect id="cms-demo" label="Countries" options={COUNTRY_OPTIONS}
        placeholder="Select countries…" value={v} onChange={setV} hint="Select one or more countries." />
      {v.length > 0 && (
        <p className="text-xs text-text-secondary">Selected: {v.join(', ')}</p>
      )}
    </div>
  );
}

function InputDemoControlled({ prefixIcon, suffixIcon, clearable, success, readOnly, showCount }: {
  prefixIcon?: React.ReactNode; suffixIcon?: React.ReactNode;
  clearable?: boolean; success?: string; readOnly?: boolean; showCount?: boolean;
}) {
  const [v, setV] = useState('');
  return (
    <Input id={`input-demo-${Math.random().toString(36).slice(2)}`} label="Label"
      value={v} onChange={(e) => setV(e.target.value)}
      prefixIcon={prefixIcon} suffixIcon={suffixIcon}
      clearable={clearable} onClear={() => setV('')}
      success={success} readOnly={readOnly}
      showCount={showCount} maxLength={showCount ? 50 : undefined}
    />
  );
}

function CheckboxIndeterminateDemo() {
  const [items, setItems] = useState([
    { id: 'a', label: 'Option A', checked: true },
    { id: 'b', label: 'Option B', checked: false },
    { id: 'c', label: 'Option C', checked: true },
  ]);
  const allChecked = items.every((i) => i.checked);
  const someChecked = items.some((i) => i.checked) && !allChecked;

  function toggleAll() {
    setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })));
  }
  function toggleOne(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, checked: !i.checked } : i));
  }

  return (
    <div className="space-y-2">
      <Checkbox id="all" label="Select all" checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />
      <div className="ml-6 space-y-1">
        {items.map((item) => (
          <Checkbox key={item.id} id={item.id} label={item.label} checked={item.checked} onChange={() => toggleOne(item.id)} />
        ))}
      </div>
    </div>
  );
}

function MultiSelectDemo() {
  const [v, setV] = useState<string[]>([]);
  return (
    <MultiSelect
      id="ms-demo"
      label="Frameworks"
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'angular', label: 'Angular' },
      ]}
      value={v}
      onChange={setV}
      placeholder="Pick frameworks…"
    />
  );
}

function ComboBoxDemo() {
  const [value, setValue] = useState('nextjs');
  return (
    <div className="w-full max-w-sm space-y-1">
      <ComboBox
        id="cb-demo"
        label="Framework"
        options={COMBO_OPTIONS}
        value={value}
        onChange={setValue}
        hint="Search or pick from the list."
      />
      <p className="text-xs text-text-secondary">Selected: {value || 'none'}</p>
    </div>
  );
}

function AsyncComboBoxDemo() {
  const [value, setValue] = useState('');

  async function search(query: string) {
    const normalized = query.trim().toLowerCase();
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (!normalized) return COMBO_OPTIONS;
    return COMBO_OPTIONS.filter((opt) => (
      opt.label.toLowerCase().includes(normalized)
      || opt.description?.toLowerCase().includes(normalized)
    ));
  }

  return (
    <div className="w-full max-w-sm space-y-1">
      <ComboBox
        id="cb-async"
        label="Async search"
        options={COMBO_OPTIONS}
        value={value}
        onChange={setValue}
        onSearch={search}
        placeholder="Type to search..."
      />
      <p className="text-xs text-text-secondary">Selected: {value || 'none'}</p>
    </div>
  );
}

function DateRangeDemo() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  return <DateRangePicker id="dr-demo" label="Select date range" value={range} onChange={setRange} />;
}

function TimePickerDemo() {
  const [t, setT] = useState('09:00');
  return <TimePicker id="tp-demo" label="Meeting time" value={t} onChange={setT} hint="24-hour format" />;
}

export function buildMoleculesData(): ShowcaseComponent[] {
  return [
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
        {
          title: 'Prefix / suffix icon',
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <Input id="sc-in-prefix" label="Search" prefixIcon={<span>🔍</span>} placeholder="Search…" />
              <Input id="sc-in-suffix" label="Amount" suffixIcon={<span>$</span>} placeholder="0.00" type="number" />
            </div>
          ),
          code: `<Input id="search" label="Search" prefixIcon={<SearchIcon />} placeholder="Search…" />\n<Input id="amount" label="Amount" suffixIcon={<span>$</span>} type="number" />`,
          layout: 'stack' as const,
        },
        {
          title: 'Clearable',
          preview: (
            <div className="w-full max-w-xs">
              <InputDemoControlled clearable />
            </div>
          ),
          code: `function Demo() {\n  const [v, setV] = useState('');\n  return <Input id="clr" label="Label" value={v} onChange={(e) => setV(e.target.value)}\n    clearable onClear={() => setV('')} />;\n}`,
          layout: 'stack' as const,
        },
        {
          title: 'Success state',
          preview: (
            <div className="w-full max-w-xs">
              <Input id="sc-in-success" label="Username" value="johndoe" onChange={() => {}} success="Username is available!" />
            </div>
          ),
          code: `<Input id="username" label="Username" value="johndoe" success="Username is available!" />`,
          layout: 'stack' as const,
        },
        {
          title: 'Read only',
          preview: (
            <div className="w-full max-w-xs">
              <Input id="sc-in-readonly" label="API Key" value="sk-abc123xyz" onChange={() => {}} readOnly />
            </div>
          ),
          code: `<Input id="api-key" label="API Key" value="sk-abc123xyz" readOnly />`,
          layout: 'stack' as const,
        },
        {
          title: 'Character counter',
          preview: (
            <div className="w-full max-w-xs">
              <InputDemoControlled showCount />
            </div>
          ),
          code: `<Input id="bio" label="Bio" value={v} onChange={(e) => setV(e.target.value)} maxLength={50} showCount />`,
          layout: 'stack' as const,
        },
        {
          title: 'Password with eye toggle',
          preview: (() => {
            function PwDemo() {
              const [v, setV] = useState('');
              return (
                <div className="w-full max-w-xs">
                  <Input id="pw-demo" label="Password" type="password"
                    value={v} onChange={(e) => setV(e.target.value)}
                    placeholder="Enter your password" hint="Min. 8 characters" />
                </div>
              );
            }
            return <PwDemo />;
          })(),
          code: `<Input id="password" label="Password" type="password" value={v} onChange={setV} />`,
          layout: 'stack' as const,
        },
        {
          title: 'Number stepper',
          preview: (() => {
            function NumDemo() {
              const [v, setV] = useState('5');
              return (
                <div className="w-full max-w-xs">
                  <Input id="num-demo" label="Quantity" type="number"
                    value={v} onChange={(e) => setV(e.target.value)}
                    min={0} max={99} step={1} />
                </div>
              );
            }
            return <NumDemo />;
          })(),
          code: `<Input id="qty" label="Quantity" type="number" value={v} onChange={setV} min={0} max={99} />`,
          layout: 'stack' as const,
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
        {
          title: 'Indeterminate (select all)',
          preview: <CheckboxIndeterminateDemo />,
          code: `// Set indeterminate prop to show mixed state:\n<Checkbox id="all" label="Select all" checked={allChecked} indeterminate={someChecked} onChange={toggleAll} />`,
          layout: 'stack' as const,
        },
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
          title: 'Controlled',
          preview: (() => {
            const ROLES = [
              { value: 'admin',  label: 'Admin'  },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
              { value: 'guest',  label: 'Guest'  },
            ];
            function ControlledSelectDemo() {
              const [role, setRole] = useState('editor');
              return (
                <div className="w-full max-w-xs">
                  <Select id="sc-sl-role" label="Role" options={ROLES} value={role}
                    hint={`Selected: ${ROLES.find(r => r.value === role)?.label}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)} />
                </div>
              );
            }
            return <ControlledSelectDemo />;
          })(),
          code: `const ROLES = [\n  { value: 'admin', label: 'Admin' },\n  { value: 'editor', label: 'Editor' },\n  { value: 'viewer', label: 'Viewer' },\n];\n\nconst [role, setRole] = useState('editor');\n<Select id="role" label="Role" options={ROLES} value={role}\n  onChange={(e) => setRole(e.target.value)} />`,
        },
        {
          title: 'With icons',
          preview: (() => {
            const STATUSES = [
              { value: 'active',   label: 'Active',   icon: <span className="text-success text-xs">●</span> },
              { value: 'inactive', label: 'Inactive', icon: <span className="text-text-disabled text-xs">●</span> },
              { value: 'pending',  label: 'Pending',  icon: <span className="text-warning text-xs">●</span> },
              { value: 'banned',   label: 'Banned',   icon: <span className="text-error text-xs">●</span> },
            ];
            function IconSelectDemo() {
              const [status, setStatus] = useState('active');
              return (
                <div className="w-full max-w-xs">
                  <Select id="sc-sl-status" label="Status" options={STATUSES} value={status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)} />
                </div>
              );
            }
            return <IconSelectDemo />;
          })(),
          code: `const STATUSES = [\n  { value: 'active',   label: 'Active',   icon: <span className="text-success">●</span> },\n  { value: 'inactive', label: 'Inactive', icon: <span className="text-text-disabled">●</span> },\n  { value: 'pending',  label: 'Pending',  icon: <span className="text-warning">●</span> },\n];\n\n<Select id="status" label="Status" options={STATUSES} value={status} onChange={setStatus} />`,
        },
        {
          title: 'Validation states',
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <Select id="sc-sl-error" label="Plan" placeholder="Select a plan" required
                error="Please select a plan."
                options={[{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }, { value: 'team', label: 'Team' }]} />
              <Select id="sc-sl-disabled" label="Plan" disabled
                options={[{ value: 'pro', label: 'Pro' }]} value="pro" />
            </div>
          ),
          code: `<Select id="plan" label="Plan" placeholder="Select a plan" required\n  error="Please select a plan." options={[...]} />\n\n<Select id="plan" label="Plan" disabled options={[...]} value="pro" />`,
        },
        {
          title: 'With countries',
          preview: (
            <div className="w-full max-w-xs">
              <Select id="sc-sl-countries" label="Country" placeholder="Select a country…"
                hint="Powered by countries-list + country-flag-icons."
                options={COUNTRY_OPTIONS} />
            </div>
          ),
          code: `import { countries, getEmojiFlag } from 'countries-list';\n\nconst COUNTRY_OPTIONS = Object.entries(countries)\n  .map(([code, data]) => ({ value: code, label: \`\${getEmojiFlag(code)} \${data.name}\` }))\n  .sort((a, b) => a.label.localeCompare(b.label));\n\n<Select id="country" label="Country" placeholder="Select a country…"\n  options={COUNTRY_OPTIONS} hint="Powered by countries-list." />`,
        },
        {
          title: 'Searchable',
          preview: (() => {
            function SearchableSelectDemo() {
              const [val, setVal] = useState('');
              return (
                <div className="w-full max-w-xs">
                  <Select id="sc-sl-search" label="Country" placeholder="Select a country…" searchable
                    hint="Type to filter the list."
                    options={COUNTRY_OPTIONS} value={val}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVal(e.target.value)} />
                </div>
              );
            }
            return <SearchableSelectDemo />;
          })(),
          code: `<Select id="country" label="Country" placeholder="Select a country…" searchable\n  options={COUNTRY_OPTIONS} value={val} onChange={(e) => setVal(e.target.value)}\n  hint="Type to filter the list." />`,
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
    {
      id: 'toggle',
      title: 'Toggle',
      category: 'Molecule',
      abbr: 'Tg',
      description: 'role="switch" tabanlı toggle/switch. 3 boyut, description slot, disabled desteği. CSS transform ile native input olmadan tam erişilebilir.',
      filePath: 'modules/ui/Toggle.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

const sizeMap = {
  sm: { track: 'h-4 w-7',  thumb: 'h-3 w-3',     on: 'translate-x-3.5' },
  md: { track: 'h-5 w-9',  thumb: 'h-3.5 w-3.5', on: 'translate-x-4'   },
  lg: { track: 'h-6 w-11', thumb: 'h-4 w-4',     on: 'translate-x-5'   },
};

export function Toggle({ id, label, description, checked, onChange, disabled, size = 'md', className }) {
  const { track, thumb, on } = sizeMap[size];
  return (
    <label htmlFor={id} className={cn('flex items-start gap-3', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', className)}>
      <div className="relative shrink-0 mt-0.5">
        <input id={id} type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled} aria-checked={checked} className="sr-only" />
        <div className={cn('rounded-full transition-colors duration-200', track, checked ? 'bg-primary' : 'bg-surface-sunken border border-border')} />
        <div className={cn('absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm transition-transform duration-200', thumb, checked ? on : 'translate-x-0')} />
      </div>
      <div>
        <span className="text-sm font-medium text-text-primary">{label}</span>
        {description && <p className="text-xs text-text-secondary mt-0.5">{description}</p>}
      </div>
    </label>
  );
}`,
      variants: [
        {
          title: 'Sizes',
          preview: (
            <div className="space-y-3">
              {(['sm','md','lg'] as const).map((s) => (
                <Toggle key={s} id={`sc-toggle-${s}`} label={`Toggle ${s.toUpperCase()}`} checked size={s} onChange={() => {}} />
              ))}
            </div>
          ),
          code: `<Toggle id="notifications" label="Enable notifications" checked={enabled} onChange={setEnabled} size="md" />`,
        },
        {
          title: 'With description',
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <Toggle id="sc-toggle-desc1" label="Marketing emails" description="Receive weekly updates and promotions." checked onChange={() => {}} />
              <Toggle id="sc-toggle-desc2" label="Security alerts" description="Get notified about account activity." checked={false} onChange={() => {}} />
            </div>
          ),
          code: `<Toggle id="marketing" label="Marketing emails" description="Receive weekly updates." checked={value} onChange={setValue} />`,
        },
        {
          title: 'Disabled',
          preview: (
            <div className="space-y-2">
              <Toggle id="sc-toggle-dis1" label="Disabled on" checked disabled onChange={() => {}} />
              <Toggle id="sc-toggle-dis2" label="Disabled off" checked={false} disabled onChange={() => {}} />
            </div>
          ),
          code: `<Toggle id="toggle" label="Disabled" checked disabled onChange={() => {}} />`,
        },
      ],
    },
    {
      id: 'date-picker',
      title: 'DatePicker',
      category: 'Molecule',
      abbr: 'Dp',
      description: 'Native date input ile label + hint + error anatomy. Date | null değer modeli, min/max kısıtlaması, disabled tooltip desteği.',
      filePath: 'modules/ui/DatePicker.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function DatePicker({ id, label, hint, error, value, onChange, disabled, required, min, max, className }) {
  const formatted = value && !isNaN(value.getTime()) ? value.toISOString().split('T')[0] : '';
  function handleChange(e) {
    if (!e.target.value) { onChange(null); return; }
    const d = new Date(e.target.value);
    onChange(isNaN(d.getTime()) ? null : d);
  }
  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}{required && <span className="text-error ml-1" aria-hidden="true">*</span>}
      </label>
      <input id={id} type="date" value={formatted} onChange={handleChange} disabled={disabled} required={required} min={min} max={max} aria-invalid={!!error}
        className={cn('block w-full rounded-md border px-3 py-2 text-sm transition-colors text-text-primary bg-surface-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-sunken', error ? 'border-error ring-1 ring-error bg-error-subtle' : 'border-border')} />
      {hint && !error && <p className="text-xs text-text-secondary">{hint}</p>}
      {error && <p className="text-xs text-error" role="alert">{error}</p>}
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: <div className="w-full max-w-xs"><DatePicker id="sc-dp-default" label="Appointment date" hint="Select a future date." onChange={() => {}} value={null} /></div>,
          code: `<DatePicker id="date" label="Appointment date" hint="Select a future date." value={date} onChange={setDate} />`,
        },
        {
          title: 'With value',
          preview: <div className="w-full max-w-xs"><DatePicker id="sc-dp-val" label="Start date" value={new Date('2026-06-15')} onChange={() => {}} /></div>,
          code: `<DatePicker id="start" label="Start date" value={new Date('2026-06-15')} onChange={setDate} />`,
        },
        {
          title: 'Error / Disabled',
          preview: (
            <div className="w-full max-w-xs space-y-3">
              <DatePicker id="sc-dp-err" label="Due date" error="Please select a date." onChange={() => {}} value={null} required />
              <DatePicker id="sc-dp-dis" label="Locked date" value={new Date('2026-01-01')} onChange={() => {}} disabled />
            </div>
          ),
          code: `<DatePicker id="due" label="Due date" error="Please select a date." required />\n<DatePicker id="locked" label="Locked date" value={date} disabled />`,
        },
      ],
    },
    {
      id: 'checkbox-group',
      title: 'CheckboxGroup',
      category: 'Molecule',
      abbr: 'Cg',
      description: 'Chip görünümlü çoklu seçim grubu. Seçili chip bg-primary-subtle / border-primary renk tokenları ile işaretlenir. Klavye erişilebilir.',
      filePath: 'modules/ui/CheckboxGroup.tsx',
      sourceCode: `'use client';
import { cn } from '@/libs/utils/cn';

export function CheckboxGroup({ legend, options, selected, onChange, disabled, error, className }) {
  function toggle(opt, checked) {
    onChange(checked ? [...selected, opt] : selected.filter((s) => s !== opt));
  }
  return (
    <fieldset className={cn('space-y-2', className)}>
      <legend className="text-sm font-medium text-text-primary mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <label key={opt} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors focus-within:ring-2 focus-within:ring-border-focus', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', isSelected ? 'bg-primary-subtle border-primary text-primary' : 'bg-surface-base border-border text-text-primary hover:bg-surface-overlay')}>
              <input type="checkbox" checked={isSelected} disabled={disabled} onChange={(e) => toggle(opt, e.target.checked)} className="sr-only" />
              {isSelected && <span aria-hidden="true" className="text-xs font-bold">✓</span>}
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-error mt-1" role="alert">{error}</p>}
    </fieldset>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (() => {
            function CheckboxGroupDemo() {
              const [sel, setSel] = useState<string[]>(['react', 'typescript']);
              return <CheckboxGroup legend="Tech stack" options={[{value:'react',label:'React'},{value:'vue',label:'Vue'},{value:'angular',label:'Angular'},{value:'typescript',label:'TypeScript'},{value:'javascript',label:'JavaScript'},{value:'nodejs',label:'Node.js'}]} selected={sel} onChange={setSel} />;
            }
            return <CheckboxGroupDemo />;
          })(),
          code: `const [selected, setSelected] = useState(['react', 'typescript']);\n<CheckboxGroup\n  legend="Tech stack"\n  options={[\n    { value: 'react', label: 'React' },\n    { value: 'vue', label: 'Vue' },\n    { value: 'typescript', label: 'TypeScript' },\n  ]}\n  selected={selected}\n  onChange={setSelected}\n/>`,
        },
        {
          title: 'Disabled',
          preview: <CheckboxGroup legend="Permissions" options={[{value:'read',label:'Read'},{value:'write',label:'Write'},{value:'delete',label:'Delete'}]} selected={['read']} onChange={() => {}} disabled />,
          code: `<CheckboxGroup\n  legend="Permissions"\n  options={[\n    { value: 'read', label: 'Read' },\n    { value: 'write', label: 'Write' },\n    { value: 'delete', label: 'Delete' },\n  ]}\n  selected={['read']}\n  onChange={() => {}}\n  disabled\n/>`,
        },
      ],
    },
    {
      id: 'tag-input',
      title: 'TagInput',
      category: 'Molecule',
      abbr: 'Ti',
      description: 'Enter veya virgülle tag ekleme, çift tıkla düzenleme, Backspace ile silme. Duplicate eklenmez. Controlled string[] modeli.',
      filePath: 'modules/ui/TagInput.tsx',
      sourceCode: `'use client';
import { useRef, useState } from 'react';
import { cn } from '@/libs/utils/cn';

export function TagInput({ id, label, hint, error, value, onChange, placeholder = 'Type and press Enter or comma…', disabled, className }) {
  const [input, setInput] = useState('');
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  function addTags(raw) {
    const tags = raw.split(',').map((t) => t.trim()).filter(Boolean);
    onChange([...new Set([...value, ...tags])]);
    setInput('');
  }
  function removeTag(idx) { onChange(value.filter((_, i) => i !== idx)); }
  // ... keyboard handlers + inline edit
  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">{label}</label>
      <div className={cn('flex flex-wrap gap-1.5 min-h-10 w-full rounded-md border px-3 py-2 transition-colors cursor-text focus-within:ring-2 focus-within:ring-border-focus', disabled ? 'opacity-50 cursor-not-allowed bg-surface-sunken' : 'bg-surface-base border-border', error && 'border-error ring-1 ring-error')}>
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-subtle text-primary">
            {tag}
            {!disabled && <button type="button" onClick={() => removeTag(i)} className="hover:opacity-70">✕</button>}
          </span>
        ))}
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={value.length === 0 ? placeholder : undefined} disabled={disabled} className="flex-1 min-w-24 bg-transparent text-sm text-text-primary placeholder:text-text-disabled outline-none" />
      </div>
    </div>
  );
}`,
      variants: [
        {
          title: 'Default',
          preview: (() => {
            function TagInputDemo() {
              const [tags, setTags] = useState<string[]>(['next.js', 'react']);
              return <div className="w-full max-w-sm"><TagInput id="sc-ti-default" label="Tags" value={tags} onChange={setTags} hint="Press Enter or comma to add. Double-click to edit." /></div>;
            }
            return <TagInputDemo />;
          })(),
          code: `const [tags, setTags] = useState(['next.js', 'react']);\n<TagInput id="tags" label="Tags" value={tags} onChange={setTags} hint="Press Enter or comma to add." />`,
        },
        {
          title: 'Empty / Error',
          preview: (() => {
            function TagInputErrorDemo() {
              const [tags, setTags] = useState<string[]>([]);
              return <div className="w-full max-w-sm"><TagInput id="sc-ti-err" label="Required tags" value={tags} onChange={setTags} error="At least one tag is required." /></div>;
            }
            return <TagInputErrorDemo />;
          })(),
          code: `<TagInput id="tags" label="Required tags" value={[]} onChange={setTags} error="At least one tag is required." />`,
        },
      ],
    },
    {
      id: 'multi-select',
      title: 'MultiSelect',
      category: 'Molecule',
      abbr: 'Ms',
      description: 'Multi-value select with tag chips, keyboard navigation, and remove-item support.',
      filePath: 'modules/ui/MultiSelect.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\nimport { useEffect, useRef, useState } from 'react';\n\nexport function MultiSelect({ id, label, options, value, onChange, placeholder = 'Select…' }) {\n  // ... (controlled/uncontrolled multi-select with chip tags)\n}`,
      variants: [
        {
          title: 'Controlled',
          layout: 'stack' as const,
          preview: <MultiSelectDemo />,
          code: `function Demo() {\n  const [v, setV] = useState([]);\n  return (\n    <MultiSelect id="ms" label="Frameworks"\n      options={[{ value: 'react', label: 'React' }, ...]}\n      value={v} onChange={setV}\n    />\n  );\n}`,
        },
        {
          title: 'With error',
          layout: 'stack' as const,
          preview: (
            <MultiSelect id="ms-err" label="Tags" options={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]}
              error="Please select at least one tag." />
          ),
          code: `<MultiSelect id="ms" label="Tags" options={[...]} error="Please select at least one tag." />`,
        },
        {
          title: 'With countries',
          layout: 'stack' as const,
          preview: <CountryMultiSelectDemo />,
          code: `import { countries, getEmojiFlag } from 'countries-list';\n\nconst COUNTRY_OPTIONS = Object.entries(countries)\n  .map(([code, data]) => ({ value: code, label: \`\${getEmojiFlag(code)} \${data.name}\` }))\n  .sort((a, b) => a.label.localeCompare(b.label));\n\nfunction Demo() {\n  const [v, setV] = useState([]);\n  return (\n    <MultiSelect id="ms-countries" label="Countries"\n      options={COUNTRY_OPTIONS} placeholder="Select countries…"\n      value={v} onChange={setV} hint="Select one or more countries." />\n  );\n}`,
        },
        {
          title: 'Searchable',
          layout: 'stack' as const,
          preview: (() => {
            function SearchableMultiSelectDemo() {
              const [v, setV] = useState<string[]>([]);
              return (
                <MultiSelect id="ms-search" label="Countries" searchable
                  options={COUNTRY_OPTIONS} placeholder="Search and select…"
                  value={v} onChange={setV} hint="Type to filter the list." />
              );
            }
            return <SearchableMultiSelectDemo />;
          })(),
          code: `<MultiSelect id="countries" label="Countries" searchable\n  options={COUNTRY_OPTIONS} placeholder="Search and select…"\n  value={v} onChange={setV} hint="Type to filter the list." />`,
        },
      ],
    },
    {
      id: 'combo-box',
      title: 'ComboBox',
      category: 'Molecule',
      abbr: 'Cb',
      description: 'Single-select combobox with type-to-filter behavior, keyboard navigation, and optional async search.',
      filePath: 'modules/ui/ComboBox.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\nimport { useState } from 'react';\n\nexport function ComboBox({ id, label, options, value, onChange, onSearch }) {\n  // searchable single-select combobox with async search support\n}`,
      variants: [
        {
          title: 'Controlled selection',
          layout: 'stack' as const,
          preview: <ComboBoxDemo />,
          code: `function Demo() {\n  const [value, setValue] = useState('nextjs');\n  return (\n    <ComboBox\n      id="framework"\n      label="Framework"\n      options={COMBO_OPTIONS}\n      value={value}\n      onChange={setValue}\n    />\n  );\n}`,
        },
        {
          title: 'Async search',
          layout: 'stack' as const,
          preview: <AsyncComboBoxDemo />,
          code: `<ComboBox id="search" label="Async search" options={COMBO_OPTIONS} onSearch={search} value={value} onChange={setValue} />`,
        },
      ],
    },
    {
      id: 'file-input',
      title: 'FileInput',
      category: 'Molecule',
      abbr: 'Fi',
      description: 'Drag-and-drop file upload with validation, file list, and individual remove actions.',
      filePath: 'modules/ui/FileInput.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\nimport { useRef, useState } from 'react';\n\nexport function FileInput({ id, label, multiple, accept, maxSizeBytes, allowedTypes, disabled }) {\n  // drag-and-drop + browse, validates size/type, lists files with errors\n}`,
      variants: [
        {
          title: 'Single file',
          layout: 'stack' as const,
          preview: <FileInput id="fi-single" label="Profile photo" hint="PNG or JPG, max 2 MB" accept="image/*" maxSizeBytes={2 * 1024 * 1024} />,
          code: `<FileInput id="photo" label="Profile photo" hint="PNG or JPG, max 2 MB"\n  accept="image/*" maxSizeBytes={2097152} />`,
        },
        {
          title: 'Multiple files',
          layout: 'stack' as const,
          preview: <FileInput id="fi-multi" label="Attachments" multiple hint="Up to 5 MB each" maxSizeBytes={5 * 1024 * 1024} />,
          code: `<FileInput id="attachments" label="Attachments" multiple hint="Up to 5 MB each" maxSizeBytes={5242880} />`,
        },
        {
          title: 'With upload action',
          layout: 'stack' as const,
          preview: <FileInput id="fi-upload" label="Project attachments" multiple hint="Up to 5 MB each" maxSizeBytes={5 * 1024 * 1024} onUpload={async (files) => { await new Promise((r) => setTimeout(r, 800)); console.log('uploaded', files); }} uploadLabel="Upload" />,
          code: `<FileInput id="attachments" label="Project attachments" multiple maxSizeBytes={5242880}\n  onUpload={uploadFiles} uploadLabel="Upload" />`,
        },
        {
          title: 'Disabled',
          layout: 'stack' as const,
          preview: <FileInput id="fi-disabled" label="Disabled upload" disabled />,
          code: `<FileInput id="upload" label="Disabled upload" disabled />`,
        },
      ],
    },
    {
      id: 'date-range-picker',
      title: 'DateRangePicker',
      category: 'Molecule',
      abbr: 'Dr',
      description: 'Date range picker with start/end fields and end ≥ start validation. Also ships a TimePicker.',
      filePath: 'modules/ui/DateRangePicker.tsx',
      sourceCode: `'use client';\nimport { cn } from '@/libs/utils/cn';\n\nexport function DateRangePicker({ id, label, value, onChange }) {\n  // start/end date inputs, auto-clears end if start > end\n}\n\nexport function TimePicker({ id, label, value, onChange, step = 60 }) {}`,
      variants: [
        {
          title: 'Date range',
          layout: 'stack' as const,
          preview: <DateRangeDemo />,
          code: `function Demo() {\n  const [range, setRange] = useState({ start: null, end: null });\n  return <DateRangePicker id="dr" label="Date range" value={range} onChange={setRange} />;\n}`,
        },
        {
          title: 'Time picker',
          layout: 'stack' as const,
          preview: <TimePickerDemo />,
          code: `function Demo() {\n  const [t, setT] = useState('09:00');\n  return <TimePicker id="tp" label="Meeting time" value={t} onChange={setT} />;\n}`,
        },
      ],
    },
  ];
}
