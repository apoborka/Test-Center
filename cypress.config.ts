import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
  },

  e2e: {
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}', // Updated to point to component tests
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});