const express = require('express');
const router = express.Router();
// Import des controllers pour la gestion des utilisateurs
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

// Routes pour la gestion des utilisateurs
router.post("/register", register);
router.post('/login', login);
router.get('/', auth, admin, getUsers);
router.get('/getLoggedUser', auth, getLoggedUser);
router.get('/logout', auth, logout);
router.delete("/:id", [auth, admin], deleteUser);

module.exports = router;