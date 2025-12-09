import {test as setup} from "@playwright/test"
import MainPage from "../../src/pageObjects/MainPage.js";



setup ("User Login", async ({page, context}) => {
  
    const adminCredentials = {
        email: "olena@test.com",
        password: "Password123"
    }

    const mainPage = new MainPage(page)
    await mainPage.navigate()
    await mainPage.loginWithCredentials(adminCredentials)

    await context.storageState({
        path: 'state/adminStorageState.json'
    })
})