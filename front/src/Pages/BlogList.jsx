
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/blogList.module.scss';
import { API_URL } from '../config/env';

const BlogList = () => {
    const [articles, setArticles] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getArticles();
    }, [])

    const getArticles = async () => {
        const response = await fetch(API_URL + "/api/blogs");
        const data = await response.json();
        setArticles(data);
    }

    return (
        <div>

            <h1 className={styles.title}>Articles à la une</h1>
            {message && <p>{message}</p>}
            {articles.map((article, index) => (
                <div className={styles.container} key={index}>
                    <img className={styles.image} src={API_URL + article.image} alt="image" />
                    <h2 className={styles.secondTitle}>{article.title}</h2>
                    <p className={styles.secondContainer}>{article.content}</p>
                    <p className={styles.secondContainer}>{article.category}</p>
                    <a className={styles.learn} href={`/blog/${article._id}`}>Lire l'article</a>
                </div>
            ))}
        </div>
    );
};

export default BlogList;