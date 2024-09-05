import { useForm } from 'react-hook-form';

import {
  Flex,
  Space,
  Text,
  Button,
  Input,
  TimePicker
} from '@shared/common/ui';
import { useBottomSheet, useTimePicker } from '@shared/common/hooks';
import { useControlAgenda } from '@shared/meeting/apis';

import { formatDuration } from '@features/meeting-create/utils';
import styled from '@emotion/styled';
import { useState } from 'react';

export const EditSheet = ({
  type,
  meetingId,
  agendaId,
  title,
  isFirstPendingAgenda
}: {
  type: 'AGENDA' | 'BREAK';
  meetingId: string;
  agendaId: number;
  title: string;
  isFirstPendingAgenda: boolean;
}) => {
  const [editState, setEditState] = useState<'extend' | 'reduce' | null>(null);

  const {
    register,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: { agendaTitle: title }, mode: 'onChange' });

  const { closeBottomSheet } = useBottomSheet();

  const {
    timePicker: {
      time: { hour, minute }
    },
    setTime,
    closeTimePicker
  } = useTimePicker();

  const { sendMessage } = useControlAgenda(
    meetingId,
    agendaId,
    isFirstPendingAgenda
  );

  const handleComplete = async () => {
    if (!editState) return;

    try {
      const modifiedDuration = formatDuration({
        hour: hour || '0',
        minute: minute || '00'
      });

      sendMessage(editState, modifiedDuration);
      closeBottomSheet();
      sendMessage('resume');
    } catch (error) {
      console.log(`Error: ${error}`);
      throw error;
    }
  };

  return (
    <Flex direction="column" align="flex-start">
      {type === 'AGENDA' && (
        <>
          <Text typo="T5" color="dark_gray2">
            안건을 알려주세요
          </Text>

          <Space height={16} />

          <Input
            {...register('agendaTitle', { required: '안건을 입력해주세요' })}
            placeholder="안건 입력"
            value={watch('agendaTitle')}
            type="default"
            height={60}
            isError={errors.agendaTitle ? true : false}
            errorText={errors.agendaTitle?.message as string}
          />
        </>
      )}

      <Text typo="T5" color="dark_gray2">
        시간을 수정해주세요
      </Text>

      <Space height={16} />

      <StyledButtonContainer>
        <StyledButton>
          <Button
            size="sm"
            backgroundColor={editState === 'extend' ? 'skyblue' : 'light_white'}
            textColor={editState === 'extend' ? 'main_blue' : 'light_gray4'}
            onClick={() => {
              setEditState('extend');
            }}>
            시간 추가
          </Button>
        </StyledButton>

        <StyledButton>
          <Button
            size="sm"
            backgroundColor={editState === 'reduce' ? 'skyblue' : 'light_white'}
            textColor={editState === 'reduce' ? 'main_blue' : 'light_gray4'}
            onClick={() => {
              setEditState('reduce');
            }}>
            시간 빼기
          </Button>
        </StyledButton>
      </StyledButtonContainer>

      <Space height={16} />

      <TimePicker type="duration" setTime={setTime} onClose={closeTimePicker} />

      <Space height={24} />

      <Button
        size={'lg'}
        backgroundColor={'main'}
        disabled={!editState}
        onClick={handleComplete}>
        완료하기
      </Button>

      <Space height={44} />
    </Flex>
  );
};

const StyledButtonContainer = styled.div`
  display: flex;
  height: 4rem;
  gap: 0.8rem;
`;

const StyledButton = styled.div`
  width: 7.2rem;
  height: 100%;
`;
