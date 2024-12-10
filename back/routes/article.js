const express = require('express');
const router = express.Router();

const { store, getAll, getOne,updateOne, deleteArticle } = require('../controllers/articleController');

router.post("/api/blogs", store);
router.get("/api/blogs", getAll);
router.get("/api/blogs/:id", getOne);
router.put("/api/blogs/:id", updateOne);
router.delete("/api/blogs/:id", deleteArticle);


module.exports = router;