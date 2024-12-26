import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/gallery/',
  '/gallery/gallery-slideshow-resources-images-sample/',
  '/gallery/gallery-slideshow-sample-1/',
  '/gallery/gallery-slideshow-sample-2/',
  '/gallery/gallery-slideshow-sample-3/',
];

const viewports = [
  { width: 1280, height: 720, name: 'Desktop' },
  { width: 412, height: 915, name: 'Mobile Portrait' },
  { width: 915, height: 412, name: 'Mobile Landscape' },
];

for (const page of pages) {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} view - ${page}`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(page);
      });

      test('should display the slideshow gallery correctly', async ({ page }) => {
        const gallery = await page.$('.slideshow-gallery');
        expect(gallery).not.toBeNull();
      });

      test('should navigate through images using next and previous buttons', async ({ page }) => {
        const nextButton = await page.$('.slideshow-next-button');
        const prevButton = await page.$('.slideshow-prev-button');
        expect(nextButton).not.toBeNull();
        expect(prevButton).not.toBeNull();

        await nextButton.click();
        const currentIndex = await page.$eval('.lightbox-current-index', el => el.textContent);
        expect(currentIndex).toBe('2');

        await prevButton.click();
        const newIndex = await page.$eval('.lightbox-current-index', el => el.textContent);
        expect(newIndex).toBe('1');
      });

      test('should display fullscreen button and work correctly', async ({ page }) => {
        const fullscreenButton = await page.$('.slideshow-fullscreen-button');
        expect(fullscreenButton).not.toBeNull();

        await fullscreenButton.click();
        const isFullscreen = await page.evaluate(() => document.fullscreenElement !== null);
        expect(isFullscreen).toBe(true);
      });

      test('should display thumbnails and navigate to corresponding image', async ({ page }) => {
        const thumbnails = await page.$$('.slideshow-thumbnail-image');
        expect(thumbnails.length).toBeGreaterThan(0);

        await thumbnails[1].click();
        const currentIndex = await page.$eval('.lightbox-current-index', el => el.textContent);
        expect(currentIndex).toBe('2');
      });

      test('should display captions and descriptions correctly', async ({ page }) => {
        const captions = await page.$$('.figure-caption');
        expect(captions.length).toBeGreaterThan(0);

        for (const caption of captions) {
          const text = await caption.textContent();
          expect(text).not.toBeNull();
          expect(text.length).toBeGreaterThan(0);
        }
      });
    });
  }
}
