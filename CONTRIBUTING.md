# Contributing

Thank you for your interest in improving this project.

## Who Can Contribute?

Everyone is welcome to contribute as long as the project development order and conventions are followed.

## Development Order (Required)

Please follow this order when building or extending features:

1. modules/ui
2. modules/app
3. modules/domains
4. modules/showcase
5. app/themes

Keep lower layers generic and reusable. Put business/domain-specific logic in the proper upper layers.

## Contribution Rules

1. Follow the architecture and naming conventions documented in AGENTS.md.
2. Keep changes scoped and focused.
3. Use existing utilities and patterns (for example, className merging via libs/utils/cn).
4. Prefer composition over duplication.
5. Keep accessibility in mind (semantic HTML, focus states, ARIA where needed).

## Before Opening a PR

1. Run lint checks: npm run lint
2. Build when change scope is large: npm run build
3. Make sure your changes do not break existing pages/themes.
4. If you add a component, include showcase wiring when relevant.

## Pull Request Notes

1. Use a clear title and short summary.
2. Explain what changed and why.
3. Add screenshots or short videos for visible UI changes.

## Credit

Credit is not required, but it is appreciated.
If this project helps you, a small mention such as "Built with NextJS Components Showcase" makes the maintainer happy.
