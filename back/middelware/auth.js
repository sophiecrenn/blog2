// MIDDLEWARE AUTH
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        // Si erreur dans la récupération du token, on affiche ce message
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Si le token est présent on le décode
    try {
        // Décodage du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Récupération de l'utilisateur
        const userId = decoded.id;
        // Récupération de l'utilisateur
        const user = await User.findById(userId);
        // Ajout de l'utilisateur au request
        req.user = user;
        // Passage de l'utilisateur au middleware
        next();
    } catch (err) {
        // Si le décodage du token n'a pas fonctionné, on affiche ce message
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;