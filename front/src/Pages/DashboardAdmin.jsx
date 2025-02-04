import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Hooks/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/env';
import styles from '../assets/styles/dashboardAdmin.module.scss';

// Gestion du dashboard de l'administrateur
function DashboardAdmin() {
  //Hook pour les articles
  const [articles, setArticles] = useState([]);
  //Hook pour les utilisateurs
  const [users, setUsers] = useState([]);
  //Hook pour l'affichage des articles dans le dashboard
  const [showArticles, setShowArticles] = useState(false);
  //Hook pour l'affichage des utilisateurs dans le dashboard
  const [showUsers, setShowUsers] = useState(false);
  //Hook pour le logout
  const { logout } = useContext(AuthContext); 

  // Fonction pour obtenir la liste des articles et des utilisateurs
  useEffect(() => {
    // Fonction pour obtenir la liste des utilisateurs
    const getUsers = async () => {
      // Récupérer la liste des utilisateurs
      const response = await axios.get(API_URL + '/api/auth',
        // Création de la requête 
        {        headers : {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }}
        ,{ withCredentials: true });
        // Traitement de la reponse si la liste des utilisateurs est introuvable
      setUsers(response.data);
    };

    // Fonction pour obtenir la liste des articles
    const getArticles = async () => {
      // Récupérer la liste des articles
      const response = await axios.get(API_URL + '/api/blogs',
        // Création de la requête
      {        headers : {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }})
      // Traitement de la reponse si la liste des articles est introuvable
      setArticles(response.data);
    };

    // Appel des fonctions de récupération des utilisateurs et des articles
    getUsers();
    getArticles();
  }, []);

  // Fonction pour supprimer un article
  const handleDeleteArticle = async (id) => {
    try {
      // Suppression de l'article
      const response = await axios.delete(`${API_URL}/api/blogs/${id}`, 
        {        headers : {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }},{
        withCredentials: true,
      });

      // Traitement de la réponse
      if (response.status === 200 || response.status === 204) {
        // Suppression de l'article
        setArticles(articles.filter((article) => article._id !== id));
      } else {
        // Gestion de l'erreur
        console.error('Erreur lors de la suppression de l\'article');
      }
    } catch (error) {
      // Gestion de l'erreur
      console.error('Erreur lors de la suppression de l\'article:', error);
    }
  };
  
  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (id) => {
    try {
      // Suppression de l'utilisateur
      const response = await axios.delete(`${API_URL}/api/auth/${id}`, {
        // Création de la requête en DELETE
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Traitement de la réponse
      if (response.status === 200 || response.status === 204) {
        // Suppression de l'utilisateur
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  // Fonctions pour alterner la visibilité des listes des utilisateurs et des articles (toggle)
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








