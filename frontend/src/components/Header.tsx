import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth()

    return (
        <header>
        <nav>
            <Link to="/">Accueil</Link>{" | "}
            {isAuthenticated ? (
            <>
                <span>Bonjour, {user?.firstname}</span>{" | "}
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
