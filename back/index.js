// Import des modules
// Permet de lire les variables d'environnement
const dotenv = require("dotenv") 
dotenv.config()
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Import des routes
const articleRoutes = require("./routes/article");
const authRoute = require("./routes/auth");

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Base de donnée connectée")
}).catch(error => console.log(error));

// Middlewares
app.use(cors({
    // Authorise les appels depuis l'url de Vite
    origin: "https://blog2-913e0mgd2-sophiecrenns-projects.vercel.app/",
    // Authorise les Cookies dans les requêtes
    credentials: true
}));
// Permet de lire les cookies
app.use(cookieParser());
// Permet de lire le corps de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Permet de lire les fichiers statiques
app.use(express.static('public'));


// Utilistation des routes
app.use("/api/blogs", articleRoutes);
app.use("/api/auth", authRoute);

// Lancement de l'api
app.listen(PORT, () => {
    console.log(`L'API est bien lancée sur l'url http://localhost:${PORT}`);
})