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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour envoyer le formulaire à l'admin
        console.log('Nom:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        // Réinitialiser le formulaire
        setName('');
        setEmail('');
        setMessage('');
    };


    return (
        <div className={styles.dashboardUser}>
            <h2>Contactez l&apos;Admin</h2>
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
            <div><button onClick={logout}>Logout</button></div>
        </div>
    );
};

export default DashboardUser;