import React, { useState, useEffect } from 'react';

const BlogCreation=()=>{
const [creation,setCreation]=useState({});
const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(creation)     //transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
        })

        setMessage('Article creé !');
    
        const data = await response.json();
        setCreation({});
        console.log(data);
      }
    return (
        <div>
            <h1>Creation</h1>
            {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
        <label>
          Titre : <input type="text" name="title" value={creation.title} required onChange={(e) => setCreation({ ...creation, title: e.target.value })} />
        </label>
        <br />
        <label>
          Résumé : <input type="text" name="resume" value={creation.resume} required onChange={(e) => setCreation({ ...creation, resume: e.target.value })} />
        </label>
        <br />
        <label>
          Contenu : <textarea name="content" value={creation.content} required onChange={(e) => setCreation({ ...creation, content: e.target.value })}></textarea>
        </label>
        <br />
        <label>
          Auteur : <input type="text" name="author" value={creation.autor} required onChange={(e) => setCreation({ ...creation, author: e.target.value })} />
        </label>
        <br />
        <label>
          Catégorie :
        <select name="category" value={creation.category} required onChange={(e) => setCreation({ ...creation, category: e.target.value })} >
        <option value="History"> Histoire</option>
        <option value="Anthropology"> Anthropologie</option>
        </select>
        </label>
        <br />
        <button type="submit">Envoyer</button>
      </form>   
        </div>
    );
};

export default BlogCreation;