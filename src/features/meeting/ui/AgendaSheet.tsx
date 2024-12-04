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

import { formatDuration } from '@features/meeting-create/utils';
import { AddAgendaMessage } from '@/shared/meeting/apis';

export const AgendaSheet = ({
  type,
  sendAddAgendaMessage
}: {
  type: 'AGENDA' | 'BREAK';
  sendAddAgendaMessage: (message: AddAgendaMessage) => void;
}) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues: { agendaTitle: '' }, mode: 'onChange' });

  const { closeBottomSheet } = useBottomSheet();

  const { timePicker, setTime, closeTimePicker } = useTimePicker();

  const addAgendaMessage = {
    title: getValues('agendaTitle'),
    type,
    allocatedDuration: formatDuration({
      hour: timePicker.time.hour,
      minute: timePicker.time.minute
    })
  };

  const handleComplete = async () => {
    try {
      sendAddAgendaMessage(addAgendaMessage);
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
        타이머를 맞춰주세요
      </Text>

      <Space height={16} />

      <TimePicker type="duration" setTime={setTime} onClose={closeTimePicker} />

      <Space height={24} />

      <Button size={'lg'} backgroundColor={'main'} onClick={handleComplete}>
        완료하기
      </Button>

      <Space height={44} />
    </Flex>
  );
};
