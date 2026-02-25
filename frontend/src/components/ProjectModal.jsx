import { useState, useEffect } from 'react';
import { projectService, clientService, employeeService } from '../services/api';
import toast from 'react-hot-toast';
import { XMarkIcon, UserPlusIcon, XCircleIcon } from '@heroicons/react/24/outline';

const ProjectModal = ({ isOpen, onClose, onSuccess, project }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client_id: '',
    status: 'planifie',
    start_date: '',
    end_date: '',
  });
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadClients();
      loadEmployees();
    }
  }, [isOpen]);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        client_id: project.client_id || '',
        status: project.status || 'planifie',
        start_date: project.start_date ? project.start_date.split('T')[0] : '',
        end_date: project.end_date ? project.end_date.split('T')[0] : '',
      });
      setSelectedEmployeeIds(
        project.employees ? project.employees.map((e) => e.id) : []
      );
    } else {
      setFormData({
        title: '',
        description: '',
        client_id: '',
        status: 'planifie',
        start_date: '',
        end_date: '',
      });
      setSelectedEmployeeIds([]);
    }
  }, [project, isOpen]);

  const loadClients = async () => {
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (error) {
      console.error('Erreur chargement clients:', error);
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      console.error('Erreur chargement employés:', error);
    }
  };

  const toggleEmployee = (employeeId) => {
    setSelectedEmployeeIds((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const removeEmployee = (employeeId) => {
    setSelectedEmployeeIds((prev) => prev.filter((id) => id !== employeeId));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...formData, employee_ids: selectedEmployeeIds };
      if (project) {
        await projectService.update(project.id, payload);
        toast.success('Projet modifié avec succès');
      } else {
        await projectService.create(payload);
        toast.success('Projet créé avec succès');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {project ? 'Modifier le projet' : 'Nouveau projet'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom du projet *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Site e-commerce"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Description du projet..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client *
              </label>
              <select
                name="client_id"
                value={formData.client_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Sélectionner un client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="planifie">Planifié</option>
                <option value="en_cours">En cours</option>
                <option value="en_pause">En pause</option>
                <option value="termine">Terminé</option>
                <option value="annule">Annulé</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Employee Assignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center">
                  <UserPlusIcon className="h-4 w-4 mr-1" />
                  Assignation des employés
                </span>
              </label>

              {/* Selected employees */}
              {selectedEmployeeIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedEmployeeIds.map((id) => {
                    const emp = employees.find((e) => e.id === id);
                    if (!emp) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {emp.user?.name || `Employé #${id}`}
                        <button
                          type="button"
                          onClick={() => removeEmployee(id)}
                          className="hover:text-indigo-900"
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Employee list to select from */}
              <div className="border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                {employees.length === 0 ? (
                  <p className="text-sm text-gray-500 p-3">Aucun employé disponible</p>
                ) : (
                  employees.map((emp) => (
                    <label
                      key={emp.id}
                      className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                        selectedEmployeeIds.includes(emp.id) ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedEmployeeIds.includes(emp.id)}
                        onChange={() => toggleEmployee(emp.id)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {emp.user?.name || `Employé #${emp.id}`}
                        </p>
                        {emp.position && (
                          <p className="text-xs text-gray-500">{emp.position}</p>
                        )}
                      </div>
                    </label>
                  ))
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedEmployeeIds.length} employé(s) sélectionné(s)
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Enregistrement...' : project ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
