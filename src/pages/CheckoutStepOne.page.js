const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class CheckoutStepOnePage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    get headerTitle() { return this.page.locator('.title'); }

    get firstName() { return this.page.locator('#first-name'); }

    get lastName() { return this.page.locator('#last-name'); }

    get zipCode() { return this.page.locator('#postal-code'); }

    get continueBtn() { return this.page.locator('#continue'); }

    async fillCheckoutInfo(fistName, lastName, zipCode) {
        await this.firstName.fill(fistName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
        await this.continueBtn.click();
    }
}
