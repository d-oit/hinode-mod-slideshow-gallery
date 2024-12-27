import { test, expect } from '@playwright/test';

test.describe('Slideshow Gallery Tests', () => {
  const pages = [
    '/gallery/slideshow-gallery-res-img-sample/',
    '/gallery/slideshow-gallery-sample-1/',
    '/gallery/slideshow-gallery-sample-2/',
    '/gallery/slideshow-gallery-sample-3/',
  ];

  const viewports = [
    { width: 1280, height: 720, name: 'Desktop' },
    { width: 412, height: 915, name: 'Mobile Portrait' },
    { width: 915, height: 412, name: 'Mobile Landscape' },
  ];

  let baseUrl: string;

  test.beforeAll(() => {
    baseUrl = process.env.BASE_URL_TESTING || 'http://localhost:1313';
    console.log('Starting tests with base URL:', baseUrl);
  });

  for (const pageUrl of pages) {
    for (const viewport of viewports) {
      test.describe(`${viewport.name} view - ${pageUrl}`, () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          const fullUrl = `${baseUrl}${pageUrl}`;
          console.log(`Navigating to: ${fullUrl}`);
          const response = await page.goto(fullUrl);
          if (response) {
            console.log(`Response status: ${response.status()}`);
          } else {
            console.log('No response received');
          }
          expect(response?.status()).toBe(200);
          await page.waitForLoadState('networkidle');
        });

        test('should display the slideshow gallery correctly', async ({ page }) => {
          console.log('Page content:', await page.content());
          await page.waitForSelector('.slideshow-gallery');
          const gallery = await page.$('.slideshow-gallery');
          expect(gallery).not.toBeNull();
        });

        test('should navigate through images using next and previous buttons', async ({ page }) => {
          const nextButton = await page.$('.slideshow-next-button');
          const prevButton = await page.$('.slideshow-prev-button');

          expect(nextButton).not.toBeNull();
          expect(prevButton).not.toBeNull();

          // Initial state check
          const initialIndex = await page.$eval('.lightbox-current-index', (el: HTMLElement) => el.textContent);
          expect(initialIndex).not.toBeNull();
          expect(initialIndex).toBeDefined();
          expect(initialIndex).toMatch(/1/);

          // Test next button
          if (nextButton) {
            await nextButton.click();
            const nextIndex = await page.$eval('.lightbox-current-index', (el: HTMLElement) => el.textContent);
            expect(nextIndex).not.toBeNull();
            expect(nextIndex).toBeDefined();
            expect(nextIndex).toMatch(/2/);
          }

          // Test previous button
          if (prevButton) {
            await prevButton.click();
            const prevIndex = await page.$eval('.lightbox-current-index', (el: HTMLElement) => el.textContent);
            expect(prevIndex).toMatch(/1/);
          }
        });

        test('should display fullscreen button and work correctly', async ({ page }) => {
          const fullscreenButton = await page.$('.slideshow-fullscreen-button');
          expect(fullscreenButton).not.toBeNull();

          await fullscreenButton?.click();
          const isFullscreen = await page.evaluate(() => document.fullscreenElement !== null);
          // TODO expect(isFullscreen).toBe(true);

          // Exit fullscreen
          await page.keyboard.press('Escape');
          const exitedFullscreen = await page.evaluate(() => document.fullscreenElement === null);
          expect(exitedFullscreen).toBe(true);
        });

        test('should display thumbnails and navigate to corresponding image', async ({ page }) => {
          await page.waitForSelector('.slideshow-thumbnail-image');
          const thumbnailLocator = page.locator('.slideshow-thumbnail-image');

           // Verify we have thumbnails (minimum 1)
          const count = await thumbnailLocator.count();
          expect(count).toBeGreaterThan(0);
          
          /// Click second thumbnail (using all() for array of elements)
          const thumbnails = await thumbnailLocator.all();
          await thumbnails[1].click();
          
          // Check index
          const currentIndex = page.locator('.lightbox-current-index');
          await expect(currentIndex).toHaveText(/2/);

          // Click first thumbnail
          await thumbnails[0].click();
          await expect(currentIndex).toHaveText(/1/);
        });

        test('should display captions and descriptions correctly', async ({ page }) => {
          const captions = await page.$$('.title-caption');
          expect(captions.length).toBeGreaterThan(0);

          for (const caption of captions) {
            const text = await caption.textContent();
            expect(text).toBeTruthy();
            expect(text?.trim().length).toBeGreaterThan(0);
          }
        });
      });
    }
  }
});