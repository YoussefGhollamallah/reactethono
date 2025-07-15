import { MiddlewareHandler } from 'hono';
import { UserRole, UserPayload } from '../types/user.types';

export const requireRole = (allowedRoles: UserRole[]): MiddlewareHandler => {
    return async (c, next) => {
        const user = c.get('user') as UserPayload;
        
        if (!user) {
            return c.json({ error: 'Utilisateur non authentifié' }, 401);
        }

        if (!allowedRoles.includes(user.role)) {
            return c.json({ error: 'Accès refusé. Permissions insuffisantes.' }, 403);
        }

        await next();
    };
};

// Middlewares spécifiques pour chaque rôle
export const requireAdmin = requireRole([UserRole.ADMIN]);
export const requireAuthor = requireRole([UserRole.AUTEUR, UserRole.ADMIN]);
export const requireReader = requireRole([UserRole.LECTEUR, UserRole.AUTEUR, UserRole.ADMIN]); 