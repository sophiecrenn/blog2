import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Hooks/AuthContext';
import { API_URL } from '../config/env'
import styles from '../assets/styles/dashboardUser.module.scss';
import { useRef } from 'react';
import RECAPCHA from 'react-google-recaptcha';

// Composant de dashboard utilisateur
const DashboardUser = () => {
    // Hook pour gérer le formulaire
    const [name, setName] = useState('');
    // Hook pour gérer le formulaire
    const [email, setEmail] = useState('');
    // Hook pour gérer le formulaire
    const [message, setMessage] = useState('');

    // Hook pour naviguer vers la page de connexion
    const { logout } = useContext(AuthContext);

    const recaptchaRef = useRef(null);

    // Fonction pour soumettre le formulaire
    const handleSubmit =  async (e) => {
        // Eviter le rafraichissement de la page
        e.preventDefault();
        const token = await recaptchaRef.current.getValue();
        if (!token) {
            alert("Please complete the reCAPTCHA!");
            return;
          }
        try {
            // Création de la requête
            const response = await fetch(`${API_URL}/send-email`, {
                // Création de la requête en POST
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Transforme en chaîne de caractère pour l'envoi au back qui ne peut pas recevoir d'objet
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

             if (result.success) {
                alert("reCAPTCHA verification successful!");
                // Proceed with your form submission
            } else {
                alert("reCAPTCHA verification failed!");
    }
    
            // Traitement de la reponse
            const data = await response.json();

            if (data.success) {
                // Message de confirmation
                alert('Message envoyé avec succès !');
                //Effacer le nom du formulaire après l'envoi 
                setName('');
                //Effacer l'email du formulaire après l'envoi 
                setEmail('');
                //Effacer le message du formulaire après l'envoi 
                setMessage('');
            } else {
                // Message d'erreur
                alert('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            // Gestion de l'erreur
            console.error('Erreur:', error);
            alert('Une erreur est survenue.');
        }
    };

    return (
        <div className={styles.dashboardUser}>
            <h1 className={styles.connectTitle}>Contactez l&apos;Administrateur</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Envoyer</button>
                <RECAPCHA
                    ref={recaptchaRef}
                    sitekey={process.env.CAPTCHA_KEY}
                />
            </form>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default DashboardUser;