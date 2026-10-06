# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\currency.spec.ts >> Kaprula Currency dropdown >> Switch from USD to INR
- Location: tests\e2e\currency.spec.ts:6:5

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  getByRole('combobox', { name: 'Select Currency' })
Expected: "USD"
Received: "INR"
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" getByRole('combobox', { name: 'Select Currency' }) with timeout 5000ms
  - waiting for getByRole('combobox', { name: 'Select Currency' })
    14 × locator resolved to <select aria-label="Select Currency" class="lang_selectbox mdb-select md-form" onchange="$.get('/tools/switch_currency.jsp?random=1791171792049&m='+this.value,location.reload())">…</select>
       - unexpected value "INR"

```

```yaml
- combobox "Select Currency":
  - option "INR" [selected]
  - option "USD"
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
  15 |         await this.navigate('/')
  16 |     }
  17 |     
  18 |      async isLoaded(): Promise<void> 
  19 |     {
  20 |         await this.currencyDropDown.waitFor({state:"visible"});
  21 |         
  22 |     }
  23 | 
  24 |     async selectCurrency(currency:'USD' | 'INR'): Promise<void>{
  25 |         await Promise.all([
  26 |             this.page.waitForLoadState('load'),
  27 |             this.currencyDropDown.selectOption({label:currency})]);
  28 |     }
  29 | 
  30 |     async verifyCurrency(expected:string):Promise<void>
  31 |     {
  32 |         const actual = await this.currencyDropDown.inputValue();
  33 |         console.log('Selected currency value:', actual);
> 34 |         await expect(this.currencyDropDown).toHaveValue(expected);
     |                                             ^ Error: expect(locator).toHaveValue(expected) failed
  35 |     }
  36 | 
  37 | }
```