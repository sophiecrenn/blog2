//Appeler le modèle définit pour les articles
const Article = require("../models/Article");

//Créer un nouvel article
const store = async (req, res) => {
    //Ajouter le chemin de l'image dans le corps de la requête
    const article = await Article.create({ ...req.body, image: req.file.path.replace('public', '') }); 

    res.json(article);
}

//Afficher tous les articles
const getAll = async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
}

//Afficher un seul article
const getOne = async (req, res) => {
    // Récupération de l'article par son id dans l'URL
    const { id } = req.params;
    const article = await Article.findById(id);

    res.json(article);
}

//Modifier un article
const updateOne = async (req, res) => {
    // Récupération de l'article par son id dans l'URL
    const { id } = req.params;
    //Récupération du corps de la requête
    const { title, summary, author, content, category, image } = req.body;
    //Mise à jour de l'article
    const articleUpdated = await Article.findByIdAndUpdate(id, req.body);
    res.json(articleUpdated);
}

//Supprimer un article
const deleteArticle = async (req, res) => {
    // Récupération de l'article par son id dans l'URL
    const { id } = req.params;
    //Récupération du corps de la requête et validation pour la suppression
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
}

//Exportation des fonctions
module.exports = {
    store,
    getAll,
    getOne,
    updateOne,
    deleteArticle
}