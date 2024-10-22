describe('Connection', () => {    
        before(() => {
          
          cy.visit('http://localhost:8080')   
          cy.log('before : ' +  cy.get('a') )
         
          cy.get('a').then(($link) => {           
            cy.log('link : ' + $link.text())
            if ($link.text().includes('Déconnexion')) {
                cy.log('link : ' + $link.text())
                cy.contains("a", "Déconnexion").click()
            } 
          })
        })

        it('Cliquer sur connexion pour aller à la page de connexion', () => {    

            cy.contains("a", "Connexion")
            .should("have.attr", "href", "#/login")
            .click()

            cy.url().should('eq', Cypress.env('login_url')) 

        })

        it("Se connecter et vérifier la présence du lien 'Mon panier'", () => {
   
            cy.connect()   
            
            cy.contains("a", "Mon panier")
            .should("have.attr", "href", "#/cart")  
        })    

  })
  