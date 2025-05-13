import React from 'react';
import { useAppContext } from '../context/AppContext';
import { FormStepProps } from '../types/form';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const ReviewForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const { formData } = useAppContext();

  if (!formData) {
    return <div>Loading...</div>;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-4 text-primary-600">
        <CheckCircle className="h-6 w-6 mr-2" />
        <h3 className="text-xl font-semibold text-neutral-800">Review Your Request</h3>
      </div>
      
      <p className="text-neutral-600 mb-6">
        Please review your IT intervention request details before proceeding to generate the PDF.
      </p>
      
      <div className="mb-8 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-medium text-lg text-neutral-800">Request #{formData.id.slice(0, 8)}</h4>
            <p className="text-neutral-500 text-sm">Submitted on {formData.dates.requestDate}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(formData.issue.priority)}`}>
            {formData.issue.priority} Priority
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-sm text-neutral-500 mb-2">Requester Information</h5>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {formData.requester.name}</p>
              <p><span className="font-medium">Email:</span> {formData.requester.email}</p>
              <p><span className="font-medium">Department:</span> {formData.requester.department}</p>
              <p><span className="font-medium">Phone:</span> {formData.requester.phone}</p>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-sm text-neutral-500 mb-2">Issue Details</h5>
            <div className="space-y-2">
              <p><span className="font-medium">Category:</span> {formData.issue.category}</p>
              <p><span className="font-medium">Location:</span> Floor {formData.issue.location.floor}, Office {formData.issue.location.officeNumber}</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-neutral-400" />
                <span className="font-medium">Desired Resolution:</span> {formData.dates.desiredResolutionDate}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h5 className="font-medium text-sm text-neutral-500 mb-2">Description</h5>
          <p className="text-neutral-700 bg-white p-3 rounded border border-neutral-200">{formData.issue.description}</p>
        </div>
        
        {formData.additionalInfo && (
          <div className="mt-4">
            <h5 className="font-medium text-sm text-neutral-500 mb-2">Additional Information</h5>
            <p className="text-neutral-700 bg-white p-3 rounded border border-neutral-200">{formData.additionalInfo}</p>
          </div>
        )}
      </div>
      
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start mb-6">
        <AlertCircle className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h5 className="font-medium text-primary-700">Next Steps</h5>
          <p className="text-primary-600 text-sm">
            After confirming the information above, you'll proceed to generate a PDF document of your request
            which can be downloaded and sent via email.
          </p>
        </div>
      </div>
      
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          Edit Details
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;