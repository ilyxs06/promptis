# Analyse de la Base de Données et Diagrammes UML

> **Note :** Ce document est généré à partir d'une analyse complète et rigoureuse du code source réel :
> migrations Laravel, modèles Eloquent, contrôleurs API et composants React frontend.
> Chaque attribut, chaque valeur d'enum et chaque relation sont vérifiés directement dans le code.

---

## 1. Modèle Conceptuel de Données (MCD)

### Entités Principales et leurs Attributs

> **Remarque sur la photo de profil :**
> Dans le frontend, l'avatar affiché dans le profil (`Profile.jsx`) est simplement la **première lettre du nom** de l'utilisateur (ex : « A » pour Admin). Il n'existe **pas de téléversement de photo de profil** dans l'interface actuelle. Le champ `profile_photo` existe en base de données (table `employees`), mais l'upload sera ajouté en phase 2. Ce choix de design (avatar à initiale) est standard (Gmail, GitHub utilisent la même approche).

- **User** : id, name, email, password, role (`admin` | `employee` | `client`), email_verified_at, remember_token, timestamps
- **Employee** : id, user_id (FK), phone, position, department, skills (JSON), hire_date, profile_photo *(champ DB existant, non exposé dans l'UI — photo de profil non implémentée)*, timestamps
- **Client** : id, user_id (FK), company_name, contact_name, phone, address, logo *(champ DB existant, non exposé dans l'UI)*, timestamps
- **Project** : id, client_id (FK), title, description, type, start_date, end_date, budget, status, progress, timestamps
- **Ticket** : id, project_id (FK), client_id (FK), employee_id (FK nullable), title, description, priority, status, resolved_at, timestamps
- **TicketComment** : id, ticket_id (FK), user_id (FK), comment, timestamps
- **File** : id, project_id (FK), uploaded_by (FK → users.id), filename, filepath, filesize, mimetype, description, timestamps
- **Notification** : id, user_id (FK), type, title, message, priority, related_id (nullable), related_type (nullable), is_read, read_at, timestamps

### Valeurs des Énumérations (valeurs réelles en base)

| Entité | Champ | Valeurs réelles |
|--------|-------|-----------------|
| User | role | `admin`, `employee`, `client` |
| Project | status | `planifie`, `en_cours`, `en_pause`, `termine`, `annule` *(migrées vers le français)* |
| Ticket | status | `ouvert`, `en_cours`, `resolu`, `ferme` *(migrées vers le français)* |
| Ticket | priority | `basse`, `moyenne`, `haute`, `urgente` *(migrées vers le français)* |
| Notification | priority | `normal`, `high`, `urgent` |

### Associations Conceptuelles

- Un **User** *est un* **Employee** (0,1) **OU** un **Client** (0,1) selon son `role`.
- Un **User** *rédige* des **TicketComments** (0,N).
- Un **User** *téléverse* des **Files** (0,N) via le champ `uploaded_by`.
- Un **User** *reçoit* des **Notifications** (0,N).
- Un **Client** *possède* un ou plusieurs **Projects** (1,N).
- Un **Client** *crée* des **Tickets** (0,N).
- Un **Employee** *est assigné* à des **Projects** via la table pivot `project_employee` (0,N).
- Un **Employee** *traite* des **Tickets** (0,N via `employee_id`).
- Un **Project** *contient* des **Tickets** (0,N).
- Un **Project** *contient* des **Files** (0,N).
- Un **Ticket** *possède* des **TicketComments** (0,N).

---

## 2. Modèle Logique de Données (MLD)

> Les clés primaires sont **soulignées**, les clés étrangères sont précédées de `#`.

- **users** (<u>id</u>, name, email, password, role, email_verified_at, remember_token, created_at, updated_at)
- **employees** (<u>id</u>, #user_id, phone, position, department, skills, hire_date, profile_photo, created_at, updated_at)
- **clients** (<u>id</u>, #user_id, company_name, contact_name, phone, address, logo, created_at, updated_at)
- **projects** (<u>id</u>, #client_id, title, description, type, start_date, end_date, budget, status, progress, created_at, updated_at)
- **project_employee** (<u>id</u>, #project_id, #employee_id, role, created_at, updated_at) *(Table de pivot — contrainte unique sur [project_id, employee_id])*
- **tickets** (<u>id</u>, #project_id, #client_id, #employee_id (nullable), title, description, priority, status, resolved_at, created_at, updated_at)
- **ticket_comments** (<u>id</u>, #ticket_id, #user_id, comment, created_at, updated_at)
- **files** (<u>id</u>, #project_id, #uploaded_by (→ users.id), filename, filepath, filesize, mimetype, description, created_at, updated_at)
- **notifications** (<u>id</u>, #user_id, type, title, message, priority, related_id (nullable), related_type (nullable), is_read, read_at, created_at, updated_at)
- **personal_access_tokens** (<u>id</u>, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) *(Sanctum — authentification API)*
- **password_reset_tokens** (<u>email</u>, token, created_at)
- **sessions** (<u>id</u>, #user_id (nullable), ip_address, user_agent, payload, last_activity)

### Champs implémentés en base ET dans l'UI

Tous les champs du MLD sont désormais accessibles dans l'interface :
- `budget`, `type`, `progress` → dans le formulaire de création/modification de projet (`ProjectModal`)
- `department`, `hire_date` → dans le formulaire de gestion des employés (`EmployeeModal`)
- `resolved_at` → affiché sur les tickets résolus
- `description` des fichiers → champ optionnel lors de l'upload

> [!NOTE]
> Seuls `profile_photo` (employees) et `logo` (clients) restent en base de données sans interface d'upload — choix de design, prévu en phase 2.

---

## 3. Diagramme des Cas d'Utilisation (Use Case Diagram)

```
Acteurs : Client | Employé | Administrateur

┌───────────────────────────────────────────────────────┐
│         Système Promptis Manager                      │
│                                                       │
│  [Gérer son profil]          ← Client, Employé, Admin │
│  [Changer son mot de passe]  ← Client, Employé, Admin │
│                                                       │
│  [Voir ses projets]          ← Client                 │
│  [Créer un ticket]           ← Client                 │
│  [Suivre ses tickets]        ← Client                 │
│  [Télécharger des fichiers]  ← Client                 │
│  [Recevoir des notifications]← Client, Employé, Admin │
│                                                       │
│  [Voir ses projets assignés] ← Employé                │
│  [Traiter/Résoudre tickets]  ← Employé                │
│  [Commenter un ticket]       ← Employé, Client, Admin │
│  [Téléverser des fichiers]   ← Employé, Admin         │
│                                                       │
│  [Créer/modifier un projet]  ← Admin                  │
│  [Assigner employés→projet]  ← Admin                  │
│  [Gérer les employés]        ← Admin                  │
│  [Gérer les clients]         ← Admin                  │
│  [Gérer tous les tickets]    ← Admin                  │
│  [Consulter le tableau bord] ← Admin, Employé, Client │
└───────────────────────────────────────────────────────┘
```

---

## 4. Diagramme de Classes (Class Diagram)

```mermaid
classDiagram
    class User {
        +BigInt id
        +String name
        +String email
        +String password [hidden]
        +Enum role : admin|employee|client
        +Datetime email_verified_at
        +String remember_token [hidden]
        +hasOne Employee
        +hasOne Client
        +hasMany TicketComment
        +hasMany File [uploaded_by]
    }

    class Employee {
        +BigInt id
        +BigInt user_id
        +String phone
        +String position
        +String department
        +Array skills [JSON cast]
        +Date hire_date
        +String profile_photo [DB uniquement - upload phase 2]
        +belongsTo User
        +belongsToMany Project [pivot: role]
        +hasMany Ticket [assigned]
    }

    class Client {
        +BigInt id
        +BigInt user_id
        +String company_name
        +String contact_name
        +String phone
        +Text address
        +String logo [DB uniquement - upload phase 2]
        +belongsTo User
        +hasMany Project
        +hasMany Ticket
    }

    class Project {
        +BigInt id
        +BigInt client_id
        +String title
        +Text description
        +String type
        +Date start_date
        +Date end_date
        +Decimal budget
        +String status
        +Int progress
        +belongsTo Client
        +belongsToMany Employee [pivot: role]
        +hasMany Ticket
        +hasMany File
    }

    class ProjectEmployee {
        <<pivot>>
        +BigInt id
        +BigInt project_id
        +BigInt employee_id
        +String role
    }

    class Ticket {
        +BigInt id
        +BigInt project_id
        +BigInt client_id
        +BigInt employee_id [nullable]
        +String title
        +Text description
        +String priority : basse|moyenne|haute|urgente
        +String status : ouvert|en_cours|resolu|ferme
        +Datetime resolved_at [nullable]
        +belongsTo Project
        +belongsTo Client
        +belongsTo Employee
        +hasMany TicketComment
    }

    class TicketComment {
        +BigInt id
        +BigInt ticket_id
        +BigInt user_id
        +Text comment
        +belongsTo Ticket
        +belongsTo User
    }

    class File {
        +BigInt id
        +BigInt project_id
        +BigInt uploaded_by [→ users.id]
        +String filename
        +String filepath
        +BigInt filesize [bytes]
        +String mimetype
        +Text description
        +belongsTo Project
        +belongsTo User [uploader]
    }

    class Notification {
        +BigInt id
        +BigInt user_id
        +String type
        +String title
        +Text message
        +String priority : normal|high|urgent
        +BigInt related_id [nullable]
        +String related_type [nullable]
        +Boolean is_read
        +Datetime read_at [nullable]
        +notifyAdmins()$ static
        +notifyUser()$ static
        +morphTo related
    }

    User "1" --> "0..1" Employee : hasOne
    User "1" --> "0..1" Client : hasOne
    User "1" --> "0..*" TicketComment : writes
    User "1" --> "0..*" File : uploads
    User "1" --> "0..*" Notification : receives

    Client "1" --> "0..*" Project : owns
    Client "1" --> "0..*" Ticket : creates

    Employee "0..*" --> "0..*" Project : assigned via ProjectEmployee
    Employee "0..*" --> "0..*" Ticket : handles

    Project "1" --> "0..*" Ticket : contains
    Project "1" --> "0..*" File : has

    Ticket "1" --> "0..*" TicketComment : has
```

---

## 5. Diagramme de Séquence — Création et résolution d'un ticket

```mermaid
sequenceDiagram
    actor Client
    participant Frontend as React Frontend
    participant API as Laravel API (Sanctum)
    participant DB as Base de Données
    actor Admin
    actor Employé

    %% Authentification préalable
    Client->>Frontend: Saisit email + mot de passe
    Frontend->>API: POST /api/login
    API->>DB: SELECT users WHERE email = ...
    DB-->>API: Retourne user + role = 'client'
    API->>DB: INSERT INTO personal_access_tokens
    API-->>Frontend: { user, token }
    Frontend-->>Client: Redirige vers /dashboard

    %% Consultation des projets
    Client->>Frontend: Navigue vers "Mes Projets"
    Frontend->>API: GET /api/projects [Authorization: Bearer token]
    API->>DB: SELECT projects WHERE client_id = X
    DB-->>API: Liste des projets du client
    API-->>Frontend: JSON [{ id, title, status, progress, ... }]
    Frontend-->>Client: Affiche la liste des projets

    %% Création d'un ticket
    Client->>Frontend: Clique "Nouveau ticket" → remplit le formulaire
    Frontend->>API: POST /api/tickets { project_id, title, description, priority }
    API->>DB: INSERT INTO tickets (client_id auto-résolu, status='ouvert', priority='moyenne')
    DB-->>API: Retourne le nouveau ticket (id)
    API->>DB: INSERT INTO notifications (pour Admins + Employés du projet)
    API-->>Frontend: HTTP 201 Created { ticket data }
    Frontend-->>Client: Toast "Ticket créé avec succès"

    %% Assignation par l'Admin
    Admin->>Frontend: Consulte la liste des tickets ouverts
    Frontend->>API: GET /api/tickets
    API->>DB: SELECT tickets (tous les tickets pour admin)
    DB-->>API: Tous les tickets
    API-->>Frontend: JSON [tickets]
    Admin->>Frontend: Modifie le ticket → assigne un Employé
    Frontend->>API: PUT /api/tickets/{id} { employee_id: Y }
    API->>DB: UPDATE tickets SET employee_id = Y
    API->>DB: INSERT INTO notifications (pour l'employé assigné)
    API-->>Frontend: HTTP 200 OK { ticket mis à jour }

    %% Traitement par l'Employé
    Employé->>Frontend: Consulte ses tickets assignés
    Frontend->>API: GET /api/tickets
    API->>DB: SELECT tickets WHERE employee_id = Y OR project IN (mes projets)
    DB-->>API: Tickets de l'employé
    API-->>Frontend: JSON [tickets]
    Employé->>Frontend: Ajoute un commentaire sur le ticket
    Frontend->>API: POST /api/tickets/{id}/comments { content: "..." }
    API->>DB: INSERT INTO ticket_comments (user_id, ticket_id, comment)
    API-->>Frontend: HTTP 201 Created { comment }
    Employé->>Frontend: Change le statut → "resolu"
    Frontend->>API: PUT /api/tickets/{id} { status: 'resolu' }
    API->>DB: UPDATE tickets SET status='resolu', resolved_at=NOW()
    API->>DB: INSERT INTO notifications (alerte Client: ticket résolu)
    API-->>Frontend: HTTP 200 OK
    Frontend-->>Employé: Mise à jour visuelle du ticket

    %% Notification du Client
    Client->>Frontend: Lit la notification reçue
    Frontend->>API: GET /api/notifications
    API->>DB: SELECT notifications WHERE user_id = Client.user_id
    DB-->>API: Notifications du client
    API-->>Frontend: JSON [notifications]
    Frontend-->>Client: Affiche le badge et le message de résolution
    Client->>Frontend: Marque la notification comme lue
    Frontend->>API: PUT /api/notifications/{id}/read
    API->>DB: UPDATE notifications SET is_read=true, read_at=NOW()
    API-->>Frontend: HTTP 200 OK
```

---

## 6. Architecture Technique (Résumé)

| Couche | Technologie | Détails |
|--------|-------------|---------|
| **Frontend** | React 18 + Vite | Pages : Dashboard, Projets, Tickets, Fichiers, Clients, Employés, Profil |
| **Routing** | React Router v6 | Routes protégées par rôle via `AuthContext` |
| **Styling** | Tailwind CSS + Heroicons | Composants modaux pour chaque entité |
| **Charts** | Recharts | PieChart et BarChart (commentés, prêts à activer) |
| **Backend** | Laravel 11 | API REST + Sanctum (tokens API) |
| **Auth** | Laravel Sanctum | Token Bearer dans les headers HTTP |
| **BDD** | MySQL | 12 tables dont 2 pivots (project_employee, sessions) |
| **Notifications** | Modèle custom | `Notification::notifyAdmins()` + `notifyUser()` statiques |

### Flux d'authentification réel

```
[User] → POST /api/login → [AuthController] → Crée un personal_access_token
                                             → Charge client ou employee selon role
                                             → Retourne { user: {..., client/employee: {...}}, token }
[Frontend] → Stocke token dans localStorage → Injecte dans chaque requête via axios
```

### Contrôle d'accès par rôle (Middleware + Logique)

| Route | Admin | Employé | Client |
|-------|-------|---------|--------|
| GET /employees | ✅ | ❌ | ❌ |
| GET /clients | ✅ | ❌ | ❌ |
| GET /projects | ✅ (tous) | ✅ (ses projets) | ✅ (ses projets) |
| POST /projects | ✅ | ❌ | ❌ |
| GET /tickets | ✅ (tous) | ✅ (assignés ou projet) | ✅ (ses tickets) |
| POST /tickets | ✅ | ✅ | ✅ |
| GET /notifications | ✅ | ✅ | ✅ |

---

**Conseil d'utilisation dans Gemini ou Notion :**
Copiez-collez le contenu Mermaid des sections 4 et 5 dans **https://mermaid.live** pour générer les visuels.
Pour Gemini, collez l'intégralité du document — il comprend nativement le Markdown et la syntaxe Mermaid.
