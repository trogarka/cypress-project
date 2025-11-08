import { configureXrayPlugin } from '@csvtuda/cypress-xray-plugin'
import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config() 

export default defineConfig({
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 1024,
  video: false, 
  screenshotOnRunFailure: true, 

  projectId: "npf7e8",
  numTestsKeptInMemory: 0,

  env: {
    E2EFlow: process.env.E2EFlow,
  },

  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',

    experimentalRunAllSpecs: true,

    async setupNodeEvents(on, config) {
      if (process.env.JIRA_EXECUTION_KEY && process.env.JIRA_EXECUTION_KEY.trim() !== '') {
        await configureXrayPlugin(on, config, {
          jira: {
            projectKey: "TEST",
            url: "https://hptronic.atlassian.net",
            testExecutionIssue: {
              key: process.env.JIRA_EXECUTION_KEY
            },
          },
          xray: {
            uploadResults: true,
            uploadScreenshots: false
          }
        })
      }
    }

  },

})
