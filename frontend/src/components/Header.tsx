import { Button } from "./Button";
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const { user, isAuthenticated, logout, canCreateArticles } = useAuth()

    return (
        <header className="bg-custom-header text-white p-5 flex justify-between items-center gap-5">
            <div>
                {isAuthenticated && (
                    <div className="flex items-center gap-4">
                        <span className="text-custom-light">
                            Bienvenue, {user?.username || 'Utilisateur'}
                        </span>
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded-full capitalize">
                            {user?.role}
                        </span>
                    </div>
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
                
                {isAuthenticated && (
                    <>
                        <Link 
                            to="/articles"
                            className="text-white hover:text-custom-light transition-colors"
                        >
                            Articles
                        </Link>
                        <span className="text-gray-400">|</span>
                    </>
                )}
                
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
