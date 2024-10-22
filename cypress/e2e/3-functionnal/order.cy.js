//

/*vous êtes connectés avec les infos données précédemment ;
○ cliquez sur un des produits ;
○ le stock doit être supérieur à 1 pour pouvoir être ajouté ;
○ cliquez sur ajouter pour ajouter au panier :
■ vérifiez que le produit a été ajouté au panier,
■ retournez sur la page du produit et vérifiez que le stock a
enlevé le nombre de produits qui sont dans le panier,
■ vérifiez les limites
● entrez un chiffre négatif,
● entrez un chiffre supérieur à 20 ;
○ Ajout d’un élément au panier (clic bouton ajouter au panier,
vérification du contenu du panier via l’A*/

describe('Ajout panier', () => {    

    before(() => {                  
        cy.emptyCart()
    })

    it("Ajout d'un produit disponible", () => {
        
        cy.log("Aller sur la page de connexion")        
        cy.visit(Cypress.env('login_url'))

        cy.log("remplir le formulaire de connexion et cliquer sur se connecter")
        cy.connect()            

        cy.log("on vérifie que le lien 'Mon panier' est bien visible")
        cy.contains("a", "Mon panier")
        .should("have.attr", "href", "#/cart")  

        cy.log("aller sur la page liste de produits")
        cy.visit('http://localhost:8080/#/products')
        
        cy.log("cliquez sur un produit disponible : id = 8")
        cy.get('button[ng-reflect-router-link="/products,8"]')
        .should("be.visible")
        .wait(1000)
        .click()  

        cy.log("vérifier qu'on est dans la page détail du produit")
        cy.url().should('eq', 'http://localhost:8080/#/products/8') 

        cy.log("vérifier le stock avant ajout = 6")
        cy.contains('6 en stock')

        
        cy.log("cliquer sur le bouton 'Ajouter panier'")
        cy.contains('Ajouter au panier')
        .should("be.visible")
        .parent()
        .find('button')
        .wait(1000)
        .click()    

        cy.log("vérifier qu'on est dans la page du panier")
        cy.url().should('eq', 'http://localhost:8080/#/cart')  


        cy.log("vérifier que le produit est présent par son nom")
        cy.contains('Milkyway')

        cy.log("vérifier que la quantité est égale à 1")
        cy.get('input[type="number"]')
        .should('have.value', 1)

        cy.log("retourner sur la page du produit")
        cy.visit('http://localhost:8080/#/products/8')


        cy.log("vérifier que le stock aprés ajout = 5")
        cy.contains('5 en stock')

    })    
 


})
