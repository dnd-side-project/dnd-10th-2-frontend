import styled from '@emotion/styled';

import { Space, Text, SvgIcon } from '@shared/common/ui';
import { AgendaResponse } from '@shared/meeting/apis/types';

import {
  AgendaAbleIcon,
  AgendaDisableIcon,
  BreakTimeAbleIcon,
  BreakTimeDisableIcon
} from '@features/meeting/assets';
import { Timer } from './Timer';
import { useOpen } from '@shared/common/hooks';
import { formatTimeToSecond } from '../utils';

export const Agenda = ({
  agendaId,
  title,
  type,
  // currentDuration,
  remainingDuration,
  status
}: AgendaResponse) => {
  const { open, onOpen } = useOpen();
  return (
    <StyledAgenda isDone={status === 'COMPLETED'}>
      <StyledAgendaContent>
        {type === 'AGENDA' && status !== 'COMPLETED' && (
          <AgendaAbleIcon width="40" height="40" />
        )}
        {type === 'AGENDA' && status === 'COMPLETED' && (
          <AgendaDisableIcon width="40" height="40" />
        )}
        {type === 'BREAK' && status !== 'COMPLETED' && (
          <BreakTimeAbleIcon width="40" height="40" />
        )}
        {type === 'BREAK' && status === 'COMPLETED' && (
          <BreakTimeDisableIcon width="40" height="40" />
        )}

        <HorizonSpace width={10} />

        <AgendaWrapper>
          {type === 'AGENDA' && status !== 'COMPLETED' && (
            <AgendaChip isDone={false}>{agendaId}번째 안건</AgendaChip>
          )}
          {type === 'AGENDA' && status === 'COMPLETED' && (
            <AgendaChip isDone={true}>논의완료</AgendaChip>
          )}

          <Space height={6} />

          <Text typo="T7" color="dark_gray1" height={16}>
            {type === 'AGENDA' && title}
            {type === 'BREAK' && '쉬는 시간'}
          </Text>

          <Space height={4} />

          {!open && (
            <Text typo="B2" color="light_gray4" height={16}>
              {remainingDuration}
            </Text>
          )}
        </AgendaWrapper>

        <HorizonSpace width={21} />

        {status === 'PENDING' && (
          <SvgIcon id="play" width={30} height={30} onClick={onOpen} />
        )}
        {/* {status === 'INPROGRESS' && (
          <SvgIcon id="play" width={30} height={30} />
        )} */}
        {/* {status === 'PAUSED' && <SvgIcon id='paused' width={30} height={30} />} */}

        <HorizonSpace width={16} />

        {status !== 'COMPLETED' && <SvgIcon id="dots_mono" width={4} />}
      </StyledAgendaContent>

      {open && (
        <>
          <Space height={30} />
          <Timer
            time={formatTimeToSecond(remainingDuration)}
            initialRemainingTime={formatTimeToSecond(remainingDuration)}
            serverTime={new Date()}
          />
        </>
      )}
    </StyledAgenda>
  );
};

const StyledAgenda = styled.div<{ isDone: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  border-radius: 18px;
  padding: 20px 10px 20px 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: ${({ isDone, theme }) =>
    isDone ? theme.palette.light_gray2 : theme.palette.white};
  border: ${({ isDone }) => isDone && '2px solid #d3d9ee'};
`;

const StyledAgendaContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AgendaWrapper = styled.div`
  width: calc(100% - 131px);
`;

const AgendaChip = styled.div<{ isDone: boolean }>`
  padding: 5px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  width: fit-content;
  ${({ theme }) => theme.typo.B6}
  background-color: ${({ theme }) => theme.palette.light_white};
  color: ${({ theme }) => theme.palette.middle_gray3};

  color: ${({ isDone, theme }) =>
    isDone ? `${theme.palette.light_gray4}` : `${theme.palette.middle_gray3}`};
`;

const HorizonSpace = styled.div<{
  width: number;
}>`
  width: ${({ width }) => `${width}px`};
`;
