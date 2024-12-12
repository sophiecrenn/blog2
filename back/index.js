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
    // Authorise les appels depuis l'url de Vite (react)
    origin: "http://localhost:5173",
    // Authorise les Cookies dans les requests
    credentials: true
}));
// Permet de d'avoir req.cookie dans nos middlewares / controllers
app.use(cookieParser());
// Permet de decoder le json envoyé depuis le front
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// Utilistation des routes
app.use("/api/blogs", articleRoutes);
app.use("/api/auth", authRoute);

// Lancement de l'api
app.listen(PORT, () => {
    console.log(`L'API est bien lancée sur l'url http://localhost:${PORT}`);
})