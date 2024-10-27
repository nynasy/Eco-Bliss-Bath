before(() => {
    cy.login()
    cy.saveLocalStorage()
})

beforeEach(() => {
  cy.restoreLocalStorage()
})

  describe('Api Login', () => {
    it('utilisateur connu', () => {
      cy.getLocalStorage('token').should('exist')
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
      })     

    })
    
    it("utilisateur inconnu", () => {    
      cy.request({
        method: 'POST',
        url: '/login',
        body: {
          username: 'xxxxx@test.fr',
          password: 'testtest',
        },
        failOnStatusCode: false 
    })
    .then((orders) => {
        expect(orders.status).to.eq(401);     
      });
    })

  })
