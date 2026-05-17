import { test, expect } from '@playwright/test';

test.describe('Lead capture modal — desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('opens from hero CTA, fills form, submits, shows success', async ({ page }) => {
    await page.route('**/api/form', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, eventId: 'pw-test-001' }),
      });
    });

    await page.goto('/');

    const getStarted = page.getByRole('button', { name: /get started/i }).first();
    await expect(getStarted).toBeVisible();
    await getStarted.click();

    const modal = page.getByRole('dialog', { name: /get in touch/i });
    await expect(modal).toBeVisible();

    await expect(modal.locator('.lc-card')).toBeVisible();
    await expect(modal.locator('text=TELL US ABOUT')).toBeVisible();

    const firstNameInput = modal.locator('input').first();
    await firstNameInput.waitFor({ state: 'visible' });

    const inputs = modal.locator('input[type="text"], input[type="email"], input[type="tel"]');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const type = await input.getAttribute('type');
      const name = await input.getAttribute('name');

      if (type === 'email' || name?.toLowerCase().includes('email')) {
        await input.fill('test@example.com');
      } else if (type === 'tel' || name?.toLowerCase().includes('phone') || name?.toLowerCase().includes('mobile')) {
        await input.pressSequentially('0412345678', { delay: 30 });
      } else if (name?.toLowerCase().includes('first')) {
        await input.fill('Test');
      } else if (name?.toLowerCase().includes('last')) {
        await input.fill('User');
      } else {
        await input.fill('Test value');
      }
    }

    const textarea = modal.locator('textarea');
    if (await textarea.count() > 0) {
      await textarea.first().fill('Playwright test submission — please ignore.');
    }

    const checkboxes = modal.locator('input[type="checkbox"]');
    const checkboxCount = await checkboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
      await checkboxes.nth(i).check();
    }

    const submitBtn = modal.getByRole('button', { name: /get in touch/i });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    await expect(modal.locator('text=THANK YOU')).toBeVisible({ timeout: 5000 });
  });

  test('closes with Escape key', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /get started/i }).first().click();
    const modal = page.getByRole('dialog', { name: /get in touch/i });
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });

  test('closes with backdrop click', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /get started/i }).first().click();
    const modal = page.getByRole('dialog', { name: /get in touch/i });
    await expect(modal).toBeVisible();

    await modal.locator('.lc-backdrop').click({ force: true, position: { x: 10, y: 10 } });
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });

  test('closes with close button', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /get started/i }).first().click();
    const modal = page.getByRole('dialog', { name: /get in touch/i });
    await expect(modal).toBeVisible();

    await modal.locator('.lc-desktop-close').click();
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('Lead capture — mobile redirect', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('CTA navigates to /get-in-touch instead of opening modal', async ({ page }) => {
    await page.goto('/');

    const cta = page.locator('button:visible', { hasText: /get started/i }).first();
    await expect(cta).toBeVisible();
    await cta.click();

    await page.waitForURL('**/get-in-touch**', { timeout: 10000 });
    expect(page.url()).toContain('/get-in-touch');
  });
});
