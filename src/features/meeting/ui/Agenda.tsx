import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Space, Text, SvgIcon, Button } from '@shared/common/ui';

import { useBottomSheet, useModal } from '@shared/common/hooks';
import { useDeleteAgenda, useControlAgenda } from '@shared/meeting/apis';
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

interface AgendaResponseWithProps extends AgendaResponseWithOrder {
  isFirstPendingAgenda: boolean;
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
  isFirstPendingAgenda,
  refetchAgendaList
}: AgendaResponseWithProps) => {
  const meetingId = useParams().meetingId || '';

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

  // Modal 코드
  const { openModal, closeModal } = useModal();

  const modalContent = {
    title: '\n\n정말 안건을 삭제하시겠어요?',
    description: '\n\n',
    button: {
      text: '삭제하기',
      onClick: () => {
        mutate();
        closeModal();
      }
    }
  };

  // WebSocket 코드
  const { sendMessage } = useControlAgenda(
    meetingId,
    agendaId,
    isFirstPendingAgenda
  );

  const isAgendaInProgress =
    isFirstPendingAgenda && (status === 'INPROGRESS' || status === 'PAUSED');

  return (
    <StyledAgenda isDone={status === 'COMPLETED'}>
      {status === 'INPROGRESS' && <StyledNowChip>now</StyledNowChip>}

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

        <StyledAgendaWrapper>
          {type === 'AGENDA' && status !== 'COMPLETED' && (
            <StyledAgendaChip isDone={false}>안건 {order}</StyledAgendaChip>
          )}
          {type === 'AGENDA' && status === 'COMPLETED' && (
            <StyledAgendaChip isDone={true}>논의완료</StyledAgendaChip>
          )}

          <Space height={6} />

          <Text typo="T7" color="dark_gray1" height={16}>
            {type === 'AGENDA' && title}
            {type === 'BREAK' && '쉬는 시간'}
          </Text>

          <Space height={4} />

          {!isAgendaInProgress && (
            <Text typo="B2" color="light_gray4" height={16}>
              {remainingDuration}
            </Text>
          )}
        </StyledAgendaWrapper>

        <HorizonSpace width={21} />

        {isFirstPendingAgenda && !isAgendaInProgress && (
          <SvgIcon
            id="play"
            width={30}
            height={30}
            onClick={() => {
              sendMessage('start');
            }}
          />
        )}
        {status !== 'COMPLETED' && !isFirstPendingAgenda && (
          <SvgIcon id="play_disabled" width={30} height={30} />
        )}

        <HorizonSpace width={16} />

        {status !== 'COMPLETED' && !isAgendaInProgress && (
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
                  // onClick={() => mutate()}
                  onClick={() => {
                    openModal(modalContent);
                  }}>
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
                  onClick={() => {
                    openBottomSheet({
                      content: (
                        <EditSheet
                          type={type}
                          meetingId={meetingId}
                          agendaId={agendaId}
                          title={title}
                          isFirstPendingAgenda={isFirstPendingAgenda}
                        />
                      )
                    });
                  }}>
                  수정하기
                </Text>
              </div>
            )}
          </div>
        )}
      </StyledAgendaContent>

      {isAgendaInProgress && (
        <>
          <Space height={30} />

          <Timer
            time={formatTimeToSecond(remainingDuration)}
            serverTime={new Date()}
            isPlaying={status === 'INPROGRESS'}
            sendMessage={sendMessage}
          />

          <Space height={30} />

          <StyledButtonContainer>
            <StyledButton>
              <Button
                size="sm"
                backgroundColor="skyblue"
                textColor="main_blue"
                onClick={() => {
                  if (status === 'INPROGRESS') {
                    sendMessage('pause');
                  } else if (status === 'PAUSED') {
                    sendMessage('resume');
                  }
                }}>
                {status === 'INPROGRESS' && <SvgIcon id="pause" size={12} />}
                {status === 'PAUSED' && <SvgIcon id="play" size={12} />}
              </Button>
            </StyledButton>

            <StyledButton>
              <Button
                size="md"
                backgroundColor="skyblue"
                textColor="main_blue"
                onClick={() => {
                  sendMessage('pause');
                  openBottomSheet({
                    content: (
                      <EditSheet
                        type={type}
                        meetingId={meetingId}
                        agendaId={agendaId}
                        title={title}
                        isFirstPendingAgenda={isFirstPendingAgenda}
                      />
                    )
                  });
                }}>
                시간 수정
              </Button>
            </StyledButton>

            <StyledButton>
              <Button
                size="md"
                backgroundColor="main_blue"
                onClick={() => {
                  sendMessage('end');
                }}>
                안건 종료
              </Button>
            </StyledButton>
          </StyledButtonContainer>
        </>
      )}
    </StyledAgenda>
  );
};

const StyledAgenda = styled.div<{ isDone: boolean }>`
  position: relative;
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

const StyledNowChip = styled.div`
  position: absolute;
  top: -0.7rem;
  right: 1.6rem;
  ${({ theme }) => theme.typo.B2}
  background-color: ${({ theme }) => theme.palette.error};
  color: ${({ theme }) => theme.palette.white};
  padding: 0.5rem 1rem 0.6rem;
  border-radius: 2.4rem;
`;

const StyledAgendaContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledAgendaWrapper = styled.div`
  width: calc(100% - 131px);
`;

const StyledAgendaChip = styled.div<{ isDone: boolean }>`
  padding: 5px 8px;
  box-sizing: border-box;
  border-radius: 8px;
  width: fit-content;
  ${({ theme }) => theme.typo.B6}
  background-color: ${({ theme }) => theme.palette.light_white};
  color: ${({ isDone, theme }) =>
    isDone ? `${theme.palette.light_gray4}` : `${theme.palette.middle_gray3}`};
`;

const HorizonSpace = styled.div<{
  width: number;
}>`
  width: ${({ width }) => `${width}px`};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  gap: 0.7rem;
`;

const StyledButton = styled.div`
  flex-grow: 1;
  height: 100%;

  :first-of-type {
    flex-grow: 0;
    width: 5rem;
  }
`;
