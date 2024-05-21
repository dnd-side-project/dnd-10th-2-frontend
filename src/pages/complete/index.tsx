import { Space } from '@/components/Wrapper';
import { Button, Header } from '@/components/common';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Complete = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <Header
        iconLeftId="arrow_left"
        iconRightId1="x"
        onClickIconLeft={() => navigate(-1)}
      />

      <Space height={22} />

      <StyledContent>
        <StyledStepList>
          {[1, 2].map((step) => (
            <StyledStep key={step} isCurrentStep={currentStep === step}>
              {step}
            </StyledStep>
          ))}
        </StyledStepList>

        <Space height={22} />

        <StyledTitle>
          25분 더 이야기 나누셨네요.
          <br />
          제시간에 끝내도록 분발해봅시다!
        </StyledTitle>

        <StyledButton>
          <Button
            size="sm"
            // fullWidth={false}
            backgroundColor="main_blue"
            //   disabled={errors.join || getValues('join').length < 2 ? true : false}
            onClick={() => setCurrentStep((prev) => prev + 1)}>
            다음으로
          </Button>
        </StyledButton>
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

const StyledTitle = styled.div`
  ${({ theme }) => theme.typo.T2}
  color: ${({ theme }) => theme.palette.dark_gray2};
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

const StyledButton = styled.div`
  width: 7.5rem;
`;

export default Complete;
