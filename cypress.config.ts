import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {},
    env: {
      allureReuseAfterSpec: true,
      hideCredentials: true,
      requestMode: true
    },
    baseUrl: 'https://www.natura.com.br/',
    redirectionLimit: 100,
    experimentalRunAllSpecs: true,
    viewportHeight: 768,
    viewportWidth: 1366
  }
})
