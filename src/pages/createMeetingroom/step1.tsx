/** @jsxImportSource @emotion/react */
import { thumbnailList } from '@/assets/MeetingRoom/thumbnailList';
import { Flex, Space } from '@/components/Wrapper';
import { Input, SvgIcon } from '@/components/common';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

interface Step1Props {
  register: UseFormRegister<{
    meetingRoomName: string;
    meetingRoomNotice: string;
  }>;
  watch: UseFormWatch<{ meetingRoomName: string; meetingRoomNotice: string }>;
  errors?: FieldErrors;
  thumbnailNumber: number | null;
  setThumbnailNumber: React.Dispatch<React.SetStateAction<number | null>>;
}

const Step1 = ({
  register,
  watch,
  errors,
  thumbnailNumber,
  setThumbnailNumber
}: Step1Props) => {
  return (
    <Flex direction="column" align="flex-start">
      <div style={{ width: '100%' }}>
        <StyledLabel>
          회의 이름을 알려주세요 <SvgIcon id="star_orange" size={18} />
        </StyledLabel>
        <Input
          {...register('meetingRoomName', {
            required: '회의 이름을 입력해주세요',
            maxLength: {
              message: '최대 15자까지 입력가능해요',
              value: 15
            }
          })}
          value={watch('meetingRoomName')}
          type="default"
          placeholder="회의 이름"
          maxLength={15}
          isError={errors?.meetingRoomName ? true : false}
          errorText={errors?.meetingRoomName?.message as string}
        />

        <Space height={4} />

        <StyledLabel>회의 공지가 있다면 적어주세요</StyledLabel>
        <Input
          {...register('meetingRoomNotice', {
            maxLength: {
              message: '최대 15자까지 입력가능해요',
              value: 30
            }
          })}
          multiline={true}
          value={watch('meetingRoomNotice')}
          type="default"
          placeholder="회의 이름"
          maxLength={30}
          isError={errors?.meetingRoomNotice ? true : false}
          errorText={errors?.meetingRoomNotice?.message as string}
          height={92}
        />

        <Space height={4} />

        <StyledLabel>
          썸네일을 골라주세요 <SvgIcon id="star_orange" size={18} />
        </StyledLabel>

        <StyledThumbnailList>
          {thumbnailList.map((thumbnail) => (
            <button
              key={thumbnail.id}
              onClick={() => setThumbnailNumber(thumbnail.id + 1)}
              css={css`
                border: ${thumbnail.id + 1 === thumbnailNumber &&
                '2px solid #5784FD'};
                border-radius: 14px;
              `}>
              {thumbnail.icon()}
            </button>
          ))}
        </StyledThumbnailList>
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

const StyledThumbnailList = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
`;

export default Step1;
