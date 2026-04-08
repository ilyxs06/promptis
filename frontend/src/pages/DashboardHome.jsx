import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { statsService, projectService, ticketService } from '../services/api';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  TicketIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

/* ─── Simulated sparkline data ──────────────────────────────────────────── */
const genSparkData = (base, len = 12) =>
  Array.from({ length: len }, (_, i) => ({
    v: Math.max(0, base + Math.round((Math.random() - 0.45) * base * 0.4 * (i / len + 0.5))),
  }));

/* ─── Stat Card (like the reference image) ──────────────────────────────── */
const StatCard = ({ label, value, sub, spark, color, trend, trendVal, prefix = '', suffix = '' }) => {
  const up = trend === 'up';
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-gray-900 leading-none">
        {prefix}<span style={{ color }}>{value}</span>{suffix}
      </p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
      {/* Mini sparkline */}
      <div className="h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spark} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${label.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${label.replace(/\s+/g, '-')})`}
              dot={false}
              isAnimationActive={true}
            />
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="bg-gray-800 text-white text-xs rounded px-2 py-1">
                    {prefix}{payload[0].value}{suffix}
                  </div>
                ) : null
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Trend row */}
      {trendVal !== undefined && (
        <div className="flex items-center justify-between text-xs mt-1">
          <span className="text-gray-400">Activité récente</span>
          <span className={`flex items-center font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
            {up
              ? <ArrowTrendingUpIcon className="h-3.5 w-3.5 mr-0.5" />
              : <ArrowTrendingDownIcon className="h-3.5 w-3.5 mr-0.5" />}
            {trendVal}
          </span>
        </div>
      )}
    </div>
  );
};

/* ─── Progress bar card ──────────────────────────────────────────────────── */
const ProgressCard = ({ label, value, max, color }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-1">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-xs font-bold" style={{ color }}>{pct}%</p>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <span className="text-xs text-gray-400">/ {max}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

/* ─── Recent row items ───────────────────────────────────────────────────── */
const statusColors = {
  planifie: 'bg-gray-100 text-gray-800',
  en_cours: 'bg-blue-100 text-blue-800',
  en_pause: 'bg-yellow-100 text-yellow-800',
  termine: 'bg-green-100 text-green-800',
  annule: 'bg-red-100 text-red-800',
  ouvert: 'bg-blue-100 text-blue-800',
  resolu: 'bg-green-100 text-green-800',
  ferme: 'bg-gray-100 text-gray-800',
};
const statusLabels = {
  planifie: 'Planifié', en_cours: 'En cours', en_pause: 'En pause',
  termine: 'Terminé', annule: 'Annulé',
  ouvert: 'Ouvert', resolu: 'Résolu', ferme: 'Fermé',
};
const priorityColors = {
  basse: 'bg-green-100 text-green-800',
  moyenne: 'bg-yellow-100 text-yellow-800',
  haute: 'bg-orange-100 text-orange-800',
  urgente: 'bg-red-100 text-red-800',
};

// Softer hex colors for sparklines
const chartColors = {
  indigo: '#6366f1',
  emerald: '#10b981',
  amber: '#f59e0b',
  red: '#ef4444'
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const DashboardHome = () => {
  const { user, isAdmin, isEmployee, isClient } = useAuth();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

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
    } catch (e) {
      console.error('Erreur chargement:', e);
      setStats({ totalProjects: 0, activeProjects: 0, completedProjects: 0, totalEmployees: 0, totalClients: 0, openTickets: 0, urgentTickets: 0 });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  /* ── Derived numbers ── */
  const totalProj = stats?.totalProjects ?? projects.length;
  const activeProj = stats?.activeProjects ?? projects.filter(p => p.status === 'en_cours').length;
  const doneProj = stats?.completedProjects ?? projects.filter(p => p.status === 'termine').length;
  const totalEmp = stats?.totalEmployees ?? 0;
  const totalCli = stats?.totalClients ?? 0;
  const openTick = stats?.openTickets ?? tickets.filter(t => t.status === 'ouvert').length;
  const urgTick = stats?.urgentTickets ?? tickets.filter(t => t.priority === 'urgente').length;
  const myProj = stats?.myProjects ?? projects.length;
  const myTick = stats?.myTickets ?? tickets.length;
  const assignedTick = stats?.assignedTickets ?? tickets.length;

  /* ── Recent data (last 5) ── */
  const recentProjects = [...projects].slice(0, 5);
  const recentTickets = [...tickets].filter(t => t.status !== 'ferme').slice(0, 5);

  /* ── Admin stat cards ── */
  const adminCards = [
    { label: 'Projets Actifs', value: activeProj, color: chartColors.indigo, trend: 'up', trendVal: '+5.1%', spark: genSparkData(activeProj || 3) },
    { label: 'Terminés', value: doneProj, color: chartColors.emerald, trend: 'up', trendVal: '+3.4%', spark: genSparkData(doneProj || 2) },
    { label: 'Tickets Ouverts', value: openTick, color: chartColors.amber, trend: 'down', trendVal: '-2%', spark: genSparkData(openTick || 4) },
    { label: 'Tickets Urgents', value: urgTick, color: chartColors.red, trend: 'down', trendVal: '-1.5%', spark: genSparkData(urgTick || 1) },
  ];
  const employeeCards = [
    { label: 'Mes Projets', value: myProj, color: chartColors.indigo, trend: 'up', trendVal: '+12%', spark: genSparkData(myProj || 2) },
    { label: 'Projets Actifs', value: activeProj, color: chartColors.emerald, trend: 'up', trendVal: '+5%', spark: genSparkData(activeProj || 1) },
    { label: 'Tickets Assignés', value: assignedTick, color: chartColors.amber, trend: 'down', trendVal: '-3%', spark: genSparkData(assignedTick || 3) },
    { label: 'Tickets Ouverts', value: openTick, color: chartColors.red, trend: 'down', trendVal: '-2%', spark: genSparkData(openTick || 2) },
  ];
  const clientCards = [
    { label: 'Mes Projets', value: projects.length, color: chartColors.indigo, trend: 'up', trendVal: '+6.1%', spark: genSparkData(projects.length || 2) },
    { label: 'Projets Actifs', value: projects.filter(p => p.status === 'en_cours').length, color: chartColors.emerald, trend: 'up', trendVal: '+4%', spark: genSparkData(3) },
    { label: 'Mes Tickets', value: tickets.length, color: chartColors.amber, trend: 'down', trendVal: '-1%', spark: genSparkData(tickets.length || 3) },
    { label: 'Tickets Ouverts', value: tickets.filter(t => t.status === 'ouvert').length, color: chartColors.red, trend: 'down', trendVal: '-2%', spark: genSparkData(2) },
  ];

  const cards = isAdmin ? adminCards : isEmployee ? employeeCards : clientCards;

  return (
    <div className="space-y-8">

      {/* ── Welcome ── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenue, <span className="text-indigo-600">{user?.name}</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Voici un aperçu de votre activité</p>
      </div>

      {/* ── Sparkline stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      {/* ── Admin extra: Progress cards ── */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <ProgressCard label="Taux de complétion" value={doneProj} max={totalProj || 1} color={chartColors.emerald} />
          <ProgressCard label="Employés actifs" value={totalEmp} max={totalEmp || 1} color={chartColors.indigo} />
          <ProgressCard label="Clients actifs" value={totalCli} max={totalCli || 1} color={chartColors.amber} />
        </div>
      )}

      {/* ── Two-column: Recent projects + tickets ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Projects */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-indigo-500" />
              <h2 className="text-sm font-semibold text-gray-900">Projets récents</h2>
            </div>
            <Link to="/projects" className="text-xs text-indigo-600 hover:underline">Voir tout →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProjects.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">Aucun projet</p>
            )}
            {recentProjects.map((p) => (
              <div key={p.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon className="h-4 w-4 text-indigo-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                    <p className="text-xs text-gray-400 truncate">{p.client?.company_name || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                  {/* Progress bar */}
                  <div className="hidden sm:flex items-center gap-1.5">
                    <div className="w-16 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${p.progress ?? 0}%`, backgroundColor: '#4F46E5' }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{p.progress ?? 0}%</span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[p.status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {statusLabels[p.status] ?? p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <TicketIcon className="h-5 w-5 text-orange-500" />
              <h2 className="text-sm font-semibold text-gray-900">Tickets récents</h2>
            </div>
            <Link to="/tickets" className="text-xs text-indigo-600 hover:underline">Voir tout →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTickets.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">Aucun ticket actif</p>
            )}
            {recentTickets.map((t) => (
              <div key={t.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${priorityColors[t.priority] || 'bg-gray-100 text-gray-400'}`}
                  >
                    {t.priority === 'urgente'
                      ? <ExclamationTriangleIcon className="h-4 w-4" />
                      : t.status === 'resolu'
                        ? <CheckCircleIcon className="h-4 w-4" />
                        : <ClockIcon className="h-4 w-4" />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
                    <p className="text-xs text-gray-400 truncate">{t.project?.title || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[t.priority] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {t.priority}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[t.status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {statusLabels[t.status] ?? t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChartBarIcon className="h-5 w-5 text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-900">Actions Rapides</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {isAdmin && <>
            <Link to="/employees" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center">
              <UserGroupIcon className="h-6 w-6 text-indigo-500" />
              <span className="text-xs font-medium text-gray-700">Employés</span>
            </Link>
            <Link to="/clients" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-center">
              <BuildingOfficeIcon className="h-6 w-6 text-purple-500" />
              <span className="text-xs font-medium text-gray-700">Clients</span>
            </Link>
            <Link to="/projects" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center">
              <BriefcaseIcon className="h-6 w-6 text-indigo-500" />
              <span className="text-xs font-medium text-gray-700">Projets</span>
            </Link>
            <Link to="/tickets" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all text-center">
              <TicketIcon className="h-6 w-6 text-orange-500" />
              <span className="text-xs font-medium text-gray-700">Tickets</span>
            </Link>
          </>}
          {isEmployee && <>
            <Link to="/projects" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center">
              <BriefcaseIcon className="h-6 w-6 text-indigo-500" />
              <span className="text-xs font-medium text-gray-700">Mes Projects</span>
            </Link>
            <Link to="/tickets" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all text-center">
              <TicketIcon className="h-6 w-6 text-orange-500" />
              <span className="text-xs font-medium text-gray-700">Mes Tickets</span>
            </Link>
          </>}
          {isClient && <>
            <Link to="/projects" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-center">
              <BriefcaseIcon className="h-6 w-6 text-indigo-500" />
              <span className="text-xs font-medium text-gray-700">Mes Projets</span>
            </Link>
            <Link to="/tickets" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all text-center">
              <TicketIcon className="h-6 w-6 text-orange-500" />
              <span className="text-xs font-medium text-gray-700">Créer un ticket</span>
            </Link>
          </>}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
