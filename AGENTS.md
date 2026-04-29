<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Project Architecture

**Stack:** Next.js 16.2.4 · React 19 · TypeScript 5 · Tailwind CSS 4 · App Router

## Module Layers

The codebase is divided into four module layers. Every layer builds on the one above it.

```
modules/
├── ui/        ← Primitive UI components (atoms & molecules)
├── app/       ← Application-level patterns (organisms & page shells)
├── domain/    ← Industry-vertical components (compose ui/ + app/)
└── showcase/  ← Documentation & live preview system
```

---

## Layer 1 — `modules/ui/` (Atoms & Molecules)

Stateless or locally-stateful primitive components. No business logic, no external data fetching.

**Rule:** Every file in this layer must:
- Start with `'use client';`
- Import `cn` from `@/libs/utils/cn`
- Use CSS variable tokens (see Design Tokens below), not hardcoded colors
- Export a named function (not default export)
- Define all prop types inline or as a local `type`

### Atoms — single-element components

| Component | File | Key Props |
|-----------|------|-----------|
| Button | `Button.tsx` | `variant` (primary\|secondary\|ghost\|danger\|outline), `size` (xs–xl), `loading`, `iconLeft`, `iconRight`, `fullWidth` |
| Badge | `Badge.tsx` | `variant` (success\|error\|warning\|info\|neutral\|primary), `size`, `dismissible` |
| Avatar | `Avatar.tsx` | `src`, `alt`, `size`, fallback initials |
| Toggle | `Toggle.tsx` | `checked`, `onChange`, `label` |
| Checkbox | `Checkbox.tsx` | `checked`, `label`, `indeterminate` |
| Input | `Input.tsx` | `label`, `hint`, `error`, `clearable`, `type` (password shows toggle) |
| Textarea | `Textarea.tsx` | `label`, `hint`, `error`, `rows` |
| Select | `Select.tsx` | `label`, `options`, `error` |
| FileInput | `FileInput.tsx` | `accept`, `multiple`, `onFiles` |
| DatePicker | `DatePicker.tsx` | `value`, `onChange`, `min`, `max` |
| SkipLink | `SkipLink.tsx` | `href` — accessibility skip-to-content |
| LiveRegion | `LiveRegion.tsx` | `message`, `politeness` — ARIA live region |
| Spinner | `Spinner.tsx` | `size` (xs–xl) — CSS border-based loading indicator |

### Molecules — composed from atoms

| Component | File | Notes |
|-----------|------|-------|
| Card | `Card.tsx` | `variant` (raised\|flat\|outline), `title`, `subtitle`, `headerRight`, `footer`, `hoverable`, `loading` |
| AlertBanner | `AlertBanner.tsx` | `variant` matches semantic tokens, `title`, `message`, `action` |
| Modal | `Modal.tsx` | `open`, `onClose`, `title`, `size` |
| Drawer | `Drawer.tsx` | `open`, `onClose`, `side` (left\|right) |
| Tooltip | `Tooltip.tsx` | `content`, `placement` |
| Popover | `Popover.tsx` | `trigger`, `content`, `placement` |
| Toast | `Toast.tsx` | `variant`, `message`, `duration` |
| Pagination | `Pagination.tsx` | `page`, `total`, `pageSize`, `onChange` |
| Stepper | `Stepper.tsx` | `steps`, `currentStep` |
| TabGroup | `TabGroup.tsx` | `tabs`, `activeTab`, `onChange` |
| Breadcrumb | `Breadcrumb.tsx` | `items` (label + href) |
| PageHeader | `PageHeader.tsx` | `title`, `subtitle`, `actions` |
| EmptyState | `EmptyState.tsx` | `icon`, `title`, `description`, `action` |
| Skeleton | `Skeleton.tsx` | Exports `SkeletonLine`, `SkeletonAvatar`, `SkeletonText`, `SkeletonCard` |
| Table | `Table.tsx` | `columns`, `rows` |
| DataTable | `DataTable.tsx` | `columns`, `rows`, `searchable`, `sortable` |
| AdvancedDataTable | `AdvancedDataTable.tsx` | Extends DataTable with `selectable`, row actions |
| TreeView | `TreeView.tsx` | `nodes` (recursive), `onSelect` |
| ButtonGroup | `ButtonGroup.tsx` | `options`, `selected`, `onChange` |
| CheckboxGroup | `CheckboxGroup.tsx` | `options`, `values`, `onChange` |
| RadioGroup | `RadioGroup.tsx` | `options`, `value`, `onChange` |
| MultiSelect | `MultiSelect.tsx` | `options`, `values`, `onChange`, searchable |
| ComboBox | `ComboBox.tsx` | `options`, `value`, `onChange`, async search |
| TagInput | `TagInput.tsx` | `tags`, `onChange`, `suggestions` |
| SearchBar | `SearchBar.tsx` | `value`, `onChange`, `onClear`, `placeholder` |
| DateRangePicker | `DateRangePicker.tsx` | `start`, `end`, `onChange` |
| ContentScoreBar | `ContentScoreBar.tsx` | `score` (0–100), `label`, `thresholds` |
| DropdownMenu | `DropdownMenu.tsx` | `trigger`, `items` (label\|icon\|danger\|disabled\|separator), `align` (left\|right) |
| Slider | `Slider.tsx` | `slides`, `autoPlay`, `autoPlayInterval`, `showDots`, `showArrows`, `loop` — accessible carousel |

---

## Layer 2 — `modules/app/` (App Patterns / Organisms)

Full page-section components that combine multiple UI molecules into usable workflows. May manage local state.

| Component | File | What it does |
|-----------|------|-------------|
| AppShell | `AppShell.tsx` | Root layout: sidebar + main content area |
| GlobalNav | `GlobalNav.tsx` | Collapsible sidebar nav with nested items and badges |
| GlobalSearch | `GlobalSearch.tsx` | Command-palette-style global search with result previews |
| UserMenu | `UserMenu.tsx` | Avatar + dropdown: user info, settings, sign-out |
| PageHeader | `PageHeader.tsx` | Page title + subtitle + action buttons (extends ui/PageHeader) |
| DataListingPage | `DataListingPage.tsx` | Generic `<T>` listing: search + filter + table + empty/loading/error states |
| DetailHeader | `DetailHeader.tsx` | Breadcrumbs + title + status badge + action buttons for detail views |
| CreateEditForm | `CreateEditForm.tsx` | Form shell with field layout, validation states, save/cancel |
| ConfirmDialog | `ConfirmDialog.tsx` | Destructive action confirmation modal |
| FilterBar | `FilterBar.tsx` | Multi-field filter UI (text, select, date, checkbox) |
| FileUploadSection | `FileUploadSection.tsx` | Drag-and-drop zone with file list + progress |
| NotificationSystem | `NotificationSystem.tsx` | Toast provider + `useNotifications()` hook |
| StepFlow | `StepFlow.tsx` | Multi-step wizard with visual step indicator |
| EmptyErrorState | `EmptyErrorState.tsx` | Exports `ErrorState`, `NotFoundState`, `NoAccessState` |
| LoadingState | `LoadingState.tsx` | Full-page loading overlay |
| AccessibilityKit | `AccessibilityKit.tsx` | ARIA helpers, focus trap, announce utilities |

---

## Layer 3 — `modules/domain/` (Industry Verticals)

Domain-specific components that compose UI + App layers for real-world use cases. Each vertical is a sub-directory.

| Vertical | Directory | Example components |
|----------|-----------|-------------------|
| E-commerce | `ecommerce/` | `ProductCard`, `ProductVariantPicker`, `AddToCartPanel`, `CartSummary`, `CheckoutAddressStep` |
| SaaS | `saas/` | Plan cards, usage meters, team management |
| Fintech | `fintech/` | Transaction list, balance card, transfer form |
| Health | `health/` | Appointment card, patient record, vitals chart |
| Education | `education/` | Course card, progress tracker, quiz component |
| Logistics | `logistics/` | Shipment tracker, delivery timeline, route map |
| HR | `hr/` | Employee card, leave request, org chart |
| Real estate | `realestate/` | Property card, mortgage calculator, map pin |
| Travel | `travel/` | Flight card, hotel booking, itinerary view |
| Content | `content/` | Article card, rich editor toolbar, media picker |
| Manufacturing | `manufacturing/` | Work order card, production chart, equipment status |
| News | `news/` | News card, breaking banner, category filter |
| Restaurant | `restaurant/` | Menu item card, order builder, table status |
| Event | `event/` | Event card, ticket selector, schedule grid |
| Social | `social/` | Profile card, feed item, follow button |
| Video | `video/` | Video card, player controls, playlist |
| Energy | `energy/` | Usage chart, tariff selector, meter reading |
| Legal | `legal/` | Document card, clause editor, signature block |
| Government | `government/` | Service card, form submission, status tracker |

---

## Layer 4 — `modules/showcase/` (Documentation System)

Generates the live component browser.

```
modules/showcase/
├── data/
│   ├── showcase.types.ts        ← Type definitions
│   ├── showcase.data.tsx         ← Aggregator: calls all builder functions
│   └── sections/                 ← One builder file per category
│       ├── ui-atoms.showcase.tsx
│       ├── ui-molecules.showcase.tsx
│       ├── ui-organisms.showcase.tsx
│       ├── app-patterns.showcase.tsx
│       └── domain-*.showcase.tsx  (one per vertical)
└── ui/
    ├── ShowcaseShell.tsx
    ├── ShowcaseLayout.tsx
    ├── Sidebar.tsx
    ├── TopBar.tsx
    ├── ShowcaseSection.tsx
    ├── Widget.tsx
    ├── DarkModeToggle.tsx
    └── CopyButton.tsx
```

### Showcase Types

```typescript
type ShowcaseVariant = {
  title: string;
  preview: React.ReactNode;
  code: string;
  layout?: 'side' | 'stack';
};

type ShowcaseComponent = {
  id: string;
  title: string;
  category: 'Atom' | 'Molecule' | 'Organism' | 'App' | 'Domain';
  abbr: string;           // 2-letter abbreviation shown in sidebar
  description: string;
  filePath: string;       // relative path, e.g. 'modules/ui/Button.tsx'
  sourceCode: string;     // full source code as a string literal
  variants: ShowcaseVariant[];
};
```

### Adding a new component to the showcase

1. Create the component in the correct `modules/` layer.
2. Open the matching `sections/*.showcase.tsx` file (or create one for a new domain).
3. Add a `ShowcaseComponent` entry with at least 2 variants.
4. Import and spread the builder in `showcase.data.tsx`.
5. **Add the component to `showcase.menu.ts`** — the sidebar is driven by this static list, not auto-generated from the data. Without this step the component will not appear in the navigation.

---

## Layer 5 — `app/theme/` (Full-Page Demos)

Complete, multi-page site demos that wire domain components into a realistic product experience. Each theme is a self-contained Next.js route subtree with its own layout, pages, and any theme-specific shared data.

```
app/theme/
└── <vertical>/           ← one directory per demo (e.g. news/, shop/, saas/)
    ├── layout.tsx         ← site shell: header, nav, footer — default export
    ├── page.tsx           ← homepage / landing — default export
    ├── <section>/
    │   ├── page.tsx       ← section index page
    │   └── [slug]/
    │       └── page.tsx   ← dynamic detail page
    └── *.data.ts          ← static sample data shared across pages (no default export)
```

### Rules for theme pages

1. **`layout.tsx` is a Client Component** (`'use client'`) — it owns interactive shell state (mobile menu open, search value, etc.).
2. **`page.tsx` files are Server Components** by default — no `'use client'` unless the page itself manages state.
3. **Shared sample data lives in `*.data.ts`** files inside the theme directory, not inside components. Components receive data as props; pages import and pass it down.
4. **Do not duplicate domain components** — compose from `modules/domain/<vertical>/` and `modules/ui/`. Only create theme-local components for layout wiring that has no domain equivalent.
5. **Dynamic routes use `generateStaticParams`** to enumerate known slugs from the data file.
6. **`<main id="main-content">`** in `layout.tsx` — required for the skip-link accessibility pattern.
7. **No real data fetching** — themes use static sample data. `async` page components are allowed but only to `await params` (Next.js 16 async params API).

### Page anatomy

Each theme typically covers:

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/theme/<v>/` | Hero / above-the-fold + content sections |
| Listing | `/theme/<v>/<section>/` | Filtered, paginated content index |
| Detail | `/theme/<v>/<section>/[slug]/` | Single item deep-dive |
| (optional) Dashboard | `/theme/<v>/dashboard/` | Authenticated-feel management view |

### Existing themes

| Theme | Route | Domain layer used |
|-------|-------|-------------------|
| News site | `/theme/news/` | `modules/domain/news/` |
| E-commerce shop | `/theme/shop/` | `modules/domain/ecommerce/` |
| Vehicle rental (Moovy) | `/theme/rental/` | `modules/domain/mobility/` |

### Adding a new theme

1. Create `app/theme/<vertical>/` directory.
2. Write `layout.tsx` (header + footer, `'use client'`).
3. Write `page.tsx` (homepage, Server Component).
4. Add sub-pages as needed (`<section>/page.tsx`, `[slug]/page.tsx`).
5. Put all sample data in `<vertical>.data.ts` (or per-section `*.data.ts` files).
6. Register the theme in the table above.

---

## Design Tokens

CSS variables defined in `app/globals.css`. Use these in Tailwind classes — never hardcode hex values.

| Token | Value (light) | Purpose |
|-------|--------------|---------|
| `--primary` | `#3b82f6` | Primary actions |
| `--primary-hover` | `#2563eb` | Hover state |
| `--primary-active` | `#1d4ed8` | Active/pressed |
| `--primary-subtle` | `#eff6ff` | Tinted backgrounds |
| `--primary-fg` | `#ffffff` | Text on primary |
| `--secondary` | `#8b5cf6` | Secondary actions |
| `--surface-base` | `#ffffff` | Page background |
| `--surface-raised` | `#f9fafb` | Cards |
| `--surface-overlay` | `#f3f4f6` | Hover overlays |
| `--surface-sunken` | `#e5e7eb` | Inset areas |
| `--text-primary` | `#111827` | Body text |
| `--text-secondary` | `#6b7280` | Muted text |
| `--text-disabled` | `#9ca3af` | Disabled text |
| `--text-inverse` | `#ffffff` | Text on dark bg |
| `--border` | `#e5e7eb` | Default borders |
| `--border-strong` | `#d1d5db` | Emphasized borders |
| `--border-focus` | `#3b82f6` | Focus rings |
| `--success` | `#22c55e` | Success state |
| `--success-subtle` | `#f0fdf4` | Success background |
| `--success-fg` | `#14532d` | Text on success |
| `--warning` | `#f59e0b` | Warning state |
| `--warning-subtle` | `#fffbeb` | Warning background |
| `--error` | `#ef4444` | Error/danger state |
| `--error-subtle` | `#fef2f2` | Error background |
| `--info` | `#06b6d4` | Informational state |
| `--info-subtle` | `#ecfeff` | Info background |

Dark mode overrides are defined in `.dark { }` in the same file.

Tailwind maps these tokens via `@theme inline` — use them as `bg-primary`, `text-text-secondary`, `border-border-focus`, etc.

---

## Icons

**All icons must be sourced from Font Awesome.** Do not use inline SVGs, emoji, or other icon libraries.

### Installed packages

| Package | Purpose |
|---------|---------|
| `@fortawesome/react-fontawesome` | React component wrapper |
| `@fortawesome/fontawesome-svg-core` | Core SVG rendering engine |
| `@fortawesome/free-solid-svg-icons` | Solid icon set (primary) |
| `@fortawesome/free-brands-svg-icons` | Brand / logo icons |

### Usage

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Inside JSX:
<FontAwesomeIcon icon={faArrowRight} />
<FontAwesomeIcon icon={faGithub} className="text-text-secondary" />
```

### Rules

1. **Named imports only** — import the specific icon variable, never the whole set.
2. **`className` for styling** — use Tailwind classes (`text-primary`, `w-4 h-4`, etc.) on the `<FontAwesomeIcon>` element; do not use the `size` prop with raw strings like `"lg"`.
3. **`aria-hidden="true"`** on decorative icons; supply `aria-label` when the icon is the only content of a clickable element.
4. **No inline SVG** — if an icon is unavailable in Font Awesome Free, raise the requirement with the team rather than embedding custom SVG.
5. **No other icon libraries** — do not install or import `lucide-react`, `heroicons`, `react-icons`, or similar packages.

---

## Utilities

### `libs/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Always use `cn()` when building className strings. Never concatenate strings directly.

---

## Component Authoring Rules

1. **`'use client';`** at the top — all components are client components.
2. **Named exports** — no default exports.
3. **Inline or local types** — define prop types in the same file.
4. **`cn()` for classNames** — no template literals, no string concatenation.
5. **Token-only styling** — reference CSS variables; never use raw hex or RGB.
6. **Semantic HTML** — use `<button>` for actions, `<a>` for navigation, correct `<input type>`.
7. **ARIA attributes** — `aria-busy`, `aria-invalid`, `aria-describedby`, `aria-pressed`, `aria-expanded` where applicable.
8. **`focus-visible`** — always include `focus-visible:ring-2 focus-visible:ring-border-focus`.
9. **`disabled:opacity-50 disabled:cursor-not-allowed`** — standard disabled styling.
10. **Spread `...rest`** — pass remaining HTML attributes to the root element.
11. **No business logic in `ui/`** — data fetching, routing, and external calls belong in `app/` or `domain/`.

---

## Component Pattern Template

```typescript
'use client';
import { cn } from '@/libs/utils/cn';

type MyComponentVariant = 'primary' | 'secondary';

const variantClasses: Record<MyComponentVariant, string> = {
  primary:   'bg-primary text-primary-fg hover:bg-primary-hover',
  secondary: 'bg-secondary text-secondary-fg hover:bg-secondary-hover',
};

type MyComponentProps = {
  variant?: MyComponentVariant;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function MyComponent({
  variant = 'primary',
  children,
  className,
  ...rest
}: MyComponentProps) {
  return (
    <div
      className={cn(
        'rounded-md px-4 py-2 font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        variantClasses[variant],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
```

---

## File Naming Conventions

| What | Convention | Example |
|------|------------|---------|
| UI component | PascalCase `.tsx` | `ButtonGroup.tsx` |
| Domain component | PascalCase `.tsx` | `ProductCard.tsx` |
| Showcase builder | kebab-case `.showcase.tsx` | `domain-ecommerce.showcase.tsx` |
| Utility | camelCase `.ts` | `cn.ts` |
| Domain directory | lowercase | `ecommerce/`, `fintech/` |

---

## Path Aliases

| Alias | Resolves to |
|-------|-------------|
| `@/` | Project root |
| `@/modules/ui/` | UI components |
| `@/modules/app/` | App patterns |
| `@/modules/domain/` | Domain components |
| `@/libs/utils/cn` | className utility |

---

## Quick Reference: Where to Put New Code

| What you're building | Where it goes |
|----------------------|---------------|
| Single-purpose UI element (button, badge, input) | `modules/ui/` |
| Composed UI widget (card, modal, table) | `modules/ui/` |
| Full page section or layout shell | `modules/app/` |
| Industry-specific component | `modules/domain/<vertical>/` |
| New industry vertical | `modules/domain/<vertical>/` + new `sections/domain-<vertical>.showcase.tsx` |
| Showcase entry for existing component | `modules/showcase/data/sections/` matching file |
