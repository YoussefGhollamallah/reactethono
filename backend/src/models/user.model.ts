import mongoose from 'mongoose';
import { UserRole } from '../types/user.types';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: Object.values(UserRole), 
        default: UserRole.LECTEUR, 
        required: true 
    }
});

export const User = mongoose.model('User', userSchema);
