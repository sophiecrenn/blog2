
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogUpdate = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getArticle();
    }, [])

    const getArticle = async () => {
        const response = await fetch(`http://localhost:3001/api/blogs/${id}`);
        const data = await response.json();
        setArticle(data);
    }

    // Faire une fonction pour update, ensuite rediriger vers la page d'accueil ou  la page de l'article

    return (
        <div>
            <h1>Listing</h1>
            {message && <p>{message}</p>}
            {/* Faire un formulaire pour mettre à jour l'article */}
            {/* Reprendre le formulaire de creation et mettre dans les values les valeurs actuelles */}
            <div>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <p>{article.content}</p>
                <p>{article.author}</p>
                <p>{article.category}</p>
            </div>
        </div>
    );
};

export default BlogUpdate;