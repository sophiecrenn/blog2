import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/env';
import styles from '../assets/styles/blogUpdate.module.scss';

// Composant pour mettre à jour un article
const BlogUpdate = () => {
    // Hook pour obtenir l'ID de l'article à partir de l'URL
    const { id } = useParams();
    // Hook pour gérer l'article
    const [article, setArticle] = useState({});
    // Hook pour gérer le message d'erreur
    const [message, setMessage] = useState('');
    // Hook pour naviguer
    const navigate = useNavigate();

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
            // Traitement de la reponse si l'article n'est pas rencontré
            if (!response.ok) {
                throw new Error('Article non trouvé.');
            }
            // Récupérer le corps de la requête
            const data = await response.json();
            // Stocker l'article dans l'état
            setArticle(data);
        } catch (err) {
            // Gérer l'erreur
            setMessage(err.message);
        }
    };

    // Fonction pour mettre à jour l'article
    const handleSubmit = async (event) => {
        // Eviter le rafraichissement de la page
        event.preventDefault();
        try {
            // Mettre à jour l'article
            const response = await fetch(`${API_URL}/api/blogs/${id}`, {
                // Création de la requête en PUT
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
                body: JSON.stringify(article),
            });
            // Traitement de la reponse si l'article n'est pas trouvé
            if (!response.ok) {
                // Gérer l'erreur
                throw new Error('Erreur lors de la mise à jour de l\'article.');
            }
            // Récupérer le corps de la requête
            setMessage('Article mis à jour avec succès.');
            // Redirection vers la page d'accueil
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            // Gérer l'erreur
            setMessage(err.message);
        }
    };

    // Affichage pendant le chargement de l'article
    if (!article.title) {
        return <p>Chargement de l&apos;article...</p>;
    }

    return (
        <div className={styles.blogUpdateContainer}>
            <h1 className={styles.title}>
                Mise à jour de l&apos;article {article.title ? `"${article.title}"` : ''}
            </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Titre
                    <input type="text" value={article.title || ''} onChange={(event) => setArticle({ ...article, title: event.target.value })} />
                </label>
                <br />
                <label>
                    Auteur
                    <input type="text" value={article.author || ''} onChange={(event) => setArticle({ ...article, author: event.target.value })} />
                </label>
                <br />
                <label>
                    Contenu
                    <textarea value={article.content || ''} onChange={(event) => setArticle({ ...article, content: event.target.value })} />
                </label>
                <br />
                <label>
                    Catégorie
                    <input type="text" value={article.category || ''} onChange={(event) => setArticle({ ...article, category: event.target.value })} />
                </label>
                <br />
                <button type="submit">Mettre à jour</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BlogUpdate;
