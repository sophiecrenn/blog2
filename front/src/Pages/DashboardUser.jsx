import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Hooks/AuthContext';
import { API_URL } from '../config/env'
import styles from '../assets/styles/dashboardUser.module.scss';

const DashboardUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { logout } = useContext(AuthContext);

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });
    
            const data = await response.json();

            if (data.success) {
                alert('Message envoyé avec succès !');
                setName('');
                setEmail('');
                setMessage('');
            } else {
                alert('Erreur lors de l\'envoi du message.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue.');
        }
    };


    return (
        <div className={styles.dashboardUser}>
            <h2 className={styles.connectTitle}>Contactez l&apos;Administrateur</h2>
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
            </form>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default DashboardUser;