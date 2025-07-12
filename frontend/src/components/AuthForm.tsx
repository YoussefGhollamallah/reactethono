import { useState } from 'react'

type Props = {
    onSubmit: (data: { email: string; password: string }) => void
    title: string
}

function AuthForm({ onSubmit, title }: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit({ email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{title}</button>
        </form>
    )
}


export default AuthForm