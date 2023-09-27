const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    get headerTitle() { return this.page.locator('.title'); }

    get cartItems() { return this.page.locator('.cart_item'); }

    get finishBtn() { return this.page.locator('#finish'); }

    async getCartItemInfoByIndex(index) {
        const item = this.cartItems.nth(index);
        const name = await item.locator('.inventory_item_name').textContent();
        const desc = await item.locator('.inventory_item_desc').textContent();
        const price = await item.locator('.inventory_item_price').textContent();

        return {
            name,
            desc,
            price: parseFloat(price.slice(1)),
        };
    }

    async calculateItemsTotalPrice() {
        const items = await this.cartItems.all();
        const prices = await Promise.all(items.map(async (i) => {
            const price = await i.locator('.inventory_item_price').textContent();
            return parseFloat(price.slice(1));
        }));
        const totalPrice = prices.reduce((a, i) => a + i, await this.getTax());
        return totalPrice.toFixed(2).toString();
    }

    async getItemsTotalPrice() {
        const priceText = await this.page.locator('.summary_subtotal_label').textContent();
        return parseFloat(priceText.match(/[+-]?\d+(\.\d+)?/g));
    }

    async getTax() {
        const taxText = await this.page.locator('.summary_tax_label').textContent();
        return parseFloat(taxText.match(/[+-]?\d+(\.\d+)?/g));
    }

    async getTotalPrice() {
        const totalPriceText = await this.page.locator('.summary_total_label').textContent();
        return parseFloat(totalPriceText.match(/[+-]?\d+(\.\d+)?/g)).toString();
    }
}
