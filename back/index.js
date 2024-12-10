const dotenv = require("dotenv")
dotenv.config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// const productRoutes = require('./routes/products');
const articleRoutes = require("./routes/article");
const authRoute = require("./routes/auth");

const PORT = 3001;
console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Base de donnée connectée")
});

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(articleRoutes);
app.use(authRoute);
// app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`L'API est bien lancée sur l'url http://localhost:${PORT}`);
})