export class TemplatePage {
	static readonly selectors = {
		// Define your selectors here
	}

	model = TemplatePage.selectors

	/**
	 * Add your methods here
	 * @param param - two-line comment
	 */

	/** Verifies the visibility of key elements on the template page. */
	assertVisibleElements() {
		// cy.get(this.model.envelope).should('be.visible')
		return this
	}
}

export const templatePage = new TemplatePage()
