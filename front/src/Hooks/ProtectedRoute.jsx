import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate,} from 'react-router-dom';
import PropTypes from 'prop-types';


const ProtectedRoute = ({ user: expectedUser, children }) => {
    const { user } = useContext(AuthContext);

    if (!user || user.admin !== expectedUser.role) {
        return <Navigate to="/login" />;
    }

    return children;
};
ProtectedRoute.propTypes = {
    user: PropTypes.shape({
        role: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.node.isRequired
};

export default ProtectedRoute;

