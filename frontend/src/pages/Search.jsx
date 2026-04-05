import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { projectService, ticketService, clientService } from '../services/api';
import { FolderIcon, TicketIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({ projects: [], tickets: [], clients: [] });

  useEffect(() => {
    if (query) {
      performSearch();
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const [projects, tickets, clients] = await Promise.all([
        projectService.getAll().catch(() => []),
        ticketService.getAll().catch(() => []),
        clientService.getAll().catch(() => [])
      ]);

      const lowerQuery = query.toLowerCase();

      // Simple frontend filtering
      const filteredProjects = projects.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        (p.description && p.description.toLowerCase().includes(lowerQuery)) ||
        (p.client?.company_name && p.client.company_name.toLowerCase().includes(lowerQuery))
      );

      const filteredTickets = tickets.filter(t => 
        t.title.toLowerCase().includes(lowerQuery) || 
        (t.description && t.description.toLowerCase().includes(lowerQuery))
      );

      const filteredClients = clients.filter(c => 
        c.company_name.toLowerCase().includes(lowerQuery) || 
        (c.contact_name && c.contact_name.toLowerCase().includes(lowerQuery))
      );

      setResults({
        projects: filteredProjects,
        tickets: filteredTickets,
        clients: filteredClients
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-xl font-semibold text-gray-700">Aucune recherche effectuée.</h2>
        <p className="text-gray-500 mt-2">Veuillez taper un mot-clé dans la barre de recherche en haut.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Résultats pour : <span className="text-indigo-600">"{query}"</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Projects Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center bg-gray-50">
              <FolderIcon className="h-5 w-5 text-indigo-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Projets ({results.projects.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {results.projects.length === 0 ? (
                <p className="px-6 py-4 text-sm text-gray-500">Aucun projet trouvé.</p>
              ) : (
                results.projects.map((p) => (
                  <Link key={p.id} to="/projects" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
                    <p className="text-md font-medium text-gray-900">{p.title}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{p.description || 'Projet sans description'}</p>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Tickets Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center bg-gray-50">
              <TicketIcon className="h-5 w-5 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Tickets ({results.tickets.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {results.tickets.length === 0 ? (
                <p className="px-6 py-4 text-sm text-gray-500">Aucun ticket trouvé.</p>
              ) : (
                results.tickets.map((t) => (
                  <Link key={t.id} to="/tickets" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
                    <p className="text-md font-medium text-gray-900">{t.title}</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{t.description || 'Ticket sans description'}</p>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Clients Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center bg-gray-50">
              <BuildingOfficeIcon className="h-5 w-5 text-purple-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Clients ({results.clients.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {results.clients.length === 0 ? (
                <p className="px-6 py-4 text-sm text-gray-500">Aucun client trouvé.</p>
              ) : (
                results.clients.map((c) => (
                  <Link key={c.id} to="/clients" className="block px-6 py-4 hover:bg-gray-50 transition-colors">
                    <p className="text-md font-medium text-gray-900">{c.company_name}</p>
                    <p className="text-sm text-gray-500 mt-1">{c.contact_name} - {c.email}</p>
                  </Link>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Search;
