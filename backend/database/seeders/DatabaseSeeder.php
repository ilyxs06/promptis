<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Employee;
use App\Models\Client;
use App\Models\Project;
use App\Models\Ticket;
use App\Models\TicketComment;
use App\Models\File;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Admin Promptis',
            'email' => 'admin@promptis.ma',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create Employee Users
        $employee1User = User::create([
            'name' => 'Ahmed Bennani',
            'email' => 'ahmed.bennani@promptis.ma',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'email_verified_at' => now(),
        ]);

        $employee2User = User::create([
            'name' => 'Fatima El Amrani',
            'email' => 'fatima.elamrani@promptis.ma',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'email_verified_at' => now(),
        ]);

        $employee3User = User::create([
            'name' => 'Youssef Alaoui',
            'email' => 'youssef.alaoui@promptis.ma',
            'password' => Hash::make('password'),
            'role' => 'employee',
            'email_verified_at' => now(),
        ]);

        // Create Employees
        $employee1 = Employee::create([
            'user_id' => $employee1User->id,
            'phone' => '+212 6 12 34 56 78',
            'position' => 'Full Stack Developer',
            'department' => 'Development',
            'skills' => ['PHP', 'Laravel', 'React', 'MySQL', 'JavaScript'],
            'hire_date' => '2023-01-15',
        ]);

        $employee2 = Employee::create([
            'user_id' => $employee2User->id,
            'phone' => '+212 6 23 45 67 89',
            'position' => 'UX/UI Designer',
            'department' => 'Design',
            'skills' => ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI Design'],
            'hire_date' => '2023-03-20',
        ]);

        $employee3 = Employee::create([
            'user_id' => $employee3User->id,
            'phone' => '+212 6 34 56 78 90',
            'position' => 'DevOps Engineer',
            'department' => 'Infrastructure',
            'skills' => ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
            'hire_date' => '2022-11-10',
        ]);

        // Create Client Users
        $client1User = User::create([
            'name' => 'Hassan Tazi',
            'email' => 'contact@techcorp.ma',
            'password' => Hash::make('password'),
            'role' => 'client',
            'email_verified_at' => now(),
        ]);

        $client2User = User::create([
            'name' => 'Sarah Benani',
            'email' => 'contact@innovatesa.ma',
            'password' => Hash::make('password'),
            'role' => 'client',
            'email_verified_at' => now(),
        ]);

        // Create Clients
        $client1 = Client::create([
            'user_id' => $client1User->id,
            'company_name' => 'TechCorp Maroc',
            'contact_name' => 'Hassan Tazi',
            'phone' => '+212 5 22 11 22 33',
            'address' => 'Boulevard Mohamed V, Casablanca',
        ]);

        $client2 = Client::create([
            'user_id' => $client2User->id,
            'company_name' => 'Innovate SA',
            'contact_name' => 'Sarah Benani',
            'phone' => '+212 5 22 44 55 66',
            'address' => 'Avenue Hassan II, Rabat',
        ]);

        // Create Projects
        $project1 = Project::create([
            'client_id' => $client1->id,
            'title' => 'Site E-Commerce MiroShop',
            'description' => 'Développement d\'une plateforme e-commerce complète avec paiement en ligne et gestion des stocks',
            'type' => 'Web Development',
            'start_date' => '2025-12-01',
            'end_date' => '2026-02-28',
            'budget' => 150000.00,
            'status' => 'in_progress',
            'progress' => 75,
        ]);

        $project2 = Project::create([
            'client_id' => $client1->id,
            'title' => 'Application Mobile TechCorp',
            'description' => 'Application mobile iOS/Android pour la gestion des commandes clients',
            'type' => 'Mobile Development',
            'start_date' => '2026-01-15',
            'end_date' => '2026-04-15',
            'budget' => 80000.00,
            'status' => 'in_progress',
            'progress' => 45,
        ]);

        $project3 = Project::create([
            'client_id' => $client2->id,
            'title' => 'Migration Cloud AWS',
            'description' => 'Migration de l\'infrastructure existante vers AWS avec containerisation Docker',
            'type' => 'Cloud & DevOps',
            'start_date' => '2025-11-01',
            'end_date' => '2026-01-31',
            'budget' => 120000.00,
            'status' => 'completed',
            'progress' => 100,
        ]);

        $project4 = Project::create([
            'client_id' => $client2->id,
            'title' => 'Dashboard Analytics',
            'description' => 'Tableau de bord interactif pour la visualisation des données métier en temps réel',
            'type' => 'Data Engineering',
            'start_date' => '2026-01-20',
            'end_date' => '2026-03-30',
            'budget' => 95000.00,
            'status' => 'in_progress',
            'progress' => 30,
        ]);

        // Assign Employees to Projects
        $project1->employees()->attach($employee1->id, ['role' => 'Lead Developer']);
        $project1->employees()->attach($employee2->id, ['role' => 'UI/UX Designer']);

        $project2->employees()->attach($employee1->id, ['role' => 'Full Stack Developer']);
        $project2->employees()->attach($employee2->id, ['role' => 'UI/UX Designer']);

        $project3->employees()->attach($employee3->id, ['role' => 'DevOps Lead']);

        $project4->employees()->attach($employee1->id, ['role' => 'Backend Developer']);

        // Create Tickets
        $ticket1 = Ticket::create([
            'project_id' => $project1->id,
            'client_id' => $client1->id,
            'employee_id' => $employee1->id,
            'title' => 'Problème de paiement PayPal',
            'description' => 'Le module de paiement PayPal ne fonctionne pas correctement lors du checkout. Les clients reçoivent une erreur 500.',
            'priority' => 'high',
            'status' => 'in_progress',
        ]);

        $ticket2 = Ticket::create([
            'project_id' => $project1->id,
            'client_id' => $client1->id,
            'employee_id' => null,
            'title' => 'Ajout d\'une nouvelle catégorie',
            'description' => 'Nous aimerions ajouter une catégorie "Électronique" sur le site avec une bannière personnalisée',
            'priority' => 'medium',
            'status' => 'open',
        ]);

        $ticket3 = Ticket::create([
            'project_id' => $project2->id,
            'client_id' => $client1->id,
            'employee_id' => $employee1->id,
            'title' => 'Notification push ne fonctionne pas',
            'description' => 'Les notifications push n\'arrivent pas sur les appareils iOS. Fonctionne correctement sur Android.',
            'priority' => 'urgent',
            'status' => 'open',
        ]);

        $ticket4 = Ticket::create([
            'project_id' => $project4->id,
            'client_id' => $client2->id,
            'employee_id' => $employee1->id,
            'title' => 'Export des données en Excel',
            'description' => 'Besoin d\'une fonctionnalité d\'export des graphiques et données en format Excel',
            'priority' => 'low',
            'status' => 'open',
        ]);

        // Create Ticket Comments
        TicketComment::create([
            'ticket_id' => $ticket1->id,
            'user_id' => $employee1User->id,
            'comment' => 'J\'ai identifié le problème. C\'est lié à la configuration de l\'API PayPal. Je travaille dessus et devrait être résolu d\'ici demain.',
        ]);

        TicketComment::create([
            'ticket_id' => $ticket1->id,
            'user_id' => $client1User->id,
            'comment' => 'Merci pour le retour rapide! C\'est urgent car nous lançons une campagne promotionnelle demain matin.',
        ]);

        TicketComment::create([
            'ticket_id' => $ticket3->id,
            'user_id' => $employee3User->id,
            'comment' => 'Cela pourrait être un problème de certificat APNs. Vérifiez si le certificat iOS est bien configuré dans Firebase.',
        ]);

        // Create Sample Files
        File::create([
            'project_id' => $project1->id,
            'uploaded_by' => $employee2User->id,
            'file_name' => 'Mockups_Homepage_v2.pdf',
            'file_path' => 'projects/1/mockups_homepage_v2.pdf',
            'file_type' => 'application/pdf',
            'file_size' => 2548963,
        ]);

        File::create([
            'project_id' => $project1->id,
            'uploaded_by' => $employee1User->id,
            'file_name' => 'Documentation_API_MiroShop.pdf',
            'file_path' => 'projects/1/documentation_api_miroshop.pdf',
            'file_type' => 'application/pdf',
            'file_size' => 1024567,
        ]);

        File::create([
            'project_id' => $project3->id,
            'uploaded_by' => $employee3User->id,
            'file_name' => 'Architecture_AWS_Diagram.png',
            'file_path' => 'projects/3/architecture_aws_diagram.png',
            'file_type' => 'image/png',
            'file_size' => 856234,
        ]);

        File::create([
            'project_id' => $project4->id,
            'uploaded_by' => $employee1User->id,
            'file_name' => 'Data_Model_Schema.sql',
            'file_path' => 'projects/4/data_model_schema.sql',
            'file_type' => 'application/sql',
            'file_size' => 45678,
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('Admin: admin@promptis.ma | password');
        $this->command->info('Employee: ahmed.bennani@promptis.ma | password');
        $this->command->info('Client: contact@techcorp.ma | password');
    }
}
