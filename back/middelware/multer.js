// MIDDLEWARE MULTER
const multer = require('multer');

// Configuration de Multer pour les images
const storage = multer.diskStorage({
    // Dossier de destination
    destination: function (req, file, cb) {
        // Destination du fichier
        cb(null, 'public/uploads/');
    },
    // Nom du fichier
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Exportation de Multer
const upload = multer({ storage: storage });

module.exports = upload;