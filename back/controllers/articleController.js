const Article = require("../models/Article");

const store = async (req, res) => {
    console.log(req.body);

    const article = await Article.create(req.body);

    res.json(article);
}

const getAll = async (req, res) => {
    const articles = await Article.find();

    res.json(articles);
}

const getOne = async (req, res) => {
    const { id } = req.params;
    const article = await Article.findById(id); //findOne({ _id: id });

    res.json(article);
}

const updateOne = async (req, res) => {
    const { id } = req.params;
    const { title, summary, author, content, category, image} = req.body;
    const articleUpdated = await Article.findByIdAndUpdate(id, req.body);

    res.json(articleUpdated);
}

const deleteArticle = async (req, res) => {
    const { id } = req.params;
    const article = await Article.findByIdAndDelete(id);

    res.json(article);
}


module.exports = {
    store,
    getAll,
    getOne,
    updateOne,
    deleteArticle
}