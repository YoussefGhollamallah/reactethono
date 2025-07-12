import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth()

    return (
        <header>
            <p>

            {isAuthenticated && <span>Bienvenue, {user?.username || 'Utilisateur'}</span>}
            </p>
        <nav>
            

            <Link to="/">Accueil</Link>{" | "}
            {isAuthenticated ? (
            <>
                <Link to="/profile">Profil</Link>{" | "}
                <button onClick={logout}>Déconnexion</button>
            </>
            ) : (
            <>
                <Link to="/login">Connexion</Link>{" | "}
                <Link to="/register">Inscription</Link>
            </>
            )}
        </nav>
        </header>
    )
}
