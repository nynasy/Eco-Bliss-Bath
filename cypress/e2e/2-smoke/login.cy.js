describe('Page Login', () => {
    beforeEach(() => {   
      cy.visit(Cypress.env('login_url'))
    })
  
    it('vérifiez la présence du champ Email', () => {
      cy.contains('Email')
      .parent()
      .find('input[type=text]')    
     
    })

    it('vérifiez la présence du champ Mot de passe', () => {
      cy.contains('Mot de passe')
      .parent()
      .find('input[type=password]')    
      
    })

    it('vérifiez la présence du bouton Se connecter', () => {
      cy.contains('Se connecter')
      .parent()
      .find('button')    
     
    })

  })
  