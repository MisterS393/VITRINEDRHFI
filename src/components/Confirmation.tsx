import React from 'react';
import { CheckCircle, FileText, RefreshCw } from 'lucide-react';

interface ConfirmationProps {
  onReset: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onReset }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto text-center">
      <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
        <div className="bg-primary-100 p-4 rounded-full mb-6">
          <CheckCircle className="h-16 w-16 text-primary-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-neutral-800 mb-3">Request Submitted Successfully!</h3>
        
        <p className="text-neutral-600 max-w-md mx-auto mb-6">
          Your IT intervention request has been successfully submitted. The IT support team will review your request shortly.
        </p>
        
        <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <h4 className="font-medium text-success-700 mb-2 flex items-center justify-center">
            <FileText className="h-5 w-5 mr-2" />
            What happens next?
          </h4>
          <ul className="text-left text-success-600 text-sm space-y-2">
            <li className="flex items-start">
              <span className="inline-block h-5 w-5 text-success-500 mr-2">✓</span>
              <span>IT support will review your request and assess its priority</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block h-5 w-5 text-success-500 mr-2">✓</span>
              <span>You'll receive a confirmation email with your request details</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block h-5 w-5 text-success-500 mr-2">✓</span>
              <span>A support technician will contact you for further information if needed</span>
            </li>
          </ul>
        </div>
        
        <button
          onClick={onReset}
          className="px-6 py-3 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors flex items-center mx-auto"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Submit Another Request
        </button>
      </div>
    </div>
  );
};

export default Confirmation;