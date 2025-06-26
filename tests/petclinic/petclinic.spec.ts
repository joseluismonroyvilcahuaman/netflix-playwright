
import { test, expect } from '@playwright/test';
import { PetClinicPage } from './page/petclinic.page';

// Caso de prueba: Registrar y buscar 3 nuevos dueños

test('Registrar y buscar 3 nuevos dueños con tiempos visibles', async ({ page }) => {
  const petClinic = new PetClinicPage(page);

  await petClinic.goToHome();
  await page.waitForTimeout(1000);

  const owners = [
    { firstName: 'Carlos', lastName: 'Monroyyy', address: 'Av. Central 123', city: 'Trujillo', telephone: '9998887777' },
    { firstName: 'Elena', lastName: 'Lopezzz', address: 'Jr. Norte 456', city: 'Chiclayo', telephone: '4443332222' },
    { firstName: 'Marco', lastName: 'Castillooo', address: 'Psje. Sur 789', city: 'Iquitos', telephone: '7776665554' }
  ];

  // Registrar dueños
  for (const owner of owners) {
    await petClinic.navigateToFindOwner();
    await page.waitForTimeout(1000);

    await petClinic.navigateToAddOwner();
    await page.waitForTimeout(1000);

    await petClinic.fillOwnerForm(owner);
    await page.waitForTimeout(1000);
  }

  // Buscar y capturar datos de cada dueño
  for (const owner of owners) {
    await petClinic.navigateToFindOwner();
    await page.waitForTimeout(1000);

    await petClinic.searchOwnerByLastName(owner.lastName);
    await page.waitForTimeout(1000);

    const h2Text = await page.locator('h2').textContent();
    if (h2Text?.includes('Owner Information')) {
      console.log(`Dueño encontrado: ${owner.firstName} ${owner.lastName}`);
    } else if (h2Text?.includes('Owners')) {
      console.warn(`Se listaron varios dueños al buscar: ${owner.lastName}`);
    } else {
      throw new Error(`Página inesperada al buscar ${owner.lastName}. Título recibido: "${h2Text}"`);
    }

    await page.screenshot({ path: `evidencias/owner-${owner.lastName}.png`, fullPage: true });
    await page.waitForTimeout(1000);
  }

  // Búsqueda final de todos otra vez
  for (const owner of owners) {
    await petClinic.navigateToFindOwner();
    await page.waitForTimeout(1000);
    await petClinic.searchOwnerByLastName(owner.lastName);
    await page.waitForTimeout(1000);
  }
});
