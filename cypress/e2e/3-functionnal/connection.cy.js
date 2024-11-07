describe('Connection', () => {           

        it('Se connecter et voir le lien Mon Panier', () => {    
            cy.visit('http://localhost:8080')   

            cy.contains("a", "Connexion")
            .should("have.attr", "href", "#/login")
            .click()

            cy.url().should('eq', Cypress.env('login_url')) 

            cy.connect()  

            cy.contains("a", "Mon panier")
            .should("have.attr", "href", "#/cart")  

        })    
       
  })
  