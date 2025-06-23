import { Page } from '@playwright/test';

export class NetflixPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.netflix.com/pe/browse/genre/448');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async clickFirstMovie() {
    const firstMovie = this.page.locator('//section[2]//div[1]//ul[1]//li[1]//a[1]//img[1]');
    await firstMovie.waitFor({ timeout: 10000 });
    await firstMovie.click();
    console.log('🎬 Se hizo clic en la primera película del género.');
  }
}
