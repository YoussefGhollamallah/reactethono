import { useState, useEffect } from 'react'
import { type Article, type CreateArticleData, type UpdateArticleData } from '../api/articles'

interface ArticleFormProps {
  article?: Article // Pour l'édition
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode: 'create' | 'edit'
}

export default function ArticleForm({ article, onSubmit, onCancel, isLoading = false, mode }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: ''
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Pré-remplir le formulaire en mode édition
  useEffect(() => {
    if (mode === 'edit' && article) {
      setFormData({
        title: article.title,
        summary: article.summary || '',
        content: article.content
      })
    }
  }, [mode, article])

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Le contenu est requis'
    } else if (formData.content.length < 20) {
      newErrors.content = 'Le contenu doit contenir au moins 20 caractères'
    }

    if (formData.summary && formData.summary.length > 200) {
      newErrors.summary = 'Le résumé ne peut pas dépasser 200 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
    }
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-8">
        {mode === 'create' ? 'Créer un nouvel article' : 'Modifier l\'article'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange('title')}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Entrez le titre de votre article..."
            disabled={isLoading}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Résumé */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-2">
            Résumé (optionnel)
          </label>
          <textarea
            id="summary"
            value={formData.summary}
            onChange={handleChange('summary')}
            rows={3}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
              errors.summary ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Un bref résumé de votre article (max 200 caractères)..."
            disabled={isLoading}
          />
          <div className="flex justify-between mt-2">
            {errors.summary && (
              <p className="text-sm text-red-400">{errors.summary}</p>
            )}
            <p className="text-xs text-gray-500 ml-auto">
              {formData.summary.length}/200 caractères
            </p>
          </div>
        </div>

        {/* Contenu */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
            Contenu *
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={handleChange('content')}
            rows={15}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
              errors.content ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Rédigez le contenu de votre article... Vous pouvez utiliser du HTML pour la mise en forme."
            disabled={isLoading}
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-400">{errors.content}</p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Vous pouvez utiliser des balises HTML basiques comme &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
          </p>
        </div>

        {/* Boutons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            disabled={isLoading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{mode === 'create' ? 'Création...' : 'Modification...'}</span>
              </div>
            ) : (
              mode === 'create' ? 'Créer l\'article' : 'Sauvegarder'
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 