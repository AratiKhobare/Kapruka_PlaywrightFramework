import {test,expect} from "@playwright/test";
import { CurrencyPage } from "../../pages/CurrencyPage";

test.describe('Kapruka Currency dropdown',()=>{

test('Switch from USD to INR',async({page})=>{

    const currencypage=new CurrencyPage(page);
    await currencypage.goto();
    await currencypage.isLoaded();
    await currencypage.selectCurrency('INR');
    await currencypage.verifyCurrency('INR');

    //selecting USD
    await currencypage.selectCurrency('USD');
    await currencypage.verifyCurrency('USD');
});
});