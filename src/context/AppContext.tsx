import React, { createContext, useContext, useState } from 'react';
import { FormData } from '../types/form';

type AppContextType = {
  formData: FormData | null;
  setFormData: (data: FormData) => void;
  step: number;
  setStep: (step: number) => void;
  isPdfGenerated: boolean;
  setIsPdfGenerated: (isPdfGenerated: boolean) => void;
  resetForm: () => void;
};

const initialFormData: FormData = {
  id: '',
  requester: {
    name: '',
    email: '',
    department: '',
    phone: '',
  },
  issue: {
    category: '',
    priority: 'Medium',
    description: '',
    location: '',
  },
  dates: {
    requestDate: new Date().toISOString().split('T')[0],
    desiredResolutionDate: '',
  },
  additionalInfo: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormDataState] = useState<FormData>(initialFormData);
  const [step, setStep] = useState(1);
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);

  const setFormData = (data: FormData) => {
    setFormDataState(data);
  };

  const resetForm = () => {
    setFormDataState(initialFormData);
    setStep(1);
    setIsPdfGenerated(false);
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        step,
        setStep,
        isPdfGenerated,
        setIsPdfGenerated,
        resetForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};