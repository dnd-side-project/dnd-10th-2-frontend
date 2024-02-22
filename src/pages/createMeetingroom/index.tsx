import { Flex, Space } from '@/components/Wrapper';
import { Header } from '@/components/common/Header';
import styled from '@emotion/styled';
import { useState } from 'react';

const CreateMeetingroom = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
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
  return (
    <Flex direction="column" align="flex-start">
      <Header title="회의 만들기" iconLeftId="arrow_left" />

      <Space height={15.5} />

      <StyledStepList>
        {stepList.map((step) => (
          <StyledStep key={step.id}>
            <StyledStepNumber isCurrentStep={currentStep === step.id}>
              {step.id + 1}
            </StyledStepNumber>
            <StyledSteName isCurrentStep={currentStep === step.id}>
              {step.name}
            </StyledSteName>
          </StyledStep>
        ))}
      </StyledStepList>
    </Flex>
  );
};

const StyledStepList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StyledStep = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const StyledStepNumber = styled.div<{ isCurrentStep: boolean }>`
  ${(props) => props.theme.typo.T7};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
  background-color: ${(props) =>
    props.isCurrentStep
      ? props.theme.palette.main_blue
      : props.theme.palette.light_gray2};
  color: ${(props) =>
    props.isCurrentStep
      ? props.theme.palette.white
      : props.theme.palette.light_gray4};
  border-radius: 100%;
`;

const StyledSteName = styled.div<{ isCurrentStep: boolean }>`
  ${(props) => props.theme.typo.B2};
  color: ${(props) =>
    props.isCurrentStep
      ? props.theme.palette.main_blue
      : props.theme.palette.light_gray4};
`;

export default CreateMeetingroom;
