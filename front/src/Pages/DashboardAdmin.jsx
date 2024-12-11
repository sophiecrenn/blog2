import { useState, useEffect } from 'react';
/*************  ✨ Codeium Command 🌟  *************/
import { Link } from 'react-router-dom';

const handleUpdateArticle = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/blogs/${id}`);
    const article = response.data;
    navigate(`/blog/edit/${article._id}`);
  } catch (error) {
    console.error(error);
  }
};
/******  36e585bc-d2fb-4283-a06b-14731a5eb7ec  *******/
import axios from 'axios';

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    };

    const getArticles = async () => {
      const response = await axios.get('http://localhost:3001/api/blogs');
      setArticles(response.data);
    };

    getUsers();
    getArticles();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/blogs/${id}`);
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard Admin</h1>
      <p>Welcome to your dashboard!</p>
      <li><Link to="/create">Create Article</Link></li>
      <li><Link to="/blog/edit/:id">Update Article</Link></li>
      <li><Link to="/blog/:id">List of articles</Link></li>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            {article.title}
            {article.content}
            <button onClick={() => handleUpdateArticle(article._id)}>Mettre à jour</button>
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
    </div>
  );
}

export default DashboardAdmin;
