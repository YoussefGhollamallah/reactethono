import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ArticleList from '../components/ArticleList'
import { type Article, deleteArticle } from '../api/articles'
import { useAuth } from '../context/AuthContext'

export default function Articles() {
    const { user, canEditArticle } = useAuth()
    const navigate = useNavigate()
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleArticleClick = (article: Article) => {
        setSelectedArticle(article)
    }

    const handleBackToList = () => {
        setSelectedArticle(null)
    }

    const handleDeleteArticle = async (articleId: string) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')) {
            return
        }

        setIsDeleting(true)
        try {
            await deleteArticle(articleId)
            setSelectedArticle(null) // Retourner à la liste
            // Optionnel: rafraîchir la liste des articles
            window.location.reload()
        } catch (error: any) {
            console.error('Erreur lors de la suppression:', error)
            alert('Erreur lors de la suppression de l\'article')
        } finally {
            setIsDeleting(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (selectedArticle) {
        return (
            <main className="min-h-screen bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Bouton retour */}
                    <button
                        onClick={handleBackToList}
                        className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux articles
                    </button>

                    {/* Article complet */}
                    <article className="bg-gray-800 rounded-lg p-8 shadow-xl">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                {selectedArticle.title}
                            </h1>
                            
                            {selectedArticle.summary && (
                                <p className="text-xl text-gray-300 mb-6 italic">
                                    {selectedArticle.summary}
                                </p>
                            )}

                            <div className="flex items-center justify-between text-gray-400 border-b border-gray-600 pb-4">
                                <div className="flex items-center space-x-4">
                                    <span className="font-medium">
                                        {selectedArticle.author.firstname} {selectedArticle.author.lastname}
                                    </span>
                                    <span className="text-sm">
                                        @{selectedArticle.author.username}
                                    </span>
                                </div>
                                <div className="text-sm">
                                    <div>Publié le {formatDate(selectedArticle.createdAt)}</div>
                                    {selectedArticle.updatedAt !== selectedArticle.createdAt && (
                                        <div className="text-xs text-gray-500">
                                            Modifié le {formatDate(selectedArticle.updatedAt)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </header>

                        <div 
                            className="prose prose-lg prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                        />

                        {/* Actions pour l'auteur */}
                        {user && canEditArticle(selectedArticle.author._id) && (
                            <footer className="mt-8 pt-6 border-t border-gray-600">
                                <div className="flex space-x-4">
                                    <Link
                                        to={`/articles/edit/${selectedArticle._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Modifier
                                    </Link>
                                    <button 
                                        onClick={() => handleDeleteArticle(selectedArticle._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                                    </button>
                                </div>
                            </footer>
                        )}
                    </article>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Tous les articles
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Découvrez tous les articles publiés par notre communauté. 
                        Cliquez sur un article pour le lire en entier.
                    </p>
                </header>

                {/* Bouton créer article pour auteurs et admins */}
                {user && (user.role === 'auteur' || user.role === 'admin') && (
                    <div className="text-center mb-8">
                        <Link 
                            to="/articles/create"
                            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            + Créer un nouvel article
                        </Link>
                    </div>
                )}

                <ArticleList onArticleClick={handleArticleClick} />
            </div>
        </main>
    )
} 