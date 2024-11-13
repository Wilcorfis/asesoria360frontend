import { defineConfig } from "cypress";

export default defineConfig({


  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },

  e2e: {
    defaultCommandTimeout: 10000, // Cambia 10000 ms (10 segundos) o el valor que necesites
    requestTimeout: 10000,     
    responseTimeout: 15000,   
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        // Si deseas usar la propiedad del navegador, puedes acceder a ella aquí
        console.log(browser.name); // Ejemplo de uso del nombre del navegador

        // Configuración de CORS
        launchOptions.args.push('--disable-web-security');
        return launchOptions;
      });

      

      // implement node event listeners here
    },
  },
});
