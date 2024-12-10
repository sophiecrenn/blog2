
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <a href="/account">Création d&apos;un compte</a>
        </li>
        <li>
          <a href="/login">Connexion</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;