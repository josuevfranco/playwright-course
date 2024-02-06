import { expect } from "@playwright/test"

export class DeliveryDetails{
    constructor(page){
        this.page = page 
        this.firstName = page.locator('[data-qa="delivery-first-name"]')
        this.lastName = page.locator('[data-qa="delivery-last-name"]')
        this.street = page.locator('[data-qa="delivery-address-street"]')
        this.postCode = page.locator('[data-qa="delivery-postcode"]')
        this.city = page.locator('[data-qa="delivery-city"]')

        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAdressButton = page.locator('[data-qa="save-address-button"]')

        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')

        this.firstNameSaved = this.page.locator('[data-qa="saved-address-firstName"]')
        this.lastNameSaved  = this.page.locator('[data-qa="saved-address-lastName"]')

        this.continuePaymentButton = this.page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDetails = async (userAddress) => {

        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)

        await this.lastName.waitFor()
        await this.lastName.fill(userAddress.lastName)

        await this.street.waitFor()
        await this.street.fill(userAddress.street)
        
        await this.postCode.waitFor()
        await this.postCode.fill(userAddress.postCode)

        await this.city.waitFor()
        await this.city.fill(userAddress.city)

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(userAddress.country)
    }

    saveDetails = async () =>{
        const addressCounterBeforeSaving = await this.savedAddressContainer.count()

        await this.saveAdressButton.waitFor()
        await this.saveAdressButton.click()

        await expect(this.savedAddressContainer).toHaveCount(addressCounterBeforeSaving + 1)

        //Validate the saved value is the same as the one we are saving
        await this.firstNameSaved.first().waitFor()
        expect(await this.firstNameSaved.first().innerText()).toBe(await this.firstName.inputValue())

        await this.lastNameSaved.first().waitFor()
        expect(await this.lastNameSaved.first().innerText()).toBe(await this.lastName.inputValue())

        
    }

    contiueToPayment =  async () => {
        this.continuePaymentButton.waitFor()
        this.continuePaymentButton.click()

        await this.page.waitForURL(/\/payment/)
    }
}