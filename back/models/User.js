const mongoose = require("mongoose");
const { Schema } = mongoose;

// Création du modèle pour les utilisateurs
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = User