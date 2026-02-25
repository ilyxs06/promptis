// Traductions françaises pour l'application Promptis Manager

export const translations = {
  // Navigation
  nav: {
    dashboard: 'Tableau de bord',
    employees: 'Employés',
    clients: 'Clients',
    projects: 'Projets',
    tickets: 'Tickets',
    files: 'Fichiers',
    profile: 'Profil',
    logout: 'Déconnexion',
  },

  // Authentification
  auth: {
    login: 'Connexion',
    register: 'Inscription',
    email: 'Adresse email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    name: 'Nom complet',
    companyName: 'Nom de l\'entreprise',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    noAccount: 'Pas de compte ?',
    hasAccount: 'Déjà un compte ?',
    signIn: 'Se connecter',
    signUp: 'S\'inscrire',
    loggingIn: 'Connexion en cours...',
    registering: 'Inscription en cours...',
  },

  // Dashboard
  dashboard: {
    welcome: 'Bienvenue',
    overview: 'Vue d\'ensemble',
    statistics: 'Statistiques',
    recentActivity: 'Activité récente',
    activeProjects: 'Projets Actifs',
    completedProjects: 'Projets Terminés',
    openTickets: 'Tickets Ouverts',
    sharedFiles: 'Fichiers Partagés',
    totalEmployees: 'Employés Total',
    totalClients: 'Clients Total',
    loading: 'Chargement...',
  },

  // Projets
  projects: {
    title: 'Projets',
    myProjects: 'Mes Projets',
    allProjects: 'Tous les Projets',
    newProject: 'Nouveau Projet',
    editProject: 'Modifier le Projet',
    projectDetails: 'Détails du Projet',
    projectTitle: 'Titre du projet',
    description: 'Description',
    type: 'Type de projet',
    client: 'Client',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    budget: 'Budget',
    status: 'Statut',
    progress: 'Progression',
    team: 'Équipe',
    assignedEmployees: 'Employés assignés',
    addEmployee: 'Ajouter un employé',
    selectEmployee: 'Sélectionner un employé',
    role: 'Rôle dans le projet',
    
    // Statuts
    pending: 'En attente',
    inProgress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
    
    // Types
    web: 'Développement Web',
    mobile: 'Développement Mobile',
    data: 'Data Engineering',
    cloud: 'Cloud & DevOps',
    design: 'Design',
  },

  // Employés
  employees: {
    title: 'Employés',
    allEmployees: 'Tous les Employés',
    newEmployee: 'Nouvel Employé',
    editEmployee: 'Modifier l\'Employé',
    employeeDetails: 'Détails de l\'Employé',
    position: 'Poste',
    department: 'Département',
    skills: 'Compétences',
    phone: 'Téléphone',
    hireDate: 'Date d\'embauche',
    assignedProjects: 'Projets assignés',
    addSkill: 'Ajouter une compétence',
  },

  // Clients
  clients: {
    title: 'Clients',
    allClients: 'Tous les Clients',
    newClient: 'Nouveau Client',
    editClient: 'Modifier le Client',
    clientDetails: 'Détails du Client',
    companyName: 'Nom de l\'entreprise',
    contactName: 'Nom du contact',
    phone: 'Téléphone',
    address: 'Adresse',
    projects: 'Projets',
    totalProjects: 'Projets total',
  },

  // Tickets
  tickets: {
    title: 'Tickets',
    myTickets: 'Mes Tickets',
    allTickets: 'Tous les Tickets',
    newTicket: 'Nouveau Ticket',
    editTicket: 'Modifier le Ticket',
    ticketDetails: 'Détails du Ticket',
    project: 'Projet',
    priority: 'Priorité',
    status: 'Statut',
    assignedTo: 'Assigné à',
    createdBy: 'Créé par',
    createdAt: 'Créé le',
    resolvedAt: 'Résolu le',
    comments: 'Commentaires',
    addComment: 'Ajouter un commentaire',
    writeComment: 'Écrire un commentaire...',
    
    // Priorités
    low: 'Basse',
    medium: 'Moyenne',
    high: 'Haute',
    urgent: 'Urgente',
    
    // Statuts
    open: 'Ouvert',
    inProgress: 'En cours',
    resolved: 'Résolu',
    closed: 'Fermé',
  },

  // Fichiers
  files: {
    title: 'Fichiers',
    myFiles: 'Mes Fichiers',
    allFiles: 'Tous les Fichiers',
    uploadFile: 'Télécharger un fichier',
    fileName: 'Nom du fichier',
    fileType: 'Type',
    fileSize: 'Taille',
    uploadedBy: 'Téléchargé par',
    uploadedAt: 'Téléchargé le',
    download: 'Télécharger',
    dropzone: 'Glissez-déposez des fichiers ici, ou cliquez pour sélectionner',
  },

  // Actions communes
  actions: {
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    back: 'Retour',
    view: 'Voir',
    details: 'Détails',
    search: 'Rechercher',
    filter: 'Filtrer',
    export: 'Exporter',
    import: 'Importer',
    refresh: 'Actualiser',
    loading: 'Chargement...',
    saving: 'Enregistrement...',
    deleting: 'Suppression...',
    uploading: 'Téléchargement...',
    noData: 'Aucune donnée disponible',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  },

  // Messages
  messages: {
    success: {
      created: 'Créé avec succès',
      updated: 'Mis à jour avec succès',
      deleted: 'Supprimé avec succès',
      uploaded: 'Téléchargé avec succès',
      loggedIn: 'Connexion réussie',
      loggedOut: 'Déconnexion réussie',
      registered: 'Inscription réussie',
    },
    error: {
      generic: 'Une erreur s\'est produite',
      notFound: 'Élément non trouvé',
      unauthorized: 'Non autorisé',
      validation: 'Veuillez vérifier les champs',
      network: 'Erreur de connexion',
      login: 'Email ou mot de passe incorrect',
    },
  },

  // Validation
  validation: {
    required: 'Ce champ est obligatoire',
    email: 'Email invalide',
    minLength: 'Minimum {min} caractères',
    maxLength: 'Maximum {max} caractères',
    passwordMatch: 'Les mots de passe ne correspondent pas',
    phone: 'Numéro de téléphone invalide',
    date: 'Date invalide',
    number: 'Doit être un nombre',
    positive: 'Doit être positif',
  },

  // Profil
  profile: {
    title: 'Mon Profil',
    personalInfo: 'Informations personnelles',
    changePassword: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    updateProfile: 'Mettre à jour le profil',
  },

  // Divers
  misc: {
    of: 'de',
    to: 'à',
    from: 'de',
    and: 'et',
    or: 'ou',
    in: 'dans',
    at: 'à',
    on: 'le',
    by: 'par',
    with: 'avec',
    without: 'sans',
    yes: 'Oui',
    no: 'Non',
    all: 'Tous',
    none: 'Aucun',
    other: 'Autre',
  },
};

export default translations;
