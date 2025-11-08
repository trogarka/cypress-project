import { urls } from '@support/urls'

/**
 * This PO handles interactions with the header section of the website, including user account icons, cart access, and breadcrumb navigation.
 */

export class HeaderPage {
	static readonly selectors = {
		storeLink: 'a.nav-link[href="/predajne"]',
		comparisonLink: 'a.nav-link[href="/porovnat"]',

		headLogin: '[data-qa="head-login"]',

		// Logged in user
		userName: '[data-qa="login-user-name"]',
		userActionMenu: '.header__action-menu--user',
		myAccountLink: '[data-qa="headerMenuClientAccount"]',
		myOrdersLink: '[data-qa="headerMenuClientOrders"]',
		logoutLink: '[data-qa="headerMenuClientLogout"]',

		// Account icons
		logoutIcon: '.ufo-icon.ufo-icon__ico-uzivatel-neprihlasen',
		regularIcon: '.ufo-icon.ufo-icon__ico-uzivatel-prihlasen-nay',
		vipIcon: '.ufo-icon.ufo-icon__ico-uzivatel-extra',
		employeeIcon: '.ufo-icon.ufo-icon__ico-uzivatel-zam',

		cartBtn: '[data-qa="header-menu-item-cart"]',

		breadcrumb: '.breadcrumbs__wrapper',
		breadcrumbItem: '.breadcrumbs__item a',
	}

	model = HeaderPage.selectors

	/** Navigates to the store page via the header link. */
	goToStorePage() {
		cy.get(this.model.storeLink).should('be.visible').click()
		cy.url().should('include', urls.stores)
		return this
	}

	/** Navigates to the comparison page via the header link. */
	goToComparisonPage() {
		cy.get(this.model.comparisonLink).should('be.visible').click()
		cy.url().should('include', urls.compare)
		return this
	}

	/** Navigates to the cart via the header link. */
	goToCart() {
		cy.get(this.model.cartBtn).click()
		cy.url().should('include', urls.cart)
		return this
	}

	/** Opens the login menu from the header. */
	openLoginForm() {
		cy.get(this.model.headLogin).click()
		return this
	}

	/** Verifies that the logout icon is visible for an unauthenticated user. */
	assertLogoutUser() {
		cy.get(this.model.logoutIcon).should('be.visible')
		return this
	}

	/** Verifies that the regular user icon is visible. */
	assertRegularUser() {
		cy.get(this.model.regularIcon).should('be.visible')
		return this
	}

	/** Verifies that the VIP user icon is visible. */
	assertVipUser() {
		cy.get(this.model.vipIcon).should('be.visible')
		return this
	}

	/** Verifies that the employee user icon is visible. */
	assertEmployeeUser() {
		cy.get(this.model.employeeIcon).should('be.visible')
		return this
	}

	/** Opens the user menu from the header. */
	openUserMenu() {
		cy.get(this.model.userName).click()
		cy.get(this.model.userActionMenu).should('be.visible')
		return this
	}

	/** Navigates to my account section via user menu. */
	goToMyAccount() {
		cy.get(this.model.userName).click()
		cy.get(this.model.myAccountLink).click()
		cy.url().should('include', urls.myAccount)
		return this
	}

	/** Verifies breadcrumb elements are visible. */
	assertBreadcrumbElements() {
		cy.get(this.model.breadcrumb).should('be.visible')
		cy.get(this.model.breadcrumbItem).should('be.visible')
		return this
	}

	/**
	 * Navigates via breadcrumb links to a specific page.
	 * @param {string} itemUrl - URL of the breadcrumb item to navigate to
	 */
	navigateViaBreadcrumb(itemUrl: string) {
		cy.get(this.model.breadcrumbItem)
			.filter(`[href="${itemUrl}"]`)
			.should('be.visible')
			.click()
		return this
	}

	/**
	 * Verifies breadcrumb navigation was successful by checking the URL.
	 * @param {string} expectedUrl - Expected path to be included in the URL
	 */
	verifyBreadcrumbNavigation(expectedUrl: string) {
		cy.url().should('include', expectedUrl)
		return this
	}
}

export const headerPage = new HeaderPage()
