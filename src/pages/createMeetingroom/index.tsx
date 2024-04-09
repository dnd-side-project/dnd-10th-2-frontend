/** @jsxImportSource @emotion/react */
import { Flex, Space } from '@/components/Wrapper';
import { Button, Header, SvgIcon } from '@/components/common';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Step1, Step2 } from '@/components/createMeetingRoom';
import { useToast } from '@/store/toast';

export interface FormType {
  meetingRoomName: string;
  meetingThumbnail: string;
  meetingRoomNotice: string;
  meetingRoomDate: string;
  meetingRoomTime: string;
  meetingRoomDuration: string;
  meetingRoomPlace: string;
}

const CreateMeetingRoom = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      meetingRoomName: '',
      meetingThumbnail: '',
      meetingRoomNotice: '',
      meetingRoomDate: '',
      meetingRoomTime: '',
      meetingRoomDuration: '',
      meetingRoomPlace: ''
    },
    mode: 'onChange'
  });

  const { showToast } = useToast();
  const toastProps = {
    content: (
      <>
        <SvgIcon id="warning" />
        <span>필수 항목을 모두 완료해주세요</span>
      </>
    ),
    bottom: 11
  };
  console.log(getValues('meetingThumbnail'));

  const handleButton = () => {
    // 회의실 만들기 Step1
    if (currentStep === 1) {
      if (getValues('meetingRoomName') && getValues('meetingThumbnail')) {
        setCurrentStep((prev) => prev + 1);
      } else {
        showToast(toastProps);
      }
    }
    // 회의실 만들기 Step2
    else if (currentStep === 2) {
      if (
        getValues('meetingRoomDate') &&
        getValues('meetingRoomTime') &&
        getValues('meetingRoomDuration')
      ) {
        setCurrentStep((prev) => prev + 1);
      } else {
        showToast(toastProps);
      }
    }
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      css={css`
        min-height: 100vh;
      `}>
      <div
        css={css`
          width: 100%;
          margin-bottom: 11.4rem;
        `}>
        <Header title="회의 만들기" iconLeftId="arrow_left" />
        <Space height={15.5} />
        <StyledStepList>
          {stepList.map((step) => (
            <StyledStep key={step.id}>
              <StyledStepNumber isCurrentStep={currentStep === step.id + 1}>
                {step.id + 1}
              </StyledStepNumber>
              <StyledStepName isCurrentStep={currentStep === step.id + 1}>
                {step.name}
              </StyledStepName>
            </StyledStep>
          ))}
        </StyledStepList>
        <Space height={30} />
        {currentStep === 1 && (
          <Step1
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
          />
        )}
        {currentStep === 2 && (
          <Step2
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
          />
        )}
      </div>

      <StyledButton>
        <Button size="lg" backgroundColor="main" onClick={handleButton}>
          {currentStep === 3 ? '완료하기' : '다음으로'}
        </Button>
      </StyledButton>
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

const StyledStepName = styled.div<{ isCurrentStep: boolean }>`
  ${({ theme }) => theme.typo.B2};
  color: ${({ isCurrentStep, theme }) =>
    isCurrentStep ? theme.palette.main_blue : theme.palette.light_gray4};
`;

const StyledButton = styled.div`
  width: 100%;
  transform: translateY(-4.4rem);
`;

export default CreateMeetingRoom;
