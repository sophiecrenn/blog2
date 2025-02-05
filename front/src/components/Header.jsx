import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../Hooks/AuthContext';
import styles from '../assets/styles/header.module.scss';
import Logo from '../assets/Blog.svg';
import Loupe from "../assets/images/loupe.png";
import secondTitle from "../assets/images/secondTitle.png";

const Header = () => {
  // Gestion de l'authentification
  const { user } = useContext(AuthContext);
  // Gestion de la recherche
  const [searchTerm, setSearchTerm] = useState("");
  // Gestion de la navigation
  const navigate = useNavigate();

  const handleSearch = (e) => {
    // Eviter le rafraichissement de la page
    e.preventDefault();
    // Si le terme de recherche n'est pas vide, on redirige vers la page de recherche
    if (searchTerm.trim() !== "") {
      // Redirection vers la page de recherche
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img src={Logo} alt="logo" className={styles.logo} />
      </Link>
      <Link to="/">
        <img src={secondTitle} alt="title" className={styles.secondTitle} />
      </Link>
      <h1>Tattoo blog: entre encre et passion</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Rechercher un article..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
        <img src={Loupe} alt="loupe" className={styles.loupe} />
        </button>
      </form>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {!user ? (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        ) : (
          <li>
            <Link to={user.admin ? "/dashboardAdmin" : "/dashboardUser"}>Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;

