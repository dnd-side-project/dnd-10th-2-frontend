/** @jsxImportSource @emotion/react */
import { Flex, Space } from '@/components/Wrapper';
import { DatePicker, Input, SvgIcon, TimePicker } from '@/components/common';
import { useDatePicker } from '@/hooks/useDatePicker';
import { useTimePicker } from '@/hooks/useTimePicker';
import { FormType } from '@/pages/createMeetingroom';
import { getDayOfWeek } from '@/utils/getDayOfWeek';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

interface Step2Props {
  register: UseFormRegister<FormType>;
  watch: UseFormWatch<FormType>;
  errors?: FieldErrors;
  setValue: UseFormSetValue<FormType>;
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
    const {
      date: { year, month, date }
    } = datePicker;
    setValue(
      'meetingRoomDate',
      `${month}월 ${date}일 ${getDayOfWeek(`${year}-${month}-${date}`)}요일`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datePicker]);

  useEffect(() => {
    const {
      time: { periodOfDay, hour, minute }
    } = timePicker1;

    if (periodOfDay && hour && minute) {
      setValue('meetingRoomTime', `${periodOfDay} ${hour}시 ${minute}분`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePicker1]);

  useEffect(() => {
    const {
      time: { hour, minute }
    } = timePicker2;

    if (hour && minute) {
      setValue('meetingRoomDuration', `${hour}시간 ${minute}분`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePicker2]);
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
            {...register('meetingRoomDate', {
              required: '회의 날짜를 입력해주세요'
            })}
            value={watch('meetingRoomDate')}
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
            {...register('meetingRoomTime', {
              required: '회의 시간을 입력해주세요'
            })}
            value={watch('meetingRoomTime')}
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
            {...register('meetingRoomDuration', {
              required: '회의 예상 소요시간을 입력해주세요'
            })}
            value={watch('meetingRoomDuration')}
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