# Groupomania_7_29062021
# Openclassrooms Développeur web

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)


## Projet 7 : Créez un réseau social d'entreprise

L'objectif du projet 7 est de créer le backend et le frontend du réseau social "Groupomania".
Le frontend de l'application est déjà founi.

### Contexte du projet

- Groupomania est une petite agence web regroupant une douzaine d'employés.


### Exigences du projet 

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de donénes à l'aide de SQL.
- Implémenter un stockage de données sécurisé en utlisant SQL

## Contenus du repository

- Le repository contient le dossier Backend et le dossier Frontend. Il vous suffit de cloner ce repository pour le récupérer en local.

## Prérequis :
- Vous devez avoir Vue Cli, NODE et MySQL installés en local sur votre machine.


## Installation du projet

- Cloner ce projet depuis Github pour récupérer le Backend et le Frontend

### Installation du Frontend de l'application

- Ouvrir le terminal a partir du sous-dossier "groupomania-front-end" exécuter ``npm install -g @vue/cli``.
- Puis ``npm install`` pour installer les dépendances puis ``npm run serve``..
- Le frontend de l'application doit fonctionner sur localhost avec le port par défaut 8080.

### Installation du Backend

- Clonez ce repository.
- Ouvrir le terminal sur le dossier Backend et exécuter ``npm install`` pour installer les dépendances puis ``npm i nodemon``.
- Puis lancez le serveur : ``npm run dev`` dans le terminal les messages listening on port 3000 va apparaître.
- Le serveur doit fonctionner sur localhost avec le port par défaut 3000.

### Base de données
- Se connecter au serveur MySQL de votre choix. 
- Exécuter la commande : CREATE DATABASE ``groupomania``.
- Vérifiez les identifiants dans le fichier config.json dans le Backend.
- Importer le fichier ``groupomania_sauvegarde.sql``.
``mysql -u root -p groupomania < groupomania_sauvegarde.sql``
- Identifiant et mot de passe admin vous sont fourni dans un fichier admin.


## Auteur
[Marine Bédouret](https://github.com/Marinebedouret)


## License

Copyright © 2021 [Marine Bedouret](https://github.com/Marinebedouret)
