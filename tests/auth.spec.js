const { test, expect } = require('@playwright/test');

test.describe('Authentication & Authorization', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://coding.pasv.us/user/login') // await - чтобы дождаться не Promise а result
    })


    test('Sign in with existing credentials', async ({ page }) => {

        await page.locator('#normal_login_email').fill('victoria.chernishova@gmail.com')
        await page.locator('#normal_login_password').fill('Hollywood26031986?')
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.ant-avatar-square')).toBeVisible()
    })


    test('Sign in with invalid credentials', async ({ page }) => {

        await page.locator('#normal_login_email').fill('invalidemail@gm.com')
        await page.locator('#normal_login_password').fill('invalid')
        await page.locator('button[type="submit"]').click()

        const toast = page.locator('.ant-notification-notice-message')
        await expect(toast).toBeVisible()
        await expect(toast).toHaveText('User login. Fail')
    })
})


