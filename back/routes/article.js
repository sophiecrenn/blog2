const express = require('express');
const router = express.Router();

// Import des controllers pour la gestion des articles
const { 
    store, 
    getAll, 
    getOne, 
    updateOne, 
    deleteArticle,
} = require('../controllers/articleController');

const auth = require('../middelware/auth');
const admin = require('../middelware/admin');
const multer = require('../middelware/multer');

// Routes pour la gestion des articles
router.post("/", multer.single('image'), store);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", updateOne);
router.delete("/:id", [auth, admin], deleteArticle);


module.exports = router;