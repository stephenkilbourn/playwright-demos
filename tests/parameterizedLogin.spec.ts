import { test, expect } from '@playwright/test';
const people = ['Katharina_Bernier', 'Tavares_Barrows', 'Allie2', 'Giovanna74'];
for (const name of people) {
test.describe('Logged in as different user types', () => {

    test.use({ storageState: `./storage/${name}.json` });

    test(`testing with ${name} should show their username`, async ({page}) => {
    await page.goto('http://localhost:3000/');

    await expect(page.getByText(/account balance/i)).toBeVisible();
    await expect(page.getByText(name)).toBeVisible();
    });

    test(`testing with ${name} should show their storage state`, async ({page}) => {
      await page.goto('http://localhost:3000/');
  
      await expect(page.getByText(/account balance/i)).toBeVisible();
      const data = await page.evaluate(() => window.localStorage.getItem('authState'))

      await expect(data).toMatch(name);
      });
  }
  )}
