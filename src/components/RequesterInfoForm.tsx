import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { FormStepProps } from '../types/form';
import { v4 as uuidv4 } from 'uuid';
import { User, Building2, Phone, Mail, Hash } from 'lucide-react';

const RequesterInfoForm: React.FC<FormStepProps> = ({ onNext }) => {
  const { formData, setFormData } = useAppContext();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formValues, setFormValues] = useState({
    name: formData?.requester.name || '',
    employeeId: formData?.requester.employeeId || '',
    email: formData?.requester.email || '',
    department: formData?.requester.department || '',
    phone: formData?.requester.phone || '',
  });

  useEffect(() => {
    // Generate ID if it doesn't exist
    if (!formData?.id) {
      setFormData({
        ...formData!,
        id: uuidv4(),
      });
    }
  }, [formData, setFormData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formValues.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }
    
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formValues.department.trim()) {
      newErrors.department = 'Department is required';
    }

    if (!formValues.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setFormData({
        ...formData!,
        requester: {
          name: formValues.name,
          employeeId: formValues.employeeId,
          email: formValues.email,
          department: formValues.department,
          phone: formValues.phone,
        },
      });
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-neutral-800">Requester Information</h3>
      <p className="text-neutral-600 mb-6">Please provide your contact details so we can get back to you about your IT request.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.name ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                placeholder="ADIB MOHAMED SABER"
              />
            </div>
            {errors.name && <p className="mt-1 text-error-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-700 mb-1">
              Employee ID *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formValues.employeeId}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.employeeId ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                placeholder="123456"
              />
            </div>
            {errors.employeeId && <p className="mt-1 text-error-500 text-sm">{errors.employeeId}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.email ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                placeholder="test@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-error-500 text-sm">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-neutral-700 mb-1">
              Department *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-neutral-400" />
              </div>
              <select
                id="department"
                name="department"
                value={formValues.department}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.department ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors bg-white`}
              >
                <option value="">Select a department</option>
                <option value="Direction Technique">Direction Technique</option>
                <option value="Direction Administration">Direction Administration</option>
                <option value="Direction Exploitation">Direction Exploitation</option>
              </select>
            </div>
            {errors.department && <p className="mt-1 text-error-500 text-sm">{errors.department}</p>}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border ${
                  errors.phone ? 'border-error-500' : 'border-neutral-300'
                } rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-500 outline-none transition-colors`}
                placeholder="+(213) "
              />
            </div>
            {errors.phone && <p className="mt-1 text-error-500 text-sm">{errors.phone}</p>}
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequesterInfoForm;