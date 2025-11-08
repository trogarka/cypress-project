export const productService = {
    model: {
        envelope: '.product-services',
        header: '.product-services__header',
        title: '.product-services__title',

        /** To maintain the DOM hierarchy context use .within() */

        service: {
            envelope: '.product-service',
            name: '.product-service__name',
            tooltip: '.product-service__info-icon',
            variantsOffer: '.product-service__offers',
        },

        serviceVariant: {
            box: '.product-service__offer',
            selected: '.product-service__offer.product-service__offer--selected',
            radio: '.product-service__radio',
            name: '.product-service__offer-name',
        }

    },

    /**
     * Validates service offer elements visibility 
     */
    assertVisibleElements(): void {
        const service = this.model.service
        const variant = this.model.serviceVariant

        const elementsToValidate = [
            service.envelope,
            service.name,
            service.tooltip,
            service.variantsOffer,

            variant.selected,
            variant.box,
            variant.radio,
            variant.name,
        ]

        elementsToValidate.forEach(selector => {
            cy.get(selector).should('be.visible')
        })
    },

    /**
     * Validate selected variant by checking that exactly one variant is selected and it's not the first option ("Nechcem")
     * @param serviceIndex - Index of the service to target (0-based)
     */
    assertSelectedVariant(serviceIndex: number = 0): void {
        cy.get(this.model.service.envelope).eq(serviceIndex).within(() => {
            cy.get(this.model.service.variantsOffer).within(() => {
                cy.get(this.model.serviceVariant.selected)
                    .should('have.length', 1)

                // Assert that the selected variant is not the first one ("Nechcem")
                cy.get(this.model.serviceVariant.box)
                    .first()
                    .should('not.have.class', this.model.serviceVariant.selected)
            })
        })
    },

    /**
     * Selects a random variant excluding the first option ("Nechcem")
     * @param serviceIndex - Index of the service to target (0-based)
     */
    selectRandomVariant(serviceIndex: number = 0): void {
        cy.get(this.model.service.envelope).eq(serviceIndex).within(() => {
            cy.get(this.model.service.variantsOffer).within(() => {
                cy.get(this.model.serviceVariant.box)
                    .not(':first')
                    .its('length')
                    .then((count) => {
                        const randomIndex = Math.floor(Math.random() * count)
                        cy.get(this.model.serviceVariant.box)
                            .not(':first')
                            .eq(randomIndex)
                            .click()
                    })
            })
        })
    },

    /**
     * Selects the second variant option (index 1)
     * @param serviceIndex - Index of the service to target (0-based)
     */
    selectSecondVariant(serviceIndex: number = 0): void {
        cy.get(this.model.service.envelope).eq(serviceIndex).within(() => {
            cy.get(this.model.service.variantsOffer).within(() => {
                cy.get(this.model.serviceVariant.box)
                    .eq(1)
                    .click()
            })
        })
    },

    /**
     * Selects the variant at the specified index
     * @param serviceIndex - Index of the service to target (0-based)
     * @param variantIndex - Index of the variant to select
     */
    selectTargetVariant(serviceIndex: number = 0, variantIndex: number): void {
        cy.get(this.model.service.envelope).eq(serviceIndex).within(() => {
            cy.get(this.model.service.variantsOffer).within(() => {
                cy.get(this.model.serviceVariant.box)
                    .eq(variantIndex)
                    .click()
            })
        })
    },

    /**
     * Selects the first option "Nechcem" (I don't want to)
     * @param serviceIndex - Index of the service to target (0-based)
     */
    selectNone(serviceIndex: number = 0): void {
        cy.get(this.model.service.envelope).eq(serviceIndex).within(() => {
            cy.get(this.model.service.variantsOffer).within(() => {
                cy.get(this.model.serviceVariant.box)
                    .first()
                    .click()
            })
        })
    },


}