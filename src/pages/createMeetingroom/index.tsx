import {
  Thumbnail1,
  Thumbnail2,
  Thumbnail3,
  Thumbnail4,
  Thumbnail5,
  Thumbnail6,
  Thumbnail7,
  Thumbnail8
} from '@/assets/MeetingRoom/Thumbnail';
import { Flex, Space } from '@/components/Wrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { SvgIcon } from '@/components/common/SvgIcon';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyOfPalette } from '@/styles';

const CreateMeetingRoom = () => {
  console.log(KeyOfPalette);
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
    // setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      meetingRoomName: '',
      meetingRoomNotice: ''
    },
    mode: 'onChange'
  });
  console.log(getValues('meetingRoomName'));
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

      <Space height={30} />

      <StyledLabel>
        회의 이름을 알려주세요 <SvgIcon id="star_orange" size={18} />
      </StyledLabel>
      <Input
        {...register('meetingRoomName', {
          required: '회의 이름을 입력해주세요',
          maxLength: {
            message: '최대 15자까지 입력가능해요',
            value: 15
          }
        })}
        value={watch('meetingRoomName')}
        type="default"
        placeholder="회의 이름"
        maxLength={15}
        isError={errors.meetingRoomName ? true : false}
        errorText={errors.meetingRoomName?.message as string}
      />

      <Space height={4} />

      <StyledLabel>회의 공지가 있다면 적어주세요</StyledLabel>
      <Input
        {...register('meetingRoomNotice', {
          maxLength: {
            message: '최대 15자까지 입력가능해요',
            value: 30
          }
        })}
        multiline={true}
        value={watch('meetingRoomNotice')}
        type="default"
        placeholder="회의 이름"
        maxLength={30}
        isError={errors.meetingRoomNotice ? true : false}
        errorText={errors.meetingRoomNotice?.message as string}
        height={92}
      />

      <Space height={4} />

      <StyledLabel>
        썸네일을 골라주세요 <SvgIcon id="star_orange" size={18} />
      </StyledLabel>

      <StyledThumbnailList>
        <Thumbnail1 />
        <Thumbnail2 />
        <Thumbnail3 />
        <Thumbnail4 />
        <Thumbnail5 />
        <Thumbnail6 />
        <Thumbnail7 />
        <Thumbnail8 />
      </StyledThumbnailList>
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

const StyledLabel = styled.label`
  ${(props) => props.theme.typo.T5}
  color: ${(props) => props.theme.palette.dark_gray2};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
`;

const StyledThumbnailList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
`;

export default CreateMeetingRoom;
