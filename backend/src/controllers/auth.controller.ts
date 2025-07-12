import { Context } from 'hono';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

export const register = async (c: Context) => {
    const {username, firstname, lastname, email, password } = await c.req.json();
    const userExists = await User.findOne({ email });

    if (userExists) return c.text('Utilisateur déjà existant', 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, firstname, lastname, email, password: hashedPassword });
    await newUser.save();

    return c.text('Inscription réussie', 201);
};

export const login = async (c: Context) => {
    const { email, password } = await c.req.json();
    const user = await User.findOne({ email });

    if (!user) return c.text('Utilisateur introuvable', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return c.text('Mot de passe incorrect', 401);

    const token = generateToken({ id: user._id,username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email });
    return c.json({ token, user: { id: user._id, username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email }    });
};
