describe('Authentication Test', () => {
    beforeAll(async () => {
      await device.launchApp();
    });

    it('should tap Register Button', async () => {
        await element(by.id('registerButton')).tap();
    });

    it('should tap Register Link Button', async () => {
        await element(by.id('registerLink')).tap();
    });

    it('should fill Register Form', async () => {
        await element(by.id('nameInput')).typeText('Raihan Fadhil Ahmad');
        await element(by.id('emailInput')).typeText('raifadhil18@gmail.com');
        await element(by.id('passInput')).typeText('raihanf123');
    });

    it('should tap Register Button', async () => {
        await element(by.id('registerButton')).tap();
    });

    it('should wait a while and tap back to login button', async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await element(by.id('backToLoginButton')).tap();
    });
    
    it('should fill login form', async () => {
        await element(by.id('emailInput')).typeText('raifadhil18@gmail.com');
        await element(by.id('passInput')).typeText('raihanf123');
    });

    it('should tap login button and redirect to home screen', async () => {
        await element(by.id('loginButton')).tap();
        await expect(element(by.id('welcomeText'))).toBeVisible();
        await new Promise(resolve => setTimeout(resolve, 5000));
    });
});