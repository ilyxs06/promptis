-- ============================================
-- Promptis Manager - Database Schema
-- MySQL Database Structure
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS promptis
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE promptis;

-- ============================================
-- Table: users
-- Description: Base user authentication table for all user types
-- ============================================
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee', 'client') NOT NULL DEFAULT 'client',
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: employees
-- Description: Employee-specific information
-- ============================================
CREATE TABLE employees (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    phone VARCHAR(20) NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NULL,
    skills JSON NULL COMMENT 'Array of technical skills',
    hire_date DATE NULL,
    profile_photo VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_position (position),
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: clients
-- Description: Client company information
-- ============================================
CREATE TABLE clients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    logo VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_company_name (company_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: projects
-- Description: Client projects managed by Promptis
-- ============================================
CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    type VARCHAR(100) NULL COMMENT 'e.g., Web, Mobile, Data Engineering, Cloud',
    start_date DATE NOT NULL,
    end_date DATE NULL,
    budget DECIMAL(12, 2) NULL,
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
    progress INT NOT NULL DEFAULT 0 COMMENT 'Progress percentage 0-100',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_client_id (client_id),
    INDEX idx_start_date (start_date),
    CONSTRAINT chk_progress CHECK (progress >= 0 AND progress <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: project_employee (Pivot Table)
-- Description: Many-to-many relationship between projects and employees
-- ============================================
CREATE TABLE project_employee (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    role VARCHAR(100) NULL COMMENT 'Role in project: Developer, Designer, Lead, etc.',
    assigned_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_employee (project_id, employee_id),
    INDEX idx_project_id (project_id),
    INDEX idx_employee_id (employee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: tickets
-- Description: Support tickets created by clients
-- ============================================
CREATE TABLE tickets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    client_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NULL COMMENT 'Assigned employee',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') NOT NULL DEFAULT 'open',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_project_id (project_id),
    INDEX idx_client_id (client_id),
    INDEX idx_employee_id (employee_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: ticket_comments
-- Description: Comments/replies on tickets
-- ============================================
CREATE TABLE ticket_comments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ticket_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ticket_id (ticket_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: files
-- Description: Project files and documents
-- ============================================
CREATE TABLE files (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    uploaded_by BIGINT UNSIGNED NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NULL COMMENT 'MIME type',
    file_size BIGINT NULL COMMENT 'Size in bytes',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_project_id (project_id),
    INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: personal_access_tokens (Laravel Sanctum)
-- Description: API tokens for authentication
-- ============================================
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) NOT NULL UNIQUE,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tokenable (tokenable_type, tokenable_id),
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Sample Data (Seeders)
-- ============================================

-- Insert Admin User
INSERT INTO users (name, email, password, role, email_verified_at) VALUES
('Admin Promptis', 'admin@promptis.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NOW());
-- Password: password

-- Insert Employee Users
INSERT INTO users (name, email, password, role, email_verified_at) VALUES
('Ahmed Bennani', 'ahmed.bennani@promptis.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee', NOW()),
('Fatima El Amrani', 'fatima.elamrani@promptis.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee', NOW()),
('Youssef Alaoui', 'youssef.alaoui@promptis.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee', NOW());

-- Insert Client Users
INSERT INTO users (name, email, password, role, email_verified_at) VALUES
('TechCorp Contact', 'contact@techcorp.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', NOW()),
('InnovateSA Contact', 'contact@innovatesa.ma', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client', NOW());

-- Insert Employees
INSERT INTO employees (user_id, phone, position, department, skills, hire_date) VALUES
(2, '+212 6 12 34 56 78', 'Full Stack Developer', 'Development', '["PHP", "Laravel", "React", "MySQL"]', '2023-01-15'),
(3, '+212 6 23 45 67 89', 'UX/UI Designer', 'Design', '["Figma", "Adobe XD", "Photoshop", "Illustrator"]', '2023-03-20'),
(4, '+212 6 34 56 78 90', 'DevOps Engineer', 'Infrastructure', '["AWS", "Docker", "Kubernetes", "CI/CD"]', '2022-11-10');

-- Insert Clients
INSERT INTO clients (user_id, company_name, contact_name, phone, address) VALUES
(5, 'TechCorp Maroc', 'Hassan Tazi', '+212 5 22 11 22 33', 'Boulevard Mohamed V, Casablanca'),
(6, 'Innovate SA', 'Sarah Benani', '+212 5 22 44 55 66', 'Avenue Hassan II, Rabat');

-- Insert Projects
INSERT INTO projects (client_id, title, description, type, start_date, end_date, status, progress) VALUES
(1, 'Site E-Commerce MiroShop', 'Développement d\'une plateforme e-commerce complète avec paiement en ligne', 'Web Development', '2025-12-01', '2026-02-28', 'in_progress', 75),
(1, 'Application Mobile TechCorp', 'Application mobile iOS/Android pour gestion des commandes', 'Mobile Development', '2026-01-15', '2026-04-15', 'in_progress', 45),
(2, 'Migration Cloud AWS', 'Migration de l\'infrastructure vers AWS avec containerisation', 'Cloud & DevOps', '2025-11-01', '2026-01-31', 'completed', 100),
(2, 'Dashboard Analytics', 'Tableau de bord pour visualisation des données métier', 'Data Engineering', '2026-01-20', '2026-03-30', 'in_progress', 30);

-- Assign Employees to Projects
INSERT INTO project_employee (project_id, employee_id, role) VALUES
(1, 1, 'Lead Developer'),
(1, 2, 'UI/UX Designer'),
(2, 1, 'Full Stack Developer'),
(2, 2, 'UI/UX Designer'),
(3, 3, 'DevOps Lead'),
(4, 1, 'Backend Developer');

-- Insert Tickets
INSERT INTO tickets (project_id, client_id, employee_id, title, description, priority, status) VALUES
(1, 1, 1, 'Problème de paiement PayPal', 'Le module de paiement PayPal ne fonctionne pas correctement lors du checkout', 'high', 'in_progress'),
(1, 1, NULL, 'Ajout d\'une nouvelle catégorie', 'Nous aimerions ajouter une catégorie "Électronique" sur le site', 'medium', 'open'),
(2, 1, 1, 'Notification push ne fonctionne pas', 'Les notifications push n\'arrivent pas sur iOS', 'urgent', 'open'),
(4, 2, 1, 'Export des données en Excel', 'Besoin d\'une fonctionnalité d\'export des graphiques en Excel', 'low', 'open');

-- Insert Ticket Comments
INSERT INTO ticket_comments (ticket_id, user_id, comment) VALUES
(1, 2, 'J\'ai identifié le problème. C\'est lié à la configuration de l\'API PayPal. Je travaille dessus.'),
(1, 5, 'Merci pour le retour. C\'est urgent car nous lançons une campagne demain.'),
(3, 4, 'Les notifications fonctionnent sur Android mais pas sur iOS. Peut-être un problème de certificat?');

-- Insert Sample Files
INSERT INTO files (project_id, uploaded_by, file_name, file_path, file_type, file_size) VALUES
(1, 2, 'Mockups_Homepage_v2.pdf', 'projects/1/mockups_homepage_v2.pdf', 'application/pdf', 2548963),
(1, 1, 'Documentation_API_MiroShop.pdf', 'projects/1/documentation_api_miroshop.pdf', 'application/pdf', 1024567),
(3, 3, 'Architecture_AWS_Diagram.png', 'projects/3/architecture_aws_diagram.png', 'image/png', 856234),
(4, 1, 'Data_Model_Schema.sql', 'projects/4/data_model_schema.sql', 'application/sql', 45678);

-- ============================================
-- Useful Queries for Development/Testing
-- ============================================

-- Get all projects with client info
-- SELECT p.*, c.company_name, u.email as client_email 
-- FROM projects p 
-- JOIN clients c ON p.client_id = c.id 
-- JOIN users u ON c.user_id = u.id;

-- Get project with assigned employees
-- SELECT p.title, u.name as employee_name, pe.role, e.position
-- FROM projects p
-- JOIN project_employee pe ON p.id = pe.project_id
-- JOIN employees e ON pe.employee_id = e.id
-- JOIN users u ON e.user_id = u.id
-- WHERE p.id = 1;

-- Get tickets with client and employee info
-- SELECT t.*, 
--        p.title as project_title,
--        uc.name as client_name,
--        ue.name as employee_name
-- FROM tickets t
-- JOIN projects p ON t.project_id = p.id
-- JOIN clients c ON t.client_id = c.id
-- JOIN users uc ON c.user_id = uc.id
-- LEFT JOIN employees e ON t.employee_id = e.id
-- LEFT JOIN users ue ON e.user_id = ue.id;

-- Get dashboard stats
-- SELECT 
--     (SELECT COUNT(*) FROM employees) as total_employees,
--     (SELECT COUNT(*) FROM projects WHERE status = 'in_progress') as active_projects,
--     (SELECT COUNT(*) FROM projects WHERE status = 'completed') as completed_projects,
--     (SELECT COUNT(*) FROM tickets WHERE status IN ('open', 'in_progress')) as open_tickets;
