import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
            const response = await fetch(`http://localhost:3001/api/blogs/${id}`); // Utiliser l'ID dans l'URL
            if (!response.ok) {
                throw new Error('Article non trouvé.');
            }
            const data = await response.json();
            console.log(data)
            setArticle(data); // Stocker l'article dans l'état
            setError(''); // Réinitialiser le message d'erreur
        } catch (err) {
            setError(err.message); // Gérer l'erreur
            setArticle(null); // Réinitialiser l'article en cas d'erreur
        }
    }

    const deleteArticle = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de l\'article.');
            }

            alert('Article supprimé avec succès.'); // Alerte de succès
            navigate('/'); // Naviguer vers la page d'accueil ou la liste des articles
        } catch (err) {
            setError(err.message); // Gérer l'erreur
        }
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>; // Afficher les erreurs
    }

    if (!article) {
        return <p>Chargement des détails de l&apos;article...</p>; // Afficher un message pendant le chargement
    }

    return (
        <div>
            <h1>Détails de l&apos;article</h1>
            <h2>{article.titre}</h2>
            <p><strong>Titre :</strong> {article.title}</p>
            <p><strong>Contenu :</strong> {article.content}</p>
            <p><strong>Auteur :</strong> {article.author}</p>
            <p><strong>Catégorie :</strong> {article.category}</p>
            <button onClick={deleteArticle}>Supprimer l&apos;article</button>
        </div>
    );
};

export default BlogDetail;