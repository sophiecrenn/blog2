Ce projet est une application de blog développée avec React pour le front-end et Node.js pour le back-end.

I. Fonctionnalités :
a. Pour l'administrateur:
Création, modification et suppression d'articles.
Suppression des comptes utilisateurs.

b. Pour les utilisateurs:
Inscription, connexion, authentification JWT, envoi d'un formulaire de contact vers l'administrateur.

II. Interface
Interface utilisateur et administrateur simple et responsive en mobile first.

III. Technologies utilisées
a. Front-end
React, React-Router-Dom, Scss.

b. Back-end
Node.js, Express.js, MongoDB, JWT pour l'authentification, Multer pour l'upload d'images.

IV.Installation
a. Prérequis
Node.js installé
Base de données configurée: MongoDB

b. Étapes
Cloner le dépôt
git clone https://github.com/sophiecrenn/blog2.git

c. Installation des dépendances
1. Backend
cd backend
npm install

2. Frontend
cd frontend
npm install

d. Configuration des variables d'environnement
Créer un fichier .env dans le dossier backend avec les variables suivantes :
PORT=3001
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net
JWT_SECRET=supersecretkey

e. Lancer l'application
1. Backend
cd backend
npm start

2. Frontend
cd frontend
npm start

3. Accéder à l'application
Frontend : http://localhost:3001
Backend : http://localhost:5001

f. API
1. GET
Récupérer tous les articles : /api/posts

2. POST
Créer un nouvel article : /api/posts

3. GET
Récupérer un article spécifique : /blog/${article._id}

4. PUT
Mettre à jour un article : {API_URL}/api/blogs/${id}

5. DELETE
Supprimer un article : {API_URL}/api/blogs/${id}

