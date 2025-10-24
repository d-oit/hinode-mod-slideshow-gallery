# Project Coding Rules (Non-Obvious Only)

- Hugo module vendoring required before any build operations (npm run mod:vendor)
- Module structure uses Hugo mounts for assets, layouts, i18n, data (not standard Hugo directory structure)
- Example site serves dual purpose as both demo and build target
- Resources directory cleaned alongside public directory (non-standard Hugo behavior)
- Playwright tests auto-install browsers on postinstall (requires network access)
- Module dependencies managed through Go mod with indirect Hinode framework modules