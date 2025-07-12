import { MiddlewareHandler } from 'hono';
import { verifyToken } from '../utils/jwt';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Token manquant ou mal formaté' }, 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token); // ici tu peux logguer decoded si tu veux
        c.set('user', decoded);
        await next();
    } catch (err) {
        console.error('❌ JWT invalide :', err); // debug utile
        return c.json({ error: 'Token invalide ou expiré' }, 401);
    }
};
