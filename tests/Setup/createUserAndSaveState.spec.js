import {test as setup} from "@playwright/test"
import MainPage from "../../src/pageObjects/MainPage.js";



setup.only ("User Login", async ({page, context}) => {
  
    const adminCredentials = {
        email: "tedoneh173@canvect.com",
        password: "Makar_2019"
    }

    const mainPage = new MainPage(page)
    await mainPage.goTo()
    await mainPage.loginWithCredentials(adminCredentials)

    await context.storageState({
        path: 'state/adminStorageState.json'
    })
})
