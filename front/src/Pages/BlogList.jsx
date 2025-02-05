import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/blogList.module.scss';
import { API_URL } from '../config/env';

// Composant pour afficher la liste des articles sur la page d'accueil
const BlogList = () => {
    // Hook pour gérer l'affichage des articles
    const [articles, setArticles] = useState([]);
    // Hook pour gérer le message d'erreur
    const [message, setMessage] = useState('');
    // Hook pour gérer la pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Hook pour gérer le nombre d'articles par page
    const [articlesPerPage, setArticlesPerPage] = useState(2);
    // Hook pour naviguer
    const navigate = useNavigate();

    useEffect(() => {
        getArticles();
    }, [])

    // Fonction pour obtenir la liste des articles
    const getArticles = async () => {
        // Récupérer la liste des articles
        const response = await fetch(API_URL + "/api/blogs",
            // Création de la requête
            {        headers : {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }}
        );
        // Traitement de la reponse si la liste des articles est introuvable
        const data = await response.json();
        // Trier les articles du plus récent au plus ancien
        const sortedArticles = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setArticles(sortedArticles);
    }

    // Calculer les indices des articles à afficher
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    // Extraire les articles à afficher
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Gérer le changement de la page suivante
    const handleNextPage = () => {
        // Verifier si la page suivante est valide
        if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
            // Passer à la page suivante
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    // Gérer le changement de la page précédente
    const handlePrevPage = () => {
        // Verifier si la page précédente est valide
        if (currentPage > 1) {
            // Passer à la page précédente
            setCurrentPage(prevPage => prevPage - 1);
        }
    }

    return (
        <div>
        <div className={styles.video}>
        <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/3z2fvJq9fD8?si=V3y126euA1pZY05X" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" 
        allowfullscreen></iframe>
        </div>
            <h1 className={styles.title}>Articles à la une</h1>
            {message && <p>{message}</p>}
            {currentArticles.map((article, index) => (
                <div className={styles.container} key={index}>
                    <img className={styles.image} src={API_URL + article.image} alt="image" />
                    <div>
                    <h2 className={styles.secondTitle}>{article.title}</h2>
                    <p className={styles.secondContainer}>
                        {article.content.length > 5000 ? article.content.substring(0, 5000) + '...' : article.content}
                    </p>
                    
                    <a className={styles.learn} href={`/blog/${article._id}`}>Lire l'article</a>
                    </div>
                </div>
            ))}
            
            <div className={styles.pagination}>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Précédent
                </button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}>
                    Suivant
                </button>
            </div>
        </div>
    );
};

export default BlogList;