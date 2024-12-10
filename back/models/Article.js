const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleSchema = new Schema({
    title: String,
    summary: String,
    author: String,
    category: String,
    content: String
})

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article