import { test, expect } from '@playwright/test'

test.describe('list with scroll seek placeholders', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/collapsible-long-item`)
    await page.waitForSelector('[data-test-id=virtuoso-scroller]')
    await page.waitForTimeout(100)
  })

  test('compensates correctly when collapsing an item', async ({ page }) => {
    await page.evaluate(() => {
      const scroller = document.querySelector('[data-test-id=virtuoso-scroller]')!
      scroller.scrollBy({ top: -400 })
    })

    await page.waitForTimeout(200)

    await page.evaluate(() => {
      const button = document.querySelector('[data-index="90"] button') as HTMLButtonElement
      button.click()
    })

    await page.waitForTimeout(200)

    const scrollTop = await page.evaluate(() => {
      const scroller = document.querySelector('[data-test-id=virtuoso-scroller]')!
      return scroller.scrollTop
    })

    expect(scrollTop).toBe(9200)
  })
})
