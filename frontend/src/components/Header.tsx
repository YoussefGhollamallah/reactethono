import { Button } from "./Button";
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth()

    return (
        <header className="bg-custom-header text-white p-5 flex justify-between items-center gap-5">
            <div>
                {isAuthenticated && (
                    <span className="text-custom-light">
                        Bienvenue, {user?.username || 'Utilisateur'}
                    </span>
                )}
            </div>
            
            <nav className="flex items-center gap-2">
                <Link 
                    to="/" 
                    className="text-white hover:text-custom-light transition-colors"
                >
                    Accueil
                </Link>
                <span className="text-gray-400">|</span>
                
                {isAuthenticated ? (
                    <>
                        <Link 
                            to="/profile"
                            className="text-white hover:text-custom-light transition-colors"
                        >
                            Profil
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Button 
                            onClick={logout} 
                            variant="danger"
                            size="sm"
                        >
                            Déconnexion
                        </Button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login"
                            className="text-white hover:text-custom-light transition-colors"
                        >
                            Connexion
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link 
                            to="/register"
                            className="text-white hover:text-custom-light transition-colors"
                        >
                            Inscription
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}
