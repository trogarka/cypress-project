declare global {
	namespace Cypress {
		interface Chainable {
			addToCartAPI(productId: string): Chainable<void>
			acceptCookies(): Chainable<void>
			login(userKey: UserKey): Chainable<void>
			prepareCart(userKey: UserKey): Chainable<void>
			waitForAjaxSpinner(): Chainable<void>
		}
	}
}

import { cookiesData } from '@data/cookies_data'
import { type UserKey, users } from '@data/users_data'
import { loginPage } from '@pages/account/login_page'
import { urls } from '@support/urls'

const selectors = {
	ajaxSpinner: '#ajax-spinner.ajax-loading',
}

/** Accepts cookie consent to bypass the cookie banner. */
Cypress.Commands.add('acceptCookies', () => {
	cy.setCookie(
		cookiesData.name,
		cookiesData.value
	)
})

Cypress.Commands.add('addToCartAPI', (productId) => {
	cy.window().then((win) => {
		cy.wrap(
			fetch(`${Cypress.env('E2EFlow')}/kosik?do=addProduct&id=${productId}`, {
				method: 'POST',
				credentials: 'include', // Future-proof if URLs change
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
		)
	})
})

/**
 * Session-based login - caches login state across tests for better performance.
 * @param userKey - User identifier from users data
 */
Cypress.Commands.add('login', (userKey: UserKey) => {
	const user = users[userKey]

	cy.session([user.email, user.password], () => {
		cy.visit(Cypress.env('E2EFlow'))

		cy.get(loginPage.model.basketLogin).invoke('click')
		cy.get(loginPage.model.emailInput).type(user.email, { delay: 0 })
		cy.get(loginPage.model.passwordInput).type(user.password, {
			delay: 0,
		})
		cy.get(loginPage.model.loginBtn).invoke('click')

		cy.get(loginPage.model.userName).should('be.visible')
	})
})

/**
 * Prepares a clean cart state for testing.
 * Logs in user, clears existing cart, and removes browser storage
 * @param userKey - User credentials for login
 */
Cypress.Commands.add('prepareCart', (userKey: UserKey) => {
	cy.visit(Cypress.env('E2EFlow'))
	loginPage.loginFromHeader(userKey)
	cy.visit(Cypress.env('E2EFlow') + urls.clearCart)
	cy.clearCookies()
	cy.clearLocalStorage()
})


/** Waits for Ajax spinner to complete loading operations. */
Cypress.Commands.add('waitForAjaxSpinner', () => {
	cy.get('body').then(($body) => {
		if ($body.find(selectors.ajaxSpinner).is(':visible')) {
			cy.get(selectors.ajaxSpinner).should('not.be.visible')
		}
	})
})