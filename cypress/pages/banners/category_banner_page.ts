export const categoryBanner = {
	model: {
		envelope: '.category-banner',

		mainBanner: {
			container: '.category-banner__main',
			image: '.category-banner__main-image',
			title: '.amp-banner__list.swiper picture img[title]', 
			description: '.category-banner__main-description',
			button: '.category-banner__main-button',
		},

		sideBanner: {
			container: '.category-banner__side',
			image: '.category-banner__side-image',
			title: '.category-banner__side-title',
			button: '.category-banner__side-button',
		},

		promoBanner: {
			container: '.category-banner__promo',
			image: '.category-banner__promo-image',
			title: '.category-banner__promo-title',
			description: '.category-banner__promo-description',
			price: '.category-banner__promo-price',
			button: '.category-banner__promo-button',
		},
	},

	/** Checks the visibility of main banner elements. */
	assertMainBannerElements(): void {
		const mainBanner = this.model.mainBanner
		cy.get(mainBanner.container).should('be.visible')
		cy.get(mainBanner.image).should('be.visible')
		cy.get(mainBanner.title).should('be.visible')
		cy.get(mainBanner.description).should('be.visible')
		cy.get(mainBanner.button).should('be.visible')
	},

	/** Checks the visibility of side banner elements. */
	assertSideBannerElements(): void {
		const sideBanner = this.model.sideBanner
		cy.get(sideBanner.container).should('be.visible')
		cy.get(sideBanner.image).should('be.visible')
		cy.get(sideBanner.title).should('be.visible')
		cy.get(sideBanner.button).should('be.visible')
	},

	/** Checks the visibility of promo banner elements. */
	assertPromoBannerElements(): void {
		const promoBanner = this.model.promoBanner
		cy.get(promoBanner.container).should('be.visible')
		cy.get(promoBanner.image).should('be.visible')
		cy.get(promoBanner.title).should('be.visible')
		cy.get(promoBanner.description).should('be.visible')
		cy.get(promoBanner.price).should('be.visible')
		cy.get(promoBanner.button).should('be.visible')
	},

	/** Clicks the main banner button. */
	clickMainBannerButton(): void {
		cy.get(this.model.mainBanner.button)
			.should('be.visible')
			.and('be.enabled')
			.click()
	},

	/** Clicks the side banner button. */
	clickSideBannerButton(): void {
		cy.get(this.model.sideBanner.button)
			.should('be.visible')
			.and('be.enabled')
			.click()
	},

	/** Clicks the promo banner button. */
	clickPromoBannerButton(): void {
		cy.get(this.model.promoBanner.button)
			.should('be.visible')
			.and('be.enabled')
			.click()
	},

	/** Validates that banner images are loaded properly. */
	validateBannerImages(): void {
		cy.get(this.model.mainBanner.image)
			.should('be.visible')
			.and(($img) => {
				expect($img[0].naturalWidth).to.be.greaterThan(0)
			})

		cy.get('body').then(($body) => {
			if ($body.find(this.model.sideBanner.image).length > 0) {
				cy.get(this.model.sideBanner.image)
					.should('be.visible')
					.and(($img) => {
						expect($img[0].naturalWidth).to.be.greaterThan(0)
					})
			}

			if ($body.find(this.model.promoBanner.image).length > 0) {
				cy.get(this.model.promoBanner.image)
					.should('be.visible')
					.and(($img) => {
						expect($img[0].naturalWidth).to.be.greaterThan(0)
					})
			}
		})
	},

	/** Validates banner text content is not empty. */
	validateBannerContent(): void {
		cy.get(this.model.mainBanner.title).should('be.visible').and('not.be.empty')

		cy.get(this.model.mainBanner.description)
			.should('be.visible')
			.and('not.be.empty')

		cy.get('body').then(($body) => {
			if ($body.find(this.model.sideBanner.title).length > 0) {
				cy.get(this.model.sideBanner.title)
					.should('be.visible')
					.and('not.be.empty')
			}

			if ($body.find(this.model.promoBanner.title).length > 0) {
				cy.get(this.model.promoBanner.title)
					.should('be.visible')
					.and('not.be.empty')
			}
		})
	},

	/** Comprehensive validation of all banner elements */
	validateAllBanners(): void {
		cy.get(this.model.envelope).should('be.visible')
		this.assertMainBannerElements()

		cy.get('body').then(($body) => {
			if ($body.find(this.model.sideBanner.container).length > 0) {
				this.assertSideBannerElements()
			} else {
				cy.log('Side banner not found, skipping validation')
			}

			if ($body.find(this.model.promoBanner.container).length > 0) {
				this.assertPromoBannerElements()
			} else {
				cy.log('Promo banner not found, skipping validation')
			}
		})

		this.validateBannerImages()
		this.validateBannerContent()
	},
}

/** PO mapping CZ -> SK
 * split from productList
 */