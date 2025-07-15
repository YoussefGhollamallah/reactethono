import { Context } from 'hono';
import { Article } from '../models/article.model';
import { UserPayload } from '../types/user.types';

export const getAllArticles = async (c: Context) => {
    try {
        const articles = await Article.find().populate('author', 'username firstname lastname');
        return c.json({ articles });
    } catch (error) {
        return c.json({ error: 'Erreur lors de la récupération des articles' }, 500);
    }
};

export const getArticleById = async (c: Context) => {
    const { id } = c.req.param();
    
    try {
        const article = await Article.findById(id).populate('author', 'username firstname lastname');
        
        if (!article) {
            return c.json({ error: 'Article introuvable' }, 404);
        }
        
        return c.json({ article });
    } catch (error) {
        return c.json({ error: 'Erreur lors de la récupération de l\'article' }, 500);
    }
};

export const createArticle = async (c: Context) => {
    const user = c.get('user') as UserPayload;
    const { title, content, summary } = await c.req.json();
    
    try {
        const newArticle = new Article({
            title,
            content,
            summary,
            author: user.id
        });
        
        await newArticle.save();
        await newArticle.populate('author', 'username firstname lastname');
        
        return c.json({ 
            message: 'Article créé avec succès',
            article: newArticle 
        }, 201);
    } catch (error) {
        return c.json({ error: 'Erreur lors de la création de l\'article' }, 500);
    }
};

export const updateArticle = async (c: Context) => {
    const user = c.get('user') as UserPayload;
    const { id } = c.req.param();
    const { title, content, summary } = await c.req.json();
    
    try {
        const article = await Article.findById(id);
        
        if (!article) {
            return c.json({ error: 'Article introuvable' }, 404);
        }
        
        // Seul l'auteur ou un admin peut modifier l'article
        if (article.author.toString() !== user.id && user.role !== 'admin') {
            return c.json({ error: 'Accès refusé. Vous ne pouvez modifier que vos propres articles.' }, 403);
        }
        
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title, content, summary, updatedAt: new Date() },
            { new: true }
        ).populate('author', 'username firstname lastname');
        
        return c.json({ 
            message: 'Article mis à jour avec succès',
            article: updatedArticle 
        });
    } catch (error) {
        return c.json({ error: 'Erreur lors de la mise à jour de l\'article' }, 500);
    }
};

export const deleteArticle = async (c: Context) => {
    const user = c.get('user') as UserPayload;
    const { id } = c.req.param();
    
    try {
        const article = await Article.findById(id);
        
        if (!article) {
            return c.json({ error: 'Article introuvable' }, 404);
        }
        
        // Seul l'auteur ou un admin peut supprimer l'article
        if (article.author.toString() !== user.id && user.role !== 'admin') {
            return c.json({ error: 'Accès refusé. Vous ne pouvez supprimer que vos propres articles.' }, 403);
        }
        
        await Article.findByIdAndDelete(id);
        
        return c.json({ message: 'Article supprimé avec succès' });
    } catch (error) {
        return c.json({ error: 'Erreur lors de la suppression de l\'article' }, 500);
    }
};
