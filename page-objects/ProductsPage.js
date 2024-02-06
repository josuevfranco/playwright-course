import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class ProductsPage{

    constructor(page){
        this.page = page;
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.productsTitle = page.locator('[data-qa="product-title"]')
    }


    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const buttonSelected = this.addButtons.nth(index)
        await buttonSelected.waitFor()

        const navigation = new Navigation(this.page)
        await expect(buttonSelected).toHaveText("Add to Basket")
        
        let basketCountBeforeAdding = 0;
        if(isDesktopViewport(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCounter()
        }

        await buttonSelected.click()
        await expect(buttonSelected).toHaveText("Remove from Basket")
        
        if(isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCounter()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()

        //get order of products
        await this.productsTitle.first().waitFor()
        const productsTitlBeforeSorting = await this.productsTitle.allInnerTexts()

        await this.sortDropdown.selectOption('price-asc')
        const productsTitlAfterSorting = await this.productsTitle.allInnerTexts()
        expect(productsTitlAfterSorting).not.toEqual(productsTitlBeforeSorting)

    }


}