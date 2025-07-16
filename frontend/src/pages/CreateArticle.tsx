import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import { createArticle, type CreateArticleData } from '../api/articles'
import { useAuth } from '../context/AuthContext'

export default function CreateArticle() {
  const navigate = useNavigate()
  const { canCreateArticles } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Rediriger si l'utilisateur n'a pas les permissions
  if (!canCreateArticles()) {
    return (
      <main className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              Accès refusé
            </h1>
            <p className="text-red-300 mb-6">
              Vous devez être auteur ou administrateur pour créer des articles.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </main>
    )
  }

  const handleSubmit = async (data: CreateArticleData) => {
    setIsLoading(true)
    setError(null)

    try {
      await createArticle(data)
      setSuccess(true)
      
      // Rediriger vers les articles après 2 secondes
      setTimeout(() => {
        navigate('/articles')
      }, 2000)
      
    } catch (error: any) {
      console.error('Erreur lors de la création:', error)
      setError(
        error.response?.data?.error || 
        'Une erreur est survenue lors de la création de l\'article'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/articles')
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-green-900/20 border border-green-500 rounded-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-400 mb-4">
              Article créé avec succès !
            </h1>
            <p className="text-green-300 mb-6">
              Votre article a été publié et est maintenant visible par tous les utilisateurs.
            </p>
            <p className="text-gray-400 text-sm">
              Redirection automatique vers la liste des articles...
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            <li>
              <button 
                onClick={() => navigate('/')}
                className="hover:text-blue-400 transition-colors"
              >
                Accueil
              </button>
            </li>
            <li>
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <button 
                onClick={() => navigate('/articles')}
                className="hover:text-blue-400 transition-colors"
              >
                Articles
              </button>
            </li>
            <li>
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-blue-400">
              Créer un article
            </li>
          </ol>
        </nav>

        {/* Message d'erreur */}
        {error && (
          <div className="mb-8 bg-red-900/20 border border-red-500 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <ArticleForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </main>
  )
} 