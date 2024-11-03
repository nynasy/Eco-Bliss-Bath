
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


    it("Ajouter un avis sans titre", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false,
        body: {
          title: null,
          comment: 'top',
          rating: 5,
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   



    it("Ajouter un avis sans note", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false ,
        body: {
          title: 'top',
          comment: 'fonctionnelle',
          rating: null,
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   


    it("Ajouter un avis sans commentaires", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false ,
        body: {
          title: 'top',
          comment: null,
          rating: 5,
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   


    it("Ajouter un avis avec une note superieur à 5", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false ,
        body: {
          title: 'top',
          comment: 'fonctionnelle',
          rating: 6,
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   

    it("Ajouter un avis avec une note inferieur à 1", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false ,
        body: {
          title: 'top',
          comment: 'fonctionnelle',
          rating: 0,
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   

    it("Ajouter un avis avec une chaîne non numerique dans la note", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false ,
        body: {
          title: 'top',
          comment: 'fonctionnelle',
          rating: "ddddddddd",
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   


    it("Ajouter un avis avec une chaîne de plus de 255 caractères", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'POST',
        url : '/reviews',
        failOnStatusCode: false ,
        body: {
          title: "a".repeat(256),
          comment: 'fonctionnelle',
          rating: 5,
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400);   

        });
      })
    })   





    




        
  });