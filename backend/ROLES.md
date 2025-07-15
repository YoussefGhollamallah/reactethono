# Système de Rôles

## Rôles disponibles

### 1. **Lecteur** (`lecteur`)
- Rôle par défaut attribué lors de l'inscription
- **Permissions :**
  - Consulter tous les articles
  - Consulter un article spécifique
  - Accéder à son profil

### 2. **Auteur** (`auteur`)
- Hérite de toutes les permissions du lecteur
- **Permissions supplémentaires :**
  - Créer de nouveaux articles
  - Modifier ses propres articles
  - Supprimer ses propres articles

### 3. **Admin** (`admin`)
- Hérite de toutes les permissions de l'auteur
- **Permissions supplémentaires :**
  - Modifier les articles de tous les utilisateurs
  - Supprimer les articles de tous les utilisateurs
  - Consulter la liste de tous les utilisateurs
  - Modifier les rôles des autres utilisateurs

## API Endpoints

### Authentification
- `POST /auth/register` - Inscription (avec option de rôle)
- `POST /auth/login` - Connexion
- `GET /auth/profile` - Profil utilisateur (authentifié)

### Gestion des utilisateurs (Admin uniquement)
- `GET /auth/users` - Liste tous les utilisateurs
- `PUT /auth/users/role` - Modifier le rôle d'un utilisateur

### Articles
- `GET /articles/` - Consulter tous les articles (Lecteur+)
- `GET /articles/:id` - Consulter un article (Lecteur+)
- `POST /articles/` - Créer un article (Auteur+)
- `PUT /articles/:id` - Modifier un article (Auteur+ ou son propre article)
- `DELETE /articles/:id` - Supprimer un article (Auteur+ ou son propre article)

## Exemples d'utilisation

### Inscription avec rôle spécifique
```json
POST /auth/register
{
  "username": "john_doe",
  "firstname": "John",
  "lastname": "Doe", 
  "email": "john@example.com",
  "password": "motdepasse123",
  "role": "auteur"
}
```

### Modification du rôle d'un utilisateur (Admin uniquement)
```json
PUT /auth/users/role
{
  "userId": "user_id_here",
  "newRole": "admin"
}
```

## Headers requis

Pour les endpoints protégés, inclure le token JWT :
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Codes de réponse

- `200` - Succès
- `201` - Créé avec succès
- `400` - Requête invalide
- `401` - Non authentifié
- `403` - Accès refusé (permissions insuffisantes)
- `404` - Ressource introuvable
- `500` - Erreur serveur 