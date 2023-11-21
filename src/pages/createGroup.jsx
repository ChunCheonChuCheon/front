import React from 'react';
import DefaultLayout from '../layouts/default';
import GroupName from '../components/createGroup-modal/groupName';
import Location from '../components/createGroup-modal/location';
import Time from '../components/createGroup-modal/time';
import Range from '../components/createGroup-modal/range';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateGroupPage() {
  const navigate = useNavigate();
  const { register, handleSubmit} = useForm();

  const onSubmit = async (data) => {
   
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleStep = (step) => {
      if(currentStep===1 && step===-1) navigate('/main?isModalOpen=false');
      setCurrentStep(currentStep + step);
  };
  const renderCurrentStepModal = () => {
    switch (currentStep) {
      case 1:
        return <GroupName handleStep={handleStep} register={register}/>;
      case 2:
        return <Location handleStep={handleStep} register={register}/>;
      case 3:
        return <Time handleStep={handleStep} register={register}/>;
      case 4:
        return <Range handleStep={handleStep} register={register}/>;
      default:
        return null;
    }
  };

  return (
    <DefaultLayout>
      {renderCurrentStepModal()}
    </DefaultLayout>
  );
}