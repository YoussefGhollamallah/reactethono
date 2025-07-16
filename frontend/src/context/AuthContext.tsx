import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { type User, login as loginApi } from '../api/auth'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    hasRole: (role: string) => boolean
    canCreateArticles: () => boolean
    canEditArticle: (authorId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // 🔁 Charger depuis localStorage au démarrage
    useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
        try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsAuthenticated(true)
        } catch (err) {
        console.error('❌ Erreur JSON.parse sur user:', err)
        localStorage.removeItem('user')
        }
    }
    }, [])


    // ✅ login
    const login = async (email: string, password: string) => {
        const res = await loginApi({ email, password })
        const { token, user } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        setIsAuthenticated(true)
    }

  // 🚪 logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
    window.location.href = '/login'
  }

  // ✅ Vérification des rôles
  const hasRole = (role: string): boolean => {
    return user?.role === role
  }

  // ✅ Peut créer des articles (auteur ou admin)
  const canCreateArticles = (): boolean => {
    return user?.role === 'auteur' || user?.role === 'admin'
  }

  // ✅ Peut modifier un article (auteur du contenu ou admin)
  const canEditArticle = (authorId: string): boolean => {
    return user?.id === authorId || user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      hasRole, 
      canCreateArticles, 
      canEditArticle 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// 🪝 Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
