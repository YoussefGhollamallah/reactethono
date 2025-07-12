import { MiddlewareHandler } from 'hono';
import { verifyToken } from '../utils/jwt';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) return c.text('Token manquant', 401);

    try {
        const decoded = verifyToken(token);
        c.set('user', decoded);
        await next();
    } catch (err) {
        return c.text('Token invalide', 401);
    }
};
