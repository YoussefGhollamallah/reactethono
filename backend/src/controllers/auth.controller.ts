import { Context } from 'hono';
import { User } from '../models/user.model';
import { generateToken } from '../utils/jwt';
import { UserRole } from '../types/user.types';
import bcrypt from 'bcryptjs';

export const register = async (c: Context) => {
    const {username, firstname, lastname, email, password, role } = await c.req.json();
    const userExists = await User.findOne({ email });

    if (userExists) return c.text('Utilisateur déjà existant', 400);

    // Validation du rôle
    const userRole = role && Object.values(UserRole).includes(role) ? role : UserRole.LECTEUR;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, firstname, lastname, email, password: hashedPassword, role: userRole });
    await newUser.save();

    return c.json({ 
        message: 'Inscription réussie', 
        user: { 
            id: newUser._id, 
            username: newUser.username, 
            firstname: newUser.firstname, 
            lastname: newUser.lastname, 
            email: newUser.email, 
            role: newUser.role 
        } 
    }, 201);
};

export const login = async (c: Context) => {
    const { email, password } = await c.req.json();
    const user = await User.findOne({ email });

    if (!user) return c.text('Utilisateur introuvable', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return c.text('Mot de passe incorrect', 401);

    const token = generateToken({ 
        id: user._id,
        username: user.username, 
        firstname: user.firstname, 
        lastname: user.lastname, 
        email: user.email,
        role: user.role 
    });
    
    return c.json({ 
        token, 
        user: { 
            id: user._id, 
            username: user.username, 
            firstname: user.firstname, 
            lastname: user.lastname, 
            email: user.email,
            role: user.role
        }
    });
};

export const updateUserRole = async (c: Context) => {
    const { userId, newRole } = await c.req.json();
    
    // Vérifier que le nouveau rôle est valide
    if (!Object.values(UserRole).includes(newRole)) {
        return c.json({ error: 'Rôle invalide' }, 400);
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            { role: newRole }, 
            { new: true }
        ).select('-password');

        if (!user) {
            return c.json({ error: 'Utilisateur introuvable' }, 404);
        }

        return c.json({ 
            message: 'Rôle mis à jour avec succès',
            user: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        return c.json({ error: 'Erreur lors de la mise à jour du rôle' }, 500);
    }
};

export const getAllUsers = async (c: Context) => {
    try {
        const users = await User.find().select('-password');
        return c.json({ users });
    } catch (error) {
        return c.json({ error: 'Erreur lors de la récupération des utilisateurs' }, 500);
    }
};
