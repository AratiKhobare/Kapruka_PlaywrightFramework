import {Page,Locator} from '@playwright/test';
/* Page, Locator are the utility classes used from playwright libraries
Page : represent Browser/tab
Locator: represent element on web page */

export abstract class BasePage_SOLID
{
    readonly page:Page; // using readonly reference cannot be reassigned after initialization.
    constructor(page:Page)
    {
        this.page=page; //LHS: class level this.page parameter RHS: Constructor parameter 
    }

    async click(locator:Locator):Promise<void>
    {
        await locator.waitFor({state:'visible'});
        await locator.click();
    }

    async navigate(url:string):Promise<void>
    {
        await this.page.goto(url,{waitUntil:'load'});
    }

    async fill(locator:Locator,value:string):Promise<void>
    {
        await locator.waitFor({state:'visible'});
        await locator.fill(value);
    }
    abstract isLoaded():Promise<void>;
}