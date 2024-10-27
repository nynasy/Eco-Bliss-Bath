describe('Ajout panier', () => {    

    beforeEach(() => {   
        cy.emptyCart()

        cy.log("Aller sur la page de connexion")        
        cy.visit(Cypress.env('login_url'))

        cy.log("remplir le formulaire de connexion et cliquer sur se connecter")
        cy.connect()            

        cy.log("vérifier que le lien 'Mon panier' est bien visible")
        cy.contains("a", "Mon panier")
        .should("have.attr", "href", "#/cart")  

        cy.log("aller sur la page liste de produits")
        cy.visit('http://localhost:8080/#/products')

        cy.log("cliquer sur un produit disponible : id = 8")
        cy.get('button[ng-reflect-router-link="/products,8"]')
        .should("be.visible")
        .click()          
     
        cy.log("vérifier le stock avant ajout = 6")
        cy.contains('6 en stock')

    })  


     it("Ajout d'un produit disponible", () => {         
        
        cy.log("Saisie d'un quantité positive")
        cy.get('input[type="number"]')
        .clear()
        .type("1")
        
        cy.log("cliquer sur le bouton 'Ajouter panier'")
        cy.contains('Ajouter au panier')
        .should("be.visible")
        .parent()
        .find('button')
        .click()    

        cy.reload()

        cy.log("vérifier que le stock aprés ajout = 5")
        cy.contains('5 en stock')

       // cy.visit('http://localhost:8080/#/cart')
        cy.log("vérifier que le produit a ajouté dans le panier")
        cy.contains('Milkyway')

        cy.log("vérifier dans le panier que la quantité est égale à 1")
        cy.get('input[type="number"]')
        .should('have.value', 1)

    }) 

    it("Ajout d'un produit avec quantité négative", () => {    

        cy.log("Saisie d'un quantité négative")

        cy.get('input[type="number"]')
        .clear()
        .type("-1")

        cy.log("cliquer sur le bouton 'Ajouter panier'")
        cy.contains('Ajouter au panier')
        .should("be.visible")
        .parent()
        .find('button')
        .click()    

        cy.reload()

        cy.log("vérifier que le stock n'est pas modifié")
        cy.contains('6 en stock')    
        
        cy.visit('http://localhost:8080/#/cart')            

        cy.log("vérifier que le produit n'a pas été ajouté au panier")
        cy.contains('Milkyway').should('not.exist')

    }) 

    it("Ajout d'un produit avec quantité supérieure à 20", () => {    

        cy.get('input[type="number"]')
        .clear()
        .type("21")

        cy.log("cliquer sur le bouton 'Ajouter panier'")
        cy.contains('Ajouter au panier')
        .should("be.visible")
        .parent()
        .find('button')
        .click()    

        cy.reload()

        cy.log("vérifier que le stock n'est pas modifié")
        cy.contains('6 en stock')    
        
        cy.visit('http://localhost:8080/#/cart')            

        cy.log("vérifier que le produit n'a pas été ajouté au panier")
        cy.contains('Milkyway').should('not.exist')

    }) 



})
