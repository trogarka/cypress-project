/**
 * This PO handles interactions with the product service section.
 * Recommendation: To maintain the DOM hierarchy context use .within()
 */

export class ServiceSnippet {
	static readonly selectors = {
		envelope: '.product-services',
		header: '.product-services__header',
		title: '.product-services__title',

		service: {
			envelope: '.product-service',
			name: '.product-service__name',
			tooltip: '.product-service__info-icon',
			variantsOffer: '.product-service__offers',
		},

		serviceVariant: {
			box: '.product-service__offer',
			selected:
				'.product-service__offer.product-service__offer--selected',
			radio: '.product-service__radio',
			name: '.product-service__offer-name',
		},
	}

	model = ServiceSnippet.selectors

	/** Verifies visibility of key service elements. */
	assertVisibleElements() {
		const service = this.model.service
		const variant = this.model.serviceVariant

		cy.get(this.model.envelope).should('be.visible')
		cy.get(this.model.header).should('be.visible')
		cy.get(this.model.title).should('be.visible')

		cy.get(service.envelope).should('be.visible')
		cy.get(service.name).should('be.visible')
		cy.get(service.tooltip).should('be.visible')
		cy.get(service.variantsOffer).should('be.visible')

		cy.get(variant.selected).should('be.visible')
		cy.get(variant.box).should('be.visible')
		cy.get(variant.radio).should('be.visible')
		cy.get(variant.name).should('be.visible')

		return this
	}

	/**
	 * Validate selected variant by checking that exactly one variant is selected and it's not the first option ("Nechcem").
	 * @param serviceIndex - Index of the service to target (0-based)
	 */
	assertSelectedVariant(serviceIndex: number = 0) {
		cy.get(this.model.service.envelope)
			.eq(serviceIndex)
			.within(() => {
				cy.get(this.model.service.variantsOffer).within(() => {
					cy.get(this.model.serviceVariant.selected).should(
						'have.length',
						1,
					)

					// Assert that the selected variant is not the first one ("Nechcem")
					cy.get(this.model.serviceVariant.box)
						.first()
						.should(
							'not.have.class',
							this.model.serviceVariant.selected,
						)
				})
			})

		return this
	}

	/**
	 * Selects a random variant excluding the first option ("Nechcem").
	 * @param serviceIndex - Index of the service to target (0-based)
	 */
	selectRandomVariant(serviceIndex: number = 0) {
		cy.get(this.model.service.envelope)
			.eq(serviceIndex)
			.within(() => {
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

		return this
	}

	/**
	 * Selects the second variant option (index 1).
	 * @param serviceIndex - Index of the service to target (0-based)
	 */
	selectSecondVariant(serviceIndex: number = 0) {
		cy.get(this.model.service.envelope)
			.eq(serviceIndex)
			.within(() => {
				cy.get(this.model.service.variantsOffer).within(() => {
					cy.get(this.model.serviceVariant.box).eq(1).click()
				})
			})

		return this
	}

	/**
	 * Selects the variant at the specified index.
	 * @param serviceIndex - Index of the service to target (0-based)
	 * @param variantIndex - Index of the variant to select
	 */
	selectTargetVariant(
		serviceIndex: number = 0,
		variantIndex: number,
	) {
		cy.get(this.model.service.envelope)
			.eq(serviceIndex)
			.within(() => {
				cy.get(this.model.service.variantsOffer).within(() => {
					cy.get(this.model.serviceVariant.box)
						.eq(variantIndex)
						.click()
				})
			})

		return this
	}

	/**
	 * Selects the first option "Nechcem" (I don't want to).
	 * @param serviceIndex - Index of the service to target (0-based)
	 */
	selectNone(serviceIndex: number = 0) {
		cy.get(this.model.service.envelope)
			.eq(serviceIndex)
			.within(() => {
				cy.get(this.model.service.variantsOffer).within(() => {
					cy.get(this.model.serviceVariant.box).first().click()
				})
			})

		return this
	}
}

export const serviceSnippet = new ServiceSnippet()
