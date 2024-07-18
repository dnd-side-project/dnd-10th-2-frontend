import { useParams } from 'react-router-dom';
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
  const meetingId = useParams().meetingId || '';
  const {
    register,
    watch,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues: { agendaTitle: '' }, mode: 'onChange' });
  const { closeBottomSheet } = useBottomSheet();
  const { timePicker, setTime, closeTimePicker } = useTimePicker();

  const { mutate } = useAddAgenda({
    token: getCookie('token'),
    meetingId,
    title: getValues('agendaTitle'),
    type: 'AGENDA',
    duration: formatDuration({
      hour: timePicker.time.hour,
      minute: timePicker.time.minute
    }),
    onSuccess: () => {
      refetch();
      closeBottomSheet();
    }
  });

  const handleButton = async () => {
    try {
      // console.log(formatDuration(getValues('agenda').duration));
      mutate();
    } catch (error) {
      console.log(`Error: ${error}`);
      throw error;
    }
  };

  return (
    <Flex direction="column" align="flex-start">
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

      <Text typo="T5" color="dark_gray2">
        타이머를 맞춰주세요
      </Text>

      <Space height={16} />

      <TimePicker type="duration" setTime={setTime} onClose={closeTimePicker} />

      <Space height={24} />

      <Button size={'lg'} backgroundColor={'main'} onClick={handleButton}>
        완료하기
      </Button>

      <Space height={44} />
    </Flex>
  );
};
