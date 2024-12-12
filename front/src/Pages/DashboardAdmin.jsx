import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Hooks/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config/env'

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  const { logout } = useContext(AuthContext);

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

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/blogs/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Bonjour et bienvenu sur votre dashboard admin</p>
      <li><Link to="/create">Create Article</Link></li>
      {/* <li><Link to="/blog/edit/:id">Update Article</Link></li> */}
      <li><Link to="/blog">List of articles</Link></li>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            {article.title}
            {article.content}
            <Link to={`/blog/edit/${article._id}`}>Mettre à jour</Link>
            <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.email}
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>Log out: <button onClick={logout}>Logout</button></div>
    </div>
  );
}

export default DashboardAdmin;
