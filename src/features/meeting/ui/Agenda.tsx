import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Space, Text, SvgIcon } from '@shared/common/ui';

import { useBottomSheet, useOpen } from '@shared/common/hooks';
import { useDeleteAgenda } from '@shared/meeting/apis';
import { getCookie } from '@shared/common/utils';

import { EditSheet, Timer } from '@features/meeting/ui';
import { formatTimeToSecond } from '@features/meeting/utils';
import {
  AgendaAbleIcon,
  AgendaDisableIcon,
  BreakTimeAbleIcon,
  BreakTimeDisableIcon
} from '@features/meeting/assets';

import { AgendaResponseWithOrder } from '@pages/meeting/MeetingPage';

interface AgendaResponseWithRefetch extends AgendaResponseWithOrder {
  refetchAgendaList: () => void;
}

export const Agenda = ({
  agendaId,
  order,
  title,
  type,
  // currentDuration,
  remainingDuration,
  status,
  refetchAgendaList
}: AgendaResponseWithRefetch) => {
  const meetingId = useParams().meetingId || '';

  const { open, onOpen } = useOpen();
  const { openBottomSheet } = useBottomSheet();

  const { mutate } = useDeleteAgenda({
    token: getCookie('token'),
    meetingId,
    agendaId: String(agendaId),
    refetchAgendaList
  });

  // 삭제하기, 수정하기 모달 hook
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);
  //
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
            <AgendaChip isDone={false}>안건 {order}</AgendaChip>
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

        {status !== 'COMPLETED' && (
          <div
            css={css`
              position: relative;
            `}>
            <SvgIcon id="dots_mono" width={4} onClick={handleButtonClick} />

            {isPopupOpen && (
              <div
                ref={popupRef}
                css={css`
                  position: absolute;
                  top: 3rem;
                  right: -0.5rem;
                  width: 15.4rem;
                  background-color: white;
                  box-shadow: 0px 0px 6px 0px rgba(185, 189, 201, 0.25);
                  border-radius: 0.8rem;
                  z-index: 99;
                `}>
                <Text
                  typo="B1"
                  color="dark_gray2"
                  css={css`
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 4rem;
                    border-bottom: 1px solid #e7ebef;
                  `}
                  onClick={() => mutate()}>
                  삭제하기
                </Text>
                <Text
                  typo="B1"
                  color="dark_gray2"
                  css={css`
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 4rem;
                    border-top: 1px solid #e7ebef;
                  `}
                  onClick={() =>
                    openBottomSheet({
                      content: (
                        <EditSheet
                          type={type}
                          meetingId={meetingId}
                          agendaId={agendaId}
                          title={title}
                          allocatedDuration={remainingDuration}
                          refetchAgendaList={refetchAgendaList}
                        />
                      )
                    })
                  }>
                  수정하기
                </Text>
              </div>
            )}
          </div>
        )}
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
