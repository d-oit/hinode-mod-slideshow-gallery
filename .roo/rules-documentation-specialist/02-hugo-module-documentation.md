# Hugo Module Documentation

## Module Overview Documentation

### README.md Structure
```markdown
# Hinode Mod Slideshow Gallery

[![Hugo](https://img.shields.io/badge/Hugo-0.148.0+-blue.svg)](https://gohugo.io)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/@d-oit/hinode-mod-slideshow-gallery)](https://www.npmjs.com/package/@d-oit/hinode-mod-slideshow-gallery)

A Hugo module that provides responsive slideshow and gallery functionality for Hinode-based websites. Features include lightbox modal viewing, keyboard navigation, touch gestures, and auto-play capabilities with full i18n support.

## ✨ Features

- **Responsive Design**: Adapts seamlessly across desktop, tablet, and mobile devices
- **Lightbox Modal**: Full-screen image viewing with smooth transitions
- **Navigation Controls**: Previous/next buttons with thumbnail strip
- **Keyboard Support**: Full keyboard accessibility (arrows, Esc, Enter)
- **Touch Gestures**: Swipe navigation on mobile devices
- **Auto-play**: Configurable slideshow with pause/play controls
- **i18n Ready**: Multi-language support (English, German)
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Performance**: Lazy loading and optimized image handling

## 🚀 Quick Start

### Prerequisites

- Hugo Extended 0.148.0+
- Node.js 18+
- Go 1.19+ (for module support)

### Installation

1. **Add the module to your Hugo site:**

   ```bash
   hugo mod get github.com/d-oit/hinode-mod-slideshow-gallery
   ```

2. **Configure the module in `config/_default/hugo.toml`:**

   ```toml
   [[module.imports]]
   path = "github.com/d-oit/hinode-mod-slideshow-gallery"
   disable = false
   ```

3. **Enable the module in your page frontmatter:**

   ```yaml
   ---
   type: minimal
   modules: ["slideshow-gallery"]
   ---

   ## My Gallery

   {{< slideshow-gallery >}}
   ```

### Basic Usage

Create a content file with image resources:

```yaml
---
title: "My Gallery"
modules: ["slideshow-gallery"]
resources:
  - src: "images/photo1.jpg"
    title: "Beautiful sunset"
    params:
      description: "A stunning sunset over the mountains"
  - src: "images/photo2.jpg"
    title: "City skyline"
    params:
      description: "Urban landscape at night"
---

## Gallery

{{< slideshow-gallery >}}
```

## 📖 Usage Guide

### Configuration Options

#### Shortcode Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ratio` | string | `"auto"` | Image aspect ratio (e.g., `"16x9"`, `"4x3"`) |
| `ratioThumbnail` | string | `"auto"` | Thumbnail aspect ratio |
| `loading` | string | `"lazy"` | Image loading strategy (`"lazy"` or `"eager"`) |

#### Module Configuration

Add to `config/_default/params.toml`:

```toml
[modules]
    [modules.slideshow-gallery]
        integration = "optional"  # optional, async, sync
        state = "async"          # async, sync
        localize = true          # Enable i18n
```

### Advanced Examples

#### Custom Aspect Ratios
```markdown
{{< slideshow-gallery ratio="16x9" ratioThumbnail="1x1" >}}
```

#### Image Metadata
```yaml
resources:
  - src: "gallery/image1.jpg"
    title: "Gallery Image 1"
    params:
      description: "Detailed description of the image"
      cssClass: "highlight"  # Custom CSS class
```

#### Multiple Galleries
```markdown
## Gallery 1
{{< slideshow-gallery >}}

## Gallery 2
{{< slideshow-gallery ratio="4x3" >}}
```

## 🎨 Customization

### CSS Customization

The module uses BEM methodology for CSS classes:

```scss
// Custom styling in your site's assets
.slideshow-gallery {
  // Custom gallery styles
  &__lightbox {
    // Lightbox customizations
  }

  &__thumbnails {
    // Thumbnail strip styling
  }
}
```

### Theme Integration

Works seamlessly with Hinode themes:

```scss
// Override default variables
$gallery-transition-duration: 0.5s;
$gallery-primary-color: #your-brand-color;
```

### JavaScript Customization

Extend functionality by hooking into events:

```javascript
// assets/js/custom-gallery.js
document.addEventListener('DOMContentLoaded', function() {
  // Custom gallery enhancements
  const galleries = document.querySelectorAll('.slideshow-gallery')

  galleries.forEach(gallery => {
    // Add custom functionality
    gallery.addEventListener('gallery:imageChanged', function(event) {
      console.log('Image changed to:', event.detail.index)
    })
  })
})
```

## 🔧 Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/d-oit/hinode-mod-slideshow-gallery.git
cd hinode-mod-slideshow-gallery

# Install dependencies
npm install

# Start development server
npm run start
```

### Project Structure

```
hinode-mod-slideshow-gallery/
├── config/_default/          # Module configuration
├── layouts/
│   ├── _shortcodes/          # slideshow-gallery.html
│   └── partials/            # Reusable components
├── assets/
│   ├── scss/                # Gallery stylesheets
│   └── js/modules/          # JavaScript functionality
├── i18n/                    # Internationalization files
├── data/                    # Module data and defaults
├── tests/                   # Playwright E2E tests
└── exampleSite/             # Demo and documentation site
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start development server |
| `npm run build` | Build production site |
| `npm run test:playwright` | Run E2E tests |
| `npm run clean` | Clean build artifacts |
| `npm run mod:update` | Update Hugo modules |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test:playwright

# Run specific test
npx playwright test tests/gallery.spec.js

# Run tests in UI mode
npx playwright test --ui
```

### Test Structure

```
tests/
├── gallery.spec.js          # Gallery grid/masonry layouts
├── slideshow.spec.js        # Slideshow functionality
├── lightbox.spec.js         # Modal overlay behavior
├── keyboard.spec.js         # Keyboard navigation
├── accessibility.spec.js    # WCAG 2.1 compliance
└── utils/
    └── testdata-builder.js  # Test data generation
```

### Writing Tests

```javascript
import { test, expect } from '@playwright/test'
import { GalleryTestBuilder } from './utils/testdata-builder.js'

test('gallery displays images correctly', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('test-gallery')
    .with_images(3)
    .build()

  await expect(page.locator('.slideshow-thumbnail-image')).toHaveCount(3)
})
```

## 🌐 Internationalization

### Supported Languages

- English (`en`)
- German (`de`)

### Adding Translations

1. **Add to i18n files:**

   `i18n/en.toml`:
   ```toml
   [gallery.next_slide]
   other = "Next slide"

   [gallery.previous_slide]
   other = "Previous slide"
   ```

   `i18n/de.toml`:
   ```toml
   [gallery.next_slide]
   other = "Nächste Folie"

   [gallery.previous_slide]
   other = "Vorherige Folie"
   ```

2. **Use in templates:**
   ```html
   <button>{{ i18n "gallery.next_slide" }}</button>
   ```

### Contributing Translations

To add support for a new language:

1. Create `i18n/[language-code].toml`
2. Translate all existing keys
3. Test the translations
4. Submit a pull request

## ♿ Accessibility

### WCAG 2.1 AA Compliance

The module implements comprehensive accessibility features:

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: Meets WCAG contrast requirements
- **Touch Targets**: Minimum 44px touch targets for mobile

### Accessibility Features

- ARIA labels for screen readers
- Keyboard event handlers for navigation
- Focus trapping in modal dialogs
- High contrast support
- Reduced motion preferences

## 🔒 Security

### Content Security Policy

Configure CSP headers for enhanced security:

```toml
# config/_default/params.toml
[security]
  [security.csp]
    default-src = ["'self'"]
    script-src = ["'self'", "'unsafe-inline'"]
    style-src = ["'self'", "'unsafe-inline'"]
    img-src = ["'self'", "data:", "https:"]
```

### Input Validation

The module validates all user inputs:

- Image paths are sanitized
- HTML content is escaped
- File uploads are restricted to safe types
- Parameters are validated against allowlists

## 📊 Performance

### Optimization Features

- **Lazy Loading**: Images load as they enter the viewport
- **Image Optimization**: Automatic resizing and format conversion
- **Bundle Minification**: Minified CSS and JavaScript
- **Caching**: Proper cache headers and versioning
- **Critical CSS**: Inlined critical styles

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Bundle Size**: < 500KB (gzipped)

## 🐛 Troubleshooting

### Common Issues

#### Gallery Not Displaying
**Problem**: Images don't appear in the gallery.

**Solutions**:
1. Check that images are in the `resources` array
2. Verify image paths are correct
3. Ensure Hugo can process the images
4. Check browser console for errors

#### Lightbox Not Opening
**Problem**: Clicking thumbnails doesn't open the lightbox.

**Solutions**:
1. Verify JavaScript is loading
2. Check for JavaScript errors in console
3. Ensure proper event handlers are attached
4. Test on different browsers

#### Styling Issues
**Problem**: Gallery doesn't match site theme.

**Solutions**:
1. Check CSS loading order
2. Verify theme compatibility
3. Override styles in your site's CSS
4. Check for CSS conflicts

### Debug Mode

Enable debug logging:

```javascript
// Add to your site's JavaScript
window.galleryDebug = true
```

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/d-oit/hinode-mod-slideshow-gallery/issues)
- **Discussions**: [GitHub Discussions](https://github.com/d-oit/hinode-mod-slideshow-gallery/discussions)
- **Documentation**: [Hinode Docs](https://gethinode.com/docs/)

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests**: `npm run test:playwright`
6. **Commit changes**: `npx cz`
7. **Push and create PR**

### Code Standards

- Follow conventional commits
- Write comprehensive tests
- Update documentation
- Ensure accessibility compliance
- Test across browsers

### Pull Request Process

1. **Title**: Use conventional commit format
2. **Description**: Explain changes and rationale
3. **Tests**: Include test coverage for changes
4. **Documentation**: Update docs if needed
5. **Review**: Address reviewer feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hinode](https://gethinode.com) - The Hugo theme framework
- [Bootstrap](https://getbootstrap.com) - CSS framework
- [Playwright](https://playwright.dev) - Testing framework
- [Hugo](https://gohugo.io) - Static site generator

## 📞 Support

- **Documentation**: [Full Documentation](https://gethinode.com/docs/)
- **Issues**: [Report Bugs](https://github.com/d-oit/hinode-mod-slideshow-gallery/issues)
- **Discussions**: [Community Support](https://github.com/d-oit/hinode-mod-slideshow-gallery/discussions)
- **Email**: [Contact Maintainers](mailto:support@example.com)
```

## API Reference

### Shortcode API

#### slideshow-gallery

Renders a responsive slideshow gallery with lightbox functionality.

**Parameters:**
- `ratio` (string, optional): Image aspect ratio. Default: `"auto"`
- `ratioThumbnail` (string, optional): Thumbnail aspect ratio. Default: `"auto"`
- `loading` (string, optional): Image loading strategy. Options: `"lazy"`, `"eager"`. Default: `"lazy"`

**Context Requirements:**
- Page must have `resources` array in frontmatter
- Each resource should have `src` and optional `title`, `params.description`, `params.cssClass`

**Example:**
```markdown
{{< slideshow-gallery ratio="16x9" >}}
```

### JavaScript API

#### Events

The module emits custom events for integration:

```javascript
// Listen for gallery events
document.addEventListener('gallery:initialized', (event) => {
  console.log('Gallery initialized:', event.detail.galleryId)
})

document.addEventListener('gallery:imageChanged', (event) => {
  console.log('Image changed to index:', event.detail.index)
})

document.addEventListener('gallery:lightboxOpened', (event) => {
  console.log('Lightbox opened')
})

document.addEventListener('gallery:lightboxClosed', (event) => {
  console.log('Lightbox closed')
})
```

#### Methods

Access gallery instances programmatically:

```javascript
// Get all gallery instances
const galleries = window.slideshowGalleries

galleries.forEach(gallery => {
  // Control gallery programmatically
  gallery.next()     // Go to next image
  gallery.previous() // Go to previous image
  gallery.goTo(2)    // Go to specific image
  gallery.play()     // Start auto-play
  gallery.pause()    // Pause auto-play
})
```

### CSS API

#### CSS Variables

Customize appearance with CSS variables:

```scss
:root {
  --gallery-transition-duration: 0.3s;
  --gallery-primary-color: #007bff;
  --gallery-background-color: #ffffff;
  --gallery-border-radius: 0.25rem;
  --gallery-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
```

#### CSS Classes

Available classes for customization:

- `.slideshow-gallery` - Main gallery container
- `.slideshow-gallery__lightbox` - Lightbox viewport
- `.slideshow-gallery__thumbnails` - Thumbnail strip
- `.slideshow-gallery--fullscreen` - Fullscreen modifier
- `.slideshow-gallery__thumbnail--active` - Active thumbnail

### Configuration API

#### Module Configuration

Configure module behavior in `params.toml`:

```toml
[modules]
  [modules.slideshow-gallery]
    integration = "optional"  # Integration mode
    state = "async"          # Loading state
    localize = true          # Enable i18n

[params]
  [params.slideshow]
    autoplay = true          # Enable auto-play
    interval = 3000          # Auto-play interval (ms)
    keyboard = true          # Enable keyboard navigation
    touch = true            # Enable touch gestures
```

## Migration Guide

### Upgrading from v1.x to v2.x

#### Breaking Changes
1. **Configuration Structure**: Module configuration moved to `params.toml`
2. **Shortcode Parameters**: `autoplay` parameter removed (use module config)
3. **CSS Classes**: Some utility classes renamed for consistency

#### Migration Steps
1. Update module configuration in `params.toml`
2. Review and update custom CSS
3. Test gallery functionality
4. Update any custom JavaScript integrations

#### New Features in v2.x
- Enhanced accessibility support
- Improved touch gesture handling
- Better performance optimizations
- Extended i18n support

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## Roadmap

### Planned Features
- [ ] Video support in galleries
- [ ] Advanced transition effects
- [ ] Gallery sharing functionality
- [ ] Image editing tools
- [ ] Offline viewing support

### Contributing to Roadmap
Feature requests and suggestions are welcome via [GitHub Issues](https://github.com/d-oit/hinode-mod-slideshow-gallery/issues).

## Community

### Getting Involved
- **Contribute Code**: Submit pull requests
- **Report Issues**: Use GitHub issues
- **Improve Docs**: Update documentation
- **Share Examples**: Showcase your implementations

### Code of Conduct
This project follows a code of conduct to ensure a welcoming environment for all contributors.

### Recognition
Contributors are recognized in [CONTRIBUTORS.md](CONTRIBUTORS.md) and release notes.