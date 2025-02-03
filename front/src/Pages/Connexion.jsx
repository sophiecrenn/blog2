import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthContext";
import { API_URL } from '../config/env';
import styles from "../assets/styles/connexion.module.scss";

const AdminConnexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL + "/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log( await response.json)
                const loggedUser = await response.json();
                // Le setUser vient du context qui va permettre d'accéder aux infos de l'utilisateur partout dans le projet
                setUser(loggedUser);
                if (loggedUser.admin) {
                    return navigate('/dashboardAdmin');
                }

                navigate('/dashboardUser');
            } else {
                setMessage("Échec de la connexion");
            }
        } catch (error) {
            console.error(error);
            setMessage("Une erreur est survenue");
        }
    };

    const redirectToSignup = () => {
        navigate('/account'); // Redirige vers la page de création de compte
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

