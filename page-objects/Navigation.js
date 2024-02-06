import { isDesktopViewport } from "./../utils/isDesktopViewport.js"

export class Navigation{
    constructor(page){
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })

        this.mobileBurgerButton = page.locator('[data-prefix="fas"]')
    }

    getBasketCounter = async () => {
        await this.basketCounter.waitFor()
        return parseInt(await this.basketCounter.innerText(), 10)
    }

    goToCheckout = async () => {

        if(!isDesktopViewport(this.page)){
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()


        }

        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("basket")
    }

}