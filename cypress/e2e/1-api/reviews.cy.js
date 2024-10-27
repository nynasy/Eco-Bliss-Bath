
before(() => {
  cy.login()
  cy.saveLocalStorage()
})

beforeEach(() => {
cy.restoreLocalStorage()
})

describe("Api avis", () => {
    it("Recuperer la liste des avis", () => {
      cy.request({
       url : "/reviews",
       failOnStatusCode: false 
    })
    .then((avis) => {
        expect(avis.status).to.eq(200);     
      });
    })


    it("Ajouter un avis", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        body: {
          title: 'top',
          comment: 'fonctionnelle',
          rating: '5',
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(200);   

        });
      })
    })   


        
  });