import { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth'

interface User {
    id: string
    username: string
    firstname: string
    lastname: string
    email: string
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        getCurrentUser(token)
        .then((res) => setUser(res.data))
        .catch(() => alert('Erreur de récupération du profil'))
    }, [])

    if (!user) return <p>Chargement...</p>

    return (
        <div>
        <h2>Mon profil</h2>
        <p><strong>Nom :</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
        <p><strong>Email :</strong> {user.email}</p>
        </div>
    )
}
