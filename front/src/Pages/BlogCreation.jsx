import { useState } from 'react';
import { API_URL } from '../config/env';
const BlogCreation = () => {
  const [creation, setCreation] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await fetch(API_URL + "/api/blogs", {
      method: "POST",
      body: formData    //transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
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
          Image : <input type="file" name="image" value={creation.image} required onChange={(e) => setCreation({ ...creation, image: e.target.value })} />
        </label>
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