# Quality Assurance Process

## Testing Strategy Overview

### Test Pyramid Structure
```
End-to-End Tests (Playwright) - 20%
├── User Journey Tests
├── Critical Path Tests
└── Cross-browser Tests

Integration Tests - 30%
├── Component Integration
├── Module Integration
└── API Integration

Unit Tests - 50%
├── Utility Functions
├── Component Logic
└── Business Rules
```

### Quality Gates
All changes must pass these quality gates before merging:

#### ✅ Code Quality Gate
- **ESLint**: No linting errors
- **TypeScript**: Type checking passes (if applicable)
- **Code formatting**: Consistent style
- **Security scanning**: No high-severity vulnerabilities

#### ✅ Build Quality Gate
- **Hugo build**: Compiles without errors
- **Asset compilation**: SCSS/JS processing succeeds
- **Module validation**: Hugo module integrity verified
- **Bundle size**: Within acceptable limits

#### ✅ Test Quality Gate
- **Unit tests**: All pass (if implemented)
- **E2E tests**: All Playwright tests pass
- **Coverage**: Minimum coverage thresholds met
- **Performance**: No performance regressions

#### ✅ Accessibility Quality Gate
- **WCAG 2.1 AA**: Automated accessibility checks pass
- **Keyboard navigation**: All interactive elements accessible
- **Screen reader**: Proper ARIA labels and semantic HTML
- **Color contrast**: Minimum contrast ratios maintained

#### ✅ Performance Quality Gate
- **Lighthouse scores**: Performance >90, Accessibility 100
- **Load time**: <3 seconds for initial page load
- **Bundle size**: <500KB total (gzipped)
- **Core Web Vitals**: All metrics pass

## Automated Testing Pipeline

### Pre-commit Hooks (Husky)
```javascript
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

```javascript
// package.json
"lint-staged": {
  "*.{js,ts}": ["eslint --fix", "prettier --write"],
  "*.{scss,css}": ["stylelint --fix", "prettier --write"],
  "*.md": ["markdownlint --fix", "prettier --write"]
}
```

### Commit Message Validation (commitlint)
```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'
    ]],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72]
  }
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Build project
        run: npm run build

      - name: Run E2E tests
        run: npm run test:playwright

      - name: Accessibility audit
        run: npm run accessibility

      - name: Performance audit
        run: npm run lighthouse
```

## Manual Testing Checklist

### Functional Testing
- [ ] Gallery displays images correctly
- [ ] Slideshow navigation works (next/previous)
- [ ] Lightbox opens and closes properly
- [ ] Thumbnail selection functions
- [ ] Auto-play starts/stops correctly
- [ ] Keyboard navigation works
- [ ] Touch gestures work on mobile

### Responsive Testing
- [ ] Mobile (320px - 767px): Single column, touch navigation
- [ ] Tablet (768px - 991px): Grid layout, hybrid navigation
- [ ] Desktop (992px+): Full grid, mouse/keyboard navigation
- [ ] Orientation changes handled correctly
- [ ] High DPI displays render properly

### Accessibility Testing
- [ ] Keyboard-only navigation possible
- [ ] Screen reader announces content correctly
- [ ] Focus indicators visible and logical
- [ ] Color contrast meets WCAG standards
- [ ] Alt text provided for all images
- [ ] Semantic HTML structure used

### Browser Compatibility
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)
- [ ] Mobile Safari (iOS latest)
- [ ] Chrome Mobile (Android latest)

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Time to interactive < 5 seconds
- [ ] Lighthouse performance score > 90
- [ ] Bundle size < 500KB (gzipped)
- [ ] No memory leaks detected

## Bug Tracking and Reporting

### Bug Report Template
```markdown
## Bug Report

**Title:** [Clear, descriptive title]

**Environment:**
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/macOS/Linux]
- Device: [Desktop/Mobile/Tablet]
- Hugo version: [0.148.0+]
- Module version: [2.1.0]

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
[Describe what should happen]

**Actual Behavior:**
[Describe what actually happens]

**Screenshots:**
[Attach screenshots if applicable]

**Additional Context:**
[Any additional information about the problem]
```

### Severity Classification
- **Critical**: Breaks core functionality, no workaround
- **Major**: Significant feature broken, workaround exists
- **Minor**: Small issue, doesn't affect core functionality
- **Trivial**: Cosmetic issue, low impact

### Test Case Management
```javascript
// Test case structure
const testCase = {
  id: 'TC_GALLERY_001',
  title: 'Gallery displays images in grid layout',
  preconditions: ['Gallery has 6+ images', 'Viewport width > 992px'],
  steps: [
    'Navigate to gallery page',
    'Verify images display in grid layout',
    'Check responsive behavior on resize'
  ],
  expectedResult: 'Images display in responsive grid',
  priority: 'High',
  automationStatus: 'Automated'
}
```

## Performance Monitoring

### Key Metrics
- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Bundle size**: < 500KB (gzipped)

### Performance Budget
```javascript
// performance-budget.json
{
  "budgets": [
    {
      "path": "/",
      "resourceSizes": [
        {
          "resourceType": "total",
          "budget": 500000
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "third-party",
          "budget": 5
        }
      ],
      "timings": [
        {
          "metric": "interactive",
          "budget": 5000
        }
      ]
    }
  ]
}
```

### Lighthouse CI
```yaml
# lighthouse-ci.yml
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start",
      "url": ["http://localhost:1313/gallery/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1.0}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

## Accessibility Auditing

### Automated Tools
- **axe-core**: Integrated into Playwright tests
- **Lighthouse**: Accessibility category scoring
- **WAVE**: Web accessibility evaluation tool
- **Color Contrast Analyzer**: Automated contrast checking

### Manual Accessibility Testing
```javascript
// Accessibility test helpers
async function testKeyboardNavigation(page) {
  // Test tab order
  await page.keyboard.press('Tab')
  let focusedElement = await page.$(':focus')
  expect(focusedElement).toBeTruthy()

  // Test keyboard interactions
  await page.keyboard.press('Enter')
  // Verify expected behavior
}

async function testScreenReader(page) {
  // Check ARIA labels
  const ariaLabels = await page.$$('[aria-label], [aria-labelledby]')
  expect(ariaLabels.length).toBeGreaterThan(0)

  // Check semantic structure
  const headings = await page.$$('h1, h2, h3, h4, h5, h6')
  expect(headings.length).toBeGreaterThan(0)
}
```

### WCAG Compliance Checklist
- [ ] **1.1.1 Non-text Content**: All images have alt text
- [ ] **1.3.1 Info and Relationships**: Semantic HTML used
- [ ] **1.4.3 Contrast (Minimum)**: 4.5:1 contrast ratio
- [ ] **1.4.11 Non-text Contrast**: UI elements have sufficient contrast
- [ ] **2.1.1 Keyboard**: All functionality available via keyboard
- [ ] **2.1.2 No Keyboard Trap**: No keyboard traps
- [ ] **2.4.2 Page Titled**: Pages have descriptive titles
- [ ] **2.4.6 Headings and Labels**: Clear headings and labels
- [ ] **3.3.2 Labels or Instructions**: Form elements labeled
- [ ] **4.1.2 Name, Role, Value**: ARIA properties correct

## Regression Testing

### Critical Path Tests
Always run these tests before releases:
1. Gallery initialization and display
2. Slideshow navigation (next/previous/first/last)
3. Lightbox open/close functionality
4. Keyboard navigation in all modes
5. Touch gesture support on mobile
6. Auto-play start/stop/pause
7. Responsive behavior across breakpoints
8. Accessibility compliance
9. Performance benchmarks

### Automated Regression Suite
```javascript
// regression-suite.spec.js
test.describe('Critical Path Regression Tests', () => {
  test('complete user journey works end-to-end', async ({ page }) => {
    // Navigate to gallery
    await page.goto('/gallery/')

    // Verify gallery loads
    await expect(page.locator('.slideshow-gallery')).toBeVisible()

    // Test slideshow functionality
    await page.click('.slideshow-thumbnail-image')
    await expect(page.locator('.lightbox-viewport')).toBeVisible()

    // Test navigation
    await page.click('.slideshow-next-button')
    await expect(page.locator('.lightbox-current-index')).toContainText('2 /')

    // Test keyboard navigation
    await page.keyboard.press('Escape')
    await expect(page.locator('.lightbox-viewport')).not.toBeVisible()
  })
})
```

## Release Process

### Pre-release Checklist
- [ ] All automated tests pass
- [ ] Manual testing completed
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Cross-browser testing completed
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped correctly

### Post-release Validation
- [ ] Module installs correctly in test projects
- [ ] No runtime errors in production
- [ ] Performance monitoring active
- [ ] User feedback monitoring
- [ ] Rollback plan ready if needed

### Continuous Improvement
- Review test coverage quarterly
- Update testing frameworks annually
- Monitor performance trends
- Collect user feedback for improvements
- Update accessibility standards as they evolve