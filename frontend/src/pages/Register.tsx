import { useState } from 'react'
import { register } from '../api/auth'

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await register(formData)
        alert('Inscription réussie !')
        window.location.href = '/login'
        } catch (err) {
        alert("Erreur d'inscription")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} />
        <input name="firstname" placeholder="Prénom" onChange={handleChange} />
        <input name="lastname" placeholder="Nom" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} />
        <button type="submit">S'inscrire</button>
        </form>
    )
}
