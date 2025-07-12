import axios from 'axios'

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
})

export const register = (data: {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
}) => API.post('/register', data)

export const login = (data: { email: string; password: string }) =>
    API.post('/login', data)

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
})

export const getCurrentUser = (token: string) =>
  API.get('/profile', authHeader(token))
