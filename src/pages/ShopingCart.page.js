const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    get checkoutBtn() { return this.page.locator('#checkout'); }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).getByRole('button', { name: 'Remove' }).click();
    }

    async removeCartItemByIndex(index) {
        await ShopingCartPage.removeItemFromCart(this.cartItems.nth(index));
    }

    async getAllCartItemsInfo() {
        const items = await this.cartItems.all();
        return Promise.all(items.map(async (i) => {
            const name = await i.locator('.inventory_item_name').textContent();
            const price = await i.locator('.inventory_item_price').textContent();

            return {
                name,
                price: parseFloat(price.slice(1)),
            };
        }));
    }

    static async removeItemFromCart(item) {
        await item.getByRole('button', { name: 'Remove' }).click();
    }
}
