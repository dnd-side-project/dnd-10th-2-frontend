import { useState } from 'react';

const stepList = [
  {
    id: 0,
    name: '회의 이름'
  },
  {
    id: 1,
    name: '회의 날짜 및 시간'
  },
  {
    id: 2,
    name: '회의 장소'
  }
];

export const useStep = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return { stepList, currentStep, prevStep, nextStep };
};
