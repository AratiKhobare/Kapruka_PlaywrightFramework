import {test,expect} from '@playwright/test';
import { LoginPage_SOLID } from '../../pages/LoginPage_SOLID';
const TEST_EMAIL=process.env.TEST_EMAIL;
const TEST_PASSWORD=process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
    throw new Error(
        'Missing TEST_EMAIL or TEST_PASSWORD environment variable. ' +
        'Set these in your .env file or CI/CD secrets before running tests.'
    );
}
test.describe('Kapruka Login Test', ()=>
    {
    /* test.skip(!TEST_EMAIL || !TEST_PASSWORD,
        'Missing TEST_EMAIL or TEST_PASSWORD environment variable. ' +
        'Set these in your .env file or CI/CD secrets before running tests.');
 */
    test('Valid user should login successfully', async({page})=>{
    const loginPage= new LoginPage_SOLID(page);
    await loginPage.goto();
    await loginPage.isLoaded();
    // CHANGE: Now uses the validated TEST_EMAIL / TEST_PASSWORD
    // constants above instead of inline env reads with hardcoded
    // fallbacks.
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await loginPage.verifyLoginSuccess();
})
});