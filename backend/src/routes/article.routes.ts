import { Hono } from 'hono';
import { 
    getAllArticles, 
    getArticleById, 
    createArticle, 
    updateArticle, 
    deleteArticle 
} from '../controllers/article.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireReader, requireAuthor, requireAdmin } from '../middlewares/role.middleware';
import { UserPayload } from '../types/user.types';

const articleRoute = new Hono<{ Variables: { user: UserPayload } }>();

// Routes publiques ou pour lecteurs
articleRoute.get('/', authMiddleware, requireReader, getAllArticles);
articleRoute.get('/:id', authMiddleware, requireReader, getArticleById);

// Routes pour auteurs et admins
articleRoute.post('/', authMiddleware, requireAuthor, createArticle);
articleRoute.put('/:id', authMiddleware, requireAuthor, updateArticle);
articleRoute.delete('/:id', authMiddleware, requireAuthor, deleteArticle);

export default articleRoute;
