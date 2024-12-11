const express = require('express');
const { login, register, getUsers } = require('../controllers/authController');
const router = express.Router();

router.post("/register", register);

router.post('/login', login);

router.get('/', getUsers);

module.exports = router;