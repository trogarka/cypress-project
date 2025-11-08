import { type RegionKey, regions } from '@data/regions_data'
import { modules } from '@support/modules'
import { urls } from '@support/urls'

const { storePage } = modules

describe('Store list', () => {
	beforeEach(() => {
		cy.visit(Cypress.env('E2EFlow') + urls.stores)
	})

	it('should opens store list and verify essential elements', () => {
		storePage.assertStoreListElements()
	})

	it('TEST-9728 should verify the store list elements and filter stores for every region', () => {
		Object.entries(regions).forEach(([key]) => {
			const regionKey = key as RegionKey

			storePage
				.selectRegion(regionKey)
				.assertOnlySelectedStoresVisible(regionKey)
		})
	})

	it('should validate store URL format matches expected pattern', () => {
		// Expected pattern - the store URL contains /predajne and does not end with a number
		const expectedPattern =
			/^https?:\/\/[^\/]+\/predajne\/[a-zA-Z0-9-]+[^0-9]\/?$/
		const invalidUrls: string[] = []

		cy.get(storePage.model.storeLink)
			.each(($link) => {
				cy.wrap($link)
					.invoke('prop', 'href')
					.then((href) => {
						if (!expectedPattern.test(href)) {
							invalidUrls.push(href)
						}
					})
			})
			.then(() => {
				if (invalidUrls.length > 0) {
					throw new Error(
						`Found invalid store URLs:\n${invalidUrls.join('\n')}`,
					)
				}
			})
	})

	it('should verify each store link is accessible', () => {
		const invalidUrls: string[] = []

		cy.get(storePage.model.storeLink)
			.each(($link) => {
				cy.wrap($link)
					.invoke('prop', 'href')
					.then((href) => {
						cy.request({
							url: href,
							failOnStatusCode: false,
						}).then((response) => {
							if (response.status !== 200) {
								invalidUrls.push(`${href} -> ${response.status}`)
							}
						})
					})
			})
			.then(() => {
				if (invalidUrls.length > 0) {
					throw new Error(
						`Found inaccessible store URLs:\n${invalidUrls.join('\n')}`,
					)
				}
			})
	})
})
