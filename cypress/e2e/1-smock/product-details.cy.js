describe('Détail produit', () => {
    beforeEach(() => {  
      cy.visit(Cypress.env('login_url'))
      cy.connect()
      cy.visit('http://localhost:8080/#/products/6')
    })
  
    it('vérifiez la présence du bouton d’ajout au panier', () => {
      cy.contains('Ajouter au panier')
      .parent()
      .find('button')    
    })

    it('vérifiez la présence du champ de disponibilité du produit', () => {
      cy.contains(/^(\d*) en stock$/)    
    })


  })
  