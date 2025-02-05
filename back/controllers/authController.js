const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Création de l'utilisateur
const register = async (req, res) => {
    try {
        // Récupération des données du corps de la requête
        const { email, password } = req.body;
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        // Création de l'utilisateur
        await User.create({ email, password: hashedPassword });
        // Envoi de la réponse
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // En cas d'erreur, on affiche un message d'erreur
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Connexion de l'utilisateur
const login = async (req, res) => {
    try {
        // Récupération des données du corps de la requête
        const { email, password } = req.body;
        // Récupération de l'utilisateur par son email
        const user = await User.findOne({ email })
        // Récupération du mot de passe haché
        if (!user) { 
            // En cas d'erreur, on affiche un message d'erreur
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Comparaison du mot de passe haché
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // En cas d'erreur, on affiche un message d'erreur
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Création du token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Envoi de la réponse du token
        return res.json({user, token : token})
    } catch (error) {
        // En cas d'erreur, on affiche un message d'erreur
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Affichage de tous les utilisateurs
const getUsers = async (req, res) => {
    // Récupération de tous les utilisateurs
    res.json(await User.find());
}

// Affichage de l'utilisateur connecté
const getLoggedUser = async (req, res) => {
    // Récupération de l'utilisateur connecté
    res.json(req.user);
}

// Désconnexion de l'utilisateur
const logout = async (req, res) => {
    // Désconnexion de l'utilisateur et suppression du cookie
    res.clearCookie('token').json({ message: 'Successfully logged out' });
}

// Suppression de l'utilisateur
const deleteUser = async (req, res) => {
    try {  
        // Récupération de l'utilisateur par son id
        const { id } = req.params;
        // Suppression de l'utilisateur par son id
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            // Envoi de la réponse sur l'utilisateur n'est pas trouvé
            return res.status(404).json({ error: 'User not found' });
        }
        // Envoi de la reponse sur l'utilisateur a bien été supprimé
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        // En cas d'erreur, on affiche un message d'erreur
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Exportation des fonctions
module.exports = {
    register,
    login,
    getUsers,
    getLoggedUser,
    logout,
    deleteUser
};