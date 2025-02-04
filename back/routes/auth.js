const express = require('express');
const {
    login,
    register,
    getUsers,
    getLoggedUser,
    logout,
    deleteUser
} = require('../controllers/authController');

const auth = require('../middelware/auth');
const admin = require('../middelware/admin');

const router = express.Router();

router.post("/register", register);

router.post('/login', login);

router.get('/', auth, admin, getUsers);

router.get('/getLoggedUser', auth, getLoggedUser);

router.get('/logout', auth, logout);

router.delete("/:id", [auth, admin], deleteUser);

module.exports = router;