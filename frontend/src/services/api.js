import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://promptis.onrender.com/api';

// Instance Axios configurée
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  // Connexion
  async login(credentials) {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Inscription
  async register(userData) {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Déconnexion
  async logout() {
    const response = await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  },

  // Obtenir l'utilisateur connecté
  async getUser() {
    const response = await api.get('/user');
    return response.data;
  },

  // Mettre à jour le profil
  async updateProfile(data) {
    const response = await api.put('/profile', data);
    return response.data;
  },

  // Mettre à jour le mot de passe
  async updatePassword(data) {
    const response = await api.put('/profile/password', data);
    return response.data;
  },
};

// Service utilisateurs
export const userService = {
  getAll: async () => (await api.get('/users')).data,
  getById: async (id) => (await api.get(`/users/${id}`)).data,
  update: async (id, data) => (await api.put(`/users/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/users/${id}`)).data,
};

// Service employés
export const employeeService = {
  getAll: async () => (await api.get('/employees')).data,
  getById: async (id) => (await api.get(`/employees/${id}`)).data,
  create: async (data) => (await api.post('/employees', data)).data,
  update: async (id, data) => (await api.put(`/employees/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/employees/${id}`)).data,
};

// Service clients
export const clientService = {
  getAll: async () => (await api.get('/clients')).data,
  getById: async (id) => (await api.get(`/clients/${id}`)).data,
  create: async (data) => (await api.post('/clients', data)).data,
  update: async (id, data) => (await api.put(`/clients/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/clients/${id}`)).data,
};

// Service projets
export const projectService = {
  getAll: async () => (await api.get('/projects')).data,
  getById: async (id) => (await api.get(`/projects/${id}`)).data,
  create: async (data) => (await api.post('/projects', data)).data,
  update: async (id, data) => (await api.put(`/projects/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/projects/${id}`)).data,
  assignEmployee: async (projectId, employeeId, role) =>
    (await api.post(`/projects/${projectId}/assign-employee`, { employee_id: employeeId, role })).data,
  removeEmployee: async (projectId, employeeId) =>
    (await api.delete(`/projects/${projectId}/employees/${employeeId}`)).data,
};

// Service tickets
export const ticketService = {
  getAll: async () => (await api.get('/tickets')).data,
  getById: async (id) => (await api.get(`/tickets/${id}`)).data,
  create: async (data) => (await api.post('/tickets', data)).data,
  update: async (id, data) => (await api.put(`/tickets/${id}`, data)).data,
  delete: async (id) => (await api.delete(`/tickets/${id}`)).data,
  addComment: async (ticketId, comment) =>
    (await api.post(`/tickets/${ticketId}/comments`, { comment })).data,
};

// Service fichiers
export const fileService = {
  getByProject: async (projectId) => (await api.get(`/projects/${projectId}/files`)).data,
  upload: async (projectId, formData) =>
    (await api.post(`/projects/${projectId}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })).data,
  download: (fileId) => api.get(`/files/${fileId}/download`, { responseType: 'blob' }),
  delete: async (fileId) => (await api.delete(`/files/${fileId}`)).data,
};

// Service statistiques
export const statsService = {
  getDashboard: async () => (await api.get('/stats/dashboard')).data,
};

// Service notifications
export const notificationService = {
  getAll: async () => (await api.get('/notifications')).data,
  getUnreadCount: async () => (await api.get('/notifications/unread-count')).data,
  markAsRead: async (id) => (await api.put(`/notifications/${id}/read`)).data,
  markAllAsRead: async () => (await api.put('/notifications/read-all')).data,
  delete: async (id) => (await api.delete(`/notifications/${id}`)).data,
  checkDeadlines: async () => (await api.post('/notifications/check-deadlines')).data,
};

export default api;
