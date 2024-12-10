import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateArticle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: '',
        content: '',
        author: '',
        category: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/blogs/${id}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de l\'article.');
            }
            const data = await response.json();
            setArticle(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/blogs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(article)
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la mise à jour de l\'article.');
            }

            alert('Article mis à jour avec succès.');
            navigate(`/blog/${id}`); // Rediriger vers la page de détail après la mise à jour
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Modifier l&apos;Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contenu</label>
                    <textarea
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Auteur</label>
                    <input
                        type="text"
                        name="author"
                        value={article.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Catégorie</label>
                    <select
                        name="category"
                        value={article.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="History">Histoire</option>
                        <option value="Anthropology">Anthropologie</option>
                    </select>
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateArticle;