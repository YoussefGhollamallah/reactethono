import { useState } from 'react'
import { Button } from './Button'

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
        <div className="max-w-md w-full">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-bold text-center text-black mb-4">
                    {title}
                </h2>
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border-none rounded-md text-black placeholder-black   focus:outline-none focus:ring-2 focus:ring-red-800"
                    required
                />
                
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 border-none rounded-md text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-red-800"
                    required
                />
                
                <Button 
                    type="submit" 
                    variant="primary"
                    className="self-center w-fit mt-2"
                >
                    {title}
                </Button>
            </form>
        </div>
    )
}

export default AuthForm