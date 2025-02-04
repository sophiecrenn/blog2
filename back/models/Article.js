const mongoose = require("mongoose");
const { Schema } = mongoose;

// Création du modèle pour les articles
const ArticleSchema = new Schema({
    title: String,
    summary: String,
    author: String,
    category: String,
    content: String,
    image : String,
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article