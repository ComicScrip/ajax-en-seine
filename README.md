#Instructions

La branche master contient un "code à trous", il suffira donc de remplir le corps des fonctions dans ```script.js``` pour 
obtenir une application fonctionnelle. Un corrigé complet est disponible sur la branche correction. Si vous voulez vraiement apprendre, ne le regardez qu'en dernier recours.

#Documentation de l'API

https://geo.api.gouv.fr/decoupage-administratif/communes#communes-list

# Guide de développement

## Etape 1 : Récupération des suggestions par nom en AJAX et manipulation du dom

1. Regarder la documentation de l'API. Inspecter rapidement ```index.html``` pour comprendre comment est faite l'interface
3. Inspecter ```script.js``` et familiarisez-vous avec les fonctions vides et commentées
4. Implémenter la fonction permettant de récupérer l'élément HTML qui contiendra nos suggestions
4. Implémenter la fonction qui va permettre de produire un élément de liste pour les suggestions, à partir d'un objet 'city'
5. Implémenter la fonction qui permet de supprimer tous les enfants d'un élément HTML quelconque
6. Implémenter la fonction qui vide la liste des suggestions
7. Implémenter la fonction qui la (re)créé
8. Implémenter la fonction qui va lancer une requete AJAX pour obtenir les villes dont le nom commence par une chaine donnée. 
9. Implémenter toute la partie récupération et affichage des suggestions par nom uniquement pour commencer

L'étape 1 est validée quand je peux par exmeple taper 'Nante' que je je vois apparaitre 'Nantes', 'Nanterre', ... en suggestion

## Etape 2 : Afficher des détails sur la ville sélectionnée

1. En réponse au click sur un élément de la liste des suggestions, attacher 'le handler qui va bien'
2. Marquer chaque élément de la liste avec un attribut 'data-citycode' qui contiendra le code INSEE de la ville (pour pouvoir identifer la ville lorsque l'on clique sur un élément de liste)
3. Implémentez la fonction qui à partir d'un code de ville récupère des infos détaillées sur la ville en AJAX
4. Implémenter la fonction qui à partir d'un objet 'city' va construire les éléments du DOM qui vont bien
5. Cabler le tout pour valider l'étape 2

L'étape 2 est validée quand je peux cliquer sur une ville dans la liste et que je vois appraître au moins sa superficie et sa population.

## Etape 3 : Améliorations

1. Faire disparaitre la liste des suggestions quand l'utilisateur clique n'importe où sur la page
2. Si j'entre "Nan" et que je clique sur 'Nantes', je dois voir apparaitre 'Nantes' dans l'input de recherche
3. Quand j'ai tout effacé dans mon champs de recherche, supprimer le bloc détails

## Etape Bonus

Utiliser https://leafletjs.com/ pour afficher la carte centrée sur la ville sélectionnée et qui déssine son contour

## Pour aller plus loin

'Ca marche pas super bien quand je tape vite' : se renseigner sur les notions de 'debouncing' et 'throttling'


'Je voudrai utiliser mon clavier pour naviguer dans les suggestions' : Se servir de l'évènement 'keydown'


'C'est un peu moche et bizarre à l'utilisation : Payez-vous un designer UX/UI :)

