import { expect } from '@playwright/test';
import { test } from '../fixture';

test.describe('', () => {
    test('Verify that added  products are displayed correctly', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        const addedItems = await inventoryPage.addRandomItemsToCard();

        await inventoryPage.shopingCart.click();
        const cartItems = await shopingCartPage.getAllCartItemsInfo();

        await expect(addedItems).toMatchObject(cartItems);
    });

    test('Verify checkout steps', async ({
        loginPage, inventoryPage, shopingCartPage, checkoutStepOnePage, checkoutStepTwoPage,
    }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        const addedItems = await inventoryPage.addRandomItemsToCard();

        await inventoryPage.shopingCart.click();
        await shopingCartPage.checkoutBtn.click();

        await checkoutStepOnePage.fillCheckoutInfo('My name', 'My lastName', '46764');

        const calculatedTotalPrice = await checkoutStepTwoPage.calculateItemsTotalPrice();

        await expect(addedItems).toMatchObject(await shopingCartPage.getAllCartItemsInfo());
        await expect(await checkoutStepTwoPage.getTotalPrice()).toEqual(calculatedTotalPrice);
    });
});
