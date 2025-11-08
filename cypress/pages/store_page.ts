import { type RegionKey, regions } from '@data/regions_data'

/**
 * This PO handles interactions with the store list and store detail pages.
 */

export class StorePage {
	static readonly selectors = {
		envelope: '.store-list',
		pageTitle: '.page-title',
		pageInfo: '.stores-subtitle',
		addressInput: '#suggest',
		mapSuggestion: '.store-map-suggestion__autocomplete',
		mapContainer: '#mapContainerStoreList',

		storeListLabel: '.store-filter-form .form-group label',
		regionSelect: 'select#store-filter-region',
		regionId: '[data-regionid="xxxx"]',

		// activeFilterBox: '.store-filter-results-filtered.active',
		activeFilterMessage: '.store-filtered-action',
		cancelFilterButton: '.store-filter-cancel',

		storeList: '.store-filter-results .store-table',
		storeContainer: '.pickup-region.pickup-region-xxxx',
		storeLink: '.store-link',
		storeOpeningHours: '.store-table-col',

		storeDetail: {
			envelope: '.store-detail',
			title: '.store-detail h1',
			openingHours: '.store-opening-hours',
			address: '.store-address',
			manager: '.store-manager',
			mapContainer: '#mapContainerDetail',
			description: '.store-route-description',
			navigationLink: '.store-route-description a[href]',
		},
	}

	model = StorePage.selectors

	/** Verifies region filter is active. */
	assertActiveFilter() {
		cy.get(this.model.activeFilterMessage)
			.should('be.visible')
			.and('have.text', 'Máte zapnutý filter predajní - zrušiť ')

		return this
	}

	/** Verifies that only the selected region's stores are visible. */
	assertOnlySelectedStoresVisible(regionKey: RegionKey) {
		const regionValue = regions[regionKey].value
		const regionSelector = this.model.regionId.replace(
			'xxxx',
			regionValue,
		)

		cy.get(regionSelector)
			.should('be.visible')
			.and('have.length.greaterThan', 0)

		cy.get('[data-regionid]')
			.not(`[data-regionid="${regionValue}"]`)
			.should('not.be.visible')

		return this
	}

	/** Verifies the visibility of key elements on the store detail page. */
	assertStoreDetailElements() {
		const storeDetail = this.model.storeDetail

		cy.get(storeDetail.envelope).should('be.visible')
		cy.get(storeDetail.title).should('be.visible')
		cy.get(storeDetail.openingHours).should('be.visible')
		cy.get(storeDetail.address).should('be.visible')
		cy.get(storeDetail.manager).should('be.visible')
		cy.get(storeDetail.mapContainer).should('be.visible')
		cy.get(storeDetail.description).should('be.visible')
		cy.get(storeDetail.navigationLink).should('be.visible')

		return this
	}

	/** Verifies the visibility of key elements on the store list page. */
	assertStoreListElements() {
		cy.get(this.model.envelope).should('be.visible')
		cy.get(this.model.pageTitle).should('be.visible')
		cy.get(this.model.pageInfo).should('be.visible')
		cy.get(this.model.addressInput).should('be.visible')
		cy.get(this.model.mapContainer).should('be.visible')
		cy.get(this.model.storeListLabel).should('be.visible')
		cy.get(this.model.regionSelect).should('be.visible')

		cy.get(this.model.storeList).should('be.visible')
		cy.get(this.model.storeLink).should('be.visible')
		cy.get(this.model.storeOpeningHours).should('be.visible')

		return this
	}

	/** Verifies the store navigation link is valid and working. */
	assertStoreNavigationLink() {
		cy.get(this.model.storeDetail.navigationLink)
			.should('be.visible')
			.invoke('attr', 'href')
			.then((href) => {
				expect(href, 'navigation link has href').to.be.a('string').and
					.not.be.empty
				if (!href) {
					return
				}
				cy.request({ url: href, failOnStatusCode: false })
					.its('status')
					.should('be.gte', 200)
					.and('be.lt', 400)
			})

		return this
	}

	/** Cancels the store filter and verifies the filter is removed. */
	cancelStoreFilter() {
		cy.get(this.model.cancelFilterButton).should('be.visible').click()
		cy.get(this.model.activeFilterMessage).should('not.be.visible')

		return this
	}

	/** You can enter street, city or zip code and verify dropdown options. */
	enterAddress(address: string) {
		cy.get(this.model.addressInput).type(address)
		cy.get(this.model.mapSuggestion)
			.should('be.visible')
			.and('have.class', 'is-active')

		return this
	}

	/** Selects a random store from the visible list. */
	selectRandomStore() {
		cy.get(this.model.storeLink)
			.filter(':visible')
			.then((buttons) => {
				if (buttons.length > 1) {
					const randomIndex = Math.floor(
						Math.random() * buttons.length,
					)
					cy.wrap(buttons[randomIndex])
						.scrollIntoView()
						.should('be.visible')
						.click()
				}
			})

		return this
	}

	/**
	 * Select region by value.
	 * @param regionKey RegionKey
	 */
	selectRegion(regionKey: RegionKey) {
		const regionValue = regions[regionKey].value
		cy.get(this.model.regionSelect).select(regionValue)
		return this
	}

}

export const storePage = new StorePage()
