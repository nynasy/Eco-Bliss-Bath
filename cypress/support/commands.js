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

 Cypress.Commands.add('emptyCart', () => {

  cy.login()
  
  cy.getLocalStorage('token').then(token => {
    console.log('token', token)
 
    cy.request(
      {
        url : "/orders",
        failOnStatusCode: false,
        headers : {
            Authorization: 'Bearer ' + token
        }
      }
    )
    .then((orders) => {
      cy.log("orders : " + orders.id)
      orders.body.orderLines.map(product => {
          cy.log("delete product : " + product.id)
          cy.request(
            {
              method: 'DELETE',
              url : `/orders/${product.id}/delete`,
              failOnStatusCode: false,
              headers : {
                  Authorization: 'Bearer ' + token
              }
            }
          )  
        })  
    });
  })

})


 Cypress.Commands.add('connect', () => {

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
  .should("be.visible")
  .wait(1000) 
  .click() 
  
})