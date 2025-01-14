import { useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

import {
  Flex,
  Space,
  Input,
  SvgIcon,
  DatePicker,
  TimePicker
} from '@shared/common/ui';
import { useDatePicker, useTimePicker } from '@shared/common/hooks';

import type { Form } from '@features/meeting-create/types';
import { getDayOfWeek } from '@features/meeting-create/utils';

interface Step2Props {
  register: UseFormRegister<Form>;
  watch: UseFormWatch<Form>;
  errors?: FieldErrors;
  setValue: UseFormSetValue<Form>;
}

const pickerVariants = {
  invisible: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};

export const Step2 = ({ register, watch, errors, setValue }: Step2Props) => {
  const { datePicker, setDate, openDatePicker, closeDatePicker } =
    useDatePicker();
  const {
    timePicker: timePicker1,
    setTime: setTime1,
    openTimePicker: openTimePicker1,
    closeTimePicker: closeTimePicker1
  } = useTimePicker();
  const {
    timePicker: timePicker2,
    setTime: setTime2,
    openTimePicker: openTimePicker2,
    closeTimePicker: closeTimePicker2
  } = useTimePicker();

  useEffect(() => {
    const { year, month, date } = datePicker.date;
    setValue('step2.meetingRoomDate', {
      date: { year, month, date },
      dateString: `${month}월 ${date}일 ${getDayOfWeek(`${year}/${month}/${date}`)}요일`
    });
  }, [datePicker.date, setValue]);

  useEffect(() => {
    const { periodOfDay, hour, minute } = timePicker1.time;
    if (periodOfDay && hour && minute) {
      setValue('step2.meetingRoomTime', {
        time: { periodOfDay, hour, minute },
        timeString: `${periodOfDay} ${hour}시 ${minute}분`
      });
    }
  }, [timePicker1.time, setValue]);

  useEffect(() => {
    const { hour, minute } = timePicker2.time;
    if (hour && minute) {
      setValue('step2.meetingRoomDuration', {
        duration: { hour, minute },
        durationString: `${hour}시간 ${minute}분`
      });
    }
  }, [timePicker2.time, setValue]);

  return (
    <Flex direction="column" align="flex-start">
      <div
        css={css`
          width: 100%;
        `}>
        <StyledLabel>
          회의가 진행되는 날짜를 알려주세요
          <SvgIcon id="star_orange" size={18} />
        </StyledLabel>
        <div
          css={css`
            display: flex;
            gap: 1rem;
          `}>
          <Input
            {...register('step2.meetingRoomDate.dateString', {
              required: '회의 날짜를 입력해주세요'
            })}
            value={watch('step2.meetingRoomDate.dateString')}
            type="default"
            placeholder="0월 0일 00일"
            isError={errors?.meetingRoomDate ? true : false}
            errorText={errors?.meetingRoomDate?.message as string}
            readOnly
            onClick={() => {
              if (timePicker1.isOpen) {
                closeTimePicker1();
              }
              if (timePicker2.isOpen) {
                closeTimePicker2();
              }
              openDatePicker();
            }}
          />
          <Input
            {...register('step2.meetingRoomTime.timeString', {
              required: '회의 시간을 입력해주세요'
            })}
            value={watch('step2.meetingRoomTime.timeString')}
            type="default"
            placeholder="오후 00시 00분"
            isError={errors?.meetingRoomTime ? true : false}
            errorText={errors?.meetingRoomTime?.message as string}
            readOnly
            onClick={() => {
              if (datePicker.isOpen) {
                closeDatePicker();
              }
              if (timePicker2.isOpen) {
                closeTimePicker2();
              }
              openTimePicker1();
            }}
          />
        </div>

        <AnimatePresence>
          {datePicker.isOpen && (
            <motion.div
              variants={pickerVariants}
              initial="invisible"
              animate="visible">
              <DatePicker
                date={datePicker.date}
                setDate={setDate}
                onClose={closeDatePicker}
              />
              <Space height={30} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {timePicker1.isOpen && (
            <motion.div
              variants={pickerVariants}
              initial="invisible"
              animate="visible">
              <TimePicker
                type="time"
                setTime={setTime1}
                onClose={closeTimePicker1}
              />
              <Space height={30} />
            </motion.div>
          )}
        </AnimatePresence>

        <StyledLabel>
          회의 예상 소요시간을 알려주세요
          <SvgIcon id="star_orange" size={18} />
        </StyledLabel>
        <div
          css={css`
            display: flex;
            gap: 1rem;
          `}>
          <Input
            {...register('step2.meetingRoomDuration.durationString', {
              required: '회의 예상 소요시간을 입력해주세요'
            })}
            value={watch('step2.meetingRoomDuration.durationString')}
            type="default"
            placeholder="00시간 00분"
            isError={errors?.meetingRoomDuration ? true : false}
            errorText={errors?.meetingRoomDuration?.message as string}
            readOnly
            onClick={() => {
              if (datePicker.isOpen) {
                closeDatePicker();
              }
              if (timePicker1.isOpen) {
                closeTimePicker1();
              }
              openTimePicker2();
            }}
          />
          <div
            css={css`
              width: 100%;
            `}
          />
        </div>

        <AnimatePresence>
          {timePicker2.isOpen && (
            <motion.div
              variants={pickerVariants}
              initial="invisible"
              animate="visible">
              <TimePicker
                type="duration"
                setTime={setTime2}
                onClose={closeTimePicker2}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Flex>
  );
};

const StyledLabel = styled.label`
  ${(props) => props.theme.typo.T5}
  color: ${(props) => props.theme.palette.dark_gray2};
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
`;
