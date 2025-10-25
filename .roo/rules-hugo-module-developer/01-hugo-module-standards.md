# Hugo Module Development Standards

## UPER-S Development Framework

Follow this methodology for all Hugo module development work:

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

**Hinode Resources:**
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

## Code Style & Conventions

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

## Module Architecture

### Hinode Integration
- Use Hugo mounts for module structure
- Follow Hinode's configuration patterns
- Integrate with Hinode's asset pipeline
- Support Hinode's theming system

### Shortcode Design
- Parameter validation and defaults
- Error handling and user feedback
- Responsive behavior across devices
- Accessibility compliance (WCAG 2.1)

### Asset Management
- SCSS compilation with Hugo Pipes
- JavaScript bundling and minification
- Image optimization and processing
- Cache busting for production builds

## Testing Requirements

### E2E Testing
- All features require Playwright tests
- Test responsive behavior (mobile/tablet/desktop)
- Verify accessibility (keyboard nav, ARIA labels, screen reader)
- Check performance (lazy loading, smooth animations)
- Tests must pass before merging

### Test Data Generation
Use `GalleryTestBuilder` for ephemeral test galleries:
```javascript
const gallery = await new GalleryTestBuilder()
  .with_gallery('test-slideshow', { autoplay: true, interval: 1000 })
  .with_images(5)
  .build()
```

## Module Publishing

### Semantic Versioning
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Breaking changes increment MAJOR
- New features increment MINOR
- Bug fixes increment PATCH

### Release Process
- Automated via semantic-release on `main` branch
- Conventional commits trigger version bumps
- Changelog auto-generated
- npm publishing with proper access controls

### Module Integration
```toml
# In consuming site's config/_default/hugo.toml
[[module.imports]]
  path = "github.com/d-oit/hinode-mod-slideshow-gallery"