describe("Api commandes", () => {
    before(() => {
      cy.login()
      cy.saveLocalStorage()
      console.log(' Mon Token : ' + cy.getLocalStorage('token'))
    })
    
    beforeEach(() => {
      cy.restoreLocalStorage()
    })

    it("Récuperer le panier de l'utilisateur en cours - Sans connexion", () => {    

      cy.request({
       url : "/orders",
       failOnStatusCode: false 
    })
    .then((orders) => {
        expect(orders.status).to.eq(401);     
      });
    })
    
    it("Récuperer le panier de l'utilisateur en cours - Avec connexion", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        url : "/orders",
        failOnStatusCode: false,
        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {
          console.log(cy.getLocalStorage('token'))
          expect(orders.status).to.eq(200);   

          expect(orders.body.id).to.not.be.null

        });
      })
    })   

    it("Ajouter un produit disponible", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'PUT',
        url : 'orders/add',
        body: {
          product: '7',
          quantity: '1',
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
    
    it("Ajouter un produit en rupture de stock", () => {
      cy.getLocalStorage('token').then(token => {
        console.log('token', token)
     
        cy.request({
        method: 'PUT',
        url : 'orders/add',
        body: {
          product: '3',
          quantity: '1',
        },

        headers : {
            Authorization: 'Bearer ' + token
        }
      })
      .then((orders) => {       
          expect(orders.status).to.eq(400, "Code de Requete invalide car produit en rupture de stock");   

        });
      })
    })   
    

    
  });