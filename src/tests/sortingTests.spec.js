import { expect } from '@playwright/test';
import { test } from '../fixture';
import { SORTING_OPTIONS_FUNCTIONS } from '../pages/Inventory.page';

test.describe('Perform and verify sorting', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin('standard_user', 'secret_sauce');
    });

    test('Verify sorting by Name(A-Z)', async ({ inventoryPage }) => {
        const option = 'az';
        const unsortedItems = await inventoryPage.getAllItemsInfo();
        await inventoryPage.sortingBy(option);
        const sortedItems = await inventoryPage.getAllItemsInfo();

        await expect(sortedItems).toMatchObject(unsortedItems.sort(SORTING_OPTIONS_FUNCTIONS[option]));
    });

    test('Verify sorting by Name(Z-A)', async ({ inventoryPage }) => {
        const option = 'za';
        const unsortedItems = await inventoryPage.getAllItemsInfo();
        await inventoryPage.sortingBy(option);
        const sortedItems = await inventoryPage.getAllItemsInfo();

        await expect(sortedItems).toMatchObject(unsortedItems.sort(SORTING_OPTIONS_FUNCTIONS[option]));
    });

    test('Verify sorting by Price(low to high)', async ({ inventoryPage }) => {
        const option = 'lohi';
        const unsortedItems = await inventoryPage.getAllItemsInfo();
        await inventoryPage.sortingBy(option);
        const sortedItems = await inventoryPage.getAllItemsInfo();

        await expect(sortedItems).toMatchObject(unsortedItems.sort(SORTING_OPTIONS_FUNCTIONS[option]));
    });
    test('Verify sorting by Price(high to low)', async ({ inventoryPage }) => {
        const option = 'hilo';
        const unsortedItems = await inventoryPage.getAllItemsInfo();
        await inventoryPage.sortingBy(option);
        const sortedItems = await inventoryPage.getAllItemsInfo();

        await expect(sortedItems).toMatchObject(unsortedItems.sort(SORTING_OPTIONS_FUNCTIONS[option]));
    });
});
