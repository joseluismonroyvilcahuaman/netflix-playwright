import { Page } from '@playwright/test';

export class GmailPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://mail.google.com/');
  }

  async enterEmailAndCaptureWarning(email: string) {
    await this.page.getByLabel('Email or phone', { exact: false }).fill(email);
    await this.page.getByRole('button', { name: 'Next' }).click();

    // Esperar a que aparezca el mensaje de advertencia
    await this.page.waitForSelector('text=This browser or app may not be secure', { timeout: 10000 });

    // Captura de pantalla del error
    await this.page.screenshot({ path: 'screenshots/gmail_security_warning.png', fullPage: true });
    console.log('\n📸 Captura tomada: pantalla de advertencia de seguridad de Google.');
  }
}
