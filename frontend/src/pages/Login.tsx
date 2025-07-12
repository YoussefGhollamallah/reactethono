import { login } from '../api/auth'
import AuthForm from '../components/AuthForm'

export default function Login() {
    const handleLogin = async (data: { email: string; password: string }) => {
        try {
        const res = await login(data)
        localStorage.setItem('token', res.data.token)
        alert('Connexion réussie !')
        window.location.href = '/profile'
        } catch (err) {
        alert('Erreur de connexion')
        }
    }

    return <AuthForm onSubmit={handleLogin} title="Connexion" />
}
