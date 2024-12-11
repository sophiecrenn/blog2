import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { decode } from 'jwt-decode';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decode(token);
            const userId = decoded.id;
            const userRole = decoded.admin ? 'admin' : 'user';
            setUser({ id: userId, role: userRole });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider> );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


