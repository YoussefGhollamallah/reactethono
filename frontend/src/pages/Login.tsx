import { useAuth } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'

export default function Login() {
    const { login } = useAuth()

    const handleLogin = async ({ email, password }: { email: string; password: string }) => {
        try {
        await login(email, password)
        alert('Connexion réussie')
        window.location.href = '/profile'
        } catch (err) {
        alert('Erreur de connexion')
        }
    }

    return <AuthForm onSubmit={handleLogin} title="Connexion" />
}
