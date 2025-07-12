import { Hono } from 'hono';
import { register, login } from '../controllers/auth.controller';

const authRoute = new Hono();

authRoute.post('/register', register);
authRoute.post('/login', login);

export default authRoute;
