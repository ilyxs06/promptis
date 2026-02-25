# Promptis Manager - Project README

## 🎯 About the Project

**Promptis Manager** is a comprehensive HR Management & Client Portal system designed for **Promptis**, an IT consulting company in Casablanca, Morocco.

### Purpose
This project was developed as part of a 5-week internship (stage) at OFPPT - Développement Digital program.

### Key Features
- 👥 **HR Management:** Manage employees, skills, and assignments
- 📊 **Project Tracking:** Monitor project progress in real-time
- 🎫 **Ticket System:** Client support and issue tracking
- 📁 **Document Management:** Secure file sharing
- 🔐 **Multi-Role Access:** Admin, Employee, and Client portals

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Laravel 11** - PHP framework
- **Laravel Sanctum** - API authentication
- **Eloquent ORM** - Database management
- **MySQL** - Database

---

## 📋 Prerequisites

- WAMP Server (PHP 8.2+, MySQL 8.0+, Apache)
- Composer 2.x
- Node.js 18+
- Git (optional)

---

## 🚀 Quick Start

### 1. Clone/Download Project
```bash
cd C:\wamp64\www\Stage
```

### 2. Database Setup
- Start WAMP
- Open phpMyAdmin: http://localhost/phpmyadmin
- Create database: `promptis_manager`
- Import: `documentation/DATABASE_SCHEMA.sql`

### 3. Backend Setup
```bash
cd backend
composer install
cp .env.example .env
# Edit .env with your database credentials
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 5. Access Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **Database:** http://localhost/phpmyadmin

---

## 👤 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@promptis.ma | password |
| Employee | ahmed.bennani@promptis.ma | password |
| Client | contact@techcorp.ma | password |

---

## 📁 Project Structure

```
Stage/
├── backend/          → Laravel API
├── frontend/         → React Application
└── documentation/    → Project docs
    ├── CAHIER_DES_CHARGES.md
    ├── DATABASE_SCHEMA.sql
    ├── DATABASE_ERD.md
    ├── INSTALLATION_GUIDE.md
    └── README.md
```

---

## 🎨 Features by Role

### 🔑 Admin Dashboard
- Manage employees (CRUD)
- Manage clients (CRUD)
- Manage projects (CRUD)
- Assign employees to projects
- View all tickets
- Upload project files
- View statistics

### 👨‍💼 Employee Portal
- View assigned projects
- Update project progress
- Manage assigned tickets
- Upload deliverables
- View project files

### 👥 Client Portal
- View own projects
- Track project progress
- Create support tickets
- View/download files
- Comment on tickets
- View statistics dashboard

---

## 📊 Database Schema

8 main tables:
- **users** - Authentication
- **employees** - Employee details
- **clients** - Client companies
- **projects** - Client projects
- **project_employee** - Project assignments (pivot)
- **tickets** - Support tickets
- **ticket_comments** - Ticket discussions
- **files** - Project documents

See `documentation/DATABASE_ERD.md` for detailed relationships.

---

## 🔐 API Endpoints

### Authentication
```
POST   /api/register
POST   /api/login
POST   /api/logout
GET    /api/user
```

### Resources
```
/api/employees
/api/clients
/api/projects
/api/tickets
/api/files
/api/stats/dashboard
```

Full API documentation in `documentation/CAHIER_DES_CHARGES.md`

---

## 🎯 Development Roadmap

### Week 1: Foundation ✅
- [x] Cahier des charges
- [x] Database design
- [x] Project setup

### Week 2: Backend Development
- [ ] Models & Migrations
- [ ] API Controllers
- [ ] Authentication (Sanctum)
- [ ] Validation & Middleware

### Week 3: Frontend Core
- [ ] Auth system
- [ ] Layouts & Navigation
- [ ] Admin dashboard
- [ ] Employee & Client management

### Week 4: Frontend Features
- [ ] Project management
- [ ] Ticket system
- [ ] File uploads
- [ ] Client portal

### Week 5: Finalization
- [ ] Testing
- [ ] Bug fixes
- [ ] Documentation
- [ ] Deployment

---

## 🐛 Common Issues

### CORS Error
Configure `backend/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

### Database Connection Failed
Check `backend/.env`:
```env
DB_DATABASE=promptis_manager
DB_USERNAME=root
DB_PASSWORD=
```

### Port Already in Use
Laravel: `php artisan serve --port=8001`
React: Edit `frontend/vite.config.js`

---

## 📚 Documentation

- **Specifications:** [CAHIER_DES_CHARGES.md](documentation/CAHIER_DES_CHARGES.md)
- **Database:** [DATABASE_ERD.md](documentation/DATABASE_ERD.md)
- **Installation:** [INSTALLATION_GUIDE.md](documentation/INSTALLATION_GUIDE.md)

---

## 👨‍💻 Author

**Mohammed Ilyas Salmy**
- Institution: OFPPT - Développement Digital
- Company: Promptis
- Project Duration: 5 weeks
- Date: Janvier 2026

---

## 📄 License

This project is developed for educational purposes as part of an OFPPT internship.

---

## 🙏 Acknowledgments

- **Promptis** - For the internship opportunity
- **OFPPT** - For the training program
- Laravel & React communities

---

## 📞 Support

For questions or issues:
1. Check documentation in `documentation/` folder
2. Review Laravel/React official docs
3. Contact project supervisor

---

**Status:** 🚧 In Development  
**Version:** 1.0.0  
**Last Updated:** Janvier 2026
