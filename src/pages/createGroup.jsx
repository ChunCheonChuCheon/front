import React from 'react';
import DefaultLayout from '../layouts/default';
import GroupName from '../components/createGroup-modal/groupName';
import Location from '../components/createGroup-modal/location';
import Time from '../components/createGroup-modal/time';
import Range from '../components/createGroup-modal/range';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function CreateGroupPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue} = useForm();
  const baseURL = useSelector((state) => state.baseURL);

  //입력한 그룹정보 처리한느 곳
  const onSubmit =async (data) => {
    navigate('/group');
  //   try {
  //   console.log(data);
  //   const response = await axios.post(`${baseURL}/group`, {
  //     name: data.name,
  //     location: data.location,
  //     date: data.date,
  //     admin: 1,
  //     range: data.range,
  //   });

  //   if (response.status === 201) {
  //     const result = response.data;
  //     console.log(result);
  //     navigate('/grou/');
      
  //   } else {
  //     console.error('API 호출 실패');
  //   }
  // } catch (error) {
  //   console.error('API 호출 중 오류:', error);
  // }
    
  //   navigate('/group');
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleStep = (step) => {
      if(currentStep===1 && step===-1) navigate('/main?isModalOpen=false');
      else if(currentStep===4 && step===1){
       handleSubmit(onSubmit)();
       console.log('submit');

      }
      setCurrentStep(currentStep + step);
  };


  const renderCurrentStepModal = () => {
    switch (currentStep) {
      case 1:
        return <GroupName handleStep={handleStep} register={register} />;
      case 2:
        return <Location handleStep={handleStep} register={register} setValue={setValue}/>;
      case 3:
        return <Time handleStep={handleStep} register={register} setValue={setValue}/>;
      case 4:
        return <Range handleStep={handleStep} register={register} setValue={setValue}/>;
      default:
        return 
    }
  };

  return (
    <DefaultLayout>
      {renderCurrentStepModal()}
    </DefaultLayout>
  );
}