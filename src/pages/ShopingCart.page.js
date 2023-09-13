const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    get checkoutBtn() { return this.page.locator('#checkout'); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.getByRole('button', { name: 'Remove' });
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).getByRole('button', { name: 'Remove' }).click();
    }

    async getCartItemInfoById(id) {
        const item = this.cartItems.nth(id);
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
