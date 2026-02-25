# 🚀 Guide de Démarrage Rapide

## ▶️ Démarrage en 5 Minutes

### 1. Backend (Terminal 1)
```bash
cd backend
composer install
php artisan migrate:fresh --seed
php artisan key:generate
php artisan storage:link
php artisan serve
```
✅ Backend sur `http://localhost:8000`

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend sur `http://localhost:5173`

### 3. Se Connecter

Ouvrez `http://localhost:5173` et utilisez:

**Admin:**
- Email: `admin@promptis.ma`
- Mot de passe: `password`

**Employé:**
- Email: `ahmed.bennani@promptis.ma`
- Mot de passe: `password`

**Client:**
- Email: `contact@techcorp.ma`
- Mot de passe: `password`

## ✅ État du Projet

### ✨ Fonctionnalités Complétées

#### Backend Laravel ✅
- [x] 7 contrôleurs API (Auth, Employee, Client, Project, Ticket, File, Stats)
- [x] 33 routes API RESTful
- [x] Middleware d'authentification (Sanctum)
- [x] Middleware admin pour protection
- [x] 7 modèles Eloquent avec relations
- [x] 10 migrations de base de données
- [x] Seeder avec données de test en français
- [x] Validation des données
- [x] Gestion des fichiers (upload/download)

#### Frontend React ✅
- [x] Configuration Vite + React + Tailwind
- [x] Système de routing (public/protected routes)
- [x] Context d'authentification
- [x] 7 services API (axios)
- [x] Traductions complètes en français
- [x] Page de connexion en français
- [x] Page d'inscription en français
- [x] Dashboard avec statistiques
- [x] Notifications toast
- [x] Design responsive

#### Base de Données ✅
- [x] 8 tables avec relations
- [x] Foreign keys et cascades
- [x] Index pour performance
- [x] Données de test:
  - 1 admin
  - 3 employés
  - 2 clients
  - 4 projets
  - 4 tickets
  - Commentaires et fichiers

### 🚧 Prochaines Étapes

1. **Pages de Gestion Admin**
   - Liste/CRUD des employés
   - Liste/CRUD des clients
   - Liste/CRUD des projets
   - Assignation employés ↔ projets

2. **Interface Employé**
   - Mes projets
   - Mes tickets
   - Calendrier des tâches

3. **Interface Client**
   - Mes projets
   - Créer un ticket
   - Télécharger fichiers

4. **Améliorations**
   - Pagination des listes
   - Recherche et filtres
   - Export Excel/PDF
   - Envoi d'emails

## 📊 Statistiques du Projet

- **Backend:** ~2,500 lignes de code (PHP)
- **Frontend:** ~1,200 lignes de code (JSX/JS)
- **Documentation:** ~2,000 lignes (Markdown)
- **Total:** ~5,700 lignes de code

## 🎯 Objectifs du Stage

- [x] Cahier des charges complet
- [x] Conception base de données
- [x] Backend API RESTful
- [x] Frontend React moderne
- [x] Interface 100% en français
- [x] Authentification sécurisée
- [x] Système multi-rôles
- [ ] Déploiement en production
- [ ] Tests unitaires
- [ ] Documentation technique

## 📞 Support

Pour toute question:
- **Étudiant:** Stagiaire OFPPT
- **Entreprise:** Promptis (Casablanca)
- **Durée:** 5 semaines
- **Technologies:** React + Laravel + MySQL

---

**Développé dans le cadre du stage OFPPT 2024** 🎓
