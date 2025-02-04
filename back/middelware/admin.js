// MIDDLEWARE ADMIN
const adminMiddleware = async (req, res, next) => {
    // Récupération de l'utilisateur connecté
    if (!req.user.admin) {
        // s'il n'est pas admin on envoie ce message
        return res.status(403).json({ message: 'Admin access denied' });
    }
    // s'il est admin on passe
    next();
}

module.exports = adminMiddleware