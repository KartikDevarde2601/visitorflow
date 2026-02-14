import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npx nx run @visitorflow/visitorflow-web:dev',
        production: 'npx nx run @visitorflow/visitorflow-web:preview',
      },
      ciWebServerCommand: 'npx nx run @visitorflow/visitorflow-web:preview',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
