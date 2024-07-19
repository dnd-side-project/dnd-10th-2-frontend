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
import { useEditAgenda } from '@shared/meeting/apis';
import { getCookie } from '@shared/common/utils';

import { formatDuration } from '@features/meeting-create/utils';
import { formatTimeToHourMinute } from '@features/meeting/utils';

export const EditSheet = ({
  type,
  meetingId,
  agendaId,
  title,
  allocatedDuration,
  refetchAgendaList
}: {
  type: 'AGENDA' | 'BREAK';
  meetingId: string;
  agendaId: number;
  title: string;
  allocatedDuration: string;
  refetchAgendaList: () => void;
}) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues: { agendaTitle: title }, mode: 'onChange' });
  const { closeBottomSheet } = useBottomSheet();
  const { timePicker, setTime, closeTimePicker } = useTimePicker();

  const { mutate } = useEditAgenda({
    token: getCookie('token'),
    meetingId,
    agendaId,
    title: getValues('agendaTitle'),
    allocatedDuration: formatDuration({
      hour: timePicker.time.hour,
      minute: timePicker.time.minute
    }),
    refetchAgendaList
  });

  const handleButton = async () => {
    try {
      mutate();
      closeBottomSheet();
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

      <TimePicker
        type="duration"
        initialTime={{
          hour: formatTimeToHourMinute(allocatedDuration).hour,
          minute: formatTimeToHourMinute(allocatedDuration).minute
        }}
        setTime={setTime}
        onClose={closeTimePicker}
      />

      <Space height={24} />

      <Button size={'lg'} backgroundColor={'main'} onClick={handleButton}>
        완료하기
      </Button>

      <Space height={44} />
    </Flex>
  );
};
