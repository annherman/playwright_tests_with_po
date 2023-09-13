const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { SORTING_OPTIONS_FUNCTIONS } = require('../pages/Inventory.page');

test.describe('', () => {
    test('Perform and verify sorting', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        const options = Object.keys(SORTING_OPTIONS_FUNCTIONS);

        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            await inventoryPage.sortingBy(option);

            const actualItems = await inventoryPage.getSortedItems();
            const expectedItems = await inventoryPage.getSortedItems(option);

            await expect(actualItems).toMatchObject(expectedItems);
        }
    });

    test('Verify that added  products are displayed correctly', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        await inventoryPage.addItemToCartById(0);
        await inventoryPage.addItemToCartById(1);

        const firsProductInfo = await inventoryPage.getItemInfoById(0);
        const secondProductInfo = await inventoryPage.getItemInfoById(1);

        await inventoryPage.shopingCart.click();

        await expect(firsProductInfo).toMatchObject(await shopingCartPage.getCartItemInfoById(0));
        await expect(secondProductInfo).toMatchObject(await shopingCartPage.getCartItemInfoById(1));
    });

    test('Verify checkout steps', async ({
        loginPage, inventoryPage, shopingCartPage, checkoutStepOnePage, checkoutStepTwoPage,
    }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');

        await inventoryPage.addItemToCartById(0);
        await inventoryPage.addItemToCartById(1);

        const firsProductInfo = await inventoryPage.getItemInfoById(0);
        const secondProductInfo = await inventoryPage.getItemInfoById(1);

        await inventoryPage.shopingCart.click();
        await shopingCartPage.checkoutBtn.click();

        await checkoutStepOnePage.fillCheckoutInfo('My name', 'My lastName', '46764');

        const calculatedTotalPrice = await checkoutStepTwoPage.calculateItemsTotalPrice();

        await expect(firsProductInfo).toMatchObject(await shopingCartPage.getCartItemInfoById(0));
        await expect(secondProductInfo).toMatchObject(await shopingCartPage.getCartItemInfoById(1));
        await expect(await checkoutStepTwoPage.getTotalPrice()).toEqual(calculatedTotalPrice);
    });
});
