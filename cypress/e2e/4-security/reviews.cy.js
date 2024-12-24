describe('Reviews', () => {           

    beforeEach(() => {         

        //Aller à la page login
        cy.visit(Cypress.env('login_url'))

        //intercepter le traitement du login par l'API
        cy.intercept('POST', 'http://localhost:8081/login').as('login')

        //Se connecter
        cy.connect()   
        
        //Attendre le traitement du login par l'API
        cy.wait('@login')     

        //intercepter la recuperation des avis par l'API
        cy.intercept('GET', 'http://localhost:8081/reviews').as('reviews')
     
        //Cliquer sur Avis
        cy.contains("a", "Avis")
        .should("have.attr", "href", "#/reviews")  
        .click()    

         //attendre la recuperation des avis par l'API
        cy.wait('@reviews')   

    })    

    it("Injection XSS dans le formulaire d'avis ", () => {          
        
        // Injection de script alert dans le champ titre
        cy.contains('Titre')
        .parent()
        .find('input[type=text]')  
        .type('<script>alert("XSS")</script>')

        // Injection de script alert dans le champ commentaire
        cy.contains('Commentaire')
        .parent()
        .find('input[type=text]')  
        .type('<script>alert("XSS")</script>')

        cy.contains('Publier')
        .parent()
        .find('button')  
        .should("be.visible")
        .click() 

        // Vérifier qu'une alerte n'est pas affichée :  le script XSS n'est pas exécuté
        cy.on('window:alert', (str) => {
            throw new Error('Une alerte XSS a été déclenchée : ' + str);
        });         

    }) 
       
  })
  