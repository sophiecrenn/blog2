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
      await axios.delete(`${API_URL}/api/blogs/${id}`); // Suppression de l'article
      setArticles(articles.filter((article) => article._id !== id)); // Met à jour la liste des articles
    } catch (error) {
      console.error(error); // Gestion des erreurs
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`); // Suppression de l'utilisateur
      setUsers(users.filter((user) => user._id !== id)); // Met à jour la liste des utilisateurs
    } catch (error) {
      console.error(error); // Gestion des erreurs
    }
  };

  return (
    <div className={styles.dashboardAdmin}>
      <h1 className={styles.dashboardTitles}>Bienvenue sur votre dashboard d'administrateur</h1>

      <h2 className={styles.dashboardSecondTitles}>Articles édités</h2>
      <p className={styles.create}><Link to="/create">Créer un article</Link></p>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <strong>{article.title}</strong>
            <Link to={`/blog/edit/${article._id}`}>Modifier</Link> 
            <button onClick={() => handleDeleteArticle(article._id)} >Supprimer</button> {/* Bouton pour supprimer */}
          </li>
        ))}
      </ul>

      <h2 className={styles.dashboardSecondTitles}>Utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className={styles.listItem}>
            {user.email} {/* Montrer uniquement l'email */}
            <button onClick={() => handleDeleteUser(user._id)}>Supprimer</button> {/* Bouton pour supprimer */}
          </li>
        ))}
      </ul>

      <div className={styles.dashboardSecondTitles}>
        Log out : <button onClick={logout}>Déconnexion</button>
      </div>
    </div>
  );
}

export default DashboardAdmin;


