const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fep4xv',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8081/",

  },
  reporter: 'mochawesome',
  "reporterOptions": {
    "reportDir": "cypress/results",
    "charts" : true,
    "overwrite": false,
    "html": true,
    "json": false
  },
  env: {
    login_url: 'http://localhost:8080/#/login',
    username: 'test2@test.fr',
    password: 'testtest'
  },





});
