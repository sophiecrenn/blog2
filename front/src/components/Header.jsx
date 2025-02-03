import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Hooks/AuthContext';
import styles from '../assets/styles/header.module.scss';
import Logo from '../assets/Blog.svg';
import secondTitle from "../assets/images/secondTitle.png"

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img src={Logo} alt="logo" className={styles.logo} />
      </Link>
      <Link to="/"><img src={secondTitle} alt="title" className={styles.secondTitle} />
      </Link>
      <h1>Tattoo blog: entre encre et passion</h1>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {!user || user === undefined ? (
          <>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={user.admin ? "/dashboardAdmin" : "/dashboardUser"}>Dashboard</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;


/*
            <li>
              <Link to="/account">Création d&apos;un compte</Link>
            </li>
<li>
<Link to="/blog">Blog</Link>
</li>*/