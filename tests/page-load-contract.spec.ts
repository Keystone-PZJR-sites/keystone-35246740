import { test, expect, type Request } from '@playwright/test';

/**
 * Validates the page loading contract defined in docs/explainers/page-loading-contract.md.
 *
 * These tests capture the network waterfall on initial page load and assert that
 * media resources fire (or don't fire) according to the contract's rules about
 * what belongs in the initial network window vs. what must wait for proximity
 * or interaction.
 */

type MediaRequest = {
  url: string;
  resourceType: string;
  timestamp: number;
};

function collectMediaRequests(page: import('@playwright/test').Page): MediaRequest[] {
  const requests: MediaRequest[] = [];
  const start = Date.now();
  page.on('request', (req: Request) => {
    const type = req.resourceType();
    if (['media', 'image', 'font', 'stylesheet'].includes(type)) {
      requests.push({ url: req.url(), resourceType: type, timestamp: Date.now() - start });
    }
  });
  return requests;
}

function urls(requests: MediaRequest[]): string[] {
  return requests.map((r) => r.url);
}

// ─── Desktop ────────────────────────────────────────────────────────────────

test.describe('Page load contract — desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('hero clip 01 desktop loads in initial wave', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const heroClip01 = reqs.find((r) => r.url.includes('hero-01-desktop'));
    expect(heroClip01, 'hero-01-desktop should load in initial wave').toBeTruthy();
  });

  test('hero clips 02–06 do not all load simultaneously', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const laterClips = reqs.filter((r) =>
      /hero-0[2-6]-desktop/.test(r.url)
    );
    // N+1 strategy: clip 01 plays while clip 02 preloads, so up to 2 later
    // clips may appear if clip 01 finishes quickly and the hook advances.
    expect(
      laterClips.length,
      'hero clips should trickle via N+1, not burst-load all at once'
    ).toBeLessThanOrEqual(2);
  });

  test('hero mobile clips do not load on desktop viewport', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const mobileHeroClips = reqs.filter((r) => r.url.includes('hero') && r.url.includes('mobile'));
    expect(mobileHeroClips, 'no mobile hero clips should load on desktop').toHaveLength(0);
  });

  test('critical fonts are preloaded', async ({ page }) => {
    await page.goto('/');

    const preloadLinks = await page.locator('link[rel="preload"][as="font"]').all();
    const hrefs = await Promise.all(preloadLinks.map((el) => el.getAttribute('href')));

    const expected = [
      'FKScreamer-Bold',
      'FKGroteskNeue-Regular',
      'FKGroteskNeue-Italic',
      'FKRomanStandard-Regular',
    ];

    for (const font of expected) {
      expect(
        hrefs.some((h) => h?.includes(font)),
        `${font} should have a preload link`
      ).toBe(true);
    }
  });

  test('no Google font requests on initial load', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    page.on('request', (req: Request) => {
      if (req.url().includes('fonts.googleapis.com') || req.url().includes('fonts.gstatic.com')) {
        reqs.push({ url: req.url(), resourceType: 'font', timestamp: Date.now() });
      }
    });

    await page.goto('/');
    await page.waitForTimeout(3000);

    const googleFonts = reqs.filter(
      (r) => r.url.includes('fonts.googleapis.com') || r.url.includes('fonts.gstatic.com')
    );
    expect(googleFonts, 'no Google font requests should fire on load').toHaveLength(0);
  });

  test('EveryChannel videos do not load in initial wave', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const everyChannelVids = reqs.filter((r) => r.url.includes('everychannel'));
    expect(everyChannelVids, 'EveryChannel videos should not load initially').toHaveLength(0);
  });

  test('WorkShowcase card images do not load in initial wave', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const showcaseImages = reqs.filter(
      (r) => r.resourceType === 'image' && r.url.includes('work-showcase')
    );
    expect(showcaseImages, 'WorkShowcase images should not load initially').toHaveLength(0);
  });

  test('footer videos do not load in initial wave', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const footerVids = reqs.filter(
      (r) => r.resourceType === 'media' && r.url.includes('footer')
    );
    expect(footerVids, 'footer videos should not load initially').toHaveLength(0);
  });

  test('SocialProof modal videos do not load until modal opens', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const socialVids = reqs.filter(
      (r) => r.resourceType === 'media' && r.url.includes('social-proof')
    );
    expect(socialVids, 'SocialProof videos should not load without interaction').toHaveLength(0);
  });

  test('inline critical CSS sets background color', async ({ page }) => {
    await page.goto('/');

    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    expect(
      bgColor,
      'body background should be the dark green from inline critical CSS'
    ).toBe('rgb(4, 32, 25)');
  });
});

// ─── Mobile ─────────────────────────────────────────────────────────────────

test.describe('Page load contract — mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hero clip 01 mobile loads in initial wave', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const heroClip01 = reqs.find((r) => r.url.includes('hero-01-mobile'));
    expect(heroClip01, 'hero-01-mobile should load in initial wave').toBeTruthy();
  });

  test('hero desktop clips do not load on mobile viewport', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const desktopHeroClips = reqs.filter((r) => r.url.includes('hero') && r.url.includes('desktop'));
    expect(desktopHeroClips, 'no desktop hero clips should load on mobile').toHaveLength(0);
  });

  test('hero clips 02–06 do not all load simultaneously on mobile', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const laterClips = reqs.filter((r) =>
      /hero-0[2-6]-mobile/.test(r.url)
    );
    expect(
      laterClips.length,
      'at most one subsequent hero clip should start within the first 3s'
    ).toBeLessThanOrEqual(1);
  });

  test('EveryChannel mobile videos do not load in initial wave', async ({ page }) => {
    const reqs = collectMediaRequests(page);
    await page.goto('/');
    await page.waitForTimeout(3000);

    const everyChannelVids = reqs.filter((r) => r.url.includes('everychannel'));
    expect(everyChannelVids, 'EveryChannel videos should not load initially on mobile').toHaveLength(0);
  });
});
