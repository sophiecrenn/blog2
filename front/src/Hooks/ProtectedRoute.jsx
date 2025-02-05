import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

// Gestion de la protection des routes
const ProtectedRoute = ({ adminOnly = false }) => {
    // Gestion de l'authentification
    const { user } = useContext(AuthContext);
    // Gestion de la navigation
    const navigate = useNavigate();

    useEffect(() => {
        if (user === undefined) {
            return;
        }

        if (!user) {
            navigate('/login');
        } else if (adminOnly && !user.admin) {
            navigate('/dashboardUser');
        }
    }, [user])


    // Outlet est la page qui est censé etre appelée si l'utilisateur est authentifié avec le bon role
    return <Outlet />;
};

ProtectedRoute.propTypes = {
    admin: PropTypes.bool,
};

export default ProtectedRoute;

