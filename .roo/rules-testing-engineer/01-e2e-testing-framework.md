# E2E Testing Framework

## Playwright Configuration

### Base Configuration
```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:1313',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { devices['iPhone 12'] },
    },
  ],
})
```

### Test Structure
```
tests/
├── gallery.spec.js          # Gallery grid/masonry layouts
├── slideshow.spec.js        # Slideshow functionality
├── lightbox.spec.js         # Modal overlay behavior
├── keyboard.spec.js         # Keyboard navigation
├── accessibility.spec.js    # WCAG 2.1 compliance
├── responsive.spec.js       # Responsive behavior
└── utils/
    └── testdata-builder.js  # Test data generation
```

## Test Data Management

### GalleryTestBuilder Pattern
```javascript
export class GalleryTestBuilder {
  constructor() {
    this.gallery = {
      title: 'Test Gallery',
      resources: []
    }
  }

  with_gallery(name, options = {}) {
    this.gallery.name = name
    this.gallery.options = options
    return this
  }

  with_images(count, options = {}) {
    for (let i = 0; i < count; i++) {
      this.gallery.resources.push({
        src: `/img/test-image-${i + 1}.jpg`,
        title: `Test Image ${i + 1}`,
        params: {
          description: `Description for test image ${i + 1}`,
          ...options
        }
      })
    }
    return this
  }

  async build() {
    // Create test page with gallery
    const page = await createTestPage()
    await page.setContent(this.generateMarkdown())
    return page
  }

  generateMarkdown() {
    const frontmatter = {
      title: this.gallery.title,
      resources: this.gallery.resources
    }

    return `---
${Object.entries(frontmatter).map(([key, value]) =>
  `${key}: ${JSON.stringify(value, null, 2)}`
).join('\n')}
---

{{< slideshow-gallery >}}
`
  }
}
```

## Test Categories

### Gallery Layout Tests
```javascript
test('gallery displays images in grid layout', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('grid-test')
    .with_images(6)
    .build()

  await expect(page.locator('.slideshow-thumbnail-row')).toBeVisible()
  await expect(page.locator('.slideshow-thumbnail-image')).toHaveCount(6)
})

test('gallery handles empty state gracefully', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('empty-test')
    .with_images(0)
    .build()

  await expect(page.locator('.slideshow-gallery')).toBeVisible()
  await expect(page.locator('.slideshow-thumbnail-image')).toHaveCount(0)
})
```

### Slideshow Functionality Tests
```javascript
test('slideshow navigation works correctly', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('slideshow-test', { autoplay: false })
    .with_images(3)
    .build()

  // Test initial state
  await expect(page.locator('.lightbox-current-index')).toContainText('1 / 3')

  // Test next navigation
  await page.click('.slideshow-next-button')
  await expect(page.locator('.lightbox-current-index')).toContainText('2 / 3')

  // Test previous navigation
  await page.click('.slideshow-prev-button')
  await expect(page.locator('.lightbox-current-index')).toContainText('1 / 3')
})
```

### Lightbox Modal Tests
```javascript
test('lightbox opens and displays image correctly', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('lightbox-test')
    .with_images(1)
    .build()

  // Click thumbnail to open lightbox
  await page.click('.slideshow-thumbnail-image')

  // Verify lightbox is open
  await expect(page.locator('.lightbox-viewport')).toBeVisible()
  await expect(page.locator('.lightbox-image')).toBeVisible()
})

test('lightbox closes with escape key', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('lightbox-test')
    .with_images(1)
    .build()

  await page.click('.slideshow-thumbnail-image')
  await expect(page.locator('.lightbox-viewport')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.locator('.lightbox-viewport')).not.toBeVisible()
})
```

### Keyboard Navigation Tests
```javascript
test('keyboard navigation works in lightbox', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('keyboard-test')
    .with_images(3)
    .build()

  await page.click('.slideshow-thumbnail-image')

  // Test arrow key navigation
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('.lightbox-current-index')).toContainText('2 / 3')

  await page.keyboard.press('ArrowLeft')
  await expect(page.locator('.lightbox-current-index')).toContainText('1 / 3')
})
```

### Accessibility Tests
```javascript
test('gallery meets WCAG accessibility standards', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('accessibility-test')
    .with_images(2)
    .build()

  // Check for proper ARIA labels
  await expect(page.locator('[aria-label]')).toBeVisible()

  // Verify keyboard focus indicators
  await page.keyboard.press('Tab')
  const focusedElement = page.locator(':focus')
  await expect(focusedElement).toHaveCSS('outline', /solid/)

  // Test screen reader content
  const altText = page.locator('img[alt]')
  await expect(altText).toHaveAttribute('alt', /.+/)
})
```

### Responsive Tests
```javascript
test('gallery adapts to mobile viewport', async ({ page, isMobile }) => {
  if (!isMobile) {
    await page.setViewportSize({ width: 375, height: 667 })
  }

  const gallery = await new GalleryTestBuilder()
    .with_gallery('mobile-test')
    .with_images(4)
    .build()

  // Verify mobile-specific behavior
  await expect(page.locator('.slideshow-gallery')).toHaveCSS('padding', '0px')

  // Test touch interactions if supported
  if (page.touch) {
    await page.touch.start()
    await page.touch.move(100, 0)
    await page.touch.end()
  }
})
```

## Test Utilities

### Page Object Models
```javascript
export class GalleryPage {
  constructor(page) {
    this.page = page
  }

  async openLightbox(index = 0) {
    await this.page.click(`.slideshow-thumbnail-image:nth-child(${index + 1})`)
  }

  async navigateNext() {
    await this.page.click('.slideshow-next-button')
  }

  async navigatePrevious() {
    await this.page.click('.slideshow-prev-button')
  }

  async getCurrentIndex() {
    return await this.page.locator('.lightbox-current-index').textContent()
  }

  async isLightboxOpen() {
    return await this.page.locator('.lightbox-viewport').isVisible()
  }
}
```

### Custom Matchers
```javascript
expect.extend({
  async toBeAccessible(received) {
    const axe = require('@axe-core/playwright')
    const results = await axe(received)
    const pass = results.violations.length === 0

    return {
      pass,
      message: () => pass
        ? 'Page is accessible'
        : `Accessibility violations: ${results.violations.map(v => v.id).join(', ')}`
    }
  }
})
```

## Performance Testing

### Load Time Tests
```javascript
test('gallery loads within performance budget', async ({ page }) => {
  const startTime = Date.now()

  const gallery = await new GalleryTestBuilder()
    .with_gallery('performance-test')
    .with_images(10)
    .build()

  await page.waitForLoadState('networkidle')
  const loadTime = Date.now() - startTime

  expect(loadTime).toBeLessThan(3000) // 3 second budget
})
```

### Animation Performance Tests
```javascript
test('lightbox transitions are smooth', async ({ page }) => {
  const gallery = await new GalleryTestBuilder()
    .with_gallery('animation-test')
    .with_images(2)
    .build()

  await page.click('.slideshow-thumbnail-image')

  // Measure transition performance
  const transitionPromise = page.evaluate(() => {
    return new Promise(resolve => {
      const image = document.querySelector('.lightbox-image')
      const startTime = performance.now()

      image.addEventListener('transitionend', () => {
        resolve(performance.now() - startTime)
      })

      // Trigger transition
      image.style.opacity = '0'
    })
  })

  const duration = await transitionPromise
  expect(duration).toBeLessThan(100) // Smooth 60fps transition
})
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test:playwright
        env:
          CI: true
```

### Test Reporting
```javascript
// playwright.config.ts
reporter: process.env.CI
  ? [['github'], ['html', { open: 'never' }]]
  : 'html'
```

## Debugging and Troubleshooting

### Visual Debugging
```javascript
test('debug lightbox behavior', async ({ page }) => {
  await page.pause() // Interactive debugging

  const gallery = await new GalleryTestBuilder()
    .with_gallery('debug-test')
    .with_images(3)
    .build()

  // Take screenshot for visual verification
  await page.screenshot({ path: 'debug-lightbox.png' })
})
```

### Network Monitoring
```javascript
test('verify image loading', async ({ page }) => {
  const requests = []

  page.on('request', request => {
    if (request.resourceType() === 'image') {
      requests.push(request.url())
    }
  })

  const gallery = await new GalleryTestBuilder()
    .with_gallery('network-test')
    .with_images(5)
    .build()

  await page.waitForLoadState('networkidle')
  expect(requests.length).toBeGreaterThan(0)
})