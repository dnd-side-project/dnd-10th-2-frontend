/** @jsxImportSource @emotion/react */
import { Flex, Space } from '@/components/Wrapper';
import { Button, Header, SvgIcon, Toast } from '@/components/common';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import Step1 from '@/components/createMeetingRoom/step1';
import { useOpen } from '@/hooks/useOpen';

const CreateMeetingRoom = () => {
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

  const {
    register,
    watch,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      meetingRoomName: '',
      meetingRoomNotice: ''
    },
    mode: 'onChange'
  });

  const [thumbnailNumber, setThumbnailNumber] = useState<number | null>(null);

  const {
    open: isToastOpened,
    onOpen: openToast,
    onClose: closeToast
  } = useOpen();

  const handleButton = () => {
    if (
      getValues('meetingRoomName') &&
      getValues('meetingRoomNotice') &&
      thumbnailNumber
    ) {
      setCurrentStep((prev) => prev + 1);
    } else {
      openToast();
      setTimeout(() => closeToast(), 3000);
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
              <StyledStepNumber isCurrentStep={currentStep === step.id}>
                {step.id + 1}
              </StyledStepNumber>
              <StyledStepName isCurrentStep={currentStep === step.id}>
                {step.name}
              </StyledStepName>
            </StyledStep>
          ))}
        </StyledStepList>

        <Space height={30} />

        <Step1
          register={register}
          watch={watch}
          errors={errors}
          thumbnailNumber={thumbnailNumber}
          setThumbnailNumber={setThumbnailNumber}
        />
      </div>

      <StyledButton>
        <Button
          size="lg"
          backgroundColor="main"
          disabled={false}
          onClick={handleButton}>
          다음으로
        </Button>

        <Toast isToastOpened={isToastOpened} bottom={6.6}>
          <SvgIcon id="warning" />
          <span>필수 항목을 모두 완료해주세요</span>
        </Toast>
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
  position: relative;
  width: 100%;
  transform: translateY(-4.4rem);
`;

export default CreateMeetingRoom;
