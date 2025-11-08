import { BaseModal } from '@pages/modals/base_modal'
import { type VoucherKey, vouchers } from '@data/vouchers_data'

/**
 * This PO handles interactions with voucher and valuable modals.
 */

export class ActionModal extends BaseModal {
	static readonly selectors = {
		...BaseModal.selectors,
        description: '[data-qa="modal-body"] p',
		formCode: 'input#frm-code',
		formPin: 'input#frm-pin',
		submitBtn: '[data-qa="btn-use"]',
		errorMessage: '[data-qa="error-text"]',
	}
    
	model = ActionModal.selectors

	/** Verifies visibility of key voucher modal elements. */
	assertVoucherElements() {
		super.assertVisibleElements()

		cy.get(this.model.description).should('be.visible')
		cy.get(this.model.formCode).should('be.visible')
        cy.get(this.model.submitBtn).should('be.visible')

		return this
	}

    /** Verifies visibility of key valuable modal elements. */
	assertValuableElements() {
		super.assertVisibleElements()

		cy.get(this.model.description).should('be.visible')
		cy.get(this.model.formCode).should('be.visible')
        cy.get(this.model.formPin).should('be.visible')
        cy.get(this.model.submitBtn).should('be.visible')

		return this
	}

    /** 
	 * Fills in voucher code.
	 * @param key - Voucher key from vouchers_data.ts
	 */
	fillVoucherCode(key: VoucherKey) {
		cy.get(this.model.formCode).type(vouchers[key], { delay: 0})
		return this
	}

	/** Submits the voucher form. */
	submitVoucherForm() {
		cy.get(this.model.submitBtn).click()
		return this
	}
}

export const actionModal = new ActionModal()
