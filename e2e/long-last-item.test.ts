import { test, expect } from '@playwright/test'

test.describe('list with a long last item', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:1234/long-last-item')
    await page.waitForSelector('#test-root')
    await page.waitForTimeout(300)
  })

  test('starts from the last item', async ({ page }) => {
    const paddingTop = await page.evaluate(() => {
      const listContainer = document.querySelector('#test-root > div > div > div')
      return (listContainer as HTMLElement).style.paddingTop
    })
    expect(paddingTop).toBe('7200px')
  })

  test('compensates on upwards scrolling correctly', async ({ page }) => {
    await page.evaluate(() => {
      const scroller = document.querySelector('#test-root > div')!
      scroller.scrollBy({ top: -2 })
    })

    await page.waitForTimeout(200)

    const scrollTop = await page.evaluate(() => {
      return document.querySelector('#test-root > div')!.scrollTop
    })

    // items are 800 and 100px tall.
    // scrolling up by 2px reveals an unexpectedly short item, so it should compensate
    expect(scrollTop).toBe(7200 - 2 - (800 - 100))
  })
})
