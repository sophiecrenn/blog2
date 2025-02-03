import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Hooks/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/env';
import styles from '../assets/styles/dashboardAdmin.module.scss';

function DashboardAdmin() {
  const [articles, setArticles] = useState([]); // État pour les articles
  const [users, setUsers] = useState([]); // État pour les utilisateurs
  const [showArticles, setShowArticles] = useState(false); // État pour la visibilité des articles
  const [showUsers, setShowUsers] = useState(false); // État pour la visibilité des utilisateurs
  const { logout } = useContext(AuthContext); // Hook pour le logout

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(API_URL + '/api/auth', { withCredentials: true });
      setUsers(response.data);
    };

    const getArticles = async () => {
      const response = await axios.get(API_URL + '/api/blogs');
      setArticles(response.data);
    };

    getUsers();
    getArticles();
  }, []);

  const handleDeleteArticle = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/blogs/${id}`, {
        withCredentials: true,  // Assurez-vous d'envoyer les cookies avec la requête
      });
  
      if (response.status === 200 || response.status === 204) {
        setArticles(articles.filter((article) => article._id !== id)); // Supprime l'article du state local
      } else {
        console.error('Erreur lors de la suppression de l\'article');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
    }
  };
  
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/auth/${id}`); // Suppression de l'utilisateur
      if (response.status === 200 || response.status === 204) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Mise à jour avec le nouvel état
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  // Fonctions pour alterner la visibilité
  const toggleArticles = () => setShowArticles(!showArticles);
  const toggleUsers = () => setShowUsers(!showUsers);

  return (
    <div className={styles.dashboardAdmin}>
      <h1 className={styles.dashboardTitles}>Bienvenue sur votre dashboard administrateur</h1>
      <p className={styles.create}><Link to="/create">Créer un article</Link></p>

      {/* Section Articles */}
      <h2 className={styles.dashboardSecondTitles} onClick={toggleArticles}>
        Articles édités {showArticles ? '▴' : '▾'}
      </h2>
      {showArticles && (
        <ul>
          {articles.map((article) => (
            <li key={article._id}>
              <strong>{article.title}</strong>
              <Link to={`/blog/edit/${article._id}`}>Modifier</Link> 
              <button onClick={() => handleDeleteArticle(article._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}

      {/* Section Utilisateurs */}
      <h2 className={styles.dashboardSecondTitles} onClick={toggleUsers}>
        Utilisateurs {showUsers ? '▴' : '▾'}
      </h2>
      {showUsers && (
        <ul>
          {users.map((user) => (
            <li key={user._id} className={styles.listItem}>
              {user.email}
              <button onClick={() => handleDeleteUser(user._id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.dashboardLogOut}>
        <button onClick={logout}>Déconnexion</button>
      </div>
    </div>
  );
}

export default DashboardAdmin;




