# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\currency.spec.ts >> Kaprula Currency dropdown >> Switch from USD to INR
- Location: tests\e2e\currency.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('combobox', { name: 'Select Currency' }) to be visible

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - text: We are sorry. The page you have requested does not exist
    - paragraph [ref=e3]:
      - text: "To visit the Kapruka home page, go to:"
      - link "http://www.kapruka.com" [ref=e4] [cursor=pointer]:
        - /url: https://www.kapruka.com
  - paragraph [ref=e5]:
    - generic [ref=e6]: Thank You. Kapruka Development Team.
```

# Test source

```ts
  1  | import {Page,Locator,expect} from '@playwright/test';
  2  | import {BasePage_SOLID } from './BasePage_SOLID';
  3  | 
  4  | export class CurrencyPage extends BasePage_SOLID
  5  | {
  6  |     readonly currencyDropDown:Locator;
  7  | 
  8  |     constructor(page:Page)
  9  |     {
  10 |         super(page);
  11 |         this.currencyDropDown=page.getByRole('combobox',{name: 'Select Currency'});
  12 |     }
  13 |     async goto():Promise<void>
  14 |     {
  15 |         await this.navigate('${config.baseUrl}')
  16 |     }
  17 |     
  18 |      async isLoaded(): Promise<void> 
  19 |     {
> 20 |         await this.currencyDropDown.waitFor({state:"visible"});
     |                                     ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  21 |         
  22 |     }
  23 | 
  24 |     async selectCurrency(Currency:'INR' | 'USD'): Promise<void>{
  25 |         await Promise.all([
  26 |             this.page.waitForLoadState('load'),
  27 |             this.currencyDropDown.selectOption({label:Currency})]);
  28 |     }
  29 | 
  30 |     async verifyCurrency(expected:string):Promise<void>
  31 |     {
  32 |         await expect(this.currencyDropDown).toHaveValue(expected);
  33 |        
  34 |     }
  35 | 
  36 | }
```