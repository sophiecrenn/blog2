import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/env';
import styles from '../assets/styles/BlogDetail.module.scss';

// Composant pour afficher les détails de l'article
const BlogDetail = () => {
     // État pour l'article
    const [article, setArticle] = useState(null);
     // État pour gérer les erreurs
    const [error, setError] = useState('');
     // Hook pour naviguer
    const navigate = useNavigate();
     // Récupérer l'ID de l'article à partir de l'URL
    const { id } = useParams();

    useEffect(() => {
        getArticle();
    }, []);

    // Fonction pour obtenir les détails de l'article
    const getArticle = async () => {
        try {
            // Récupérer l'article par son ID
            const response = await fetch(`${API_URL}/api/blogs/${id}`,
                // Création de la requête en GET
                {        headers : {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                  }}
            );
            // Traitement de la reponse si l'article n'est pas trouvé
            if (!response.ok) {
                throw new Error('Article non trouvé.');
            }
            // Récupérer le corps de la requête
            const data = await response.json();
             // Stocker l'article dans l'état
            setArticle(data);
             // Réinitialiser le message d'erreur
            setError('');
        } catch (err) {
             // Gérer l'erreur
            setError(err.message);
             // Réinitialiser l'article en cas d'erreur
            setArticle(null);
        }
    };

    // Fonction pour naviguer à la page précédente
    const goBack = () => {
         // Naviguer à la page précédente
        navigate(-1);
    };
 // Afficher les erreurs
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }
    
 // Afficher un message pendant le chargement
    if (!article) {
        return <p>Chargement des détails de l&apos;article...</p>;
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
