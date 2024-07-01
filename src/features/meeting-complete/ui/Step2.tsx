import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';

import { Space, Button, Input, SvgIcon } from '@shared/common/ui';

interface Step2Props {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const Step2 = ({ setCurrentStep }: Step2Props) => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      feedback: ''
    },
    mode: 'onChange'
  });
  return (
    <>
      <StyledTitle>
        회의에 대한 회고를 남겨주세요!
        <br />
        나만 볼 수 있는 기록이에요
      </StyledTitle>

      <Space height={16} />

      <Input
        {...register('feedback', {
          maxLength: {
            message: '최대 100자까지 입력가능해요',
            value: 100
          }
        })}
        multiline={true}
        value={watch('feedback')}
        type="default"
        placeholder="내용 입력"
        maxLength={100}
        isError={errors?.feedback ? true : false}
        errorText={errors?.feedback?.message as string}
        height={200}
      />

      <Space height={60} />

      <StyledButtonContainer>
        <SvgIcon id="arrow_back" onClick={() => setCurrentStep(1)} />

        <div
          css={css`
            display: flex;
          `}>
          <StyledButton>
            <Button
              size="sm"
              backgroundColor="white"
              textColor="main_blue"
              onClick={() => navigate('/')}>
              건너뛰기
            </Button>
          </StyledButton>

          <StyledButton>
            <Button
              size="sm"
              backgroundColor="main_blue"
              onClick={() => navigate('/')}>
              완료하기
            </Button>
          </StyledButton>
        </div>
      </StyledButtonContainer>
    </>
  );
};

const StyledTitle = styled.div`
  ${({ theme }) => theme.typo.T2}
  color: ${({ theme }) => theme.palette.dark_gray2};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.div`
  width: 7.5rem;
`;
