describe('Login Test', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    it('should have login screen', async () => {
      await expect(element(by.id('loginView'))).toBeVisible();
    });

    it('should have banner image', async () => {
      await expect(element(by.id('bannerImage'))).toBeVisible();
    });

    it('should tap Login Button', async () => {
      await element(by.id('loginButton')).tap();
    });

    it('should tap Register Link Button and back to Login', async () => {
      await element(by.id('registerLink')).tap();
      await element(by.id('loginLink')).tap();
    });

    it('should fill login form', async () => {
        await element(by.id('emailInput')).typeText('reybin@gmail.com');
        await element(by.id('passInput')).typeText('reyh2022');
    });
});