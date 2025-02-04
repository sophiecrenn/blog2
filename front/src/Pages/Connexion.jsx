import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthContext";
import { API_URL } from '../config/env';
import styles from "../assets/styles/connexion.module.scss";

// Composant de connexion de l'administrateur
const AdminConnexion = () => {
    // Hook pour gérer l'email et le mot de passe
    const [email, setEmail] = useState("");
    // Hook pour gérer l'email et le mot de passe
    const [password, setPassword] = useState("");
    // Hook pour gérer le message d'erreur
    const [message, setMessage] = useState("");
    // Hook pour naviguer
    const navigate = useNavigate();
    //
    const { setUser } = useContext(AuthContext);

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        // Eviter le rafraichissement de la page
        e.preventDefault();
        try {
            // Création de la requête
            const response = await fetch(API_URL + "/api/auth/login", {
                // Création de la requête en POST
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                // Transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
                body: JSON.stringify({ email, password }),
            });
            // Traitement de la reponse
            if (response.ok) {
                // Récupérer le corps de la requête
                const loggedUser = await response.json();
                localStorage.setItem('token', loggedUser.token)
                // Le setUser vient du context qui va permettre d'accéder aux infos de l'utilisateur partout dans le projet
                setUser(loggedUser.user);
                if (loggedUser.user.admin) {
                    //Redirection vers le dashboard administrateur si l'utilisateur est administrateur
                    return navigate('/dashboardAdmin');
                }
                // Redirection vers le dashboard utilisateur si l'utilisateur n'est pas administrateur
                navigate('/dashboardUser');
            } else {
                // Gestion de l'erreur si l'utilisateur n'a pas pu se connecter
                setMessage("Échec de la connexion");
            }
        } catch (error) {
            // Gestion de l'erreur
            setMessage("Une erreur est survenue");
        }
    };

    // Fonction pour rediriger vers la page de création de compte
    const redirectToSignup = () => {
        navigate('/account');
    };

    return (
        <div className={styles.connexion}>
            <h1>Connexion</h1>
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
                    Mot de passe:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Connexion</button>
            </form>
            <p>Vous n'avez pas de compte ?</p>
            <button onClick={redirectToSignup}>Créer un compte</button>
        </div>
    );
};

export default AdminConnexion;

