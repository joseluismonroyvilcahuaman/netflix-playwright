import { test } from '@playwright/test';
import { GmailPage } from './page/gmail.page';

test('Captura de pantalla del bloqueo de seguridad de Gmail', async ({ page }) => {
  const gmail = new GmailPage(page);

  await gmail.navigate();
  await gmail.enterEmailAndCaptureWarning('cuentabotcamelot6@gmail.com');
});
