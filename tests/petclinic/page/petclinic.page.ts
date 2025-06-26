import { Page } from '@playwright/test';

export class PetClinicPage {
  constructor(private page: Page) {}

  async goToHome() {
    await this.page.goto('http://localhost:8080');
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async navigateToFindOwner() {
    await this.page.click('a[href="/owners/find"]');
  }

  async navigateToAddOwner() {
    await this.page.click('a[href="/owners/new"]');
  }

  async fillOwnerForm(owner: { firstName: string; lastName: string; address: string; city: string; telephone: string }) {
    await this.page.fill('#firstName', owner.firstName);
    await this.page.fill('#lastName', owner.lastName);
    await this.page.fill('#address', owner.address);
    await this.page.fill('#city', owner.city);
    await this.page.fill('#telephone', owner.telephone);
    await this.page.click('button[type="submit"]');
  }

  async searchOwnerByLastName(lastName: string) {
    await this.page.fill('#lastName', lastName);
    await this.page.click('button[type="submit"]');
  }
}
