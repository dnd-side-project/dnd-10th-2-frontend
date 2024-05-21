import { Space } from '@/components/Wrapper';
import { Header } from '@/components/common';
import { Step1 } from '@/components/complete';
import { Step2 } from '@/components/complete/step2';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Complete = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <Header
        iconLeftId="arrow_left"
        iconRightId1="x"
        onClickIconLeft={() => navigate(-1)}
      />

      <Space height={38} />

      <StyledContent>
        <StyledStepList>
          {[1, 2].map((step) => (
            <StyledStep key={step} isCurrentStep={currentStep === step}>
              {step}
            </StyledStep>
          ))}
        </StyledStepList>

        <Space height={22} />

        {currentStep === 1 && <Step1 setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && <Step2 setCurrentStep={setCurrentStep} />}
      </StyledContent>

      <Space height={30} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 37.5rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.light_white};
  margin: 0px -20px;
  padding: 0px 20px;
`;

const StyledContent = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  padding: 4rem 2.2rem 3rem 2.2rem;
  border-radius: 2rem;
`;

const StyledStepList = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const StyledStep = styled.div<{ isCurrentStep: boolean }>`
  ${({ theme }) => theme.typo.T7};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  background-color: ${({ isCurrentStep, theme }) =>
    isCurrentStep ? theme.palette.main_blue : theme.palette.light_gray2};
  color: ${({ isCurrentStep, theme }) =>
    isCurrentStep ? theme.palette.white : theme.palette.light_gray4};
  border-radius: 100%;
`;

export default Complete;
