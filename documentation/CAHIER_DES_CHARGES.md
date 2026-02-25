# Cahier des Charges - Système de Gestion RH & Portail Client Promptis

## 📋 Informations Générales

**Nom du Projet:** Promptis Manager  
**Client:** Promptis - IT Consulting Services  
**Développeur:** Mohammed Ilyas Salmy  
**Institution:** OFPPT - Développement Digital  
**Date:** Janvier 2026  
**Durée du Stage:** 5 semaines  

---

## 1. Contexte du Projet

### 1.1 Présentation de l'Entreprise
Promptis est une entreprise de consulting IT basée à Casablanca, spécialisée dans:
- Développement de logiciels sur mesure
- Data Engineering & Analytics
- Solutions Web & E-Commerce
- Infrastructure Cloud & DevOps
- Design UX/UI

### 1.2 Problématique
Promptis a besoin d'un système unifié pour:
- Gérer efficacement ses employés et leurs compétences
- Suivre l'avancement des projets clients
- Faciliter la communication avec les clients
- Centraliser la gestion des tickets de support
- Partager des documents et livrables de projets

### 1.3 Objectifs du Projet
1. **Gestion RH Interne:** Outil pour gérer les employés, leurs compétences et affectations
2. **Gestion de Projets:** Suivi des projets clients avec progression en temps réel
3. **Portail Client:** Interface permettant aux clients de suivre leurs projets
4. **Système de Tickets:** Gestion des demandes et tickets de support
5. **Gestion Documentaire:** Partage sécurisé de fichiers projet

---

## 2. Périmètre Fonctionnel

### 2.1 Acteurs du Système

#### 2.1.1 Administrateur (Promptis)
- Accès complet au système
- Gestion des employés
- Gestion des clients
- Gestion des projets
- Affectation des ressources
- Gestion des tickets
- Téléchargement de documents

#### 2.1.2 Employé (Promptis)
- Consultation de ses projets assignés
- Mise à jour de la progression
- Gestion des tickets assignés
- Téléchargement de livrables
- Consultation des documents projet

#### 2.1.3 Client
- Consultation de ses projets
- Visualisation de la progression
- Création de nouveaux tickets
- Consultation et téléchargement de fichiers
- Communication avec l'équipe Promptis

---

## 3. Spécifications Fonctionnelles

### 3.1 Module d'Authentification

#### Fonctionnalités:
- **Inscription:** Création de compte (clients uniquement)
- **Connexion:** Login avec email/mot de passe
- **Déconnexion:** Logout sécurisé
- **Gestion de profil:** Modification des informations personnelles

#### Sécurité:
- Mots de passe hashés (bcrypt)
- Tokens JWT/Sanctum
- Protection CSRF
- Limitation de tentatives de connexion

---

### 3.2 Dashboard Administrateur

#### 3.2.1 Vue d'ensemble
Affichage des statistiques clés:
- Nombre total d'employés
- Nombre de projets actifs/terminés
- Nombre de tickets ouverts/en cours/résolus
- Nombre de clients actifs
- Graphiques de performance

#### 3.2.2 Gestion des Employés
**Fonctionnalités:**
- ✅ Ajouter un employé
- ✅ Modifier les informations d'un employé
- ✅ Supprimer un employé
- ✅ Afficher liste avec filtres et recherche
- ✅ Assigner des compétences
- ✅ Consulter l'historique des projets

**Informations employé:**
- Nom complet
- Email
- Téléphone
- Poste/Position
- Département
- Compétences techniques
- Date d'embauche
- Photo de profil (optionnel)

#### 3.2.3 Gestion des Clients
**Fonctionnalités:**
- ✅ Ajouter un client
- ✅ Modifier les informations
- ✅ Supprimer un client
- ✅ Liste avec recherche
- ✅ Consulter l'historique des projets

**Informations client:**
- Nom de l'entreprise
- Nom du contact principal
- Email
- Téléphone
- Adresse
- Logo entreprise (optionnel)

#### 3.2.4 Gestion des Projets
**Fonctionnalités:**
- ✅ Créer un nouveau projet
- ✅ Modifier un projet existant
- ✅ Supprimer un projet
- ✅ Assigner des employés au projet
- ✅ Définir/Modifier le statut (En attente, En cours, Terminé, Annulé)
- ✅ Mettre à jour la progression (0-100%)
- ✅ Télécharger des fichiers projet
- ✅ Filtrer par statut, client, date

**Informations projet:**
- Titre du projet
- Description détaillée
- Client assigné
- Type de projet (Web, Mobile, Data, Cloud, etc.)
- Date de début
- Date de fin prévue
- Budget (optionnel)
- Statut
- Pourcentage de progression
- Employés assignés avec leurs rôles
- Fichiers attachés

#### 3.2.5 Gestion des Tickets
**Fonctionnalités:**
- ✅ Voir tous les tickets
- ✅ Filtrer par statut, priorité, projet
- ✅ Assigner un ticket à un employé
- ✅ Changer le statut
- ✅ Ajouter des commentaires
- ✅ Marquer comme résolu

**Informations ticket:**
- ID unique
- Titre
- Description
- Projet lié
- Client créateur
- Priorité (Basse, Moyenne, Haute, Urgente)
- Statut (Ouvert, En cours, Résolu, Fermé)
- Employé assigné
- Date de création
- Date de résolution
- Historique des commentaires

---

### 3.3 Portail Client

#### 3.3.1 Dashboard Client
**Statistiques visibles:**
- 📊 Nombre de projets actifs
- ✅ Nombre de projets terminés
- 🎫 Nombre de tickets ouverts
- 📁 Nombre de fichiers partagés

**Affichage:**
- Cartes statistiques colorées (comme l'image fournie)
- Liste des projets avec barres de progression
- Bouton "+ Nouveau Ticket"

#### 3.3.2 Mes Projets
**Fonctionnalités:**
- ✅ Voir tous ses projets
- ✅ Filtrer par statut
- ✅ Voir le détail d'un projet
- ✅ Consulter la progression visuelle
- ✅ Voir l'équipe assignée
- ✅ Accéder aux fichiers du projet

**Informations affichées:**
- Titre et description
- Type de projet
- Dates (début/fin)
- Barre de progression avec pourcentage
- Badge de statut coloré
- Employés assignés
- Bouton d'accès aux détails

#### 3.3.3 Gestion des Tickets
**Fonctionnalités:**
- ✅ Créer un nouveau ticket
- ✅ Consulter ses tickets
- ✅ Filtrer par statut/priorité
- ✅ Voir le détail d'un ticket
- ✅ Ajouter des commentaires
- ✅ Recevoir des notifications

**Création de ticket:**
- Sélection du projet concerné
- Titre du problème/demande
- Description détaillée
- Niveau de priorité
- Pièces jointes (optionnel)

#### 3.3.4 Fichiers & Documents
**Fonctionnalités:**
- ✅ Consulter tous les fichiers partagés
- ✅ Filtrer par projet
- ✅ Télécharger les fichiers
- ✅ Prévisualisation (si possible)

---

### 3.4 Portail Employé

#### 3.4.1 Dashboard Employé
**Statistiques:**
- Nombre de projets assignés
- Nombre de tickets assignés
- Tâches en cours

#### 3.4.2 Mes Projets Assignés
**Fonctionnalités:**
- ✅ Voir ses projets
- ✅ Mettre à jour la progression
- ✅ Consulter les détails
- ✅ Voir les autres membres de l'équipe

#### 3.4.3 Mes Tickets
**Fonctionnalités:**
- ✅ Voir les tickets assignés
- ✅ Changer le statut
- ✅ Ajouter des commentaires/solutions
- ✅ Marquer comme résolu

#### 3.4.4 Gestion des Fichiers
**Fonctionnalités:**
- ✅ Télécharger des livrables
- ✅ Consulter les fichiers projet
- ✅ Télécharger les documents

---

## 4. Spécifications Techniques

### 4.1 Architecture

**Type:** Application Full-Stack (SPA + API REST)

**Frontend:**
- Framework: React.js (v18+)
- Routing: React Router DOM (v6)
- Styling: Tailwind CSS
- HTTP Client: Axios
- State Management: React Context API / React Query
- Formulaires: React Hook Form
- Validation: Yup ou Zod
- Charts: Chart.js ou Recharts
- Icons: React Icons / Heroicons

**Backend:**
- Framework: Laravel 11 (PHP 8.2+)
- API: RESTful API
- Authentication: Laravel Sanctum (Token-based)
- ORM: Eloquent
- Validation: Laravel Form Requests
- Storage: Laravel File Storage
- Mail: Laravel Mail

**Base de Données:**
- SGBD: MySQL 8.0+
- ORM: Eloquent
- Migrations: Laravel Migrations
- Seeders: Pour données de test

**Serveur de Développement:**
- Frontend: Vite Dev Server (port 5173)
- Backend: Laravel Built-in Server / WAMP (port 8000)
- Base de données: MySQL via WAMP

---

### 4.2 Structure de la Base de Données

#### Tables Principales:

**1. users**
```sql
- id (PK)
- name
- email (unique)
- password (hashed)
- role (enum: admin, employee, client)
- email_verified_at
- created_at, updated_at
```

**2. employees**
```sql
- id (PK)
- user_id (FK → users)
- phone
- position
- department
- skills (JSON)
- hire_date
- profile_photo
- created_at, updated_at
```

**3. clients**
```sql
- id (PK)
- user_id (FK → users)
- company_name
- contact_name
- phone
- address
- logo
- created_at, updated_at
```

**4. projects**
```sql
- id (PK)
- client_id (FK → clients)
- title
- description (text)
- type
- start_date
- end_date
- budget (decimal, nullable)
- status (enum: pending, in_progress, completed, cancelled)
- progress (integer 0-100)
- created_at, updated_at
```

**5. project_employee** (Pivot Table)
```sql
- id (PK)
- project_id (FK → projects)
- employee_id (FK → employees)
- role (ex: developer, designer, lead)
- created_at, updated_at
```

**6. tickets**
```sql
- id (PK)
- project_id (FK → projects)
- client_id (FK → clients)
- employee_id (FK → employees, nullable)
- title
- description (text)
- priority (enum: low, medium, high, urgent)
- status (enum: open, in_progress, resolved, closed)
- created_at, updated_at, resolved_at
```

**7. ticket_comments**
```sql
- id (PK)
- ticket_id (FK → tickets)
- user_id (FK → users)
- comment (text)
- created_at, updated_at
```

**8. files**
```sql
- id (PK)
- project_id (FK → projects)
- uploaded_by (FK → users)
- file_name
- file_path
- file_type
- file_size
- created_at, updated_at
```

---

### 4.3 API Endpoints

#### Authentication
```
POST   /api/register          - Inscription client
POST   /api/login             - Connexion
POST   /api/logout            - Déconnexion
GET    /api/user              - Obtenir utilisateur connecté
```

#### Employees (Admin only)
```
GET    /api/employees         - Liste des employés
POST   /api/employees         - Créer employé
GET    /api/employees/{id}    - Détails employé
PUT    /api/employees/{id}    - Modifier employé
DELETE /api/employees/{id}    - Supprimer employé
```

#### Clients (Admin only)
```
GET    /api/clients           - Liste des clients
POST   /api/clients           - Créer client
GET    /api/clients/{id}      - Détails client
PUT    /api/clients/{id}      - Modifier client
DELETE /api/clients/{id}      - Supprimer client
```

#### Projects
```
GET    /api/projects          - Liste projets (selon rôle)
POST   /api/projects          - Créer projet (admin)
GET    /api/projects/{id}     - Détails projet
PUT    /api/projects/{id}     - Modifier projet (admin/employee)
DELETE /api/projects/{id}     - Supprimer projet (admin)
POST   /api/projects/{id}/assign-employee - Assigner employé
```

#### Tickets
```
GET    /api/tickets           - Liste tickets
POST   /api/tickets           - Créer ticket
GET    /api/tickets/{id}      - Détails ticket
PUT    /api/tickets/{id}      - Modifier ticket
POST   /api/tickets/{id}/comments - Ajouter commentaire
```

#### Files
```
GET    /api/projects/{id}/files    - Liste fichiers projet
POST   /api/projects/{id}/files    - Upload fichier
GET    /api/files/{id}/download    - Télécharger fichier
DELETE /api/files/{id}              - Supprimer fichier
```

#### Statistics
```
GET    /api/stats/dashboard   - Stats dashboard selon rôle
```

---

### 4.4 Sécurité

**Mesures de sécurité:**
- ✅ Authentification par token (Sanctum)
- ✅ Hachage des mots de passe (bcrypt)
- ✅ Protection CSRF
- ✅ Validation des entrées (backend + frontend)
- ✅ Protection contre injection SQL (Eloquent)
- ✅ Limitation de taille de fichiers
- ✅ Types de fichiers autorisés (whitelist)
- ✅ Rate limiting sur API
- ✅ Headers de sécurité HTTP
- ✅ Middleware d'authentification et autorisation

---

### 4.5 Interface Utilisateur

**Design Principles:**
- Interface moderne et épurée
- Responsive (mobile, tablette, desktop)
- Navigation intuitive
- Feedback utilisateur (loading, success, error)
- Thème couleurs aligné avec Promptis

**Couleurs Suggérées:**
- Primaire: Bleu (#4F46E5) - projets actifs
- Secondaire: Cyan (#06B6D4) - projets terminés  
- Accent: Orange (#F59E0B) - tickets
- Violet: (#8B5CF6) - fichiers
- Success: Vert (#10B981)
- Danger: Rouge (#EF4444)

**Composants Clés:**
- Dashboard cards avec statistiques
- Tables avec pagination et recherche
- Formulaires avec validation
- Modals pour actions rapides
- Barres de progression
- Badges de statut
- Dropdowns et filtres
- File upload avec preview
- Notifications toast

---

## 5. Spécifications Non-Fonctionnelles

### 5.1 Performance
- Temps de chargement < 3 secondes
- API response time < 500ms
- Pagination pour listes longues
- Lazy loading des images
- Optimisation des requêtes SQL

### 5.2 Compatibilité
- Navigateurs: Chrome, Firefox, Safari, Edge (dernières versions)
- Responsive: Desktop (1920px), Tablet (768px), Mobile (375px)

### 5.3 Scalabilité
- Architecture modulaire
- Code réutilisable (composants React)
- Base de données optimisée (index)

### 5.4 Maintenance
- Code commenté
- Documentation technique
- Conventions de nommage claires
- Structure de dossiers organisée

---

## 6. Livrables du Projet

### 6.1 Documentation
- ✅ Cahier des charges (ce document)
- ✅ Schéma de base de données (ERD)
- ✅ Documentation API (endpoints)
- ✅ Guide d'installation
- ✅ Manuel utilisateur
- ✅ Documentation technique du code

### 6.2 Code Source
- ✅ Backend Laravel complet
- ✅ Frontend React complet
- ✅ Fichiers de configuration
- ✅ Migrations et seeders
- ✅ Tests (si temps disponible)

### 6.3 Déploiement
- ✅ Application fonctionnelle en local
- ✅ Base de données avec données de test
- ✅ Guide de déploiement

---

## 7. Planning Prévisionnel (5 semaines)

### Semaine 1: Conception & Setup
- Finalisation cahier des charges
- Design base de données
- Setup environnement (Laravel + React)
- Maquettes UI/UX
- Configuration initiale

### Semaine 2: Backend Development
- Création des migrations
- Modèles Eloquent
- Controllers et API endpoints
- Authentication Sanctum
- Validation et middleware

### Semaine 3: Frontend Development - Core
- Setup React + Tailwind
- Système d'authentification
- Layouts et navigation
- Dashboard admin
- Gestion employés et clients

### Semaine 4: Frontend Development - Features
- Gestion de projets
- Système de tickets
- Portail client
- Portail employé
- Upload de fichiers

### Semaine 5: Finalisation & Tests
- Tests fonctionnels
- Corrections de bugs
- Optimisations
- Documentation finale
- Préparation présentation

---

## 8. Contraintes & Hypothèses

### 8.1 Contraintes
- Durée limitée: 5 semaines
- Budget: 0€ (projet de stage)
- Hébergement: Local (WAMP)
- Une seule personne sur le projet

### 8.2 Hypothèses
- Accès à WAMP (Apache, MySQL, PHP)
- Node.js et npm installés
- Composer installé
- Connexion internet stable
- VS Code ou IDE similaire

### 8.3 Risques
| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Délais serrés | Haute | Moyen | Planning strict, focus MVP |
| Problèmes techniques | Moyenne | Élevé | Documentation, Stack Overflow |
| Scope creep | Moyenne | Élevé | Cahier des charges clair |
| Bugs complexes | Moyenne | Moyen | Tests réguliers |

---

## 9. Critères de Succès

Le projet sera considéré comme réussi si:
1. ✅ Toutes les fonctionnalités principales sont implémentées
2. ✅ L'authentification fonctionne pour les 3 rôles
3. ✅ Les dashboards affichent les bonnes données
4. ✅ Les clients peuvent créer des tickets et voir leurs projets
5. ✅ Les admins peuvent gérer employés/clients/projets
6. ✅ Le système de fichiers fonctionne
7. ✅ L'interface est responsive et intuitive
8. ✅ Aucun bug critique
9. ✅ Documentation complète

---

## 10. Validation & Approbation

**Étudiant Développeur:**  
Mohammed Ilyas Salmy  
OFPPT - Développement Digital  

**Encadrant Entreprise:**  
Promptis  

**Date:** Janvier 2026

---

**Note:** Ce document peut être amendé durant le développement en accord avec l'encadrant de stage.
