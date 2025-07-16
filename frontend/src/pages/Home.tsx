import { Link } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { type Article } from '../api/articles'
import { useAuth } from '../context/AuthContext'

export default function Home() {
    const { user, isAuthenticated } = useAuth()

    const handleArticleClick = (article: Article) => {
        // Rediriger vers la page articles avec l'article sélectionné
        window.location.href = `/articles?id=${article._id}`
    }

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Bienvenu sur le blog de Menbas
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Découvrez les derniers articles et partagez vos connaissances
                    </p>
                    
                    {isAuthenticated ? (
                        <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 inline-block">
                            <p className="text-blue-300">
                                Bonjour <span className="font-semibold">{user?.firstname}</span> ! 
                                Vous êtes connecté en tant que <span className="font-semibold capitalize">{user?.role}</span>
                            </p>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link 
                                to="/login" 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Se connecter
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                S'inscrire
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Articles Section */}
            <section className="bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto">
                    <ArticleList 
                        limit={6} 
                        title="Derniers articles"
                        onArticleClick={handleArticleClick}
                    />
                    
                    {/* Lien vers tous les articles */}
                    {isAuthenticated && (
                        <div className="text-center mt-12">
                            <Link 
                                to="/articles"
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                            >
                                Voir tous les articles
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}   