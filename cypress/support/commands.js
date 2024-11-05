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
      orders.body.orderLines.map(line => {
          cy.log("delete order line : " + line.id)
          cy.request(
            {
              method: 'DELETE',
              url : `/orders/${line.id}/delete`,
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
  .click() 
  
})