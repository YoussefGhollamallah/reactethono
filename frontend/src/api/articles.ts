import axios, { type AxiosResponse } from 'axios'

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/articles`,
})

const authHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
}

export interface Article {
  _id: string
  title: string
  summary?: string
  content: string
  author: {
    _id: string
    username: string
    firstname: string
    lastname: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateArticleData {
  title: string
  summary?: string
  content: string
}

export interface UpdateArticleData {
  title?: string
  summary?: string
  content?: string
}

// Récupérer tous les articles
export const getAllArticles = (): Promise<AxiosResponse<{ articles: Article[] }>> =>
  API.get('/', authHeader())

// Récupérer un article par ID
export const getArticleById = (id: string): Promise<AxiosResponse<{ article: Article }>> =>
  API.get(`/${id}`, authHeader())

// Créer un nouvel article
export const createArticle = (data: CreateArticleData): Promise<AxiosResponse<{ message: string; article: Article }>> =>
  API.post('/', data, authHeader())

// Mettre à jour un article
export const updateArticle = (id: string, data: UpdateArticleData): Promise<AxiosResponse<{ message: string; article: Article }>> =>
  API.put(`/${id}`, data, authHeader())

// Supprimer un article
export const deleteArticle = (id: string): Promise<AxiosResponse<{ message: string }>> =>
  API.delete(`/${id}`, authHeader()) 