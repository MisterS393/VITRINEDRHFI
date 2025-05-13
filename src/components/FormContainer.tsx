import React from 'react';
import { useAppContext } from '../context/AppContext';
import RequesterInfoForm from './RequesterInfoForm';
import IssueDetailsForm from './IssueDetailsForm';
import ReviewForm from './ReviewForm';
import PdfGenerationForm from './PdfGenerationForm';
import Confirmation from './Confirmation';

const FormContainer: React.FC = () => {
  const { step, setStep, formData, resetForm } = useAppContext();

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RequesterInfoForm onNext={handleNext} />;
      case 2:
        return <IssueDetailsForm onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <ReviewForm onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <PdfGenerationForm onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <Confirmation onReset={resetForm} />;
      default:
        return <RequesterInfoForm onNext={handleNext} />;
    }
  };

  return (
    <div className="animate-slide-up">
      {renderStep()}
    </div>
  );
};

export default FormContainer;