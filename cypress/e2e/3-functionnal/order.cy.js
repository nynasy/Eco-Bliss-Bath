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
        cy.intercept('GET', 'http://localhost:8081/products').as('products')

        cy.visit('http://localhost:8080/#/products')
        
        cy.log("attendre que l'api récupère les produits")
        cy.wait('@products') 

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

        cy.intercept('GET', 'http://localhost:8081/orders').as('cart')
        
        cy.log("cliquer sur le bouton 'Ajouter panier'")
        cy.contains('Ajouter au panier')
        .should("be.visible")
        .parent()
        .find('button')
        .click()    

        cy.log("attendre après l'ajout au panier que l'api récupère les produits du panier")
        cy.wait('@cart') 
        

        cy.log("vérifier que le produit a été ajouté dans le panier")
        cy.contains('Milkyway')

        cy.log("vérifier dans le panier que la quantité est égale à 1")
        cy.get('input[type="number"]')
        .should('have.value', 1)   

        cy.log("retourner sur la page produit et vérifier que le stock après ajout = 5")

        cy.visit('http://localhost:8080/#/products/8')

        cy.contains('5 en stock')

    }) 

    it("Ajout d'un produit avec quantité négative", () => {    

        cy.log("Saisie d'une quantité négative")

        cy.get('input[type="number"]')
        .clear()
        .type("-1")

        cy.get('[data-cy=detail-product-form]')
        .should("be.visible")
        .should('have.class', 'ng-invalid')          

    })

    it("Ajout d'un produit avec quantité supérieure à 20", () => {    
        
        cy.log("Saisie d'une quantité superieur à 20")
        
        cy.get('input[type="number"]')
        .clear()
        .type("21")

        cy.get('[data-cy=detail-product-form]')
        .should("be.visible")
        .should('have.class', 'ng-invalid')

    }) 


})
