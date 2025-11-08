import { BaseBasket } from '@pages/basket/base_basket'

/**
 * This PO handles the first step of the basket page.
 */

export class BasketStepOne extends BaseBasket {
    static readonly selectors = {
        ...BaseBasket.selectors,
        envelope: '[data-qa="snippet--basket-product-table"]',
        voucherLink: '[data-qa="basket-link-voucher"]',
        valuableLink: '[data-qa="basket-link-valuable"]',
        totalPrice: '[data-qa="basket-total-price"]',

        product: {
            box: '[data-qa="basket-product-box"]',
            img: '.basket-product-box__product-image',
            title: 'h2.overflow-ellipsis',
            availability: '.basket-product-box__product-availability',
            match: '[data-match]',

            quantityInput: '[data-qa="quantity-input"]',
            quantityAdd: '[data-qa="quantity-add"]',
            quantityRemove: '[data-qa="quantity-remove"]',

            price: '.basket-product-box__product-price',
            removeBtn: '[data-qa="basket-item-remove"]',
        },

        dependentItem: {
            box: '[data-qa="product-dependent-item-wrap"]',
            img: '[data-qa="product-dependent-item-thumbnail"]',
            title: '[data-qa="product-dependent-item-title"]',
            infoModalLink: '[data-qa="product-dependent-item-show-modal"]',
            price: '[data-qa="product-dependent-item-price"]',
            removeBtn: '[data-qa="product-dependent-item-wrap"] a[data-qa="basket-item-remove"]'
        },

        coupon: {
            box: '.basket-product-box__coupon',
            title: '.basket-product-box__coupon-title',
            price: '.basket-product-box__coupon-price',
            removeBtn: '.basket-product-box__coupon-remove'
        },

        recommendationBox: '[data-qa="recommendation-box"]',
        serviceToggleLink: '.product-services__toggle',
        serviceBox: '.product-services__items.collapse',
        accessoryToggleLink: '.exponea-accessories-link',
        accessoryBox: '.product-top-container-wrapper.show',

    }

    model = BasketStepOne.selectors

    /** Verifies the visibility of key elements for basket step one page. */
    assertVisibleElements() {
        cy.get(this.model.envelope).should('be.visible')
        cy.get(this.model.voucherLink).should('be.visible')
        cy.get(this.model.valuableLink).should('be.visible')
        cy.get(this.model.totalPrice).should('be.visible')

        const product = this.model.product

        cy.get(product.box).should('be.visible')
        cy.get(product.img).should('be.visible')
        cy.get(product.title).should('be.visible')
        cy.get(product.availability).should('be.visible')
        cy.get(product.quantityInput).should('be.visible')
        cy.get(product.price).should('be.visible')
        cy.get(product.removeBtn).should('be.visible')

        return this
    }

    /** 
     * Verifies the expected number of products is in the basket.
     * @param {number} expectedCount - Expected number of products 
     */
    assertProductCount(expectedCount: number) {
        cy.get(this.model.product.box).should('have.length', expectedCount)
        return this
    }

    /**
     * Verifies the expected number of dependent items is in the basket.
     * @param {number} expectedCount - Expected number of dependent items 
     */
    assertDependentItemCount(expectedCount: number) {
        cy.get(this.model.dependentItem.box).should('have.length', expectedCount)
        return this
    }

    /** Verifies at least one dependent item exists. */
    shouldHaveDependentItems() {
        cy.get(this.model.dependentItem.box)
            .should('exist')
            .and('have.length.at.least', 1)

        return this
    }

    /** Verifies whether a coupon has been added to the cart. */
    verifyCouponApplied() {
        cy.get(this.model.coupon.box).should('be.visible')
        return this
    }

    /** Removes first product. */
    removeProduct() {
        cy.get(this.model.product.removeBtn).first().click()
        return this
    }

    /** Removes random product, including dependent items. */
    removeRandomProduct() {
        cy.get(this.model.product.removeBtn).then($elements => {
            const randomIndex = Math.floor(Math.random() * $elements.length)
            const randomElement = $elements[randomIndex]
            cy.wrap(randomElement).click()
        })
        return this
    }

    /** 
     * Removes specific product. 
     * @param {string} match - Product match
     */
    removeProductByMatch(match: string) {
        cy.get(this.model.product.removeBtn).find(`[data-match="${match}"]`).click()
        return this
    }

    /** 
     * Increases number of product in basket by clicking "+" button and check that the quantity is correct.
     * @param {number} times - Number of clicks
     */
    clickPlusButton(times: number) {
        const product = this.model.product
        const getInputValue = () => cy.get(product.quantityInput).invoke('val')

        getInputValue().then((value) => {
            const currentValue = Number(value)
            const expectedValue = currentValue + times > 30 ? 30 : currentValue + times

            for (let i = 0; i < times; i++) {
                cy.get(product.quantityAdd).click()
            }

            getInputValue().should('equal', String(expectedValue))
        })

        return this
    }

    /** 
     * Decreases number of product in basket by clicking "-" button and check that the quantity is correct.
     * @param {number} times - Number of clicks
     */
    clickMinusButton(times: number) {
        const product = this.model.product
        const getInputValue = () => cy.get(product.quantityInput).invoke('val')

        getInputValue().then((value) => {
            const currentValue = Number(value)
            const expectedValue = currentValue - times <= 1 ? 1 : currentValue - times

            for (let i = 0; i < times; i++) {
                cy.get(product.quantityRemove).click()
            }

            getInputValue().should('equal', String(expectedValue))
        })

        return this
    }

    /** 
     * Changes the product quantity to a specific value and check that the quantity is correct.
     * @param {number} userValue - The desired quantity
     */
    fillQuantityInput(userValue: string) {
        const product = this.model.product
        const MAX_VALUE = 30

        const getInputValue = () => cy.get(product.quantityInput).invoke('val')

        getInputValue().then((value) => {
            cy.get(product.quantityInput).clear()
            cy.get(product.quantityInput).first().type(userValue).type('{enter}')

            const numberValue = Number(userValue)

            if (numberValue >= MAX_VALUE) {
                getInputValue().should('equal', String(MAX_VALUE))
            } else if (numberValue < 1) {
                getInputValue().should('equal', value)
            } else {
                getInputValue().should('equal', userValue)
            }
        })

        return this
    }

    /** Hides product services by clicking the toggle link. */
    hideProductServices() {
        cy.get(this.model.serviceToggleLink).click()
        cy.get(this.model.serviceBox).should('not.have.class', 'show')
        return this
    }

    /** Shows product services by clicking the toggle link. */
    showProductServices() {
        cy.get(this.model.serviceToggleLink).click()
        cy.get(this.model.serviceBox).should('have.class', 'show')
        return this
    }

    /** Hides accessory box by clicking the toggle link. */
    hideProductAccessories() {
        cy.get(this.model.accessoryToggleLink).scrollIntoView().click()
        cy.get(this.model.accessoryBox).should('have.attr', 'style', 'display: none;')
        return this
    }

    /** Shows accessory box by clicking the toggle link. */
    showProductAccessories() {
        cy.get(this.model.accessoryToggleLink).scrollIntoView().click()
        cy.get(this.model.accessoryBox).should('not.have.attr', 'style', 'display: none;')
        return this
    }

    /** Opens the voucher modal. */
    openVoucherModal() {
        cy.get(this.model.voucherLink).then(($link) => {
            const randomIndex = Math.floor(Math.random() * $link.length)
            const randomElement = $link[randomIndex]
            cy.wrap(randomElement).click()
        })

        return this
    }

    /** Opens the valuable modal. */
    openValuableModal() {
        cy.get(this.model.valuableLink).then(($link) => {
            const randomIndex = Math.floor(Math.random() * $link.length)
            const randomElement = $link[randomIndex]
            cy.wrap(randomElement).click()
        })

        return this
    }

    /**
     * Verifies that the total price has changed from the initial value.
     * @param initialPrice - Original price to compare against
     */
    verifyPriceChanged(initialPrice: string) {
        cy.get(this.model.totalPrice)
            .invoke('text')
            .should('not.equal', initialPrice)

        return this
    }

    /**
     * Gets the current total price value.
     * @returns Cypress chainable with the price text
     */
    getTotalPrice() {
        return cy.get(this.model.totalPrice).invoke('text')
    }

    /**
     * Captures current price, executes callback, then verifies price changed.
     * @param action - Callback function that should trigger price change
     * 
     * @example
     * basketStepOne
     *   .verifyPriceChangedAfter(() => basketStepOne.addRandomService())
     *   .verifyPriceChangedAfter(() => cy.get('[data-qa="quantity-add"]').click())
     */
    verifyPriceChangedAfter(action: () => void) {
        this.getTotalPrice().then(initialPrice => {
            action()
            this.verifyPriceChanged(initialPrice)
        })

        return this
    }

}

export const basketStepOne = new BasketStepOne()
