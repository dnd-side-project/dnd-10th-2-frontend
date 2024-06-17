/** @jsxImportSource @emotion/react */
import { Flex, Space } from '@/components/Wrapper';
import { Button, Header, SvgIcon } from '@/components/common';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Step1, Step2, Step3 } from '@/components/createMeetingRoom';
import { useToast } from '@/store/toast';
import { useStep } from '@/hooks/useStep';
import { formatMeetingDuration } from '@/utils/formatMeetingDuration';
import { formatMeetingDateTime } from '@/utils/formatMeetingDateTime';
import { useCreateMeetingRoom } from '@/apis/meetingRoom/useCreateMeetingRoom';
import { useCallback } from 'react';

export interface FormType {
  step1: {
    meetingRoomName: string;
    meetingRoomNotice: string;
    meetingThumbnail: string;
  };
  step2: {
    meetingRoomDate: {
      date: { year: number; month: number; date: number };
      dateString: string;
    };
    meetingRoomTime: {
      time: { periodOfDay: string; hour: string; minute: string };
      timeString: string;
    };
    meetingRoomDuration: {
      duration: { hour: string; minute: string };
      durationString: string;
    };
  };
  step3: {
    meetingRoomPlace: string;
  };
}

const CreateMeetingRoom = () => {
  const { stepList, currentStep, prevStep, nextStep } = useStep();

  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      step1: {
        meetingRoomName: '',
        meetingRoomNotice: '',
        meetingThumbnail: ''
      },
      step2: {
        meetingRoomDate: {
          date: { year: 0, month: 0, date: 0 },
          dateString: ''
        },
        meetingRoomTime: {
          time: { periodOfDay: '', hour: '', minute: '' },
          timeString: ''
        },
        meetingRoomDuration: {
          duration: { hour: '', minute: '' },
          durationString: ''
        }
      },
      step3: { meetingRoomPlace: '' }
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

  const { mutate } = useCreateMeetingRoom({
    title: getValues('step1').meetingRoomName,
    description: getValues('step1').meetingRoomNotice,
    imageNum: Number(getValues('step1').meetingThumbnail),
    startTime: formatMeetingDateTime(
      getValues('step2').meetingRoomDate.date,
      getValues('step2').meetingRoomTime.time
    ),
    estimatedTotalDuration: formatMeetingDuration(
      getValues('step2').meetingRoomDuration.duration
    ),
    location: getValues('step3').meetingRoomPlace
  });

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      prevStep();
    }
  }, [currentStep, prevStep]);

  const handleButton = () => {
    switch (currentStep) {
      // 회의실 만들기 Step1
      case 1:
        if (
          getValues('step1.meetingRoomName') &&
          getValues('step1.meetingThumbnail')
        ) {
          nextStep();
        } else {
          showToast(toastProps);
        }
        break;
      // 회의실 만들기 Step2
      case 2:
        if (
          getValues('step2.meetingRoomDate.dateString') &&
          getValues('step2.meetingRoomTime.timeString') &&
          getValues('step2.meetingRoomDuration.durationString')
        ) {
          nextStep();
        } else {
          showToast(toastProps);
        }
        break;
      // 회의실 만들기 Step3
      case 3:
        mutate();
        break;
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
        <Header
          title="회의 만들기"
          iconLeftId="arrow_left"
          onClickIconLeft={handlePrev}
        />
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
        {currentStep === 3 && (
          <Step3 register={register} watch={watch} errors={errors} />
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
