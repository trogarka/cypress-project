export class BaseBasket {
    static readonly selectors = {
        header: '.basket-header',
        fixedHeader: '.fixed-header',
        subheader: '.fixed-subheader',

        logo: '.fixed-subheader .project-logo',
        contact: '.fixed-subheader .head-contact',

        continueBtn: '.btn.btn-continue',

    }

    model = BaseBasket.selectors

    /** Proceeds to the next step in the basket. */
    clickBtnContinue(): this {
        cy.get(this.model.continueBtn)
            .should('have.length', 2)
            .then($buttons => {
                const randomIndex = Math.floor(Math.random() * 2)
                cy.wrap($buttons.eq(randomIndex)).click()
            })

        return this
    }

}