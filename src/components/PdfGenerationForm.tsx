import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FormStepProps } from '../types/form';
import { generatePDF } from '../utils/pdfGenerator';
import { FileText, Mail, Download, Send } from 'lucide-react';

const PdfGenerationForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const { formData, setIsPdfGenerated } = useAppContext();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: `IT Intervention Request #${formData?.id.slice(0, 8)}`,
    message: `Dear IT Support Team,\n\nPlease find attached the IT intervention request form for your review and action.\n\nBest regards,\n${formData?.requester.name}`,
  });
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleGeneratePDF = async () => {
    if (!formData) return;
    
    setIsGenerating(true);
    try {
      const { url, filename } = await generatePDF(formData);
      setPdfUrl(url);
      setIsPdfGenerated(true);
      
      // Trigger automatic download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pdfUrl) {
      setEmailError('Please generate the PDF first');
      return;
    }
    
    if (!emailData.to) {
      setEmailError('Please enter recipient email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(emailData.to)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Open default email client
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.message)}`;
    window.location.href = mailtoLink;
    
    setEmailSent(true);
    setEmailError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
    
    if (emailError && name === 'to') {
      setEmailError('');
    }
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800 flex items-center">
        <FileText className="h-6 w-6 mr-2 text-primary-600" />
        PDF Generation & Email
      </h3>
      
      <div className="mb-6">
        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h4 className="font-medium text-neutral-800">Generate your request document</h4>
            <p className="text-neutral-600 text-sm">Create a PDF document of your IT intervention request.</p>
          </div>
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className={`px-4 py-2 ${
              pdfUrl ? 'bg-success-500 hover:bg-success-600' : 'bg-primary-600 hover:bg-primary-700'
            } text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center`}
          >
            {isGenerating ? (
              <>Generating...</>
            ) : pdfUrl ? (
              <>
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                PDF Generated
              </>
            ) : (
              <>
                <FileText className="h-5 w-5 mr-2" />
                Generate PDF
              </>
            )}
          </button>
        </div>
        
        {pdfUrl && (
          <div className="flex flex-col items-center justify-center bg-neutral-50 p-6 rounded-lg border border-neutral-200 mb-6 animate-fade-in">
            <div className="text-success-600 font-medium mb-3 flex items-center">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              PDF Successfully Generated!
            </div>
            
            <div className="my-4 w-full flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={pdfUrl}
                download={`IT_Request_${formData?.id.slice(0, 8)}.pdf`}
                className="px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </a>
              
              <button
                onClick={() => window.open(pdfUrl, '_blank')}
                className="px-4 py-2 border border-primary-600 text-primary-600 rounded-md shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
              >
                <FileText className="h-5 w-5 mr-2" />
                View PDF
              </button>
            </div>
          </div>
        )}
        
        <div className={`border border-neutral-200 rounded-lg ${pdfUrl ? 'opacity-100' : 'opacity-50'}`}>
          <div className="p-4 border-b border-neutral-200">
            <h4 className="font-medium text-neutral-800 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary-600" />
              Email Your Request
            </h4>
            <p className="text-neutral-600 text-sm">Send the PDF document via email to IT support.</p>
          </div>
          
          <form onSubmit={handleSendEmail} className="p-4">
            <div className="mb-4">
              <label htmlFor="to" className="block text-sm font-medium text-neutral-700 mb-1">
                Recipient Email Address *
              </label>
              <input
                type="email"
                id="to"
                name="to"
                value={emailData.to}
                onChange={handleEmailChange}
                placeholder="it.support@company.com"
                className={`block w-full px-3 py-2 border ${
                  emailError ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                disabled={!pdfUrl || emailSent}
              />
              {emailError && <p className="mt-1 text-error-500 text-sm">{emailError}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={emailData.subject}
                onChange={handleEmailChange}
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors"
                disabled={!pdfUrl || emailSent}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={emailData.message}
                onChange={handleEmailChange}
                rows={4}
                className="block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors"
                disabled={!pdfUrl || emailSent}
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!pdfUrl || emailSent}
                className={`px-4 py-2 ${
                  emailSent ? 'bg-success-500' : 'bg-primary-600 hover:bg-primary-700'
                } text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center`}
              >
                {emailSent ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Email Client Opened
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Email
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          Back to Review
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!pdfUrl}
          className={`px-6 py-2 ${
            pdfUrl ? 'bg-primary-600 hover:bg-primary-700' : 'bg-neutral-400'
          } text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors`}
        >
          Complete Request
        </button>
      </div>
    </div>
  );
};

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default PdfGenerationForm;