const express = require('express');
const router = express.Router();
const { sendArticle, sendList} = require('../controllers/blogController');

router.post('/api/article', sendArticle);
router.get('/api/blogs', sendList);
router.get('/api/blogs/:id', sendList);

module.exports = router;