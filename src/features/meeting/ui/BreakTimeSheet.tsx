import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Flex, Space, Text, Button, TimePicker } from '@shared/common/ui';
import { useBottomSheet, useTimePicker } from '@shared/common/hooks';
import { useAddAgenda } from '@shared/meeting/apis';
import { getCookie } from '@shared/common/utils';

import { formatDuration } from '@features/meeting-create/utils';

export const BreakTimeSheet = ({ refetch }: { refetch: () => void }) => {
  const { setValue, getValues } = useForm({
    defaultValues: {
      breakTime: {
        duration: { hour: '', minute: '' }
      }
    },
    mode: 'onChange'
  });
  const { closeBottomSheet } = useBottomSheet();
  const { timePicker, setTime, closeTimePicker } = useTimePicker();

  useEffect(() => {
    const { hour, minute } = timePicker.time;
    if (hour && minute) {
      setValue('breakTime.duration', {
        hour,
        minute
      });
    }
  }, [timePicker.time, setValue]);

  const { mutate } = useAddAgenda({
    token: getCookie('token'),
    meetingId: '65',
    title: '쉬는 시간',
    type: 'BREAK',
    duration: formatDuration(getValues('breakTime').duration),
    onSuccess: () => {
      refetch();
      closeBottomSheet();
    }
  });

  const handleButton = async () => {
    try {
      mutate();
    } catch (error) {
      console.log(`Error: ${error}`);
      throw error;
    }
  };

  return (
    <Flex direction="column" align="flex-start">
      <Text typo="T5" color="dark_gray2">
        타이머를 맞춰주세요
      </Text>

      <Space height={16} />

      <TimePicker type="duration" setTime={setTime} onClose={closeTimePicker} />

      <Space height={24} />

      <Button size={'lg'} backgroundColor={'main'} onClick={handleButton}>
        완료하기
      </Button>
    </Flex>
  );
};
