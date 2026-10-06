import {Page,Locator,expect} from '@playwright/test';
import {BasePage_SOLID } from './BasePage_SOLID';

export class CurrencyPage extends BasePage_SOLID
{
    readonly currencyDropDown:Locator;

    constructor(page:Page)
    {
        super(page);
        this.currencyDropDown=page.getByRole('combobox',{name: 'Select Currency'});
    }
    async goto():Promise<void>
    {
        await this.navigate('/')
    }
    
     async isLoaded(): Promise<void> 
    {
        await this.currencyDropDown.waitFor({state:"visible"});
        
    }

    async selectCurrency(currency:'INR'|'USD'): Promise<void>{
        await Promise.all([
            this.page.waitForLoadState('load'),
            this.currencyDropDown.selectOption({label:currency})]);
    }

    async verifyCurrency(expected:string):Promise<void>
    {
        await expect(this.currencyDropDown).toHaveValue(expected);
    }

}