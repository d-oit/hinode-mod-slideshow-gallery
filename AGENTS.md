## Project Overview

This is a Hugo module that provides slideshow and gallery functionality for Hinode-based websites. Built on Bootstrap 5, it offers responsive image galleries with slideshow capabilities, lightbox support, and keyboard/touch navigation.

**Key Features**:
- Responsive grid and slideshow layouts
- Lightbox modal for full-screen viewing
- Keyboard navigation (arrows, Esc)
- Touch/swipe support for mobile
- Thumbnail navigation strip
- Auto-play with configurable intervals
- i18n support (English, German)

**Architecture**:
- Hinode Hugo module using Hugo mounts
- Bootstrap 5 for styling and responsive behavior
- Custom SCSS for gallery-specific styles
- Vanilla JavaScript for interactions (no jQuery)
- Playwright for E2E testing

---

## Setup Commands

### Initial Setup
```bash
# Install all dependencies (npm + Hugo modules)
npm install

# Start development server
npm run start
# → Auto-runs: clean → mod:vendor → hugo server
# → Serves exampleSite at http://localhost:1313
# → Binds to 0.0.0.0 (accessible from network)
```

### Development Workflow
```bash
# Start dev server (most common command)
npm run start

# Build production site
npm run build

# Clean build artifacts
npm run clean

# Update all dependencies (npm + Hugo modules)
npm run upgrade
```

### Testing
```bash
# Run E2E tests with Playwright
npm run test:playwright

# Run specific test
npx playwright test --grep "slideshow autoplay"

# ⚠️ Note: `npm run test` only builds, doesn't run tests
```

### Module Operations
```bash
# Update Hugo modules
npm run mod:update

# Clean Hugo module cache
npm run mod:clean

# Manually vendor modules (auto-run by start/build)
npm run mod:vendor

# View module dependency graph
hugo mod graph
```

---

## Code Style & Conventions

### Commits
- **Format**: Conventional Commits (`type(scope): description`)
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Tool**: Use `npx cz` for interactive commit prompts (Commitizen)
- **Validation**: commitlint enforces format via Husky pre-commit hooks
- **Example**: `feat(gallery): add carousel navigation controls`

### Versioning
- **Automated**: semantic-release handles versioning on `main` branch
- **Changelog**: Auto-generated in `CHANGELOG.md`
- **Release format**: `chore(release): X.Y.Z [skip ci]`

### File Size Limits
- **Max 500 LOC per file** for maintainability
- Split large templates into partials (in `layouts/partials/gallery/`)
- Split large SCSS into modular imports
- Use ES6 modules for JavaScript

### Hugo Templates
- Use Hugo's template functions: `{{ . | safeHTML }}`, `{{ . | htmlEscape }}`
- Prefer partials over monolithic templates
- Use `with` and `range` for safe variable access
- Document template parameters with comments

### JavaScript
- ES6+ syntax (const/let, arrow functions, modules)
- No semicolons (project convention)
- Event delegation over individual listeners
- Vanilla JS only (no jQuery dependency)

### SCSS
- Use Bootstrap 5 variables and mixins
- Follow BEM naming: `.gallery__controls`, `.gallery__thumbnail--active`
- Mobile-first responsive design
- Modular structure with `@import`

### i18n
- Add UI strings to `i18n/en.toml` and `i18n/de.toml`
- Format: `[gallery.next_slide]` keys with `other = "Next slide"` values
- Use in templates: `{{ i18n "gallery.next_slide" }}`

---

## Testing Instructions

### E2E Test Structure
```
test/
├── gallery.spec.js          # Gallery grid/masonry layouts
├── slideshow.spec.js        # Slideshow functionality
├── lightbox.spec.js         # Modal overlay behavior
├── keyboard.spec.js         # Keyboard navigation
├── accessibility.spec.js    # WCAG 2.1 compliance
└── utils/
    └── testdata-builder.js  # SQLite test data generation
```

### Running Tests
```bash
# All tests
npm run test:playwright

# Specific test file
npx playwright test test/slideshow.spec.js

# Single test case
npx playwright test --grep "autoplay with interval"

# Debug mode (headed browser)
npx playwright test --debug

# Update snapshots
npx playwright test --update-snapshots
```

### Test Requirements
- All tests must pass before merging
- Add tests for new features (required, not optional)
- Test responsive behavior (mobile, tablet, desktop viewports)
- Verify accessibility (keyboard nav, ARIA labels, screen reader)
- Check performance (lazy loading, smooth animations)

### Test Data Generation
Use `GalleryTestBuilder` to create ephemeral test galleries:
```javascript
const gallery = await new GalleryTestBuilder()
  .with_gallery('test-slideshow', { autoplay: true, interval: 1000 })
  .with_images(5)
  .build()
```

---

## UPER-S Development Framework

Follow this methodology for all development work:

### U - Understand (Search First, Ask Later)
**Before requesting clarification, agents MUST search:**
```bash
# 1. Inspect configuration
cat config/_default/params.toml
cat config/_default/hugo.toml

# 2. Examine structure
find layouts/ -type f -name "*.html"
find assets/ -type f

# 3. Check dependencies
cat go.mod
cat package.json

# 4. Validate schema
hugo config | grep -A 5 "params"
```

**Hinode Resources**:
- Docs: https://gethinode.com/docs/
- Module dev guide: https://gethinode.com/docs/advanced-settings/module-development/

### P - Plan (Architecture First)
- Break work into ≤500 LOC files
- Map module structure: `/config`, `/layouts`, `/assets`, `/i18n`
- Define test scenarios before implementation
- Document rollback strategy

### E - Execute (Incremental + Tested)
- Implement one file at a time
- Test immediately after each change
- Validate with `npm run build` and `npm run test:playwright`
- Commit atomically with conventional commits

### R - Review (Quality Gates)
- ✅ Hugo builds without errors
- ✅ Tests pass (E2E + accessibility)
- ✅ Responsive on mobile/tablet/desktop
- ✅ Keyboard navigation works
- ✅ No console errors in browser
- ✅ Lighthouse score: Performance >90, Accessibility 100

### S - Secure (Protect Users)
- Sanitize template inputs: `{{ . | htmlEscape }}`
- Validate image paths (no path traversal)
- Check XSS vulnerabilities in shortcodes
- Run `npm audit` for dependency vulnerabilities
- Review CSP headers in `params.toml`

---

## Critical Patterns

### Automatic Pre-hooks (No Manual Vendoring)
```bash
npm run start   # Auto-runs: clean → mod:vendor → server
npm run build   # Auto-runs: clean → mod:vendor → build
```
✅ Vendoring is automatic  
❌ Don't manually run `npm run mod:vendor` unless using `hugo` CLI directly

### Test Command Gotcha
❌ `npm run test` → Only builds  
✅ `npm run test:playwright` → Actually runs tests

### Example Site Purpose
`exampleSite/` serves dual purpose:
1. **Demo/documentation** for module features
2. **Build target** for development

Always test changes in exampleSite context.

### Resources Directory
- `npm run clean` removes both `public/` and `resources/`
- No persistent cache between builds
- Fresh state prevents stale cache issues

### File Structure
```
hinode-mod-slideshow-gallery/
├── config/_default/       # Module configuration
├── layouts/
│   ├── _shortcodes/       # gallery.html, slideshow.html
│   └── partials/         # gallery/controls.html, gallery/thumbnails.html
├── assets/
│   ├── scss/             # gallery.scss, slideshow.scss, lightbox.scss
│   └── js/               # gallery.js, slideshow.js, keyboard.js
├── i18n/                 # en.toml, de.toml (UI strings)
├── data/                 # gallery-defaults.yaml
├── test/                 # Playwright E2E tests
└── exampleSite/          # Demo content + configuration
```

---

## Security Considerations

### Template Security
- **Always escape user input**: `{{ .Params.title | htmlEscape }}`
- **Safe HTML only when necessary**: `{{ .Content | safeHTML }}`
- **Validate image paths**: No `../` path traversal
- **Check external URLs**: Validate before using in `src` attributes

### Image Handling
- Validate image formats (jpg, png, webp, gif only)
- Limit file sizes in documentation
- Use Hugo's image processing for thumbnails
- Set proper `alt` text for accessibility

### Dependencies
- Run `npm audit` before releases
- Update `hugo-bin` for Hugo security patches
- Review Playwright updates for test security
- Check Go module vulnerabilities: `go list -m -u all`

### Content Security Policy
Configure in `config/_default/params.toml`:
```toml
[security]
  [security.csp]
    default-src = ["'self'"]
    img-src = ["'self'", "data:", "https:"]
    script-src = ["'self'", "'unsafe-inline'"]
```

---

## Deployment Notes

### Production Build
```bash
# Full production build with minification
npm run build
# Output: exampleSite/public/
```

### Hugo Requirements
- **Version**: Hugo Extended 0.148.0+ (managed by hugo-bin)
- **Go**: 1.19+ required for module support
- **Build tags**: Extended edition for SCSS processing

### Module Publishing
```bash
# Automated via semantic-release on main branch
git push origin main

# Manual version bump (not recommended)
npm version patch|minor|major
git push --follow-tags
```

### Integration in Other Sites
```toml
# In your site's config/_default/hugo.toml
[[module.imports]]
  path = "github.com/d-oit/hinode-mod-slideshow-gallery"
```

---

## Troubleshooting

### Build Failures
```bash
# Clear all caches
npm run clean
npm run mod:clean
rm -rf node_modules package-lock.json
npm install
npm run start
```

### Template Errors
- Check Hugo version: `hugo version` (must be Extended)
- Verify module vendoring: `ls _vendor/`
- Review Hugo output for specific error lines
- Test shortcodes in exampleSite first

### Test Failures
- Ensure dev server is running: `npm run start`
- Check Playwright browsers: `npx playwright install`
- Run single test with `--debug` flag
- Review screenshots in `test-results/` directory

### Module Update Issues
```bash
# Nuclear option: clean everything
npm run clean
npm run mod:clean
rm -rf _vendor/ node_modules/
npm install
hugo mod get -u
npm run mod:vendor
```

---

## Quick Reference

### Daily Development
```bash
npm run start              # Start dev server
npm run test:playwright    # Run tests
npx cz                     # Commit with Commitizen
git push origin main       # Auto-release via semantic-release
```

### File Locations
- **Shortcodes**: `layouts/shortcodes/gallery.html`
- **Partials**: `layouts/partials/gallery/*.html`
- **Styles**: `assets/scss/gallery.scss`
- **Scripts**: `assets/js/gallery.js`
- **Config**: `config/_default/params.toml`
- **Tests**: `test/*.spec.js`
- **Examples**: `exampleSite/content/gallery/`

### Key Commands
| Task | Command |
|------|---------|
| Start dev | `npm run start` |
| Build | `npm run build` |
| Test | `npm run test:playwright` |
| Update deps | `npm run upgrade` |
| Commit | `npx cz` |
| Clean | `npm run clean` |

---

## Additional Resources

- **Hinode Docs**: https://gethinode.com/docs/
- **Hinode Modules**: https://gethinode.com/docs/getting-started/upgrading-modules/
- **Upgrading to Hinode V1** https://gethinode.com/docs/getting-started/upgrading/
- **Hinode Module - Template**: https://github.com/gethinode/mod-template
- **Bootstrap 5**: https://getbootstrap.com/docs/5.3/
- **Playwright**: https://playwright.dev/
- **Conventional Commits**: https://www.conventionalcommits.org/
- **Semantic Release**: https://semantic-release.gitbook.io/