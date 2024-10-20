const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:8081/",

  },
  env: {
    login_url: 'http://localhost:8080/#/login',
    username: 'test2@test.fr',
    password: 'testtest'
  },
});
