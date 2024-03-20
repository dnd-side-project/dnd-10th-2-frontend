/** @jsxImportSource @emotion/react */
import { Flex, Space } from '@/components/Wrapper';
import { DatePicker, Input, SvgIcon } from '@/components/common';
import { useOpen } from '@/hooks/useOpen';
import { FormType } from '@/pages/createMeetingroom';
import { today } from '@/utils';
import { getDayOfWeek } from '@/utils/getDayOfWeek';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

interface Step1Props {
  register: UseFormRegister<FormType>;
  watch: UseFormWatch<FormType>;
  errors?: FieldErrors;
  setValue: UseFormSetValue<FormType>;
}

const datePickerVariants = {
  invisible: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};

export const Step2 = ({ register, watch, errors, setValue }: Step1Props) => {
  const [selectedDate, setSelectedDate] = useState({
    year: today.year,
    month: today.month,
    date: today.date
  });

  const { open, onOpen, onClose } = useOpen();

  useEffect(() => {
    const { year, month, date } = selectedDate;
    setValue(
      'meetingRoomDate',
      `${month}월 ${date}일 ${getDayOfWeek(`${year}-${month}-${date}`)}요일`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);
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
            onClick={onOpen}
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
          />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              variants={datePickerVariants}
              initial="invisible"
              animate="visible">
              <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onClose={onClose}
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
          />
          <div
            css={css`
              width: 100%;
            `}
          />
        </div>

        <Space height={4} />
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
