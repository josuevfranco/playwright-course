import { expect, test } from "@playwright/test"

test.skip("Product Page Add to Basket", async ({ page }) => {

    //Visit page we created
    await page.goto("/")
    //await page.pause()


    const addToBasketButtom = page.locator('[data-qa="product-button"]').first()
    const basketCounter     = page.locator('[data-qa="header-basket-count"]')
    await addToBasketButtom.waitFor()
    
    await expect(addToBasketButtom).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")
    await addToBasketButtom.click()

    await expect(addToBasketButtom).toHaveText("Remove from Basket")
    await expect(basketCounter).toHaveText("1")
   
    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    await checkoutLink.click()
    await page.waitForURL("basket")


})

const addTwoNumbers = (a, b) => {
    console.log("Adding up two number");
    return a + b;
}