export interface FormData {
  id: string;
  requester: {
    name: string;
    employeeId: string;
    email: string;
    department: string;
    phone: string;
  };
  issue: {
    category: string;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    description: string;
    location: {
      floor: string;
      officeNumber: string;
    };
  };
  dates: {
    requestDate: string;
  };
}

export interface FormStepProps {
  onNext: () => void;
  onPrevious?: () => void;
}