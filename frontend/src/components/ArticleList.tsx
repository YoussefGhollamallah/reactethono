import { useState, useEffect } from 'react'
import { type Article, getAllArticles } from '../api/articles'
import ArticleCard from './ArticleCard'
import { useAuth } from '../context/AuthContext'

interface ArticleListProps {
  limit?: number
  title?: string
  onArticleClick?: (article: Article) => void
}

export default function ArticleList({ limit, title = "Articles récents", onArticleClick }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchArticles = async () => {
      if (!isAuthenticated) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await getAllArticles()
        let articlesData = response.data.articles

        // Trier par date de création (plus récent en premier)
        articlesData = articlesData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        // Limiter le nombre d'articles si spécifié
        if (limit) {
          articlesData = articlesData.slice(0, limit)
        }

        setArticles(articlesData)
        setError(null)
      } catch (err: any) {
        console.error('Erreur lors du chargement des articles:', err)
        setError(err.response?.data?.error || 'Erreur lors du chargement des articles')
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [isAuthenticated, limit])

  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400">
          Connectez-vous pour voir les articles
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
        <p className="text-gray-400 mt-4">Chargement des articles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400">Aucun article disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            onClick={onArticleClick}
          />
        ))}
      </div>
    </section>
  )
} 