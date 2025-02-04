import { useState } from 'react';
import { API_URL } from '../config/env'; 
import styles from '../assets/styles/blogCreation.module.scss'

//Page de la création d'article
const BlogCreation = () => {
  //initialisation des états pour la création
  const [creation, setCreation] = useState({});
  //initialisation des états pour le message
  const [message, setMessage] = useState('');

  //fonction d'envoi du formulaire pour la création de l'article
  const handleSubmit = async (e) => {
    //Evite le rafraichissement de la page
    e.preventDefault();
    //Création de la requête
    const formData = new FormData(e.target);
    //Envoi de la requête
    const response = await fetch(API_URL + "/api/blogs", {
      //Création de la requête en POST (envoi)
      method: "POST",
      //Transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
      body: formData    
    })
    //Traitement de la reponse si l'article est créé
    alert('Article creé !');

    //Récupération de l'article
    const data = await response.json();
    setCreation({});
  }
  return (
    <div className={styles.dashboardCreation}>
      <h1 className={styles.title}>Formulaire de création d'un article</h1>
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