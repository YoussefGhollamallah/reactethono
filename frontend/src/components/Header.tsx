import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
    const { isAuthenticated, logout } = useAuth()

    return (
        <header>
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
