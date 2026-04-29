# NextJS Components Showcase

Modern, reusable, and domain-driven component system.

This repository is designed with a layered architecture that spans from UI atoms to full-page themes, enabling interface building blocks for multiple industries (blog, event, commerce, fintech, and more).

## Highlights

- Next.js 16.2.4 + React 19 + TypeScript 5 + Tailwind CSS 4
- App Router-based structure
- Layered module architecture (ui -> app -> domains -> showcase)
- Multiple themes and sample page flows
- Font Awesome icon standard
- Design token-driven styling approach

## Tech Stack

- Next.js 16.2.4
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
- Zustand, Zod, Leaflet, Font Awesome

## Quick Start

Requirements:

- Node.js 20+
- npm 10+

Install:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app runs on http://localhost:3000 by default.

## Scripts

```bash
npm run dev     # development
npm run build   # production build
npm run start   # production server
npm run lint    # lint checks
```

## Project Structure

Main directories:

- app/: Next.js routes, themes, and pages
- modules/ui/: atom and molecule-level UI components
- modules/app/: application-level component compositions
- modules/domains/: industry-specific domain components and types
- modules/showcase/: component documentation and preview system
- libs/utils/: shared utilities (e.g. cn)

Layering model:

1. modules/ui
2. modules/app
3. modules/domains
4. modules/showcase

Each layer provides building blocks for the next one. The goal is to keep business logic and data flow in domain/app layers while keeping the ui layer as pure as possible.

## Theme Routes

Existing theme examples are grouped under app/themes.

- app/themes/blog
- app/themes/common
- app/themes/event

This structure enables different product experiences on top of the same component foundation.

## Development Principles

- Use named exports in UI components.
- Prefer libs/utils/cn for className merging.
- Follow the design token approach for styling.
- Use Font Awesome as the icon source.
- Build components with accessibility in mind (ARIA, focus states).

## Adding a New Component

1. Choose the right layer (ui, app, or domains).
2. Add the component to the relevant directory.
3. Include it in showcase data when needed.
4. Run linting and type checks.

## Code Quality

Run lint:

```bash
npm run lint
```

For larger changes, running a production build is recommended:

```bash
npm run build
```

## Contributing

Everyone can contribute as long as the project architecture and development order are followed.

See the full guide in CONTRIBUTING.md.

## License

This project is licensed under 0BSD.

See LICENSE for details.
