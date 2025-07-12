import { Hono } from 'hono';
import { register, login } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

type UserPayload = {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
};

const authRoute = new Hono<{ Variables: { user: UserPayload } }>();

authRoute.post('/register', register);
authRoute.post('/login', login);

authRoute.get('/profile', authMiddleware, (c) => {
    const user = c.get('user') as UserPayload;
    return c.json(user);
});

export default authRoute;
