import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1500,
  viewportHeight: 900,
  video: false,
  defaultCommandTimeout: 4000,
  responseTimeout: 20000,
  waitForAnimations: true,
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:4321',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
