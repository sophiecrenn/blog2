import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/env';
import styles from '../assets/styles/BlogDetail.module.scss';

const BlogDetail = () => {
    const [article, setArticle] = useState(null); // État pour l'article
    const [error, setError] = useState(''); // État pour gérer les erreurs
    const navigate = useNavigate(); // Hook pour naviguer
    const { id } = useParams(); // Récupérer l'ID de l'article à partir de l'URL

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs/${id}`); // Utiliser l'ID dans l'URL
            if (!response.ok) {
                throw new Error('Article non trouvé.');
            }
            const data = await response.json();
            setArticle(data); // Stocker l'article dans l'état
            setError(''); // Réinitialiser le message d'erreur
        } catch (err) {
            setError(err.message); // Gérer l'erreur
            setArticle(null); // Réinitialiser l'article en cas d'erreur
        }
    };

    const goBack = () => {
        navigate(-1); // Naviguer à la page précédente
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>; // Afficher les erreurs
    }

    if (!article) {
        return <p>Chargement des détails de l&apos;article...</p>; // Afficher un message pendant le chargement
    }

    return (
        <div className={styles.BlogDetail}>
            <h1 className={styles.title}>Détails de l&apos;article</h1>
            <h2 className={styles.secondTitle}>{article.title}</h2>
            <p className={styles.secondContainer}>{article.content}</p>
        </div>
    );
};

export default BlogDetail;
