const { execSync } = require('child_process')

const environments = [
  'prod',
  'rc',
  'beta'
]

// Paste path to the choosen spec
const spec = 'cypress/e2e/regression/catalog_menu.cy.ts'

const results = []

for (const env of environments) {
  console.log(`\nRunning tests on: ${env}\n`)

  try {
    execSync(`npx cypress run --browser chrome --env E2EFlow=${env} --spec '${spec}'`, {
      stdio: 'inherit'
    })

    results.push({ env, status: '✅ PASSED' })
  } catch (error) {
    results.push({ env, status: '❌ FAILED' })
  }
}

console.log('\nTest Summary:')
results.forEach(({ env, status }) => {
  console.log(`${status} → ${env}`)
})

