// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands'

Cypress.Commands.add('login', () => {
    cy.request({
      method: 'POST',
      url: '/login',
      body: {
        username: Cypress.env('username') ,
        password: Cypress.env('password'),
      },
    })
      .its('body')
      .then(response => {
        cy.log(response)
        cy.setLocalStorage('token', response.token)
      })
 })

 Cypress.Commands.add('connect', () => {

  cy.visit(Cypress.env('login_url'))

  cy.contains('Email')
  .parent()
  .find('input[type=text]')  
  .type(Cypress.env('username'))

  cy.contains('Mot de passe')
  .parent()
  .find('input[type=password]')
  .type(Cypress.env('password'))    

  cy.contains('Se connecter')
  .parent()
  .find('button')   
  .click() 
  
})