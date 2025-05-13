import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FormStepProps } from '../types/form';
import { Tag, AlertTriangle, Building2 } from 'lucide-react';

const IssueDetailsForm: React.FC<FormStepProps> = ({ onNext, onPrevious }) => {
  const { formData, setFormData } = useAppContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    category: formData?.issue.category || '',
    priority: formData?.issue.priority || 'Medium',
    description: formData?.issue.description || '',
    floor: formData?.issue.location.floor || '',
    officeNumber: formData?.issue.location.officeNumber || '',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!formValues.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formValues.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formValues.floor.trim()) {
      newErrors.floor = 'Floor number is required';
    }
    
    if (!formValues.officeNumber.trim()) {
      newErrors.officeNumber = 'Office number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormData({
        ...formData!,
        issue: {
          category: formValues.category,
          priority: formValues.priority as 'Low' | 'Medium' | 'High' | 'Critical',
          description: formValues.description,
          location: {
            floor: formValues.floor,
            officeNumber: formValues.officeNumber,
          },
        },
      });
      onNext();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800">Issue Details</h3>
      <p className="text-neutral-600 mb-6">Please provide details about the IT issue you're experiencing.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
              Issue Category *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-neutral-400" />
              </div>
              <select
                id="category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.category ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors bg-white`}
              >
                <option value="">Select an issue category</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Email">Email</option>
                <option value="Printer">Printer</option>
                <option value="Account">Account/Access</option>
                <option value="Training">Training Request</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.category && <p className="mt-1 text-error-500 text-sm">{errors.category}</p>}
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-neutral-700 mb-1">
              Priority Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AlertTriangle className="h-5 w-5 text-neutral-400" />
              </div>
              <select
                id="priority"
                name="priority"
                value={formValues.priority}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Issue Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              rows={4}
              className={`block w-full px-3 py-2 border ${
                errors.description ? 'border-error-500' : 'border-neutral-300'
              } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
              placeholder="Please describe the issue in detail..."
            ></textarea>
            {errors.description && <p className="mt-1 text-error-500 text-sm">{errors.description}</p>}
          </div>
          
          <div>
            <label htmlFor="floor" className="block text-sm font-medium text-neutral-700 mb-1">
              Floor Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                id="floor"
                name="floor"
                value={formValues.floor}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.floor ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                placeholder="e.g., 2nd Floor"
              />
            </div>
            {errors.floor && <p className="mt-1 text-error-500 text-sm">{errors.floor}</p>}
          </div>
          
          <div>
            <label htmlFor="officeNumber" className="block text-sm font-medium text-neutral-700 mb-1">
              Office Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                id="officeNumber"
                name="officeNumber"
                value={formValues.officeNumber}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.officeNumber ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                placeholder="e.g., B-123"
              />
            </div>
            {errors.officeNumber && <p className="mt-1 text-error-500 text-sm">{errors.officeNumber}</p>}
          </div>
        </div>
        
        <div className="pt-4 flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Review Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueDetailsForm;