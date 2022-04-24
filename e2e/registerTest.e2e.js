describe('Register Test', () => {
    beforeAll(async () => {
      await device.launchApp();
    });

    it('should have Register Screen', async () => {
        await expect(element(by.id('registerView'))).toBeVisible();
    });
  
    it('should have banner image', async () => {
        await expect(element(by.id('bannerImage'))).toBeVisible();
    });

    it('should tap Register Button', async () => {
        await element(by.id('registerButton')).tap();
    });
    
    it('should tap Login Link Button an back to Register', async () => {
        await element(by.id('loginLink')).tap();
        await element(by.id('registerLink')).tap();
    });

    it('should fill Register Form', async () => {
        await element(by.id('nameInput')).typeText('Raihan Fadhil');
        await element(by.id('emailInput')).typeText('raihanfadhil318@gmail.com');
        await element(by.id('passInput')).typeText('raihan123');
    });
});