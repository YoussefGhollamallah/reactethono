export enum UserRole {
    LECTEUR = 'lecteur',
    AUTEUR = 'auteur', 
    ADMIN = 'admin'
}

export interface UserPayload {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: UserRole;
} 