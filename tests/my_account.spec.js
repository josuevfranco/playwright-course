import { test } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"
test.only("My account using cookie injectios", async ({page}) => {

    //Make request to get login cookie
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
   
    const myAccount = new MyAccountPage(page)
    await myAccount.visit()

    await page.evaluate(([loginInsideBrowserCode]) =>{
        document.cookie = "token=" + loginInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()



})