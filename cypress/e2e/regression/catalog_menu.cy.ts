import { modules } from '@support/modules'

const { catalogPage } = modules

describe('Catalog menu', () => {
	it('TEST-10380 should display a menu canvas for random category and assert its elements', () => {
		cy.visit(Cypress.env('E2EFlow'))

		catalogPage
			.hoverRandomCategory()
			.assertVisibleElements()
	})

	it('TEST-10386 should validate links for random sub category in menu canvas', () => {
		cy.visit(Cypress.env('E2EFlow'))

		catalogPage
			.hoverRandomCategory()
			.validateRandomCategoryLinks()
	})

	it('TEST-10389 should display a menu canvas for mobile category and navigate to sub category', () => {
		cy.visit(Cypress.env('E2EFlow'))

		catalogPage
			.hoverMainCategory('phones')
			.clickSubCategory('mobilePhones')
	})

})
