/**
 * Gets the current environment from E2EFlow URL automatically.
 * @returns {string} Current environment 
 */
const getCurrentEnv = () => {
  const E2EFlow = Cypress.env('E2EFlow') || ''

  // Check URL and return matching environment
  if (E2EFlow.includes('nay.sk')) return 'prod'
  if (E2EFlow.includes('.rc.')) return 'rc'
  if (E2EFlow.includes('beta')) return 'beta' 

  // Default to prod if nothing matches
  return 'prod'
}

/**
 * Environment-specific product URLs.
 * Each environment has different available products.
 */
const environmentUrls = {
  prod: {
    // Phones 
    iphone15: '/mobilny-telefon-apple-iphone-15-128gb-cierny-mtp03sx-a',
    iphone15blue: '/mobilny-telefon-apple-iphone-16-pro-128-gb-pustny-titan-mynf3sx-a',
    pushButtonPhone: '/mobilny-telefon-cpa-halo-28-senior-cpa-halo-28-red-cerveny',

    // TV
    TV: '/televizor-tcl-55c805',
    TV_DPD: '/televizor-gogen-tvh-24p352t',

    // Others
    battery: '/bateria-alkalicka-energizer-base-lr-03-2-ks-base-lr-03-2ks',
    withBazaar: '/router-tp-link-tl-mr100-4g-lte-tl-mr100',
    dryer: '/susicka-bielizne-aeg-absolutecare-plus-9000-tr959m6sc-biela',
    tablet: '/tablet-lenovo-tab-p11-2nd-gen-6-gb-128-gb-zabf0076cz-sivy',
    powerBank: '/powerbank-gogen-pb200008-20000-mah-usb-c-pd-20w-pb200008s-strieborna',
    boschSet: '/susicka-bielizne-aeg-absolutecare-plus-9000-tr959m6sc-biela',
    porec: '/chladnicka-s-mraznickou-lg-gbp62mcnbc-cierna-ocel'
  },

  rc: {
    // Phones 
    iphone15: '/mobilny-telefon-apple-iphone-15-128gb-cierny-mtp03sx-a',
    iphone15blue: '/mobilny-telefon-apple-iphone-16-pro-128-gb-pustny-titan-mynf3sx-a',
    pushButtonPhone: '/mobilny-telefon-cpa-halo-28-senior-cpa-halo-28-red-cerveny',

    // Specific
    withBazaar: '/tlaciaren-multifunkcna-canon-i-sensys-mf3010-2x-toner-5252b034aa-cierna',
    withGift: '/mobilny-telefon-samsung-galaxy-s25-ultra-5g-12-gb-512-gb-sm-s938bzkgeue-cierny',

    // TV
    TV: '/televizor-tcl-55c805',
    TV_DPD: '/televizor-gogen-tvh-24p352t',

    // Others
    battery: '/bateria-alkalicka-energizer-base-lr-03-2-ks-base-lr-03-2ks',
    dryer: '/susicka-bielizne-aeg-absolutecare-plus-9000-tr959m6sc-biela',
    tablet: '/tablet-lenovo-tab-p11-2nd-gen-6-gb-128-gb-zabf0076cz-sivy',
    powerBank: '/powerbank-gogen-pb200008-20000-mah-usb-c-pd-20w-pb200008s-strieborna',
    boschSet: '/susicka-bielizne-aeg-absolutecare-plus-9000-tr959m6sc-biela',
    porec: '/chladnicka-s-mraznickou-lg-gbp62mcnbc-cierna-ocel'
  },

  beta: {
    // Phones 
    iphone15: '/mobilny-telefon-apple-iphone-15-128gb-cierny-mtp03sx-a',
    iphone15blue: '/mobilny-telefon-apple-iphone-16-pro-128-gb-pustny-titan-mynf3sx-a',
    pushButtonPhone: '/mobilny-telefon-aligator-a830-senior-a830r-cerveny',

    // Specific
    withBazaar: null, // No product available
    withGift: '/mobilny-telefon-samsung-galaxy-s25-ultra-5g-12-gb-512-gb-sm-s938bzkgeue-cierny',

    // TV
    TV: '/televizor-tcl-55c805',
    TV_DPD: '/televizor-gogen-tvh-24p352t',

    // Others
    battery: '/bateria-alkalicka-energizer-base-lr-03-2-ks-base-lr-03-2ks',

    dryer: '/susicka-bielizne-aeg-absolutecare-plus-9000-tr959m6sc-biela',
    tablet: '/tablet-lenovo-tab-p11-2nd-gen-6-gb-128-gb-zabf0076cz-sivy',
    powerBank: '/powerbank-gogen-pb200008-20000-mah-usb-c-pd-20w-pb200008s-strieborna',
    boschSet: '/susicka-bielizne-aeg-absolutecare-plus-9000-tr959m6sc-biela',
    porec: '/chladnicka-s-mraznickou-lg-gbp62mcnbc-cierna-ocel'
  }
}

/** Static URLs that don't change across environments. */
const staticUrls = {
  category: {
    fridges: '/chladnicky',
    iPhone15K: '/iphone-15',
    macBooks: '/macbooky',
    smartphones: '/inteligentne-telefony',
    TV_K: '/televizory',
  },

  // Cart
  cart: '/kosik',
  clearCart: '/kosik?do=dropBasket',
  cartStepTwo: '/kosik/doprava-platba',

  // Customer
  myAccount: '/zakaznicka-sekcia/moj-ucet',
  changePassword: '/zakaznicka-sekcia/zmena-hesla',
  forgotPassword: '/zakaznik/zabudnute-heslo',
  registration: '/zakaznik/registracia',
  privacyPolicy: '/napoveda/zasady-ochrany-osobnych-udajov',

  // Other
  compare: '/porovnat',
  stores: '/predajne',
}

/** Main URLs object with environment-aware product selection. */
export const urls = {
  product: {
    ...environmentUrls[getCurrentEnv()],
    // Fallback to prod if environment not found
    ...(environmentUrls[getCurrentEnv()] ? {} : environmentUrls.prod)
  },
  ...staticUrls
}
