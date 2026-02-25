# Promptis Manager - Installation Guide

## 📋 Prerequisites

Before starting, make sure you have:

### Required Software:
- ✅ **WAMP Server** (Apache, MySQL, PHP 8.2+)
- ✅ **Composer** (PHP dependency manager)
- ✅ **Node.js** (v18+ with npm)
- ✅ **Git** (optional but recommended)

### Verify Installations:
```bash
php --version        # Should be 8.2 or higher
composer --version   # Composer 2.x
node --version       # v18 or higher
npm --version        # v9 or higher
```

---

## 🚀 Quick Start Guide

### Step 1: Create Database

1. Start WAMP Server
2. Open **phpMyAdmin** (http://localhost/phpmyadmin)
3. Create database:
   - Click "New" in sidebar
   - Database name: `promptis_manager`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"

4. Import schema:
   - Select `promptis_manager` database
   - Click "Import" tab
   - Choose file: `documentation/DATABASE_SCHEMA.sql`
   - Click "Go"

### Step 2: Set Up Laravel Backend

```bash
# Navigate to project directory
cd C:\wamp64\www\Stage

# Install Laravel using Composer
composer create-project laravel/laravel backend

# Navigate to backend
cd backend

# Install Laravel Sanctum for API authentication
composer require laravel/sanctum

# Publish Sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Step 3: Configure Environment

Edit `backend/.env`:

```env
APP_NAME="Promptis Manager"
APP_ENV=local
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=promptis_manager
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
```

### Step 4: Set Up React Frontend

```bash
# Go back to Stage directory
cd C:\wamp64\www\Stage

# Create React app with Vite
npm create vite@latest frontend -- --template react

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Install additional packages
npm install react-router-dom axios tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react
npm install react-hook-form yup @hookform/resolvers
npm install recharts react-hot-toast
```

### Step 5: Configure Tailwind CSS

```bash
# In frontend directory
npx tailwindcss init -p
```

Edit `frontend/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#06B6D4',
      }
    },
  },
  plugins: [],
}
```

### Step 6: Run Development Servers

**Terminal 1 - Laravel Backend:**
```bash
cd C:\wamp64\www\Stage\backend
php artisan serve
# Runs on http://localhost:8000
```

**Terminal 2 - React Frontend:**
```bash
cd C:\wamp64\www\Stage\frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 📁 Project Structure

```
Stage/
├── backend/                    # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/   # API Controllers
│   │   │   └── Middleware/    # Auth middleware
│   │   └── Models/            # Eloquent Models
│   ├── database/
│   │   ├── migrations/        # Database migrations
│   │   └── seeders/           # Data seeders
│   ├── routes/
│   │   ├── api.php           # API routes
│   │   └── web.php
│   ├── storage/              # File uploads
│   └── .env                  # Environment config
│
├── frontend/                  # React SPA
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── layouts/          # Layout components
│   │   ├── services/         # API services
│   │   ├── contexts/         # React contexts
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── documentation/            # Project documentation
    ├── CAHIER_DES_CHARGES.md
    ├── DATABASE_SCHEMA.sql
    ├── DATABASE_ERD.md
    └── INSTALLATION_GUIDE.md
```

---

## ⚙️ Configuration Checklist

### Laravel Backend

- [ ] Database connection working
- [ ] `.env` file configured
- [ ] Sanctum installed and published
- [ ] CORS configured
- [ ] File storage configured

### React Frontend

- [ ] Tailwind CSS configured
- [ ] React Router installed
- [ ] Axios configured
- [ ] Base API URL set
- [ ] Environment variables set

---

## 🔧 Common Issues & Solutions

### Issue: "Access denied for user 'root'"
**Solution:** Check WAMP MySQL password in `backend/.env`

### Issue: "CORS error"
**Solution:** Configure `backend/config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
'supports_credentials' => true,
```

### Issue: Laravel key not generated
**Solution:**
```bash
cd backend
php artisan key:generate
```

### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

---

## 📝 Default Credentials (After Seeding)

**Admin:**
- Email: `admin@promptis.ma`
- Password: `password`

**Employee:**
- Email: `ahmed.bennani@promptis.ma`
- Password: `password`

**Client:**
- Email: `contact@techcorp.ma`
- Password: `password`

---

## 🎯 Next Steps

1. ✅ Follow installation steps above
2. ✅ Verify database is created and populated
3. ✅ Start both servers (Laravel + React)
4. ✅ Test API endpoints with Postman
5. ✅ Begin development!

---

## 📞 Need Help?

- Laravel Docs: https://laravel.com/docs
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com

**Created by:** Mohammed Ilyas Salmy  
**For:** Promptis Manager Project  
**Date:** Janvier 2026
