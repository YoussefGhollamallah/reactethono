import { type Article } from '../api/articles'

interface ArticleCardProps {
  article: Article
  onClick?: (article: Article) => void
  showSummary?: boolean
}

export default function ArticleCard({ article, onClick, showSummary = true }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleClick = () => {
    if (onClick) {
      onClick(article)
    }
  }

  return (
    <article 
      className={`bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        onClick ? 'cursor-pointer hover:bg-gray-700' : ''
      }`}
      onClick={handleClick}
    >
      <header className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {article.title}
        </h2>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            Par {article.author.firstname} {article.author.lastname}
          </span>
          <time dateTime={article.createdAt}>
            {formatDate(article.createdAt)}
          </time>
        </div>
      </header>

      {showSummary && article.summary && (
        <p className="text-gray-300 mb-4 line-clamp-3">
          {article.summary}
        </p>
      )}

      {!showSummary && (
        <div 
          className="text-gray-300 mb-4 line-clamp-4"
          dangerouslySetInnerHTML={{ 
            __html: article.content.substring(0, 200) + (article.content.length > 200 ? '...' : '') 
          }}
        />
      )}

      <footer className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          @{article.author.username}
        </span>
        {onClick && (
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Lire la suite →
          </button>
        )}
      </footer>
    </article>
  )
} 