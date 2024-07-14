import { useEffect } from 'react';
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
import { useAddAgenda } from '@shared/meeting/apis';
import { getCookie } from '@shared/common/utils';

import { formatDuration } from '@features/meeting-create/utils';

export const AgendaSheet = ({ refetch }: { refetch: () => void }) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      agenda: {
        title: '',
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
      setValue('agenda.duration', {
        hour,
        minute
      });
    }
  }, [timePicker.time, setValue]);

  const { mutate } = useAddAgenda({
    token: getCookie('token'),
    meetingId: '65',
    title: getValues('agenda').title,
    type: 'AGENDA',
    duration: formatDuration(getValues('agenda').duration),
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
        첫 번째 안건을 알려주세요
      </Text>

      <Space height={16} />

      <Input
        {...register('agenda.title', { required: '안건을 입력해주세요' })}
        placeholder="안건 입력"
        value={watch('agenda.title')}
        type="default"
        height={60}
        isError={errors.agenda ? true : false}
        errorText={errors.agenda?.message as string}
      />

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
