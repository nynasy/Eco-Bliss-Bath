# Prérequis
Installation de : 
- [npm](https://docs.npmjs.com/about-npm)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/)
- [cypress](https://www.cypress.io/)


# Installation du projet
1. Téléchargez ou clonez le dépôt

2. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : docker-compose up --build

3. Ouvrez le site depuis la page http://localhost:8080 

4. Installer les dépendances cypress: npm install

5. lancer les tests : 
5.1. via la commande "npx cypress run" pour lancer tous les tests : le rapport de tests se  trouve dans le dossier cypress/results

5.2. via la commande "npx cypress open" pour lancer les tests via un navigateur :  
cliquer sur E2E testing => choisir le navigateur => cliquer sur le fichier de test à éxécuter.

6. Une fois l'utilisation du projet terminé, effectuer la commande : docker-compose down 
