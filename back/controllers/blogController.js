const Article = require('../models/Article');

const sendArticle = async (req, res) => {
    console.log(req.body);
    const { title, resume, content, author, category} = req.body;

    const createArticle = await Article.create(req.body);
    

    res.json(createArticle);
}

const sendList = async (req, res) => {
    const createList = await Article.find();
    
    res.json(createList);
}

module.exports = {
    sendArticle,
    sendList
}