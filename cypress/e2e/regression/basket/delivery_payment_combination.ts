import { deliveries } from '@data/deliveries_data'
import { payments } from '@data/payments_data'
import { modules } from '@support/modules'
import { urls } from '@support/urls'

const { basketStepTwo } = modules

function combine<T, U>(arr1: T[], arr2: U[]) {
    return arr1.flatMap(a => arr2.map(b => [a, b] as const))
}

const allCombos = combine(Object.values(deliveries), Object.values(payments))

describe('Delivery × Payment combinations', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('E2EFlow'))
        cy.addToCartAPI('1903230')
        cy.visit(Cypress.env('E2EFlow') + urls.cartStepTwo)
    })

    allCombos.forEach(([delivery, payment]) => {

        it(`should correctly select "${delivery.name}" + "${payment.name}"`, () => {
            cy.get(`${delivery.selector} ${basketStepTwo.model.radioBtn}`)
                .should('be.visible')
                .click({ force: true })

            cy.get(basketStepTwo.model.selectDelivery.center)
                .should('be.visible')
                .invoke('text')
                .should('include', delivery.name)

            cy.get(`${payment.selector} ${basketStepTwo.model.deliveryBtn}`)
                .should('be.visible')
                .click({ force: true })

            cy.get(`${payment.selector} ${basketStepTwo.model.payments.selectPayment}`)
                .should('be.visible')
            cy.get(`${payment.selector} ${basketStepTwo.model.payments.description}`)
                .should('be.visible')
                .invoke('text')
                .should('include', payment.name)


        })
    })
})
