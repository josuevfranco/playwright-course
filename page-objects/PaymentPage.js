import { expect } from "@playwright/test"

export class PaymentPage{
    constructor(page){
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDataButton = page.locator('[data-qa="submit-discount-button"]')

        this.totalValue = page.locator('[data-qa="total-value"]')
        this.totalDiscountValue = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')

        this.cardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumber = page.locator('[data-qa="credit-card-number"]')
        this.cardValid = page.locator('[data-qa="valid-until"]')
        this.cardCVC = page.locator('[data-qa="credit-card-cvc"]')

        this.paymentButton =  page.locator('[data-qa="pay-button"]')
    }

    activateDescount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()

        //Verify message is not visible yet and discount price
        expect(await this.totalDiscountValue.isVisible()).toBe(false)
        expect(await this.discountActivatedMessage.isVisible()).toBe(false)

        await this.discountCodeInput.waitFor()
        await this.discountCodeInput.fill(code)

        await expect(this.discountCodeInput).toHaveValue(code)
        await this.submitDataButton.click()


        //Check Discount exists
        await this.discountActivatedMessage.waitFor()
        await this.totalValue.waitFor()
        await this.totalDiscountValue.waitFor()

        const totalValue = parseInt((await this.totalValue.innerText()).replace(/\$/g, ''), 10)
        const discountTotal = parseInt((await this.totalDiscountValue.innerText()).replace(/\$/g, ''), 10)
        console.log(totalValue,discountTotal)

        expect(totalValue).toBeGreaterThan(discountTotal)
        
    }

    fillPaymentDetails = async (card) => {

        await this.cardOwner.waitFor()
        await this.cardOwner.fill(card.owner)

        await this.cardNumber.waitFor()
        expect(card.number.length).toEqual(16)
        await this.cardNumber.fill(card.number)

        await this.cardValid.waitFor()
        await this.cardValid.fill(card.valid)

        await this.cardCVC.waitFor()
        await this.cardCVC.fill(card.cvc)

    }

    finishPayment = async () => {

        await this.paymentButton.waitFor()
        await this.paymentButton.click() 

        await this.page.waitForURL(/\/thank-you/, { timeout : 3000 })
        await this.page.pause()
    }
}