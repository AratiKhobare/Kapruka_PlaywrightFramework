import {test,expect} from "@playwright/test";
import { ScrollPage } from "../../pages/ScrollPage";

test.describe('Kapruka Scrolling to Element',()=>
    {
    test('Scroll to Best Sellers',async({page})=>
    {
        const scrollPage=new ScrollPage(page);
        await scrollPage.goto();
        await scrollPage.isLoaded();
        await scrollPage.scrollToHeader();
    });

    test('Scroll to Events: Special Events',async({page})=>
    {
        const scrollPage=new ScrollPage(page);
        await scrollPage.gotoEventsPage();
        await scrollPage.isLoaded();
        await scrollPage.scrollToEventHeader();
    });
});