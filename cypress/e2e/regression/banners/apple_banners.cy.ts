import { appleKeywords, getUrlsForEnvironment } from '@data/apple_banners_data'
import { categoryBanner } from '@pages/banners/category_banner_page'

describe('TEST-9962 Apple Category Banners Validation', () => {
	const urls = getUrlsForEnvironment()
	const bannerTitle = categoryBanner.model.mainBanner.title

	urls.forEach((url) => {
		itOnEnv(['prod', 'rc'], `${url}`, () => {
			cy.visit(Cypress.env('E2EFlow') + url)

			cy.get(bannerTitle)
				.should('have.length.greaterThan', 0)
				.each(($banner) => {
					const title = ($banner.attr('title') || '').toLowerCase()

					const hasKeyword = appleKeywords.some((keyword) =>
						title.includes(keyword),
					)

					expect(
						hasKeyword,
						`Banner "${$banner.attr('title')}" missing Apple keyword`,
					).to.be.true
				})
		})
	})
})
