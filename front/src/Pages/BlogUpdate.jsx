import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/env';
import styles from '../assets/styles/blogUpdate.module.scss';

const BlogUpdate = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getArticle();
    }, []);

    const getArticle = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs/${id}`);
            if (!response.ok) {
                throw new Error('Article non trouvé.');
            }
            const data = await response.json();
            setArticle(data);
        } catch (err) {
            setMessage(err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'article.');
            }

            setMessage('Article mis à jour avec succès.');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage(err.message);
        }
    };

    // Affichage pendant le chargement
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
