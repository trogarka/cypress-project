/**
 * This PO handles interactions with the product detail page. Due to its complexity, it is divided into smaller logical pagobjects.
 */

export class ProductDetailPage {
	static readonly selectors = {
		envelope: '.product-detail',
		essential: '.product-detail-essential',

		mainImage: '#product-gallery-main-zoom',
		galleryCarousel: '.product-gallery-slider',

		productTitle: '.product-detail-title',
		perex: '.product-detail-perex-box',
		moreDescriptionButton: '.product-detail-perex-more-description',

		priceBox: '.product-price', // Locators differ for each user; this one works universally for the whole price block.

		availabilityBox: '.product-availability',
		primaryAddButton: '.product-availability [data-qa="btn-cart"]',

		actionsBox: '.product-detail-actions',
		compareButton: '.btn-compare-text',

		brandLogo: '.brand-logo',

		// Recommended services displayed on the product detail page
		serviceSection: '.product-supplement',
		serviceSectionTitle: '.product-supplement .section-title',

		service: {
			box: '.service-box',
			thumbnail: '.service-box-thumb',
			title: '.service-box-title',
			tooltip: '[data-qa="show-service-info"]',
			tooltipContent: '.tooltip-inner',
			price: '[data-qa="service-box-price"]',
		},

		productNavigation: '.product-detail__navigation',
		description: 'card-description-content',
		descriptionContent: '.product-description-content',

		parameters: '.card-description-parameters',
		documents: '.to-download.description.card-spy',

		reviews: '.card-reviews-body',
	}

	model = ProductDetailPage.selectors

	/** Verifies all tooltips in the recommended services section by hovering over them and checking their content. */
	assertServiceTooltips() {
		const service = this.model.service

		cy.get(service.tooltip).each(($tooltip) => {
			cy.wrap($tooltip).trigger('mouseover')
			cy.get(service.tooltipContent)
				.should('be.visible')
				.and('not.be.empty')
				.invoke('text')
				.should('have.length.greaterThan', 0)
			cy.wrap($tooltip).trigger('mouseout')
		})

		return this
	}

	/** Verifies the visibility of elements in the recommended services section on the product detail page. */
	assertServiceVisibility() {
		cy.get(this.model.serviceSection).should('be.visible')
		cy.get(this.model.serviceSectionTitle).should('be.visible')

		const service = this.model.service
		cy.get(service.box).should('be.visible')
		cy.get(service.thumbnail).should('be.visible')
		cy.get(service.title).should('be.visible')
		cy.get(service.tooltip).should('be.visible')
		cy.get(service.price).should('be.visible')

		return this
	}

	/** Verifies the visibility of key elements on the product detail page. */
	assertVisibleElements() {
		cy.get(this.model.envelope).should('be.visible')
		cy.get(this.model.essential).should('be.visible')
		cy.get(this.model.mainImage).should('be.visible')
		cy.get(this.model.galleryCarousel).should('be.visible')
		cy.get(this.model.productTitle).should('be.visible')
		cy.get(this.model.perex).should('be.visible')
		cy.get(this.model.priceBox).should('be.visible')
		cy.get(this.model.availabilityBox).should('be.visible')
		cy.get(this.model.actionsBox).should('be.visible')
		cy.get(this.model.brandLogo).should('be.visible')
		cy.get(this.model.productNavigation).should('be.visible')
		cy.get(this.model.descriptionContent).should('be.visible')
		cy.get(this.model.parameters).should('be.visible')
		cy.get(this.model.documents).should('be.visible')
		cy.get(this.model.reviews).should('be.visible')

		return this
	}

	/** Clicks on primary "add to cart" button and open intermediate basket. */
	clickAddButton() {
		cy.get(this.model.primaryAddButton).should('be.visible').click()

		return this
	}
}

export const productDetailPage = new ProductDetailPage()