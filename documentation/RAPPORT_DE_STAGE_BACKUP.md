<div style="text-align: center; padding: 50px 0;">

# ROYAUME DU MAROC

## Office de la Formation Professionnelle et de la Promotion du Travail (OFPPT)

---

### Institut Spécialisé de Technologie Appliquée

---

# RAPPORT DE STAGE DE FIN DE FORMATION

## Filière : Développement Digital - Full Stack

---

# **PROMPTIS MANAGER**

### Système de Gestion RH & Portail Client

---

**Réalisé par :** Mohammed Ilyas Salmy

**Encadré par :** Promptis - IT Consulting Services

**Période de stage :** Janvier - Février 2026

**Durée :** 5 semaines

---

**Année de formation : 2025/2026**

</div>

<div style="page-break-after: always;"></div>

---

# Remerciements

Je tiens à exprimer ma profonde gratitude à toutes les personnes qui ont contribué à la réussite de ce stage et à l'aboutissement de ce projet.

Mes sincères remerciements vont à :

**L'équipe Promptis** pour m'avoir accueilli au sein de leur entreprise et pour la confiance qu'ils m'ont accordée en me confiant ce projet. Leur expertise en consulting IT et leur environnement de travail professionnel m'ont permis d'acquérir une expérience précieuse.

**Mes formateurs à l'OFPPT** pour leur enseignement de qualité tout au long de ma formation en Développement Digital. Les compétences techniques acquises m'ont été essentielles pour mener à bien ce projet.

**Mes collègues de promotion** pour l'entraide et les échanges enrichissants qui ont marqué ces années de formation.

Ce stage a été une expérience formatrice qui m'a permis de mettre en pratique mes connaissances théoriques et de découvrir le monde professionnel du développement web.

<div style="page-break-after: always;"></div>

---

# Sommaire

1. [Introduction](#introduction)
2. [Présentation de l'Entreprise d'Accueil](#présentation-de-lentreprise-daccueil)
   - 2.1 À propos de Promptis
   - 2.2 Domaines d'expertise
   - 2.3 Organigramme
3. [Contexte et Problématique](#contexte-et-problématique)
   - 3.1 Contexte du projet
   - 3.2 Problématique
   - 3.3 Objectifs du projet
4. [Analyse et Conception](#analyse-et-conception)
   - 4.1 Spécifications fonctionnelles
   - 4.2 Diagramme de cas d'utilisation
   - 4.3 Diagramme de classes
   - 4.4 Modèle de base de données
5. [Technologies Utilisées](#technologies-utilisées)
   - 5.1 Stack technique
   - 5.2 Outils de développement
6. [Réalisation](#réalisation)
   - 6.1 Architecture du projet
   - 6.2 Fonctionnalités implémentées
   - 6.3 Captures d'écran
7. [Difficultés Rencontrées et Solutions](#difficultés-rencontrées-et-solutions)
8. [Bilan et Compétences Acquises](#bilan-et-compétences-acquises)
9. [Conclusion et Perspectives](#conclusion-et-perspectives)
10. [Annexes](#annexes)
    - A. Documentation API
    - B. Guide d'installation

<div style="page-break-after: always;"></div>

---

# 1. Introduction

Dans le cadre de ma formation en **Développement Digital - Full Stack** à l'OFPPT, j'ai effectué un stage de fin de formation d'une durée de **5 semaines** au sein de l'entreprise **Promptis**, spécialisée dans le consulting IT à Casablanca.

Ce stage avait pour objectif principal de mettre en pratique les compétences acquises durant ma formation et de découvrir le monde professionnel du développement web. Il m'a été confié la réalisation d'un projet complet : **Promptis Manager**, un système de gestion RH et portail client.

Ce projet répond à un besoin réel de l'entreprise : centraliser la gestion des employés, des clients, des projets et des tickets de support dans une seule application moderne et intuitive.

Le présent rapport détaille les différentes étapes de réalisation de ce projet, depuis l'analyse des besoins jusqu'à la mise en œuvre technique, en passant par la conception et les choix technologiques effectués.

<div style="page-break-after: always;"></div>

---

# 2. Présentation de l'Entreprise d'Accueil

## 2.1 À propos de Promptis

| Information | Détail |
|-------------|--------|
| **Nom** | Promptis |
| **Secteur** | IT Consulting Services |
| **Localisation** | Casablanca, Maroc |
| **Site web** | https://www.promptis.ma |
| **Type** | Entreprise de services numériques |

**Promptis** est une entreprise de consulting IT basée à Casablanca, qui accompagne ses clients dans leur transformation digitale. L'entreprise propose des solutions sur mesure pour répondre aux besoins spécifiques de chaque client.

## 2.2 Domaines d'Expertise

Promptis intervient dans plusieurs domaines clés du numérique :

| Domaine | Description |
|---------|-------------|
| **Développement de logiciels** | Applications sur mesure adaptées aux besoins métier |
| **Data Engineering & Analytics** | Solutions de gestion et analyse de données |
| **Solutions Web & E-Commerce** | Sites web, plateformes e-commerce, applications web |
| **Infrastructure Cloud & DevOps** | Migration cloud, automatisation, CI/CD |
| **Design UX/UI** | Conception d'interfaces utilisateur modernes |

## 2.3 Organisation

L'entreprise est structurée autour de plusieurs pôles de compétences :
- Équipe de développement (développeurs full-stack, front-end, back-end)
- Équipe data (data engineers, data analysts)
- Équipe infrastructure (ingénieurs DevOps, administrateurs système)
- Équipe design (UX/UI designers)
- Direction et gestion de projet

<div style="page-break-after: always;"></div>

---

# 3. Contexte et Problématique

## 3.1 Contexte du Projet

Promptis, en tant qu'entreprise de consulting IT, gère quotidiennement :
- Une équipe d'employés avec des compétences variées
- Un portefeuille de clients avec des projets en cours
- Des demandes de support et des tickets de différentes priorités
- Des documents et livrables à partager avec les clients

Jusqu'à présent, ces informations étaient gérées de manière dispersée (fichiers Excel, emails, outils divers), ce qui rendait le suivi difficile et chronophage.

## 3.2 Problématique

**Comment centraliser et optimiser la gestion des ressources humaines, des projets clients et du support technique dans un outil unique, accessible et sécurisé ?**

Les principaux défis identifiés :
- 📊 Absence de vision globale sur l'activité de l'entreprise
- 👥 Difficulté à suivre les affectations des employés sur les projets
- 📁 Manque de centralisation des documents projet
- 🎫 Gestion des tickets de support non structurée
- 🔐 Besoin de contrôle d'accès selon les rôles (admin, employé, client)

## 3.3 Objectifs du Projet

Le projet **Promptis Manager** vise à :

| # | Objectif | Description |
|---|----------|-------------|
| 1 | **Gestion RH** | Gérer les employés, leurs compétences et affectations |
| 2 | **Gestion de Projets** | Suivre les projets clients avec progression en temps réel |
| 3 | **Portail Client** | Permettre aux clients de suivre leurs projets et créer des tickets |
| 4 | **Système de Tickets** | Centraliser et gérer les demandes de support |
| 5 | **Gestion Documentaire** | Partager des fichiers de manière sécurisée |
| 6 | **Notifications** | Alerter les utilisateurs des événements importants |

<div style="page-break-after: always;"></div>

---

# 4. Analyse et Conception

## 4.1 Spécifications Fonctionnelles

### 4.1.1 Acteurs du Système

Le système identifie trois types d'utilisateurs avec des permissions différentes :

| Acteur | Rôle | Permissions |
|--------|------|-------------|
| **Administrateur** | Gestionnaire Promptis | Accès complet : CRUD employés, clients, projets, tickets, fichiers |
| **Employé** | Membre de l'équipe | Consultation projets assignés, gestion tickets assignés, fichiers |
| **Client** | Client externe | Consultation ses projets, création tickets, téléchargement fichiers |

### 4.1.2 Fonctionnalités par Module

**Module Authentification :**
- Inscription (clients)
- Connexion / Déconnexion sécurisée
- Gestion du profil utilisateur
- Authentification par token (Sanctum)

**Module Employés (Admin) :**
- Ajouter / Modifier / Supprimer un employé
- Gérer les compétences techniques
- Consulter l'historique des projets

**Module Clients (Admin) :**
- Ajouter / Modifier / Supprimer un client
- Associer une entreprise et un logo
- Consulter les projets du client

**Module Projets :**
- Créer / Modifier / Supprimer un projet
- Assigner des employés avec des rôles
- Suivre la progression (0-100%)
- Filtrer par statut, client, date

**Module Tickets :**
- Créer / Gérer les tickets de support
- Assigner à un employé
- Système de priorités (Basse → Urgente)
- Commentaires et historique

**Module Fichiers :**
- Upload de documents par projet
- Téléchargement sécurisé
- Gestion des types de fichiers

**Module Notifications :**
- Alertes pour tickets urgents/haute priorité
- Rappels d'échéances de projets
- Notifications en temps réel

## 4.2 Diagramme de Cas d'Utilisation

```
> *Veuillez remplacer l'image ci-dessous par la capture d'écran de votre propre Diagramme de Cas d'Utilisation UML.*

![Diagramme de Cas d'Utilisation UML](./chemin/vers/diagramme_cas_utilisation.png)
                                                             │
│                                                                              │
│  > *Veuillez remplacer l'image ci-dessous par la capture d'écran de votre propre Diagramme de Classes UML.*

![Diagramme de Classes UML](./chemin/vers/diagramme_classes.png)

```

## 4.4 Modèle de Base de Données (ERD)

> *Veuillez insérer ici votre Modèle Conceptuel de Données (MCD) ou Modèle Logique de Données (MLD).*

![Modèle de Base de Données (MCD / MLD)](./chemin/vers/modele_bdd.png)

**Statuts des projets :** `planifie`, `en_cours`, `en_pause`, `termine`, `annule`
**Statuts des tickets :** `ouvert`, `en_cours`, `resolu`, `ferme`
**Priorités des tickets :** `basse`, `moyenne`, `haute`, `urgente`

<div style="page-break-after: always;"></div>

---

# 5. Technologies Utilisées

## 5.1 Stack Technique

### Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| **React.js** | 18+ | Framework JavaScript pour interfaces utilisateur |
| **Vite** | 7.3.1 | Build tool et serveur de développement |
| **Tailwind CSS** | 4.1 | Framework CSS utilitaire |
| **React Router** | 6+ | Gestion du routage SPA |
| **Axios** | - | Client HTTP pour les appels API |
| **Heroicons** | - | Bibliothèque d'icônes |
| **Recharts** | - | Graphiques et visualisations |
| **React Hot Toast** | - | Notifications toast |

### Backend

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Laravel** | 11 | Framework PHP |
| **PHP** | 8.2+ | Langage backend |
| **Laravel Sanctum** | - | Authentification API par tokens |
| **Eloquent ORM** | - | Mapping objet-relationnel |
| **MySQL** | 8.0+ | Base de données relationnelle |

### Schéma d'Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Navigateur)                        │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐ │
│  │                     FRONTEND (React + Vite)                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │ │
│  │  │  Pages   │  │Components│  │ Services │  │ Contexts │       │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │ │
│  │                            │                                    │ │
│  │                     Axios HTTP Requests                         │ │
│  └────────────────────────────┼───────────────────────────────────┘ │
└───────────────────────────────┼─────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Laravel 11)                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                         API REST                                 │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │ │
│  │  │  Routes  │  │Controllers│  │  Models  │  │Middleware│        │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │ │
│  │                                                                  │ │
│  │  ┌─────────────────────┐    ┌─────────────────────┐            │ │
│  │  │   Laravel Sanctum   │    │    File Storage     │            │ │
│  │  │  (Authentication)   │    │                     │            │ │
│  │  └─────────────────────┘    └─────────────────────┘            │ │
│  └─────────────────────────────────┼───────────────────────────────┘ │
└────────────────────────────────────┼─────────────────────────────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │        MySQL Database          │
                    │      (promptis_manager)        │
                    └────────────────────────────────┘
```

## 5.2 Outils de Développement

| Outil | Usage |
|-------|-------|
| **VS Code** | Éditeur de code principal |
| **WAMP Server** | Environnement local (Apache, MySQL, PHP) |
| **Git** | Gestion de versions |
| **Postman** | Tests des endpoints API |
| **Chrome DevTools** | Débogage frontend |
| **MySQL Workbench** | Administration base de données |

<div style="page-break-after: always;"></div>

---

# 6. Réalisation

## 6.1 Architecture du Projet

### Structure Frontend (React)

```
frontend/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── ClientModal.jsx
│   │   ├── EmployeeModal.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── TicketModal.jsx
│   │   ├── NotificationDropdown.jsx
│   │   └── ...
│   ├── contexts/            # Contextes React (Auth)
│   │   └── AuthContext.jsx
│   ├── layouts/             # Layouts de pages
│   │   └── AdminLayout.jsx
│   ├── pages/               # Pages de l'application
│   │   ├── DashboardHome.jsx
│   │   ├── Employees.jsx
│   │   ├── Clients.jsx
│   │   ├── Projects.jsx
│   │   ├── Tickets.jsx
│   │   ├── Files.jsx
│   │   ├── Profile.jsx
│   │   └── ...
│   ├── services/            # Services API
│   │   └── api.js
│   ├── App.jsx              # Composant racine
│   └── main.jsx             # Point d'entrée
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

### Structure Backend (Laravel)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/    # Contrôleurs API
│   │   │   ├── AuthController.php
│   │   │   ├── EmployeeController.php
│   │   │   ├── ClientController.php
│   │   │   ├── ProjectController.php
│   │   │   ├── TicketController.php
│   │   │   ├── FileController.php
│   │   │   ├── StatsController.php
│   │   │   └── NotificationController.php
│   │   └── Middleware/          # Middlewares
│   │       └── AdminMiddleware.php
│   └── Models/                  # Modèles Eloquent
│       ├── User.php
│       ├── Employee.php
│       ├── Client.php
│       ├── Project.php
│       ├── Ticket.php
│       ├── TicketComment.php
│       ├── File.php
│       └── Notification.php
├── database/
│   ├── migrations/              # Migrations BDD
│   └── seeders/                 # Seeders de test
├── routes/
│   └── api.php                  # Routes API
├── storage/
│   └── app/public/files/        # Fichiers uploadés
└── .env                         # Configuration
```

## 6.2 Fonctionnalités Implémentées

### ✅ Module Authentification
- Inscription des clients avec création automatique du profil
- Connexion sécurisée avec tokens Sanctum
- Déconnexion avec révocation du token
- Protection des routes par middleware
- Gestion du profil utilisateur

### ✅ Module Dashboard
- Statistiques dynamiques selon le rôle de l'utilisateur
- Cartes avec indicateurs clés (projets, tickets, employés, clients)
- Actions rapides vers les principales fonctionnalités
- Graphiques de progression (optionnels)

### ✅ Module Gestion des Employés (Admin)
- Liste avec recherche et filtres
- Création d'employé avec compte utilisateur associé
- Modification des informations et compétences
- Suppression avec confirmation
- Affichage des compétences sous forme de badges

### ✅ Module Gestion des Clients (Admin)
- CRUD complet sur les clients
- Association avec une entreprise et logo
- Liste des projets associés
- Recherche par nom ou entreprise

### ✅ Module Gestion des Projets
- Création avec assignation du client
- Assignation multiple d'employés avec rôles
- Suivi de la progression avec barre visuelle
- Filtrage par statut, client, type
- Badges de statut colorés

### ✅ Module Gestion des Tickets
- Création par les clients associée à un projet
- Système de priorités visuelles (couleurs)
- Assignation à un employé
- Changement de statut (Ouvert → En cours → Résolu → Fermé)
- Système de commentaires
- Notifications automatiques pour tickets urgents

### ✅ Module Gestion des Fichiers
- Upload de fichiers par projet
- Téléchargement sécurisé
- Affichage par projet ou global
- Informations : taille, type, date, uploadé par

### ✅ Module Notifications
- Notifications pour tickets urgents et haute priorité
- Alertes pour échéances de projets proches
- Dropdown VS Code style avec badge de compteur
- Marquer comme lu / Marquer tout comme lu
- Suppression des notifications

### ✅ Interface Utilisateur
- Design moderne avec Tailwind CSS
- Responsive (mobile, tablette, desktop)
- Sidebar cachée style GitHub (toggle)
- Modals avec backdrop blur
- Toast notifications pour feedback
- Thème couleurs cohérent (bleu/cyan)

## 6.3 Captures d'Écran

> *Dans cette section, remplacez les images par vos propres captures d'écran de l'application et décrivez brièvement chaque page.*

### 1. Page d'accueil (Landing Page)
*Description : Présentation de Promptis Manager (page publique).*
![Capture de la Page d'accueil](./chemin/vers/image_accueil.png)

### 2. Page de connexion
*Description : Vue du formulaire de login.*
![Capture de Connexion](./chemin/vers/image_login.png)

### 3. Dashboard Administrateur
*Description : Vue d'ensemble avec statistiques et indicateurs globaux.*
![Capture du Dashboard Admin](./chemin/vers/image_dashboard.png)

### 4. Gestion des employés / clients
*Description : Interface de gestion, liste ou création de comptes.*
![Capture Liste employés](./chemin/vers/image_employes.png)

### 5. Détails d'un Projet & Progression
*Description : Suivi d'un projet, barre de progression et équipe.*
![Capture Projet](./chemin/vers/image_projet.png)

<div style="page-break-after: always;"></div>

---

# 7. Difficultés Rencontrées et Solutions

Durant le développement de ce projet, plusieurs défis techniques ont été rencontrés :

| # | Difficulté | Description | Solution |
|---|------------|-------------|----------|
| 1 | **Configuration CORS** | Les requêtes du frontend vers le backend étaient bloquées | Configuration du middleware CORS dans Laravel avec les bonnes origines autorisées |
| 2 | **Authentification multi-rôles** | Gérer les permissions différentes pour admin/employé/client | Implémentation d'un middleware personnalisé `AdminMiddleware` et utilisation des policies Laravel |
| 3 | **Upload de fichiers** | Problèmes de taille limite et types de fichiers | Configuration de `php.ini` (upload_max_filesize, post_max_size) et validation côté backend |
| 4 | **Assignation employés aux projets** | Relation many-to-many complexe | Utilisation de table pivot `project_employee` avec Eloquent `belongsToMany` et `sync()` |
| 5 | **Téléchargement fichiers "undefined"** | Le nom du fichier n'apparaissait pas | Correction du mapping des colonnes (file_name vs filename) et utilisation de `download()` avec nom explicite |
| 6 | **Gestion des statuts en français** | Incohérence entre valeurs BDD et affichage | Migration pour uniformiser les statuts et mapping côté frontend |
| 7 | **Notifications temps réel** | Afficher les alertes sans rechargement | Polling périodique (30s) côté frontend et vérification des échéances côté backend |
| 8 | **Page blanche après modifications** | Erreurs JavaScript silencieuses | Utilisation de React DevTools et console du navigateur pour identifier les erreurs d'import/syntaxe |

### Leçons Apprises

- **Toujours tester** l'intégration frontend-backend après chaque modification
- **Vérifier les imports** dans React après suppression de code
- **Documenter les API** pour faciliter le développement frontend
- **Utiliser Git** pour revenir facilement en arrière en cas de problème

<div style="page-break-after: always;"></div>

---

# 8. Bilan et Compétences Acquises

## 8.1 Compétences Techniques

Ce stage m'a permis de renforcer et d'acquérir de nombreuses compétences :

### Développement Frontend
- ✅ Maîtrise de **React.js** (hooks, context, composants)
- ✅ Utilisation de **Tailwind CSS** pour le styling
- ✅ Gestion du routage avec **React Router**
- ✅ Consommation d'API REST avec **Axios**
- ✅ Gestion de l'état global avec **Context API**

### Développement Backend
- ✅ Création d'API REST avec **Laravel 11**
- ✅ Authentification avec **Laravel Sanctum**
- ✅ Modélisation de données avec **Eloquent ORM**
- ✅ Migrations et gestion de base de données
- ✅ Validation des données et gestion des erreurs

### Base de Données
- ✅ Conception de schéma relationnel
- ✅ Relations (1-1, 1-N, N-N avec pivot)
- ✅ Requêtes optimisées avec Eloquent

### Outils et Méthodologies
- ✅ Utilisation de **Git** pour le versioning
- ✅ Tests d'API avec **Postman**
- ✅ Debug avec les DevTools navigateur
- ✅ Organisation de code et bonnes pratiques

## 8.2 Compétences Transversales

Au-delà des compétences techniques, ce stage m'a également permis de développer :

- **Autonomie** : Gestion d'un projet complet de A à Z
- **Résolution de problèmes** : Analyse et correction de bugs
- **Organisation** : Planification des tâches sur 5 semaines
- **Documentation** : Rédaction technique claire et structurée
- **Communication** : Présentation du travail réalisé

<div style="page-break-after: always;"></div>

---

# 9. Conclusion et Perspectives

## Conclusion

Ce stage de fin de formation au sein de **Promptis** a été une expérience enrichissante et formatrice. Il m'a permis de réaliser un projet complet répondant à un besoin réel d'entreprise : **Promptis Manager**, un système de gestion RH et portail client.

Les objectifs initiaux ont été atteints :
- ✅ Application full-stack fonctionnelle (React + Laravel)
- ✅ Gestion complète des employés, clients, projets et tickets
- ✅ Authentification sécurisée avec 3 niveaux de permissions
- ✅ Interface moderne, intuitive et responsive
- ✅ Système de notifications pour le suivi
- ✅ Documentation technique complète

Ce projet démontre ma capacité à concevoir, développer et livrer une application web complète en utilisant les technologies modernes du développement Full Stack.

## Perspectives d'Amélioration

Le projet peut évoluer avec les fonctionnalités suivantes :

| Évolution | Description |
|-----------|-------------|
| **Notifications push** | Utilisation de WebSockets pour notifications temps réel |
| **Application mobile** | Version React Native pour iOS/Android |
| **Tableau Kanban** | Vue drag & drop pour la gestion des tâches |
| **Rapports PDF** | Génération automatique de rapports d'activité |
| **Intégration email** | Envoi de notifications par email |
| **Multi-langue** | Support français/anglais |
| **Mode sombre** | Thème alternatif pour l'interface |
| **Déploiement cloud** | Hébergement sur serveur de production |

## Mot de Fin

Je tiens à remercier encore une fois **Promptis** pour cette opportunité qui m'a permis de consolider mes compétences et de découvrir le monde professionnel du développement web. Cette expérience constitue une base solide pour ma future carrière en tant que développeur Full Stack.

<div style="page-break-after: always;"></div>

---

# 10. Annexes

## Annexe A : Documentation API

### Endpoints d'Authentification

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Inscription client |
| POST | `/api/login` | Connexion |
| POST | `/api/logout` | Déconnexion |
| GET | `/api/user` | Utilisateur connecté |
| PUT | `/api/profile` | Modifier profil |
| PUT | `/api/profile/password` | Modifier mot de passe |

### Endpoints Employés (Admin)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/employees` | Liste des employés |
| POST | `/api/employees` | Créer employé |
| GET | `/api/employees/{id}` | Détails employé |
| PUT | `/api/employees/{id}` | Modifier employé |
| DELETE | `/api/employees/{id}` | Supprimer employé |

### Endpoints Clients (Admin)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/clients` | Liste des clients |
| POST | `/api/clients` | Créer client |
| GET | `/api/clients/{id}` | Détails client |
| PUT | `/api/clients/{id}` | Modifier client |
| DELETE | `/api/clients/{id}` | Supprimer client |

### Endpoints Projets

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/projects` | Liste projets |
| POST | `/api/projects` | Créer projet |
| GET | `/api/projects/{id}` | Détails projet |
| PUT | `/api/projects/{id}` | Modifier projet |
| DELETE | `/api/projects/{id}` | Supprimer projet |
| POST | `/api/projects/{id}/assign-employee` | Assigner employé |

### Endpoints Tickets

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/tickets` | Liste tickets |
| POST | `/api/tickets` | Créer ticket |
| GET | `/api/tickets/{id}` | Détails ticket |
| PUT | `/api/tickets/{id}` | Modifier ticket |
| POST | `/api/tickets/{id}/comments` | Ajouter commentaire |

### Endpoints Fichiers

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/files` | Liste fichiers |
| POST | `/api/projects/{id}/files` | Upload fichier |
| GET | `/api/files/{id}/download` | Télécharger |
| DELETE | `/api/files/{id}` | Supprimer |

### Endpoints Notifications

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/notifications` | Liste notifications |
| GET | `/api/notifications/unread-count` | Compteur non lus |
| PUT | `/api/notifications/read-all` | Marquer tout lu |
| PUT | `/api/notifications/{id}/read` | Marquer lu |
| DELETE | `/api/notifications/{id}` | Supprimer |

---

## Annexe B : Guide d'Installation

### Prérequis

- PHP 8.2+
- Composer
- Node.js 18+
- npm
- MySQL 8.0+
- WAMP/XAMPP (recommandé)

### Installation Backend

```bash
# Cloner le projet
cd backend

# Installer les dépendances
composer install

# Configurer l'environnement
cp .env.example .env

# Configurer la base de données dans .env
DB_DATABASE=promptis_manager
DB_USERNAME=root
DB_PASSWORD=

# Générer la clé
php artisan key:generate

# Exécuter les migrations
php artisan migrate

# (Optionnel) Exécuter les seeders
php artisan db:seed

# Créer le lien de stockage
php artisan storage:link

# Lancer le serveur
php artisan serve
# ou depuis le dossier public:
cd public
php -S 127.0.0.1:8000
```

### Installation Frontend

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Accès à l'Application

- **Frontend :** http://localhost:5173
- **Backend API :** http://127.0.0.1:8000/api

### Compte de Test (Admin)

- **Email :** admin@promptis.ma
- **Mot de passe :** password

---

**Fin du Rapport**

---

*Document réalisé par Mohammed Ilyas Salmy*  
*OFPPT - Développement Digital Full Stack*  
*Février 2026*
