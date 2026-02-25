# Database Entity-Relationship Diagram (ERD)

## Promptis Manager - Database Structure

---

## 📊 Tables Overview

| Table Name | Description | Relationships |
|-----------|-------------|---------------|
| **users** | Core authentication table | → employees, clients |
| **employees** | Employee-specific information | ← users, → projects |
| **clients** | Client company information | ← users, → projects, tickets |
| **projects** | Client projects | ← clients, → employees, tickets, files |
| **project_employee** | Pivot: Projects ↔ Employees | ← projects, employees |
| **tickets** | Support/issue tickets | ← projects, clients, employees, → comments |
| **ticket_comments** | Ticket replies/comments | ← tickets, users |
| **files** | Project documents/files | ← projects, users |
| **personal_access_tokens** | API authentication (Sanctum) | ← users |

---

## 🔗 Entity Relationships

```
┌─────────────┐
│    USERS    │ (Central authentication table)
│             │
│ - id (PK)   │
│ - name      │
│ - email     │
│ - password  │
│ - role      │ [admin, employee, client]
└──────┬──────┘
       │
       ├──────────────────┬──────────────────┐
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│  EMPLOYEES   │  │   CLIENTS    │  │PERSONAL_ACCESS   │
│              │  │              │  │    _TOKENS       │
│ - id (PK)    │  │ - id (PK)    │  │                  │
│ - user_id(FK)│  │ - user_id(FK)│  │ (Sanctum Auth)   │
│ - phone      │  │ - company    │  └──────────────────┘
│ - position   │  │ - contact    │
│ - department │  │ - phone      │
│ - skills     │  │ - address    │
│ - hire_date  │  │ - logo       │
└──────┬───────┘  └──────┬───────┘
       │                 │
       │                 │
       │          ┌──────┴───────┐
       │          │              │
       │          ▼              ▼
       │    ┌──────────────┐  ┌──────────────┐
       │    │   PROJECTS   │  │   TICKETS    │
       │    │              │  │              │
       │    │ - id (PK)    │  │ - id (PK)    │
       │    │ - client_id  │◄─┤ - project_id │
       │    │ - title      │  │ - client_id  │
       │    │ - description│  │ - employee_id│
       │    │ - type       │  │ - title      │
       │    │ - start_date │  │ - description│
       │    │ - end_date   │  │ - priority   │
       │    │ - budget     │  │ - status     │
       │    │ - status     │  └──────┬───────┘
       │    │ - progress   │         │
       │    └──────┬───────┘         │
       │           │                 │
       │           │                 ▼
       │           │        ┌─────────────────┐
       │           │        │ TICKET_COMMENTS │
       │           │        │                 │
       │           │        │ - id (PK)       │
       │           │        │ - ticket_id(FK) │
       │           │        │ - user_id (FK)  │
       │           │        │ - comment       │
       │           │        └─────────────────┘
       │           │
       │           ▼
       │    ┌────────────────┐
       │    │     FILES      │
       │    │                │
       │    │ - id (PK)      │
       │    │ - project_id   │
       │    │ - uploaded_by  │
       │    │ - file_name    │
       │    │ - file_path    │
       │    │ - file_type    │
       │    │ - file_size    │
       │    └────────────────┘
       │           
       │           
       │    ┌──────────────────────┐
       └───►│  PROJECT_EMPLOYEE    │
            │  (Pivot Table)       │
            │                      │
            │ - id (PK)            │
            │ - project_id (FK)    │◄──────┐
            │ - employee_id (FK)   │       │
            │ - role               │       │
            └──────────────────────┘       │
                                           │
                    ┌──────────────────────┘
                    │
            (Many-to-Many Relationship)
```

---

## 📋 Detailed Table Structures

### 1. USERS
```sql
Primary Key: id
Unique: email
Relationships:
  - ONE user → ONE employee (1:1)
  - ONE user → ONE client (1:1)
  - ONE user → MANY personal_access_tokens (1:N)
  - ONE user → MANY ticket_comments (1:N)
  - ONE user → MANY files (uploaded_by) (1:N)
```

### 2. EMPLOYEES
```sql
Primary Key: id
Foreign Keys:
  - user_id → users.id (1:1)
Relationships:
  - ONE employee → MANY projects (via project_employee) (M:N)
  - ONE employee → MANY tickets (assigned) (1:N)
```

### 3. CLIENTS
```sql
Primary Key: id
Foreign Keys:
  - user_id → users.id (1:1)
Relationships:
  - ONE client → MANY projects (1:N)
  - ONE client → MANY tickets (1:N)
```

### 4. PROJECTS
```sql
Primary Key: id
Foreign Keys:
  - client_id → clients.id (N:1)
Relationships:
  - ONE project → MANY employees (via project_employee) (M:N)
  - ONE project → MANY tickets (1:N)
  - ONE project → MANY files (1:N)
```

### 5. PROJECT_EMPLOYEE (Pivot)
```sql
Primary Key: id
Foreign Keys:
  - project_id → projects.id (N:1)
  - employee_id → employees.id (N:1)
Unique Constraint: (project_id, employee_id)
Purpose: Many-to-Many relationship between projects and employees
```

### 6. TICKETS
```sql
Primary Key: id
Foreign Keys:
  - project_id → projects.id (N:1)
  - client_id → clients.id (N:1)
  - employee_id → employees.id (N:1, nullable)
Relationships:
  - ONE ticket → MANY ticket_comments (1:N)
```

### 7. TICKET_COMMENTS
```sql
Primary Key: id
Foreign Keys:
  - ticket_id → tickets.id (N:1)
  - user_id → users.id (N:1)
```

### 8. FILES
```sql
Primary Key: id
Foreign Keys:
  - project_id → projects.id (N:1)
  - uploaded_by → users.id (N:1)
```

---

## 🔑 Key Relationships

### One-to-One (1:1)
- **users ↔ employees**: Each user can be one employee, each employee has one user account
- **users ↔ clients**: Each user can be one client, each client has one user account

### One-to-Many (1:N)
- **clients → projects**: One client can have many projects
- **projects → tickets**: One project can have many tickets
- **projects → files**: One project can have many files
- **clients → tickets**: One client can create many tickets
- **employees → tickets**: One employee can be assigned many tickets
- **users → files**: One user can upload many files
- **tickets → ticket_comments**: One ticket can have many comments
- **users → ticket_comments**: One user can write many comments

### Many-to-Many (M:N)
- **projects ↔ employees** (via project_employee):
  - One project can have multiple employees
  - One employee can work on multiple projects
  - Junction table stores additional info: role in project

---

## 🎯 Business Rules

1. **User Roles:**
   - A user can only have ONE role (admin, employee, or client)
   - Admin users don't need employee/client records
   - Employee users MUST have an employee record
   - Client users MUST have a client record

2. **Project Management:**
   - Every project MUST belong to a client
   - A project can have 0 to many employees assigned
   - Project progress must be between 0-100
   - Project status: pending → in_progress → completed/cancelled

3. **Ticket System:**
   - Every ticket MUST be linked to a project
   - Every ticket MUST be created by a client
   - Tickets can be assigned to an employee (optional initially)
   - Ticket status flow: open → in_progress → resolved → closed
   - Both clients and employees can comment on tickets

4. **File Management:**
   - Files must be associated with a project
   - Every file upload must be tracked (who uploaded, when)
   - Only admins and assigned employees can upload files

5. **Access Control:**
   - **Admins**: Full access to everything
   - **Employees**: Access to assigned projects and tickets
   - **Clients**: Access to their own projects, tickets, and files

---

## 📊 Index Strategy

### Primary Indexes (Automatic)
- All `id` columns (Primary Keys)
- All `email` columns with UNIQUE constraint

### Additional Indexes for Performance
```sql
users:
  - INDEX on email (for login lookups)
  - INDEX on role (for role-based queries)

employees:
  - INDEX on position
  - INDEX on department

projects:
  - INDEX on status (frequent filtering)
  - INDEX on client_id (JOIN operations)
  - INDEX on start_date

project_employee:
  - UNIQUE INDEX on (project_id, employee_id)
  - INDEX on project_id
  - INDEX on employee_id

tickets:
  - INDEX on status (frequent filtering)
  - INDEX on priority (frequent filtering)
  - INDEX on project_id (JOIN operations)
  - INDEX on client_id
  - INDEX on employee_id

ticket_comments:
  - INDEX on ticket_id (frequent JOIN)
  - INDEX on user_id

files:
  - INDEX on project_id (frequent JOIN)
  - INDEX on uploaded_by

personal_access_tokens:
  - UNIQUE INDEX on token (authentication)
  - INDEX on (tokenable_type, tokenable_id)
```

---

## 🔐 Data Integrity

### Cascade Rules

**ON DELETE CASCADE:**
- users → employees (delete user, delete employee)
- users → clients (delete user, delete client)
- clients → projects (delete client, delete their projects)
- projects → tickets (delete project, delete its tickets)
- projects → files (delete project, delete its files)
- tickets → ticket_comments (delete ticket, delete comments)

**ON DELETE SET NULL:**
- employees → tickets.employee_id (if employee deleted, unassign from tickets)

**ON DELETE RESTRICT:**
- None (using CASCADE and SET NULL for flexibility)

---

## 💾 Storage Estimates (5 Years)

Assumptions:
- 50 employees
- 200 clients
- 500 projects
- 2000 tickets
- 5000 ticket comments
- 3000 files

| Table | Avg Row Size | Est. Rows | Total Size |
|-------|--------------|-----------|------------|
| users | 0.5 KB | 250 | 125 KB |
| employees | 1 KB | 50 | 50 KB |
| clients | 1 KB | 200 | 200 KB |
| projects | 2 KB | 500 | 1 MB |
| project_employee | 0.3 KB | 1500 | 450 KB |
| tickets | 1.5 KB | 2000 | 3 MB |
| ticket_comments | 0.8 KB | 5000 | 4 MB |
| files | 0.5 KB | 3000 | 1.5 MB |
| **Total Metadata** | | | **~10 MB** |

*Note: Actual file storage (uploaded files) will be much larger, stored in Laravel storage folder.*

---

## 🎨 Visual ERD Legend

```
┌─────────┐
│  Table  │     Entity/Table
└─────────┘

   │            One-to-One or One-to-Many
   ▼            Relationship Direction

(PK)            Primary Key
(FK)            Foreign Key
[enum]          Enumeration values
```

---

## 🚀 Next Steps

1. ✅ Create database in MySQL via phpMyAdmin or CLI
2. ✅ Run the SQL schema file
3. ✅ Verify relationships with sample queries
4. ✅ Set up Laravel migrations (mirrors this schema)
5. ✅ Create Eloquent models with relationships
6. ✅ Test CRUD operations

---

**Generated for:** Promptis Manager Project  
**Date:** Janvier 2026  
**Database:** MySQL 8.0+
