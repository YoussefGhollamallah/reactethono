import axios, { type AxiosResponse } from 'axios'

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
})

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
})

interface RegisterData {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  role?: string
}

interface LoginData {
  email: string
  password: string
}

export interface User {
    id: string
    username: string
    firstname: string
    lastname: string
    email: string
    role: string
}

export const register = (data: RegisterData) => API.post('/register', data)

export const login = (data: LoginData) => API.post('/login', data)

export const getCurrentUser = (token: string): Promise<AxiosResponse<User>> =>
    API.get('/profile', authHeader(token))

export const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
}
