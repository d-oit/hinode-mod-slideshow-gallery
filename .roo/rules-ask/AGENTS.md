# Project Documentation Rules (Non-Obvious Only)

- Example site serves dual purpose as both demo and build target (not separate documentation site)
- Module structure uses Hugo mounts for assets, layouts, i18n, data (counterintuitive directory organization)
- Test command builds only, not runs tests (misleading npm script naming)
- Resources directory cleaned alongside public (non-standard Hugo documentation workflow)
- Playwright tests are E2E only, no unit tests (limited testing documentation)