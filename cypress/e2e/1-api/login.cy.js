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
  .then((response) => {
      expect(response.status).to.eq(401);     
    });
  })

})
