
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const BlogList = () => {
    const [articles, setArticles]=useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getArticles();
    }, [])

    const getArticles = async () => {
        const response = await fetch("http://localhost:3001/api/blogs");
        const data = await response.json();
        setArticles(data);
    }

    const deleteArticle = async (id) => {
        await fetch(`http://localhost:3001/api/blogs/${id}`, {
            method: 'DELETE'
        });
        setMessage('Article supprimé !');
        getArticles();
    }

    return (
        <div>
            <h1>Listing</h1>
            {message && <p>{message}</p>}
            {articles.map((article, index) => (
                <div key={index}>
                    <h2>{article.title}</h2>
                    <p>{article.summary}</p>
                    <p>{article.content}</p>
                    <p>{article.author}</p>
                    <p>{article.category}</p>
                    <a href={`/blog/${article._id}`}>En savoir plus</a>
                    <button onClick={() => deleteArticle(article._id)}>Supprimer</button>
                    <button onClick={() => navigate(`/blog/edit/${article._id}`)}>Modifier l&apos;article</button> {/* Lien vers la page de modification de l'article, à reporter dans la page app côté front */}    
                </div>
            ))}
        </div>
    );
};

export default BlogList;