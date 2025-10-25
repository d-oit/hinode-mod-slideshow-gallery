# Frontend Development Principles

## Bootstrap 5 Integration

### Component Usage
- Leverage Bootstrap 5 utilities and components for consistency
- Customize with SCSS variables and mixins rather than overriding CSS
- Maintain responsive grid system integrity
- Use Bootstrap's JavaScript plugins when appropriate

### Customization Approach
```scss
// Custom variables (preferred)
$primary: #007bff;
$gallery-transition-duration: 0.3s;

// Mixin usage
.gallery-item {
  @include transition(all $gallery-transition-duration ease);
  @include border-radius($border-radius);
}
```

## Responsive Design Standards

### Mobile-First Approach
- Design for mobile devices first, then enhance for larger screens
- Use progressive enhancement techniques
- Ensure touch-friendly interactions (44px minimum touch targets)
- Test breakpoints: xs (0), sm (576px), md (768px), lg (992px), xl (1200px)

### Breakpoint Strategy
```scss
// Mobile-first responsive design
.slideshow-gallery {
  // Base mobile styles

  @include media-breakpoint-up(sm) {
    // Small tablet styles
  }

  @include media-breakpoint-up(md) {
    // Desktop styles
  }
}
```

## Accessibility Standards (WCAG 2.1 AA)

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Provide visible focus indicators
- Maintain logical tab order
- Support standard keyboard shortcuts

### Screen Reader Support
- Use semantic HTML elements
- Provide proper ARIA labels and roles
- Include alt text for images
- Implement live regions for dynamic content

### Color and Contrast
- Maintain 4.5:1 contrast ratio for normal text
- Ensure 3:1 contrast for large text
- Don't rely on color alone for meaning
- Support high contrast mode

## Performance Optimization

### CSS Performance
- Minimize repaints and reflows
- Use hardware-accelerated transforms
- Optimize selectors (avoid universal selectors)
- Implement critical CSS inlining

### JavaScript Performance
- Use event delegation for dynamic elements
- Debounce resize and scroll handlers
- Minimize DOM manipulation
- Implement efficient animation loops

### Image Optimization
- Implement lazy loading for off-screen images
- Use responsive image sources with srcset
- Optimize image formats (WebP with fallbacks)
- Proper aspect ratio handling to prevent layout shift

## Component Architecture

### BEM Methodology
```scss
// Block
.slideshow-gallery {
  // Base styles
}

// Elements
.slideshow-gallery__lightbox {
  // Lightbox specific styles
}

.slideshow-gallery__thumbnails {
  // Thumbnail strip styles
}

// Modifiers
.slideshow-gallery--fullscreen {
  // Fullscreen variant
}

.slideshow-gallery__thumbnail--active {
  // Active thumbnail state
}
```

### State Management
- Use CSS classes for state indication
- Implement smooth transitions between states
- Provide visual feedback for user interactions
- Handle loading and error states gracefully

## JavaScript Architecture

### ES6+ Standards
- Use const/let for variable declarations
- Implement arrow functions and template literals
- Leverage destructuring and spread operators
- Write clean, readable code without semicolons

### Event Handling
- Use event delegation for performance
- Implement touch gesture recognition
- Support both mouse and keyboard interactions
- Provide graceful degradation for older browsers

### Module Organization
```javascript
// ES6 module structure
export class SlideshowGallery {
  constructor(element, options = {}) {
    this.element = element
    this.options = { ...defaultOptions, ...options }
    this.init()
  }

  init() {
    this.bindEvents()
    this.setupAccessibility()
  }
}
```

## Cross-Browser Compatibility

### Browser Support Matrix
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers
- Progressive enhancement approach

### Testing Strategy
- Test on actual devices and browsers
- Use browser developer tools for debugging
- Implement feature detection
- Provide fallbacks for unsupported features

## Animation and Transitions

### CSS Transitions
- Use transform and opacity for hardware acceleration
- Implement smooth transitions between states
- Respect user preferences for reduced motion
- Optimize animation performance

### JavaScript Animations
- Use requestAnimationFrame for smooth animations
- Implement easing functions
- Handle animation cancellation
- Provide pause/play controls for accessibility

## User Experience Patterns

### Interaction Design
- Provide clear visual feedback for all interactions
- Implement intuitive navigation patterns
- Support common gestures (swipe, pinch)
- Maintain consistency with platform conventions

### Loading States
- Show loading indicators for async operations
- Implement skeleton screens for better perceived performance
- Handle error states gracefully
- Provide retry mechanisms when appropriate

### Error Handling
- Display user-friendly error messages
- Provide recovery options
- Log errors for debugging
- Maintain functionality even when components fail