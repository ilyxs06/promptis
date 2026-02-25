import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  FolderIcon,
  TicketIcon,
  DocumentIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Suivi de Projets',
    description: 'Suivez l\'avancement de vos projets Promptis en temps réel avec des statuts détaillés.',
    icon: FolderIcon,
    color: 'bg-cyan-500',
  },
  {
    name: 'Gestion des Tickets',
    description: 'Créez et suivez vos demandes d\'assistance avec un système de priorités.',
    icon: TicketIcon,
    color: 'bg-orange-500',
  },
  {
    name: 'Partage de Fichiers',
    description: 'Accédez aux livrables et partagez des documents liés à vos projets.',
    icon: DocumentIcon,
    color: 'bg-pink-500',
  },
  {
    name: 'Tableaux de Bord',
    description: 'Visualisez les statistiques de vos projets avec des graphiques interactifs.',
    icon: ChartBarIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Équipe Promptis',
    description: 'Consultez les informations de l\'équipe assignée à vos projets.',
    icon: UserGroupIcon,
    color: 'bg-blue-600',
  },
  {
    name: 'Accès Sécurisé',
    description: 'Profitez d\'un accès sécurisé et personnalisé à votre espace client.',
    icon: ShieldCheckIcon,
    color: 'bg-green-500',
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Promptis Manager</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.promptis.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Site Promptis
              </a>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Espace Client
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
              Votre espace client
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Promptis
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Accédez à vos projets, suivez leur avancement, gérez vos tickets d'assistance 
              et téléchargez vos livrables depuis votre espace client personnalisé.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Accéder à mon espace
              </Link>
              <a
                href="https://www.promptis.ma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-colors"
              >
                Découvrir Promptis
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-cyan-600">5</div>
                    <div className="text-gray-600 text-sm">Mes Projets</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-orange-600">12</div>
                    <div className="text-gray-600 text-sm">Tickets ouverts</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-pink-600">8</div>
                    <div className="text-gray-600 text-sm">Fichiers</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">98%</div>
                    <div className="text-gray-600 text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Votre portail client Promptis
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Un espace dédié pour suivre et gérer tous vos projets avec Promptis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Pourquoi choisir l'espace client Promptis ?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Accès sécurisé</h3>
                    <p className="text-indigo-100">
                      Vos données projet sont protégées avec une authentification sécurisée.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <CloudArrowUpIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Disponible 24/7</h3>
                    <p className="text-indigo-100">
                      Consultez vos projets et gérez vos tickets depuis n'importe quel appareil.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Suivi en temps réel</h3>
                    <p className="text-indigo-100">
                      Suivez l'avancement de vos projets avec des mises à jour en temps réel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">8+</div>
                  <div className="text-xl text-blue-100">Années d'expertise</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">230+</div>
                    <div className="text-blue-200 text-sm">Projets livrés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">2k+</div>
                    <div className="text-blue-200 text-sm">Clients satisfaits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Déjà client Promptis ?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Accédez à votre espace client personnalisé pour suivre vos projets et gérer vos demandes.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            Accéder à mon espace
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold">Promptis Manager</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="text-sm mt-1">
                <a href="https://www.promptis.ma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  © 2026 Promptis. Tous droits réservés.
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
