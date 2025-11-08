import { modules } from '@support/modules'
import { urls } from '@support/urls'

const { productDetailPage, subBasketModal, loginPage } = modules

describe('AT Helpers', () => {
	beforeEach(() => {
		cy.visit(Cypress.env('E2EFlow'))
		cy.acceptCookies()
	})

	it.only('should run test function', () => {
		cy.visit(Cypress.env('E2EFlow') + urls.product.TV_DPD)

		productDetailPage.clickAddButton()
		subBasketModal.close()
	})

	it('should login with choosen account', () => {
		loginPage.loginFromHeader('Harry')
	})
})
