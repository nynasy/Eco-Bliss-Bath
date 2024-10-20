describe("Api produit", () => {
    it("Recuperer la liste des produits", () => {
      cy.request({
       url : "/products",
       failOnStatusCode: false 
    })
    .then((products) => {
        expect(products.status).to.eq(200);     
      });
    })

    it("Recuperer le détail d'un produit", () => {
      cy.request({
       url : "/products/3",
       failOnStatusCode: false 
    })
    .then((product) => {
        expect(product.status).to.eq(200);     
        expect(product.body.id).to.eq(3, "l'id correspond à celui attendu")
      });
    })
    
    it("Recuperer 3 produits aléatoires", () => {
      cy.request({
       url : "/products/random",
       failOnStatusCode: false 
    })
    .then((product) => {
        expect(product.status).to.eq(200);     
      });
    })
    
  });