describe('Page Welcome', () => {
    beforeEach(() => {   
      cy.visit('http://localhost:8080/')
    })
  
    it('Vérifier la présence du lien de connexion', () => {
        cy.contains("a", "Connexion").should("have.attr", "href", "#/login");
    })

  })
  