import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import translations from '../translations';
import {
  BriefcaseIcon,
  TicketIcon,
  DocumentIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user, logout, isAdmin, isEmployee, isClient } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Pour l'instant, utilisez des stats statiques
      // Plus tard, récupérez depuis l'API
      setStats({
        activeProjects: 3,
        completedProjects: 5,
        openTickets: 2,
        sharedFiles: 18,
        totalEmployees: 3,
        totalClients: 2,
      });
    } catch (error) {
      console.error('Erreur de chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {translations.dashboard.welcome}, {user?.name}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {isAdmin && 'Administrateur'}
                {isEmployee && 'Employé'}
                {isClient && 'Client'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
              {translations.nav.logout}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {translations.dashboard.statistics}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Projets actifs */}
            <div className="card border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.dashboard.activeProjects}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BriefcaseIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Projets terminés */}
            <div className="card border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.dashboard.completedProjects}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.completedProjects}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <BriefcaseIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Tickets ouverts */}
            <div className="card border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.dashboard.openTickets}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.openTickets}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TicketIcon className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Fichiers partagés */}
            <div className="card border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{translations.dashboard.sharedFiles}</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.sharedFiles}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DocumentIcon className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message de bienvenue */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <h3 className="text-2xl font-bold mb-2">
             Bienvenue sur Promptis Manager!
          </h3>
          <p className="text-primary-100 mb-4">
            Votre tableau de bord est prêt. Le système est entièrement fonctionnel en français.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Backend Laravel configuré</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Base de données avec données de test</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Interface en français</span>
            </div>
          </div>
        </div>

        {/* Prochaines étapes */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🚀 Prochaines étapes de développement
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">1</span>
              <div>
                <p className="font-medium text-gray-900">Créer les contrôleurs API Laravel</p>
                <p className="text-sm text-gray-600">AuthController, EmployeeController, ClientController, ProjectController, etc.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">2</span>
              <div>
                <p className="font-medium text-gray-900">Développer les pages de gestion</p>
                <p className="text-sm text-gray-600">Liste et formulaires pour employés, clients, projets, tickets</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">3</span>
              <div>
                <p className="font-medium text-gray-900">Implémenter le système de fichiers</p>
                <p className="text-sm text-gray-600">Upload, téléchargement et gestion des documents de projets</p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
