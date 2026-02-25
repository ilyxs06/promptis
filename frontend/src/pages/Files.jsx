import { useState, useEffect } from 'react';
import { fileService, projectService } from '../services/api';
import toast from 'react-hot-toast';
import {
  CloudArrowUpIcon,
  DocumentIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

const fileTypeIcons = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  xls: '📊',
  xlsx: '📊',
  ppt: '📽️',
  pptx: '📽️',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
  gif: '🖼️',
  zip: '📦',
  rar: '📦',
  txt: '📃',
  default: '📎',
};

const Files = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadFiles(selectedProject);
    } else {
      setFiles([]);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    try {
      console.log('Chargement des projets...');
      const data = await projectService.getAll();
      console.log('Projets reçus:', data);
      setProjects(data);
      if (data.length > 0) {
        setSelectedProject(data[0].id);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des projets');
      console.error('Erreur loadProjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFiles = async (projectId) => {
    try {
      const data = await fileService.getByProject(projectId);
      setFiles(data);
    } catch (error) {
      console.error('Erreur chargement fichiers:', error);
      setFiles([]);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!selectedProject) {
      toast.error('Veuillez sélectionner un projet');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      await fileService.upload(selectedProject, formData);
      toast.success('Fichier uploadé avec succès');
      loadFiles(selectedProject);
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
      console.error(error);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await fileService.download(file.id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
      console.error(error);
    }
  };

  const handleDelete = async (fileId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier ?')) {
      try {
        await fileService.delete(fileId);
        toast.success('Fichier supprimé avec succès');
        loadFiles(selectedProject);
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  const getFileIcon = (filename) => {
    if (!filename) return fileTypeIcons.default;
    const ext = filename.split('.').pop().toLowerCase();
    return fileTypeIcons[ext] || fileTypeIcons.default;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Fichiers</h1>
          <p className="text-gray-600 mt-1">Gérez les fichiers de vos projets</p>
        </div>
        <label className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
          <CloudArrowUpIcon className="h-5 w-5 mr-2" />
          {uploading ? 'Upload...' : 'Uploader un fichier'}
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading || !selectedProject}
          />
        </label>
      </div>

      {/* Project Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner un projet
        </label>
        <select
          value={selectedProject || ''}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">-- Choisir un projet --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>

      {/* Files Grid */}
      {selectedProject ? (
        files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{getFileIcon(file.filename)}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate" title={file.filename}>
                      {file.filename}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.filesize)} • {formatDate(file.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleDownload(file)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Télécharger"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Aucun fichier dans ce projet</p>
            <p className="text-sm text-gray-400">
              Uploadez des fichiers pour commencer
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Sélectionnez un projet pour voir ses fichiers</p>
        </div>
      )}
    </div>
  );
};

export default Files;
