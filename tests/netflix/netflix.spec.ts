import { test } from '@playwright/test';
import { NetflixPage } from './page/netflix.page';

test('Ingresar a Netflix y seleccionar las peliculas de genero de suspenso', async ({ page }) => {
  const netflix = new NetflixPage(page);

  await netflix.navigate();
  await page.setViewportSize({ width: 1920, height: 1080 });

  const currentUrl = await netflix.getCurrentUrl();
  console.log(`\n🌐 URL actual: ${currentUrl}`);

  await netflix.clickFirstMovie();
});
