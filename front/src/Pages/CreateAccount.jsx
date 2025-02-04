
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/env";
import styles from "../assets/styles/connexion.module.scss";

// Composant de création de compte
const CreateAccount = () => {
    // Hook pour gérer l'email et le mot de passe
    const [email, setEmail] = useState("");
    // Hook pour gérer l'email et le mot de passe
    const [password, setPassword] = useState("");
    // Hook pour gérer le message d'erreur
    const [message, setMessage] = useState("");
    // Hook pour naviguer
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // Eviter le rafraichissement de la page
        e.preventDefault();
        // Création de la requête
        const response = await fetch(API_URL + "/api/auth/register", {
            // Création de la requête en POST
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
            body: JSON.stringify({ email, password })
        });
        // Traitement de la réponse pour la navigation vers la page de connexion
        navigate('/login');
        // Message pour la création réussie du compte utilisateur
        setMessage('Account created');
    };
    return (
        <div className={styles.connexion}>
            <h1>Création de compte</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Créer votre compte</button>
            </form>
        </div>
    );
};

export default CreateAccount;