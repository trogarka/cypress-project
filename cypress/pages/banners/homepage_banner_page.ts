export const homepageIntroslider = {
    model: {
        bannerCarousel: '[data-qa="amp.homepage.introslider"]',
        bannerLocator: '.amp-banner__item.swiper-slide',
        activeBanner: '.swiper-slide-visible.swiper-slide-active',
        swiperPrev: '.swiper-button-prev',
        swiperNext: '.swiper-button-next',
        paginationBullet: '.swiper-pagination-bullet',
        bannerLink: '.amp-banner__item a',
        bannerImage: '.swiper-slide-visible > .amp-banner__content > picture > img',
        errorContainer: '#error-container',
        promoIcons: '.promo-icons',
        forBusiness: 'DATART PRO podnikání',
        purchaseAdvisor: 'Rádce DATART',
        currentAction: 'Aktuální akce',
    },

    /** Checks the visibility of the key elements. */
    checkVisibleElements(): void { 
        const el = this.model
        cy.get(el.bannerCarousel).should('be.visible').realHover()
        cy.get(el.swiperNext).should('be.visible')
        cy.get(el.swiperPrev).should('be.visible')
        cy.get(el.paginationBullet).should('be.visible')
    },

    /** Retrieves all banner URLs and verifies that the response is 200 without opening the pages. */
    getAllBannerUrls() { 
        const linkLocator = this.model.bannerLink
        const collected: string[] = []

        cy.get(linkLocator).each(($link) => {
            const href = $link.prop('href') as string | undefined
            if (href && /^https?:\/\//.test(href)) {
                collected.push(href)
            }
        }).then(() => {
            const uniqueUrls = Array.from(new Set(collected))

            cy.wrap(uniqueUrls, { log: false }).each((url: string) => {
                cy.request({ url, method: 'GET', failOnStatusCode: false })
                    .its('status')
                    .should('eq', 200)
            })
        })
    },

    /** Checks that each banner has an image (src). */
    checkAllBannersImgs(): void {
        const imageLocator = this.model.bannerImage

        cy.get(imageLocator).each(($img) => {
            cy.wrap($img).should('have.attr', 'src').and('not.be.empty')
        })
    },

}
