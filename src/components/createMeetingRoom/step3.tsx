import { Flex } from '@/components/Wrapper';
import { Input } from '@/components/common';
import { FormType } from '@/pages/createMeetingroom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface Step3Props {
  register: UseFormRegister<FormType>;
  watch: UseFormWatch<FormType>;
  errors?: FieldErrors;
}

export const Step3 = ({ register, watch, errors }: Step3Props) => {
  return (
    <Flex direction="column" align="flex-start">
      <div
        css={css`
          width: 100%;
        `}>
        <StyledLabel>회의 장소를 알려주세요</StyledLabel>
        <Input
          {...register('meetingRoomPlace')}
          value={watch('meetingRoomPlace')}
          type="default"
          placeholder="선택사항입니다"
          isError={errors?.meetingRoomPlace ? true : false}
          errorText={errors?.meetingRoomPlace?.message as string}
        />
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
