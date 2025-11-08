import { actionModal } from '@pages/modals/action_modal'
import { modules } from '@support/modules'

const { basketStepOne } = modules

describe('First step basket tests', () => {
    beforeEach(() => {
        cy.acceptCookies()
        cy.addToCartAPI('1903230')
    })

    it('TEST-10409 should display all basket overview elements correctly', () => {
        basketStepOne
            .assertProductCount(1)
            .assertVisibleElements()
    })

    it('TEST-10410 should successfully remove a product from the basket', () => {
        basketStepOne.removeProduct()
    })

    it('TEST-10414 should hide and show product services', () => {
        basketStepOne
            .hideProductServices()
            .showProductServices()
    })

    it('TEST-10415 should change product quantity', () => {
        basketStepOne
            .clickPlusButton(1)
            .clickMinusButton(3)
            .fillQuantityInput('40')
            .fillQuantityInput('0')
            .fillQuantityInput('1')
    })

    it('TEST-10416 should open voucher modal and verifies its elements', () => {
        basketStepOne.openVoucherModal()
        actionModal
            .assertVoucherElements()
            .close()
    })

    it('TEST-10417 should open valuable modal and verifies its elements', () => {
        basketStepOne.openValuableModal()
        actionModal
            .assertValuableElements()
            .close()
    })

})