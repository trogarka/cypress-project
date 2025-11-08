import { BaseModal } from '@pages/modals/base_modal'

export class SubBasketModal extends BaseModal {
	static readonly selectors = {
		...BaseModal.selectors,
		subBasketEnvelope: '[data-qa="basket-product-add"]',
		addButton: '.btn.btn-intoBasket',
	}

	model = SubBasketModal.selectors

	/** Verifies visibility of key modal elements. */
	assertVisibleElements() {
		super.assertVisibleElements()
		cy.get(this.model.subBasketEnvelope).should('be.visible')
		return this
	}

	/** Add product to cart from sub-basket modal. */
	addToCart() {
		cy.get(this.model.addButton)
			.scrollIntoView()
			.should('be.visible')
			.click()
		return this
	}
}

export const subBasketModal = new SubBasketModal()
