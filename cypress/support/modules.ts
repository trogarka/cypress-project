/** Account */
import { loginPage } from '@pages/account/login_page'

/** Banners */
import { categoryBanner } from '@pages/banners/category_banner_page'
import { homepageIntroslider } from '@pages/banners/homepage_banner_page'

/** Basket */
import { basketStepOne } from '@pages/basket/basket_step_one'
import { basketStepTwo } from '@pages/basket/basket_step_two'

/** Homepage */
import { catalogPage } from '@pages/catalog_page'

/** Modals */
import { actionModal } from '@pages/modals/action_modal'
import { subBasketModal } from '@pages/modals/sub_basket_modal'

/** Product */
import { productDetailPage } from '@pages/product/product_detail_page'

/** Other */
import { headerPage } from '@pages/header_page'
import { serviceSnippet } from '@pages/service_snippet'
import { storePage } from '@pages/store_page'

export const modules = {
// Account
loginPage,

// Banners
categoryBanner,
homepageIntroslider,

// Basket
basketStepOne,
basketStepTwo,

// Homepage
catalogPage,

// Modals
actionModal,
subBasketModal,

// Product
productDetailPage,

// Other
headerPage,
serviceSnippet,
storePage,
}
