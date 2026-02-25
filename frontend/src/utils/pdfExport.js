import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Export Projects to PDF
export const exportProjectsToPDF = (projects) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229);
  doc.text('Liste des Projets', 14, 22);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
  
  // Table
  const tableData = projects.map(project => [
    project.title,
    project.client?.user?.name || project.client?.company_name || 'N/A',
    getStatusLabel(project.status),
    project.start_date ? new Date(project.start_date).toLocaleDateString('fr-FR') : 'N/A',
    project.end_date ? new Date(project.end_date).toLocaleDateString('fr-FR') : 'N/A',
  ]);
  
  autoTable(doc, {
    startY: 40,
    head: [['Titre', 'Client', 'Statut', 'Début', 'Fin']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 9 },
  });
  
  doc.save('projets.pdf');
};

// Export Employees to PDF
export const exportEmployeesToPDF = (employees) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229);
  doc.text('Liste des Employés', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
  
  const tableData = employees.map(emp => [
    emp.user?.name || 'N/A',
    emp.user?.email || 'N/A',
    emp.position || 'N/A',
    emp.department || 'N/A',
    emp.phone || 'N/A',
  ]);
  
  autoTable(doc, {
    startY: 40,
    head: [['Nom', 'Email', 'Poste', 'Département', 'Téléphone']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 9 },
  });
  
  doc.save('employes.pdf');
};

// Export Clients to PDF
export const exportClientsToPDF = (clients) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229);
  doc.text('Liste des Clients', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
  
  const tableData = clients.map(client => [
    client.user?.name || 'N/A',
    client.company_name || 'N/A',
    client.user?.email || 'N/A',
    client.phone || 'N/A',
  ]);
  
  autoTable(doc, {
    startY: 40,
    head: [['Contact', 'Entreprise', 'Email', 'Téléphone']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 9 },
  });
  
  doc.save('clients.pdf');
};

// Export Tickets to PDF
export const exportTicketsToPDF = (tickets) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229);
  doc.text('Liste des Tickets', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 14, 30);
  
  const tableData = tickets.map(ticket => [
    ticket.title,
    ticket.project?.title || 'N/A',
    getPriorityLabel(ticket.priority),
    getStatusLabel(ticket.status),
    new Date(ticket.created_at).toLocaleDateString('fr-FR'),
  ]);
  
  autoTable(doc, {
    startY: 40,
    head: [['Titre', 'Projet', 'Priorité', 'Statut', 'Date création']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 9 },
  });
  
  doc.save('tickets.pdf');
};

// Helper functions
const getStatusLabel = (status) => {
  const labels = {
    planifie: 'Planifié',
    en_cours: 'En cours',
    en_pause: 'En pause',
    termine: 'Terminé',
    annule: 'Annulé',
    ouvert: 'Ouvert',
    resolu: 'Résolu',
    ferme: 'Fermé',
  };
  return labels[status] || status;
};

const getPriorityLabel = (priority) => {
  const labels = {
    basse: 'Basse',
    moyenne: 'Moyenne',
    haute: 'Haute',
    urgente: 'Urgente',
  };
  return labels[priority] || priority;
};
