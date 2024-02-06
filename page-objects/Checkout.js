import { expect } from "@playwright/test";

export class Checkout{
    constructor(page){
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemove = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueTocheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestItem = async () => {
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()

        const itemsBeforeRemoval = await this.basketCards.count()

        const dollarAmounts = await this.basketItemPrice.allInnerTexts()
        const numericAmounts = dollarAmounts.map(amount => Number(amount.replace('$', '')));
        const indexOfSmallest = numericAmounts.indexOf(Math.min(...numericAmounts));

        const itemToDelete = this.basketItemRemove.nth(indexOfSmallest)
        await itemToDelete.click()

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)

        
    }

    continueToCheckout = async () => {
        await this.continueTocheckoutButton.waitFor()
        await this.continueTocheckoutButton.click()
        await this.page.waitForURL(/\/login/)
    }

    continueToSignUp =  async () => {
        
    }
}