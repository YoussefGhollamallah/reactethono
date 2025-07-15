import { Hono } from 'hono';
import { register, login, updateUserRole, getAllUsers } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';
import { UserPayload } from '../types/user.types';

const authRoute = new Hono<{ Variables: { user: UserPayload } }>();

authRoute.post('/register', register);
authRoute.post('/login', login);

authRoute.get('/profile', authMiddleware, (c) => {
    const user = c.get('user') as UserPayload;
    return c.json(user);
});

// Routes administrateur uniquement
authRoute.get('/users', authMiddleware, requireAdmin, getAllUsers);
authRoute.put('/users/role', authMiddleware, requireAdmin, updateUserRole);

export default authRoute;
