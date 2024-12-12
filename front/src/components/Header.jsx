
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Hooks/AuthContext';
import styles from '../assets/styles/header.module.scss'
import Logo from '../assets/Blog.svg';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
            <img src={Logo} alt="logo" className={styles.logo}/>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {!user || user === undefined ?
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