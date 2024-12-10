const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

const { createAccount } = require('../controllers/accountController.js');

router.post("/api/account", createAccount);

router.post('/api/auth/login', authController.login);

// Middleware pour vérifier si l'utilisateur est connecté
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/');
    }
}

router.get('/secret', isAuthenticated, (req, res) => {
    res.render('secret');
});

router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;