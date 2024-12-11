import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
      }

    return (
        <div>
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
            <div>Log out: <button onClick={logout}>Logout</button></div>
        </div>
    );
};

export default DashboardUser;