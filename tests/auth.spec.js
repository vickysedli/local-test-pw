const {test, expect} = require('@playwright/test')

test.describe('Authentication & Authorization', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/user/login') // await - чтобы дождаться не Promise а result
  })

  test('Sign in with existing credentials', async ({page}) => {
    await page.locator('#normal_login_email').fill(process.env.EMAIL)
    await page.locator('#normal_login_password').fill(process.env.PASSWORD)
    await page.locator('button[type="submit"]').click()

    await expect(page.locator('.ant-avatar-square')).toBeVisible()
  })

  test('Sign in with invalid credentials', async ({page}) => {
    await page.locator('#normal_login_email').fill('invalidemail@gm.com')
    await page.locator('#normal_login_password').fill('invalid')
    await page.locator('button[type="submit"]').click()

    const toast = page.locator('.ant-notification-notice-message')
    await expect(toast).toBeVisible()
    await expect(toast).toHaveText('User login. Fail')
  })
})
