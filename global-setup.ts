// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  await Promise.all([
    login('Katharina_Bernier'),
    login('Tavares_Barrows'),
    login('Allie2'),
    login('Giovanna74'),
  ])
}

async function login(user:string) {
  console.log(`grabbing state for ${user}`)
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Username', {exact: false}).fill(user);
  await page.getByLabel('Password', {exact: false}).fill('s3cret');
  await page.getByRole('button').click();
  await page.context().storageState({ path: `storage/${user}.json`});
  await browser.close();
}

export default globalSetup;