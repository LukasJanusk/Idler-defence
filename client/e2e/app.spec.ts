import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Idler defence')).toBeVisible();
});
test('On level end displays score form and submits and resets on close', async ({
  page,
}) => {
  await page.goto('/game');
  await page.locator('svg').click();

  await page.getByRole('button', { name: 'New Game' }).click();
  await page.getByRole('img', { name: 'Background image of level 0' }).click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.getByRole('button', { name: 'Menu button' }).click();
  await page.getByRole('button', { name: 'Always show UI' }).click();
  await page.getByRole('button', { name: 'Menu button' }).click();
  await page.getByRole('button', { name: 'Add new Character to pos4' }).click();
  await page.getByRole('button', { name: '⚡ test 200 🪙' }).click();
  await page.getByRole('button', { name: 'Hire 💰' }).click();
  await page.getByRole('button', { name: 'Next wave' }).click();
  await expect(page.getByRole('heading', { name: 'GAME OVER!' })).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Error occured')).toBeVisible();

  await page.getByRole('button', { name: 'Return' }).click();
  await page.getByRole('textbox', { name: 'Name:' }).click();
  await page.getByRole('textbox', { name: 'Name:' }).fill('test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('heading', { name: 'Highscores' })).toBeVisible();
  await page.getByRole('button', { name: 'Close modal' }).click();
  await expect(page.getByRole('button', { name: 'Next wave' })).toBeVisible();
});
