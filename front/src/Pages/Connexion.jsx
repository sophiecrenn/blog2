import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthContext";
import { API_URL } from '../config/env'

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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const loggedUser = await response.json();
                // Le setUser viens du context qui va permettre d'acceder aux infos de l'utilisateur partout dans le projet
                setUser(loggedUser);
                if (loggedUser.admin) {
                    return navigate('/dashboardAdmin');
                }

                navigate('/dashboardUser');
            } else {
                setMessage("Login failed");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred");
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default AdminConnexion;
