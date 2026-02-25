import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { statsService, projectService, ticketService } from '../services/api';
import {
  UserGroupIcon,
  BriefcaseIcon,
  TicketIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-xs text-green-600 mt-1 flex items-center">
            <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const { user, isAdmin, isEmployee, isClient } = useAuth();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, projectsData, ticketsData] = await Promise.all([
        statsService.getDashboard(),
        projectService.getAll(),
        ticketService.getAll(),
      ]);
      setStats(statsData);
      setProjects(projectsData);
      setTickets(ticketsData);
    } catch (error) {
      console.error('Erreur de chargement:', error);
      setStats({
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        totalEmployees: 0,
        totalClients: 0,
        openTickets: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
 /* const projectStatusData = [
    { name: 'Planifié', value: projects.filter(p => p.status === 'planifie').length, color: '#6B7280' },
    { name: 'En cours', value: projects.filter(p => p.status === 'en_cours').length, color: '#F59E0B' },
    { name: 'En pause', value: projects.filter(p => p.status === 'en_pause').length, color: '#8B5CF6' },
    { name: 'Terminé', value: projects.filter(p => p.status === 'termine').length, color: '#10B981' },
    { name: 'Annulé', value: projects.filter(p => p.status === 'annule').length, color: '#EF4444' },
  ].filter(d => d.value > 0);

  const ticketStatusData = [
    { name: 'Ouvert', value: tickets.filter(t => t.status === 'ouvert').length, color: '#4F46E5' },
    { name: 'En cours', value: tickets.filter(t => t.status === 'en_cours').length, color: '#F59E0B' },
    { name: 'Résolu', value: tickets.filter(t => t.status === 'resolu').length, color: '#10B981' },
    { name: 'Fermé', value: tickets.filter(t => t.status === 'ferme').length, color: '#6B7280' },
  ].filter(d => d.value > 0);

  const ticketPriorityData = [
    { name: 'Basse', value: tickets.filter(t => t.priority === 'basse').length },
    { name: 'Moyenne', value: tickets.filter(t => t.priority === 'moyenne').length },
    { name: 'Haute', value: tickets.filter(t => t.priority === 'haute').length },
    { name: 'Urgente', value: tickets.filter(t => t.priority === 'urgente').length },
  ];
*/
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenue, {user?.name}! 
        </h1>
        <p className="text-gray-600 mt-1">
          Voici un aperçu de votre tableau de bord
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isAdmin && (
          <>
            <StatCard
              title="Projets Actifs"
              value={stats?.activeProjects || projects.filter(p => p.status === 'en_cours').length}
              icon={BriefcaseIcon}
              color="#4F46E5"
            />
            <StatCard
              title="Projets Terminés"
              value={stats?.completedProjects || projects.filter(p => p.status === 'termine').length}
              icon={BriefcaseIcon}
              color="#10B981"
            />
            <StatCard
              title="Employés"
              value={stats?.totalEmployees || 0}
              icon={UserGroupIcon}
              color="#F59E0B"
            />
            <StatCard
              title="Clients"
              value={stats?.totalClients || 0}
              icon={BuildingOfficeIcon}
              color="#8B5CF6"
            />
          </>
        )}

        {isEmployee && (
          <>
            <StatCard
              title="Mes Projets"
              value={stats?.myProjects || projects.length}
              icon={BriefcaseIcon}
              color="#4F46E5"
            />
            <StatCard
              title="Projets Actifs"
              value={projects.filter(p => p.status === 'en_cours').length}
              icon={BriefcaseIcon}
              color="#10B981"
            />
            <StatCard
              title="Tickets Assignés"
              value={stats?.assignedTickets || tickets.length}
              icon={TicketIcon}
              color="#F59E0B"
            />
            <StatCard
              title="Tickets Ouverts"
              value={tickets.filter(t => t.status === 'ouvert').length}
              icon={TicketIcon}
              color="#EF4444"
            />
          </>
        )}

        {isClient && (
          <>
            <StatCard
              title="Mes Projets"
              value={projects.length}
              icon={BriefcaseIcon}
              color="#4F46E5"
            />
            <StatCard
              title="Projets Actifs"
              value={projects.filter(p => p.status === 'en_cours').length}
              icon={BriefcaseIcon}
              color="#10B981"
            />
            <StatCard
              title="Mes Tickets"
              value={tickets.length}
              icon={TicketIcon}
              color="#F59E0B"
            />
            <StatCard
              title="Tickets Ouverts"
              value={tickets.filter(t => t.status === 'ouvert').length}
              icon={TicketIcon}
              color="#EF4444"
            />
          </>
        )}
      </div>

      {/* Charts Section - commenté
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Statut des Projets
          </h3>
          {projectStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Aucun projet pour le moment
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎫 Tickets par Priorité
          </h3>
          {tickets.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ticketPriorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" name="Tickets" radius={[4, 4, 0, 0]}>
                  {ticketPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Aucun ticket pour le moment
            </div>
          )}
        </div>
      </div>

      {tickets.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📈 Statut des Tickets
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      */}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actions Rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isAdmin && (
            <>
              <Link
                to="/employees"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <UserGroupIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Gérer les employés</span>
              </Link>
              <Link
                to="/clients"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <BuildingOfficeIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Gérer les clients</span>
              </Link>
              <Link
                to="/projects"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Gérer les projets</span>
              </Link>
              <Link
                to="/tickets"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <TicketIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Voir les tickets</span>
              </Link>
            </>
          )}

          {isEmployee && (
            <>
              <Link
                to="/projects"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Mes projets</span>
              </Link>
              <Link
                to="/tickets"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <TicketIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Mes tickets</span>
              </Link>
            </>
          )}

          {isClient && (
            <>
              <Link
                to="/projects"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Voir mes projets</span>
              </Link>
              <Link
                to="/tickets"
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <TicketIcon className="h-6 w-6 text-indigo-600" />
                <span className="font-medium">Créer un ticket</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
