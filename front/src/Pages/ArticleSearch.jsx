import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/styles/articleSearch.module.scss';
import { API_URL } from '../config/env';

// Composant pour afficher les articles recherchés
const SearchResults = () => {
    // Hook pour gérer l'affichage des articles
    const [articles, setArticles] = useState([]);
    // Hook pour gérer le message d'erreur
    const [filteredArticles, setFilteredArticles] = useState([]);
    // Hook pour gérer la pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Hook pour gérer le nombre d'articles par page
    const articlesPerPage = 4;
    // Hook pour naviguer
    const location = useLocation();

    // Extraire le paramètre 'query' de l'URL
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        getArticles();
    }, []);

    useEffect(() => {
        if (query) {
            filterArticles(query);
        }
    }, [query, articles]);

    // Fonction pour récupérer les articles
    const getArticles = async () => {
        const response = await fetch(API_URL + "/api/blogs", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        setArticles(data);
    };

    // Fonction pour filtrer les articles selon le mot-clé
    const filterArticles = (searchTerm) => {
        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredArticles(filtered);
        setCurrentPage(1); // Réinitialiser la page à 1 lorsqu'on effectue une nouvelle recherche
    };

    // Pagination : calcul des indices des articles à afficher
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Aller à la page suivante
    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredArticles.length / articlesPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Aller à la page précédente
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className={styles.researchContainer}>
            <h1>Résultats de recherche pour : "{query}"</h1>
            {currentArticles.length > 0 ? (
                currentArticles.map(article => (
                    <div key={article._id} className={styles.article}>
                        <div>
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 500)}...</p>
                            <a href={`/blog/${article._id}`} className={styles.learn}>Lire l'article</a>
                        </div>
                    </div>
                ))
            ) : (
                <p>Aucun article ne correspond à votre recherche.</p>
            )}

            {/* Pagination */}
            {filteredArticles.length > articlesPerPage && (
                <div className={styles.pagination}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Précédent
                    </button>
                    <span>Page {currentPage} / {Math.ceil(filteredArticles.length / articlesPerPage)}</span>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredArticles.length / articlesPerPage)}>
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
