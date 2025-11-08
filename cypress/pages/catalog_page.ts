import type { DetailCategoryKey, MainCategoryKey, SubCategoryKey } from '@data/catalog_data'
import { detailCategories, mainCategories, subCategories } from '@data/catalog_data'

/**
 * This PO handles interactions with the catalog canvas, navigation through all three category levels, 
 * and the non-final category (without products).
 */

export class CatalogPage {
    static readonly selectors = {
        navigationBar: '.js-mega-menu-list-level-1',
        navigationItem: '.js-mega-menu .mega-menu__item',

        canvas: {
            envelope: '#mega-menu-submenu-dialog',
            categoryBox: '.mega-menu__item.js-open-level-3',
            categoryImg: '.js-mega-menu-item-image-level-2',
            categoryContent: '.mega-menu__item-content',

            subCategoryName: '.js-mega-menu-item-name-level-2',
            detailCategoryName: '.js-mega-menu-item-level-3', // Same selector for more categories line
            dynamicLink: '.mega-menu__item-content a[href]'
        },

        nonFinalCategory: {
            envelope: '.product-category-nekoncova',
            pageTitle: '.product-category-title',
            pageDescription: '.category-description',
            grid: '[data-qa="snippet--login-refresh"]',

            categoryBox: '[data-qa="snippet--login-refresh"] [href]',
            categoryImg: '.category-tree-wrap img',
            categoryName: '.category-tree-title'
        }

    }

    model = CatalogPage.selectors

    /** Verifies the visibility of key elements in the catalog menu canvas. */
    assertVisibleElements() {
        cy.get(this.model.navigationBar).should('be.visible')
        cy.get(this.model.canvas.envelope).should('be.visible')
        cy.get(this.model.canvas.categoryBox).should('be.visible')
        cy.get(this.model.canvas.subCategoryName).should('be.visible')
        cy.get(this.model.canvas.detailCategoryName).should('be.visible')
        return this
    }

    /**
     * Hovers over category in navigation bar to open menu canvas. 
     * @param {MainCategoryKey} categoryKey - Category href (e.g., '/telefony')
     */
    hoverMainCategory(categoryKey: MainCategoryKey) {
        const categoryHref = mainCategories[categoryKey].href
        const categorySelector = `${this.model.navigationItem}[href="${categoryHref}"]`

        if (!categoryHref) throw new Error(`Category '${categoryKey}' not found`)

        cy.get(categorySelector)
            .should('be.visible')
            .trigger('mouseenter', { force: true })
        cy.get(this.model.canvas.envelope).should('be.visible')

        return this
    }

    /** Hovers over random category in navigation bar to open menu canvas. */
    hoverRandomCategory() {
        cy.get(this.model.navigationItem)
            .then($items => {
                const randomIndex = Math.floor(Math.random() * $items.length)
                const href = $items.eq(randomIndex).attr('href')

                const categorySelector = `${this.model.navigationItem}[href="${href}"]`

                cy.get(categorySelector)
                    .should('be.visible')
                    .trigger('mouseenter')
                cy.get(this.model.canvas.envelope).should('be.visible')
            })

        return this
    }

    /**
     * Navigates to sub or detailed category by clicking link in canvas menu.
     * @param {SubCategoryKey} categoryKey - Sub category href (e.g., '/mobilne-telefony')
     */
    clickSubCategory(categoryKey: SubCategoryKey) {
        const categoryHref = subCategories[categoryKey].href
        const categorySelector = `${this.model.canvas.dynamicLink}[href="${categoryHref}"]`

        if (!categoryHref) throw new Error(`Category '${categoryKey}' not found`)

        cy.get(categorySelector)
            .first()
            .click()

        return this
    }

    /**
     * Navigates to detail category by clicking link in canvas menu.
     * @param {DetailCategoryKey} categoryKey - Detail category href (e.g., '/inteligentne-telefony')
     */
    clickDetailCategory(categoryKey: DetailCategoryKey) {
        const categoryHref = detailCategories[categoryKey].href
        const categorySelector = `${this.model.canvas.dynamicLink}[href="${categoryHref}"]`

        if (!categoryHref) throw new Error(`Category '${categoryKey}' not found`)

        cy.get(categorySelector).click()

        return this
    }

    /**
     * Clicks on "show more categories" link in canvas menu.
     * @param {SubCategoryKey} categoryKey - Sub category href (e.g., '/mobilne-telefony')
     */
    showMoreCategories(categoryKey: SubCategoryKey) {
        const categoryHref = subCategories[categoryKey].href
        const categorySelector = `${this.model.canvas.dynamicLink}[href="${categoryHref}"]`

        cy.get(categorySelector)
            .last()
            .click()

        return this
    }

    /** Picks one random category from the canvas and validates all its links (HTTP 200). */
    validateRandomCategoryLinks() {
        cy.get(this.model.canvas.categoryContent)
            .then(($categories) => {
                const randomIndex = Math.floor(Math.random() * $categories.length)
                const randomCategory = $categories.eq(randomIndex)

                // Get all links inside that category
                cy.wrap(randomCategory)
                    .find('a[href]')
                    .should('have.length.greaterThan', 0)
                    .each(($link) => {
                        const href = $link.attr('href')

                        if (!href) return

                        // Use cy.request to validate status
                        cy.request({
                            url: href,
                            failOnStatusCode: false, // avoid breaking early
                        }).then((resp) => {
                            expect(resp.status, `Link ${href} should return 200`).to.eq(200)
                        })
                    })
            })
    }

    /** Verifies the visibility of key elements in non-final category. */
    assertNonFinalCategoryElements() {
        const nonFinalCategory = this.model.nonFinalCategory

        cy.get(nonFinalCategory.envelope).should('be.visible')
        cy.get(nonFinalCategory.pageTitle).should('be.visible')
        cy.get(nonFinalCategory.pageDescription).should('be.visible')
        cy.get(nonFinalCategory.grid).should('be.visible')
        cy.get(nonFinalCategory.categoryBox).should('be.visible')
        cy.get(nonFinalCategory.categoryImg).should('be.visible')
        cy.get(nonFinalCategory.categoryName).should('be.visible')

        return this
    }

    /** Navigates to subcategories by clicking on category box in non-final category. */
    navigateNonFinalCategory(categoryKey: DetailCategoryKey | MainCategoryKey | SubCategoryKey) {
        const allCategories = {
            ...mainCategories,
            ...subCategories,
            ...detailCategories
        }

        const categoryHref = allCategories[categoryKey]?.href

        if (!categoryHref) throw new Error(`Category '${categoryKey}' not found`)

        cy.log(`Navigating to non-final category: ${categoryKey} (${categoryHref})`)

        const categorySelector = `${this.model.nonFinalCategory.categoryBox}[href="${categoryHref}"]`

        cy.get(this.model.nonFinalCategory.envelope).should('be.visible')
        cy.get(categorySelector).should('be.visible').click()
        cy.url().should('include', categoryHref)

        return this
    }
}

export const catalogPage = new CatalogPage()