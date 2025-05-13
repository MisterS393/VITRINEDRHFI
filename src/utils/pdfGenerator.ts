import { jsPDF } from 'jspdf';
import { FormData } from '../types/form';

export const generatePDF = async (formData: FormData): Promise<{ url: string; filename: string }> => {
  return new Promise((resolve) => {
    const doc = new jsPDF();
    const filename = `IT_Request_${formData.id.slice(0, 8)}.pdf`;
    
    // Propriétés du document
    doc.setProperties({
      title: `Demande d'intervention IT - ${formData.id.slice(0, 8)}`,
      subject: 'Demande de support IT',
      author: formData.requester.name,
      keywords: 'IT, Support, Demande',
      creator: 'Portail Support IT'
    });
    
    // Titre du document
    doc.setFontSize(18);
    doc.setTextColor(31, 41, 55);
    doc.text('DEMANDE D\'INTERVENTION IT', 105, 30, { align: 'center' });
    
    // Numéro de demande
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text(`Référence: #${formData.id.slice(0, 8)}`, 20, 45);
    doc.text(`Date de la demande: ${formData.dates.requestDate}`, 20, 52);
    
    // Badge de priorité
    const getPriorityColor = (priority: string): [number, number, number] => {
      switch (priority) {
        case 'Low': return [59, 130, 246];
        case 'Medium': return [245, 158, 11];
        case 'High': return [249, 115, 22];
        case 'Critical': return [239, 68, 68];
        default: return [107, 114, 128];
      }
    };
    
    const priorityText = {
      'Low': 'BASSE',
      'Medium': 'MOYENNE',
      'High': 'HAUTE',
      'Critical': 'CRITIQUE'
    };
    
    const priorityColor = getPriorityColor(formData.issue.priority);
    doc.setFillColor(...priorityColor);
    doc.roundedRect(150, 43, 40, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(priorityText[formData.issue.priority as keyof typeof priorityText], 170, 50, { align: 'center' });
    
    // Informations du demandeur
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text('Informations du demandeur', 20, 70);
    
    // Cadre pour les informations
    doc.setDrawColor(229, 231, 235);
    doc.rect(20, 75, 170, 40);
    
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);
    const requesterY = 85;
    doc.text(`Nom: ${formData.requester.name}`, 25, requesterY);
    doc.text(`ID Employé: ${formData.requester.employeeId}`, 25, requesterY + 8);
    doc.text(`Email: ${formData.requester.email}`, 25, requesterY + 16);
    doc.text(`Département: ${formData.requester.department}`, 25, requesterY + 24);
    doc.text(`Téléphone: ${formData.requester.phone}`, 120, requesterY + 24);
    
    // Détails du problème
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text('Détails de l\'incident', 20, 135);
    
    // Cadre pour les détails
    doc.setDrawColor(229, 231, 235);
    doc.rect(20, 140, 170, 25);
    
    // Contenu des détails
    doc.setTextColor(55, 65, 81);
    const issueY = 150;
    doc.text(`Catégorie: ${formData.issue.category}`, 25, issueY);
    doc.text(`Localisation: Étage ${formData.issue.location.floor}, Bureau ${formData.issue.location.officeNumber}`, 25, issueY + 8);
    
    // Description
    doc.setFontSize(16);
    doc.setTextColor(31, 41, 55);
    doc.text('Description du problème', 20, 195);
    
    // Cadre pour la description
    doc.setDrawColor(229, 231, 235);
    doc.rect(20, 200, 170, 50);
    
    doc.setFontSize(11);
    doc.setTextColor(55, 65, 81);
    const splitDescription = doc.splitTextToSize(formData.issue.description, 160);
    doc.text(splitDescription, 25, 210);
    
    // Conversion en URL de données
    const dataUrl = doc.output('dataurlstring');
    
    setTimeout(() => {
      resolve({ url: dataUrl, filename });
    }, 500);
  });
};