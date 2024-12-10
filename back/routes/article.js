const express = require('express');
const router = express.Router();

const { store, getAll, getOne, updateOne, deleteArticle } = require('../controllers/articleController');
const auth = require('../middelware/auth');
const admin = require('../middelware/admin');

router.post("/", store);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", updateOne);
router.delete("/:id", [auth, admin], deleteArticle);


module.exports = router;