# Slideshow Gallery Domain Knowledge

## Module Overview

This Hugo module provides slideshow and gallery functionality for Hinode-based websites. Built on Bootstrap 5, it offers responsive image galleries with slideshow capabilities, lightbox support, and keyboard/touch navigation.

## Key Features

- **Responsive grid and slideshow layouts**: Adapts to different screen sizes
- **Lightbox modal for full-screen viewing**: Immersive image viewing experience
- **Keyboard navigation (arrows, Esc)**: Full keyboard accessibility
- **Touch/swipe support for mobile**: Native mobile interactions
- **Thumbnail navigation strip**: Quick image selection
- **Auto-play with configurable intervals**: Automated slideshow presentation
- **i18n support (English, German)**: Multi-language user interface

## Architecture

### Technology Stack
- **Hinode Hugo module**: Uses Hugo mounts for clean integration
- **Bootstrap 5**: Responsive styling and component foundation
- **Custom SCSS**: Gallery-specific styling and theming
- **Vanilla JavaScript**: No jQuery dependency, modern ES6+ syntax
- **Playwright**: End-to-end testing framework

### File Structure
```
hinode-mod-slideshow-gallery/
├── config/_default/       # Module configuration
│   └── params.toml        # Module parameters and settings
├── layouts/
│   ├── _shortcodes/       # slideshow-gallery.html shortcode
│   └── partials/         # Reusable template components
├── assets/
│   ├── scss/             # Gallery-specific stylesheets
│   └── js/modules/       # JavaScript functionality
├── i18n/                 # UI strings (en.toml, de.toml)
├── data/                 # Default configuration data
├── tests/                # Playwright E2E tests
└── exampleSite/          # Demo and development environment
```

## Shortcode Usage

### Basic Usage
```markdown
{{< slideshow-gallery >}}
```

### Configuration Parameters
- `ratio`: Image aspect ratio (default: "auto")
- `ratioThumbnail`: Thumbnail aspect ratio (default: "auto")
- `loading`: Image loading strategy (default: "lazy")

### Content Structure
Images are defined in page frontmatter under `resources`:
```yaml
resources:
  - src: "img/coffee.jpg"
    title: "Example caption 1"
    params:
      description: "Description for coffee image"
      cssClass: "size-large"
  - src: "img/dunes.jpg"
    title: "Example caption 2"
    params:
      description: "Description for dunes image"
```

## Component Architecture

### Lightbox Viewport
- Main slideshow container with navigation controls
- Full-screen modal overlay for focused viewing
- Smooth transitions between images
- Current index and title display

### Thumbnail Navigation
- Horizontal scrollable thumbnail strip
- Visual feedback for active image
- Click-to-navigate functionality
- Responsive sizing based on screen width

### Navigation Controls
- Previous/Next arrow buttons
- Fullscreen toggle button
- Keyboard event handlers (arrow keys, Esc)
- Touch gesture support (swipe left/right)

### Auto-play Functionality
- Configurable interval timing
- Pause on user interaction
- Visual indicators for play/pause state
- Accessibility-compliant controls

## JavaScript Architecture

### Module Structure
- ES6 modules for clean code organization
- Event-driven architecture
- Progressive enhancement approach
- Error handling and graceful degradation

### Key Classes
- `SlideshowGallery`: Main controller class
- `LightboxController`: Modal management
- `NavigationController`: User interaction handling
- `AutoPlayController`: Timed slideshow functionality

### Event Handling
- Event delegation for performance
- Touch gesture recognition
- Keyboard accessibility
- Custom event dispatching

## SCSS Architecture

### Bootstrap Integration
- Leverages Bootstrap 5 utilities and mixins
- Custom variables for theming
- Responsive breakpoint system
- Component-specific overrides

### BEM Methodology
- Block: `.slideshow-gallery`
- Elements: `.slideshow-gallery__lightbox`, `.slideshow-gallery__thumbnails`
- Modifiers: `.slideshow-gallery--fullscreen`, `.slideshow-gallery--autoplay`

### Responsive Design
- Mobile-first approach
- Touch-friendly interaction areas (44px minimum)
- Adaptive layout for different screen sizes
- Optimized thumbnail sizing

## Accessibility (WCAG 2.1)

### Keyboard Navigation
- Tab order through interactive elements
- Arrow keys for image navigation
- Enter/Space for activation
- Escape to close lightbox

### Screen Reader Support
- Proper ARIA labels and roles
- Image alt text and descriptions
- Live regions for dynamic content
- Semantic HTML structure

### Focus Management
- Visible focus indicators
- Logical tab order
- Focus trapping in modal
- Focus restoration on modal close

## Testing Strategy

### E2E Test Coverage
- Gallery grid and masonry layouts
- Slideshow navigation functionality
- Lightbox modal behavior
- Keyboard accessibility
- Touch gesture support
- Auto-play timing
- Responsive breakpoints

### Test Data Management
- `GalleryTestBuilder` for consistent test setup
- Ephemeral test galleries
- Configurable test parameters
- Cleanup and isolation

## Performance Considerations

### Image Optimization
- Lazy loading for off-screen images
- Responsive image sources
- WebP format support where available
- Proper aspect ratio handling

### JavaScript Performance
- Minimal DOM manipulation
- Event delegation over individual listeners
- Debounced resize handlers
- Efficient animation loops

### CSS Performance
- Minimal repaints and reflows
- Hardware-accelerated transforms
- Optimized selectors
- Critical CSS inlining

## Integration Patterns

### Hinode Theme Integration
- Compatible with Hinode's color schemes
- Respects theme configuration
- Customizable via CSS variables
- Theme-aware component styling

### Module Configuration
```toml
[modules]
    [modules.slideshow-gallery]
        integration = "optional"
        state = "async"
        localize = true
```

### Content Management
- Works with any Hugo content source
- Supports page bundles and global resources
- Compatible with Hugo's image processing
- Flexible metadata structure