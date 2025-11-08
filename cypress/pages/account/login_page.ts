import { type UserKey, users } from '@data/users_data'
import { HeaderPage } from '@pages/header_page'

export class LoginPage extends HeaderPage {
	static readonly selectors = {
		...HeaderPage.selectors,
		loginForm: '[data-qa="login-menu-content-loggedout"]',
		emailInput: '[data-qa="frm-login"]',
		passwordInput: '[data-qa="input-password"]',
		loginBtn: '[data-qa="btn-login"]',
		forgotPasswordLink: '.login-form .ufo-button.ufo-button--text',
		registrationLink: '.login-form-registration > a',
		privacyPolicyLink: '.social-login__consent > a',

		basketLogin: '.link-blue.modal-link.ajax',
		basketLoginForm: '.basket-login-form',

		socialLogin: {
			envelope: '.social-login',
			google: '[data-social-login="google"]',
			facebook: '[data-social-login="facebook"]',
			apple: '[data-social-login="apple"]',
		},

		errorMessage:
			'.ufo-form-group__message-error.ufo-form-group__message-box',
		invalidDataAlert: '.alert-box.alert-box-error.small.mt-2.mb-2',
	}

	model = LoginPage.selectors

	/** Verifies the visibility of key elements of the login menu. */
	assertVisibleElements() {
		cy.get(this.model.loginForm).should('be.visible')
		cy.get(this.model.emailInput).should('be.visible')
		cy.get(this.model.passwordInput).should('be.visible')
		cy.get(this.model.loginBtn).should('be.visible')
		cy.get(this.model.forgotPasswordLink).should('be.visible')
		cy.get(this.model.registrationLink).should('be.visible')
		cy.get(this.model.privacyPolicyLink).should('be.visible')
		cy.get(this.model.socialLogin.envelope).should('be.visible')
		return this
	}

	/**
	 * Enters email for specified user.
	 * @param userKey - user identifier from users data
	 */
	enterEmail(userKey: UserKey) {
		const user = users[userKey]
		cy.get(this.model.emailInput)
			.clear()
			.type(user.email, { delay: 0 })
			.should('have.value', user.email)
		return this
	}

	/**
	 * Enters password for specified user.
	 * @param userKey - user identifier from users data
	 */
	enterPassword(userKey: UserKey) {
		const user = users[userKey]
		cy.get(this.model.passwordInput)
			.clear()
			.type(user.password, { delay: 0 })
			.should('have.value', user.password)
		return this
	}

	clickToLogin() {
		cy.get(this.model.loginBtn).click()
		return this
	}

	/** Navigates to login form links. */
	goToForgotPassword() {
		cy.get(this.model.forgotPasswordLink).click()
		return this
	}

	goToRegistration() {
		cy.get(this.model.registrationLink).click()
		return this
	}

	goToPrivacyPolicy() {
		cy.get(this.model.privacyPolicyLink).click()
		return this
	}

	/** Logs out current user. */
	logoutUser() {
		cy.get(this.model.userName).click()
		cy.get(this.model.logoutLink).click()
		cy.waitForAjaxSpinner()
		return this
	}

	/**
	 * Performs login from header menu with retry mechanism - for monolit tests.
	 * @param userKey - user identifier from users data
	 */
	loginFromHeader(userKey: UserKey) {
		this.enterEmail(userKey)
		this.enterPassword(userKey)

		return this
	}

}

export const loginPage = new LoginPage()
