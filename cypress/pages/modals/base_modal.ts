export class BaseModal {
	static readonly selectors = {
		envelope: '.modal-content',
		header: '.modal-header',
		closeButton: '.modal-header .close',
		body: '[data-qa="modal-body"]',
		footer: '.modal-footer',
	}

	model = BaseModal.selectors

	/** Verifies visibility of key modal elements. */
	assertVisibleElements() {
		cy.get(this.model.envelope).should('be.visible')
		cy.get(this.model.header).should('be.visible')
		cy.get(this.model.body).should('be.visible')
		return this
	}

	/** Close modal by clicking the close button. */
	close() {
		cy.get(this.model.closeButton)
			.should('be.visible')
			.wait(300)
			.click()
		cy.get(this.model.envelope).should('not.exist')
		return this
	}
}
