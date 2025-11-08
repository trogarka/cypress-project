import { modules } from '@support/modules'
import { urls } from '@support/urls'

const { headerPage, loginPage } = modules

describe('Login from the website header', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('E2EFlow'))
    })

    it('TEST-10004 should display all login form elements correctly', () => {
        loginPage
            .openLoginForm()
            .assertVisibleElements()
    })

    it('TEST-9981 should navigate to all form links with 200 response codes, and ensure that social links are not empty', () => {
        const formLinks = [
            { action: () => loginPage.goToForgotPassword(), expectedUrl: urls.forgotPassword },
            { action: () => loginPage.goToRegistration(), expectedUrl: urls.registration },
            { action: () => loginPage.goToPrivacyPolicy(), expectedUrl: urls.privacyPolicy },
        ]

        loginPage.openLoginForm()
        formLinks.forEach(({ action, expectedUrl }) => {
            action()

            cy.url().should('include', expectedUrl)
            cy.url().then((currentUrl) => {
                cy.request('GET', currentUrl).then((response) => {
                    expect(response.status).to.eq(200)
                })
            })

            // Return to login form for next iteration
            loginPage.openLoginForm()
        })

        const socialLogin = loginPage.model.socialLogin
        cy.get(socialLogin.google)
            .should('have.attr', 'href')
            .and('not.be.empty')
        cy.get(socialLogin.facebook)
            .should('have.attr', 'href')
            .and('not.be.empty')
        cy.get(socialLogin.apple)
            .should('have.attr', 'href')
            .and('not.be.empty')
    })

    it('TEST-10007 should successfully login a regular user', () => {
        loginPage.loginFromHeader('Harry')
        cy.get(headerPage.model.regularIcon).should('be.visible')
    })

    it('TEST-10006 should successfully login a VIP user', () => {
        loginPage.loginFromHeader('Sirius')
        cy.get(headerPage.model.vipIcon).should('be.visible')
    })

    it('TEST-10003 should successfully login an employee', () => {
        loginPage.loginFromHeader('Albus')
        cy.get(headerPage.model.employeeIcon).should('be.visible')
    })

    it('TEST-9746 should maintain session after login', () => {
        loginPage.loginFromHeader('Harry')

        // Navigate to different page and verify user still logged in
        cy.visit(Cypress.env('E2EFlow') + urls.category.fridges)
        cy.get(headerPage.model.userName).should('be.visible')
    })

    it('TEST-9747 should verify user menu is visible and links are valid', () => {
        loginPage.loginFromHeader('Sirius')
        headerPage.openUserMenu()

        const menuLinks = [
            headerPage.model.myAccountLink,
            headerPage.model.myOrdersLink,
            headerPage.model.logoutLink,
        ]

        menuLinks.forEach((link) => {
            cy.get(link).should('be.visible')
        })

        menuLinks.forEach((link) => {
            cy.get(link)
                .invoke('attr', 'href')
                .then((href) => {
                    cy.request(href)
                        .its('status')
                        .should('be.oneOf', [200, 302])
                })
        })
    })

    it.only('TEST-9945 should show error when attempting login without credentials', () => {
        loginPage
            .openLoginForm()
            .clickToLogin()

        cy.get(loginPage.model.errorMessage)
            .should('have.length', 2)
            .should('be.visible')
    })

})