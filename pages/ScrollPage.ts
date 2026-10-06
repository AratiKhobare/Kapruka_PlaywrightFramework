import {Page,Locator,expect} from '@playwright/test';
import {BasePage_SOLID } from './BasePage_SOLID';

export class ScrollPage extends BasePage_SOLID
{
    readonly bestSellerHeader:Locator;
    readonly eventsLink:Locator;
    readonly specialEventsHeader:Locator;

    constructor(page:Page)
    {
        super(page);
        this.bestSellerHeader=page.getByRole('heading',{name: 'Gifts to Sri Lanka - Best Sellers'});
        this.eventsLink=page.getByRole('link',({name:'Events'}))
        this.specialEventsHeader=page.getByRole('heading',{name:'Special Events'})
    }
    async goto():Promise<void>
    {
        await this.navigate('/');     
    }

    async gotoEventsPage():Promise<void>
    {
        await this.navigate('/shops/events_home.jsp');
    }
   
     async isLoaded(): Promise<void> 
    {
       // await this.bestSellerHeader.waitFor({state:"visible"});
        await this.eventsLink.waitFor({state:'visible'});      
    }

       async scrollToHeader():Promise<void>
    {
        await this.scrollToLocator(this.bestSellerHeader);
    } 

       async scrollToEventHeader():Promise<void>
    {
        await this.click(this.eventsLink);
        await this.scrollToLocator(this.specialEventsHeader);
    } 
    }