import './commands'
import 'cypress-xpath'
import 'cypress-real-events/support'


Cypress.on('uncaught:exception', (err, runnable) => { 
  return false
})

beforeEach(() => {
  cy.acceptCookies()
})

declare global {
  var itOnEnv: (allowedEnvs: string[], title: string, testFn: () => void) => void
  var describeOnEnv: (allowedEnvs: string[], title: string, suiteFn: () => void) => void
}

global.itOnEnv = function (allowedEnvs: string[], title: string, testFn: () => void) {
  const baseUrl = Cypress.env('E2EFlow') // Detect current environment based on the baseUrl

  let currentEnv = null

  if (baseUrl.includes('nay.sk')) {
    currentEnv = 'prod'
  } else if (baseUrl.includes('rc')) {
    currentEnv = 'rc'
  } else if (baseUrl.includes('beta')) {
    currentEnv = 'beta'
  }

  if (allowedEnvs.includes(currentEnv)) { // Check if the current environment is in the list of allowed environments
    it(title, testFn)
  } else {
    it.skip(`${title} [SKIPPED - env: ${currentEnv}]`, testFn)
  }
}

global.describeOnEnv = function (allowedEnvs: string[], title: string, suiteFn: () => void) {
  const baseUrl = Cypress.env('E2EFlow')

  let currentEnv = null

  if (baseUrl.includes('nay.sk')) {
    currentEnv = 'prod'
  } else if (baseUrl.includes('rc')) {
    currentEnv = 'rc'
  } else if (baseUrl.includes('beta')) {
    currentEnv = 'beta'
  } 

  if (allowedEnvs.includes(currentEnv)) {
    describe(title, suiteFn)
  } else {
    describe.skip(`${title} [SUITE SKIPPED - env: ${currentEnv}]`, suiteFn)
  }
}

