import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/auth/getLoggedUser", {
                credentials: 'include'
            });
            const data = await response.json();

            if (data.message) {
                return setUser(false);
            }

            setUser(data);
        } catch (err) {
            console.log(err);
        }
    }

    const logout = async () => {
        try {
            await fetch("http://localhost:3001/api/auth/logout", { credentials: "include" });
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