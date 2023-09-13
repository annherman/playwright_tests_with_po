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

    async addItemToCartById(id) {
        const item = this.inventoryItems.nth(id);
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async sortingBy(value) {
        await this.sortingSelect.selectOption(value);
    }

    async getSortedItems(option = null) {
        const items = await this.inventoryItems.all();

        const mappedItems = await Promise.all(items.map(async (i) => {
            const name = await i.locator('.inventory_item_name').textContent();
            const price = await i.locator('.inventory_item_price').textContent();

            return {
                name,
                price: parseFloat(price.slice(1)),
            };
        }));

        if (!option) return mappedItems;

        return mappedItems.sort(SORTING_OPTIONS_FUNCTIONS[option]);
    }

    async getItemInfoById(id) {
        const item = this.inventoryItems.nth(id);
        const name = await item.locator('.inventory_item_name').textContent();
        const desc = await item.locator('.inventory_item_desc').textContent();
        const price = await item.locator('.inventory_item_price').textContent();

        return {
            name,
            desc,
            price,
        };
    }
}
