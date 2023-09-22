import { randomNumber } from '../helpers/functions';

const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export const SORTING_OPTIONS_FUNCTIONS = {
    az: (a, b) => a.name.localeCompare(b.name),
    za: (a, b) => b.name.localeCompare(a.name),
    lohi: (a, b) => a.price - b.price,
    hilo: (a, b) => b.price - a.price,
};

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() {
        return this.page.locator('.title');
    }

    get sortingSelect() {
        return this.page.locator('.product_sort_container');
    }

    get activeOption() {
        return this.page.locator('.active_option').textContent();
    }

    get inventoryItems() {
        return this.page.locator('.inventory_item');
    }

    async addItemToCartByIndex(index) {
        await InventoryPage.addItemToCart(this.inventoryItems.nth(index));
    }

    async sortingBy(value) {
        await this.sortingSelect.selectOption(value);
    }

    async getAllItemsInfo() {
        const items = await this.inventoryItems.all();
        return Promise.all(items.map(async (i) => {
            const name = await i.locator('.inventory_item_name').textContent();
            const price = await i.locator('.inventory_item_price').textContent();

            return {
                name,
                price: parseFloat(price.slice(1)),
            };
        }));
    }

    async getItemInfoByIndex(index) {
        return InventoryPage.getItemInfo(this.inventoryItems.nth(index));
    }

    async addRandomItemsToCard() {
        const items = await this.inventoryItems;
        const randomItemNumber = randomNumber((await items.all()).length, 1);

        const addedItems = [];

        for (let i = 1; i <= randomItemNumber; i++) {
            const notCartItems = await items.filter({ has: this.page.getByRole('button', { name: 'Add to cart' }) });

            const indexValue = randomNumber((await notCartItems.all()).length);
            const item = notCartItems.nth(indexValue);

            const itemInfo = await InventoryPage.getItemInfo(item);

            await InventoryPage.addItemToCart(item);

            addedItems.push(itemInfo);
        }

        return addedItems;
    }

    static async addItemToCart(item) {
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    static async getItemInfo(item) {
        const name = await item.locator('.inventory_item_name').textContent();
        const desc = await item.locator('.inventory_item_desc').textContent();
        const price = await item.locator('.inventory_item_price').textContent();

        return {
            name,
            desc,
            price: parseFloat(price.slice(1)),
        };
    }
}
