import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Space, Button, SvgIcon } from '@shared/common/ui';

interface Step1Props {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const Step1 = ({ setCurrentStep }: Step1Props) => {
  const agendaList = [
    {
      id: 0,
      name: '아이스 브레이킹',
      time: 3
    },
    {
      id: 1,
      name: '주제 논의',
      time: 20
    },
    {
      id: 2,
      name: '아이데이션',
      time: 20
    }
  ];

  return (
    <>
      {true && (
        <>
          <StyledTitle>
            회의가 종료되었어요!
            <br />
            오늘도 수고 많으셨습니다.
          </StyledTitle>

          <div
            css={css`
              display: flex;
              justify-content: center;
            `}>
            <SvgIcon id="meeting_complete" size={260} />
          </div>
        </>
      )}

      {false && (
        <>
          <StyledTitle>
            25분 더 이야기 나누셨네요.
            <br />
            제시간에 끝내도록 분발해봅시다!
          </StyledTitle>

          <Space height={16} />

          {agendaList.map((agenda) => (
            <StyledAgenda key={agenda.id}>
              <span>{agenda.name}</span>
              <span>+{agenda.time}분</span>
            </StyledAgenda>
          ))}

          <Space height={60} />
        </>
      )}

      <StyledButtonContainer>
        <StyledButton>
          <Button
            size="sm"
            backgroundColor="main_blue"
            onClick={() => setCurrentStep(2)}>
            다음으로
          </Button>
        </StyledButton>
      </StyledButtonContainer>
    </>
  );
};

const StyledTitle = styled.div`
  ${({ theme }) => theme.typo.T2}
  color: ${({ theme }) => theme.palette.dark_gray2};
`;

const StyledAgenda = styled.div`
  ${({ theme }) => theme.typo.B1}
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.dark_gray2};
  padding: 2rem 1rem;
  border-bottom: 1px dashed ${({ theme }) => theme.palette.light_gray3};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const StyledButton = styled.div`
  width: 7.5rem;
`;
