
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Hooks/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  if (user === undefined) return <div>Chargement....</div>;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {!user ?
          <>
            <li>
              <Link to="/account">Création d&apos;un compte</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </> :
          <>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to={user.admin ? "/dashboardAdmin" : "/dashboardUser"}>Dashboard</Link>
            </li>
          </>
        }
      </ul>
    </nav>
  );
};

export default Header;