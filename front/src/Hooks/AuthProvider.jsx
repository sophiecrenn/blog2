import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../config/env'

// Gestion de l'authentification
export const AuthProvider = ({ children }) => {
    // Gestion de l'authentification
    const [user, setUser] = useState();
    // Gestion de la navigation
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    // Fonction pour obtenir la liste des utilisateurs
    const loadData = async () => {
        try {
            // Récupérer la liste des utilisateurs
            const response = await fetch(API_URL + "/api/auth/getLoggedUser", {
                credentials: 'include'
            });
            const data = await response.json();
            // Gestion des erreurs
            if (data.message) {
                return setUser(false);
            }

            setUser(data);
        } catch (err) {
            console.log(err);
        }
    }

    // Fonction pour se deconnecter
    const logout = async () => {
        try {
            const response = await fetch(API_URL + "/api/auth/logout", { credentials: "include" });
            console.log(response);
            setUser(undefined);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};